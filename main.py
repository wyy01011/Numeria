from flask import Flask, request, jsonify
from flask_cors import CORS
# import streamlit as st
from dotenv import load_dotenv
import os 
from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from langchain_community.document_loaders import TextLoader

QUESTIONS = []
ANSWERS = []


def remove_thinking(s):
    return str(s).split("</think>\n\n")[-1]


# Flask API Setup
app = Flask(__name__)
CORS(app)

# Default Route to Avoid 404 Errors
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Numeria API is running!"})

# # Streamlit UI
# st.title("Numeria")


# DeepSeek API
load_dotenv()
api_key : str  = os.getenv("key")
model: str ="deepseek-r1-distill-llama-70b"
deepseek = ChatGroq(api_key=api_key, model_name = model)

# Getting only result from the model
parser = StrOutputParser()
deepseek_chain = deepseek|parser


# Template to insert into DeepSeek
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

# API for fetching generated questions and answers
@app.route("/generate-questions", methods=["POST"])
def generate_questions():
    data = request.json
    grade = data.get("grade")
    location = data.get("country")
    curriculum = data.get("curriculum")

    if not grade or not location or not curriculum:
        return jsonify({"error": "Missing fields"}), 400



    template = template.format(grade = grade, location = location, curriculum = curriculum)
    response = deepseek_chain.invoke(template) 
    # get the last index after splitting
    clean_response = str(response).split("</think>\n\n")[-1]
    
    # split the questions and answers
    response_split = clean_response.split("\n\n")
    QUESTIONS, ANSWERS = (response_split[0].split("\n"))[1:], (response_split[1].split("\n"))[1:]

    #clean answers
    for i in range(len(ANSWERS)):
        ANSWERS[i] = (ANSWERS[i]).strip()
        ANSWERS[i] = ANSWERS[i].split(" ")[-1]
        # if not answers[i].isnumeric():
        #     answers[i] = answers[i][0]

    # questions = [
    #     "What is 2 + 2?",
    #     "How many sides does a triangle have?",
    #     "What is 5 * 6?",
    #     "What is 10 divided by 2?"
    # ]
    # answers = ["4", "3", "30", "5"]

    return jsonify({"questions": QUESTIONS, "answers": ANSWERS})

# API for checking answers
@app.route("/check-answer", methods=["POST"])
def check_answer():
    data = request.json
    question = data.get("question")
    user_answer = data.get("userAnswer")
    
    if not question or not user_answer:
        return jsonify({"error": "Missing fields"}), 400
    
    # correct_answers = {
    #     "What is 2 + 2?": "4",
    #     "How many sides does a triangle have?": "3",
    #     "What is 5 * 6?": "30",
    #     "What is 10 divided by 2?": "5"
    # }
    
    # correct = correct_answers.get(question, "") == user_answer

    #figure out which index the question is in
    i = QUESTIONS.find(question)

    #if they get the answer wrong
    # if int(user_answer) != int(ANSWERS[i]):
        # incorrect = True
    curr_q = QUESTIONS[i]
    curr_ans = ANSWERS[i]
    # brief explaination
    explain = (
        """
        This is the math question the user needed to answer: "{question}", and this is the correct answer: "{answer}". However, the user chose: "{user_ans}".
        Can you briefly explain where they might have gone wrong and how to solve this question?
        Your extire response must not exceed 100 words.
        """
    )
    explain = explain.format(question = curr_q, answer = curr_ans, user_ans = user_answer)
    response = deepseek_chain.invoke(explain)
    #print(remove_thinking(response))
    explanation = remove_thinking(response)
    return jsonify({"explanation": explanation})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
