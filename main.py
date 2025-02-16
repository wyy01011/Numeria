from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Load API Key
load_dotenv()
api_key: str = os.getenv("key")
model: str = "deepseek-r1-distill-llama-70b"
deepseek = ChatGroq(api_key=api_key, model_name=model)

# Configure Output Parsing
parser = StrOutputParser()
deepseek_chain = deepseek | parser

# Global Variables to Store Questions and Answers
QUESTIONS = []
ANSWERS = []

# Helper Function to Clean AI Output
def remove_thinking(s):
    return str(s).split("</think>\n\n")[-1]

# Default Route
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Numeria API is running!"})

# **Your Original Template**
template = """
"You are a math teacher. You are teaching students in grade {grade} in {location}, specifically following the curriculum provided.
Let N represent the number of categories outlined in the curriculum.

Here are the rules you MUST follow:
1. Please read through the curriculum and generate one math question for each category of the N outlined in the curriculum. The questions should be clear, simple, and appropriate for the students, and they should directly correspond to the categories in the curriculum.
2. List the Questions 1 to N. Do not include any category titles before the questions. 
3. If the Question has an answer that is NOT a number, list three possible answers to choose from, labelled with 1, 2, and 3 respectively. Follow this template for the question: '[Question]. 1) [Option 1], 2) [Option 2], 3) [Option 3]'.
4. The answers to the math questions must be numerical and do not include the units. If the answer is not a NUMBER, print the ANSWER with the label of one of the following 3 OPTIONS: '1', '2', or '3'. Do not include the text that follows the number in the final answer, only include the label.
5. Print 'QUESTIONS:' before listing one question per line. Only have one newline between each question, not two.
6. Print 'ANSWERS:' before the corresponding numerical answers separated by a newline.
7. Begin by generating only the questions and answers, one per curriculum category.
Curriculum: {curriculum}

Use the following template when responding:
'</think>
...
</think>\n
\n
QUESTIONS:
1.[Question 1]\n
...\n
N.[Question N]\n
\n
ANSWERS:
1.[Answer 1]\n
...\n
N.[Answer N]\n'
"""

# API: Generate Questions (Fixed to Keep Your Template)
@app.route("/generate-questions", methods=["POST"])
def generate_questions():
    global QUESTIONS, ANSWERS  # Ensure we're modifying the global lists

    data = request.json
    grade = data.get("grade")
    location = data.get("country")
    curriculum = data.get("curriculum")

    if not grade or not location or not curriculum:
        return jsonify({"error": "Missing fields"}), 400

    # Keep your original template formatting
    formatted_template = template.format(grade=grade, location=location, curriculum=curriculum)

    try:
        response = deepseek_chain.invoke(formatted_template)
        clean_response = remove_thinking(response)

        # Split Questions and Answers
        response_split = clean_response.split("\n\n")
        if len(response_split) < 2:
            return jsonify({"error": "Failed to parse questions and answers"}), 500

        QUESTIONS = response_split[0].split("\n")[1:]  # Extract questions
        ANSWERS = response_split[1].split("\n")[1:]  # Extract answers

        if len(QUESTIONS) > 4:
            QUESTIONS = QUESTIONS[:4]
            ANSWERS = ANSWERS[:4]

        # Clean up answers
        for i in range(len(ANSWERS)):
            ANSWERS[i] = ANSWERS[i].strip().split(" ")[-1]

        return jsonify({"questions": QUESTIONS, "answers": ANSWERS})

    except Exception as e:
        return jsonify({"error": f"Failed to generate questions: {str(e)}"}), 500

# API: Check Answer
@app.route("/check-answer", methods=["POST"])
def check_answer():
    data = request.json
    question = data.get("question")
    user_answer = data.get("userAnswer")

    if not question or not user_answer:
        return jsonify({"error": "Missing fields"}), 400

    try:
        index = QUESTIONS.index(question)
    except ValueError:
        return jsonify({"error": "Question not found"}), 400

    correct_answer = ANSWERS[index].strip()

    if user_answer.strip() == correct_answer:
        return jsonify({"correct": True})

    # Generate explanation
    explanation_prompt = f"""
    This is the math question the user needed to answer: "{question}", and this is the correct answer: "{correct_answer}".
    However, the user chose: "{user_answer}". 
    Can you briefly explain where they might have gone wrong and how to solve this question?
    Your response must not exceed 100 words.
    """

    try:
        response = deepseek_chain.invoke(explanation_prompt)
        explanation = remove_thinking(response)

        return jsonify({"correct": False, "explanation": explanation})
    except Exception as e:
        return jsonify({"correct": False, "explanation": "Could not generate explanation."})

# Run Flask App
if __name__ == "__main__":
    app.run(debug=True, port=5000)
