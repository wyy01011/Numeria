from dotenv import load_dotenv
import os 
from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from langchain_community.document_loaders import TextLoader
import streamlit as st


def remove_thinking(s):
    return str(s).split("</think>\n\n")[-1]


# model setup

# opening the file in read mode 
country_file = open("countries.txt", "r") 
  
# reading the file 
country_raw = country_file.read() 
  
# replacing end splitting the text  
# when newline ('\n') is seen. 
countries = country_raw.split("\n") 
country_file.close() 


load_dotenv()
api_key : str  = os.getenv("key")
model: str ="deepseek-r1-distill-llama-70b"
deepseek = ChatGroq(api_key=api_key, model_name = model)

# print(deepseek.invoke('Hello There!'))

# Getting only result from the model

parser = StrOutputParser()
deepseek_chain = deepseek|parser
# result: str = deepseek_chain.invoke('what is a bot')
# print(result)


# Loading and Spliting data in chunks
loader = TextLoader('data.txt',encoding = 'utf-8')
data = loader.load()
# print(data)

# streamlit UI
st.title("Numeria")


template = ("""
"You are a math teacher. You are teaching students in grade {grade} in {location}, specifically following the curriculum provided.
Let N represent the number of categories outlined in the curriculum.

Here are the rules you MUST follow:
1. Please read through the curriculum and generate one math question for each category of the N outlined in the curriculum. The questions should be clear, simple, and appropriate for the students, and they should directly correspond to the categories in the curriculum.
2. List the Questions 1 to N. Do not include any category titles before the questions. 
3. If the Question has an answer that is NOT a number, list three possible answers to choose from, labelled with 1, 2, and 3 respectively. Follow this template for the question: '[Question]. 1) [Option 1], 2) [Option 2], 3) [Option 3]'.
3. When asking the question, give all the information. Do not ask questions like 'How many employees in the company have a pet hamster?' since not enough info is given.
4. The answers to the math questions must be numerical and do not include the units. If the answer is not a NUMBER, print the ANSWER with the label of one of the following 3 OPTIONS: '1', '2', or '3'. Do not include the text that follows the number in the final answer, only include the label.
5. Print 'QUESTIONS:' before listing one question per line. Only have one newline between each question, not two.
6. Print 'ANSWERS:' before the corresponding numerical answers seperated by a newline.
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
""")

# initialize variables for UI
stuGrade = st.number_input("Enter Grade (1-5):", min_value=1, max_value=5, value=1)
stuLocation = st.selectbox("Select Country",countries)
custom_curriculum = st.text_input("Enter custom curriculum")

# list of countries to choose from
if stuLocation not in countries:
    st.error("⚠️ Invalid country. Please select a valid country from the list.")
    st.stop()


# ACTION: generate questions button
if st.button("Generate Math Questions"):
    with st.spinner("Generating questions..."):
        template = template.format(grade = stuGrade, location = stuLocation, curriculum = custom_curriculum)
        response = deepseek_chain.invoke(template) 
        # get the last index after splitting
        clean_response = str(response).split("</think>\n\n")[-1]
        
        # split the questions and answers
        response_split = clean_response.split("\n\n")
        questions, answers = (response_split[0].split("\n"))[1:], (response_split[1].split("\n"))[1:]

        #clean answers
        for i in range(len(answers)):
            answers[i] = (answers[i]).strip()
            answers[i] = answers[i].split(" ")[-1]
            # if not answers[i].isnumeric():
            #     answers[i] = answers[i][0]
        
        # Display Results
        st.subheader("Generated Questions")
        st.text_area("", questions, height=150)

        st.subheader("Answers")
        st.text_area("", answers, height=100)


# # for loop where each question is asked
# for i in range(len(questions)):
#     print(questions[i])
#     # ask user to input an answer
#     attempt = int(input())

#     # chat bot has to check if the answer is correct
#     # if ans is CORRECT: move on to the next question
#     if attempt == int(answers[i]): 
#         print("yay!")

#     # if ans is WRONG: 
#     # if attempt != int(answers[i]):
#     else:
#         incorrect = True
#         curr_q = questions[i]
#         curr_ans = answers[i]

#         while incorrect:
            

#             # brief explaination
#             explain = (
#                 """
#                 This is the math question the user needed to answer: "{question}", and this is the correct answer: "{answer}". However, the user chose: "{user_ans}".
#                 Can you briefly explain where they might have gone wrong and how to solve this question?
#                 Your extire response must not exceed 100 words.
#                 """
#             )
#             explain = explain.format(question = curr_q, answer = curr_ans, user_ans = attempt)
#             response = deepseek_chain.invoke(explain)
#             print(remove_thinking(response))

#             # ask again with different number
#             diff_question = (
#                 """
#                 This was the math question they got wrong: "{question}". Can you generate a similar question with different numbers?
#                 Output the question first, followed by the answer, seperated by a newline. 
#                 When asking the question, give all the information. Do not ask questions like 'How many employees in the company have a pet hamster?' since not enough info is given.
#                 The answers to the math questions must be numerical and do not include the units. 
#                 If the answer is not a NUMBER, print the ANSWER with the label of one of the following 3 OPTIONS: '1', '2', or '3'. Do not include the text that follows the number in the final answer, only include the label.
#                 Follow this template:
#                 [Question]
#                 [Numerical answer only]
#                 """
#             )
#             diff_question = diff_question.format(question = curr_q)
#             response = deepseek_chain.invoke(diff_question)
#             # print(response)
#             response = remove_thinking(response)
#             # print(response)

#             temp = response.split("\n")
#             # print(temp)
#             curr_q, curr_ans = temp[0], temp[1]
#             print(curr_q)
#             print(curr_ans)


#             attempt = input()

#             if attempt == curr_ans:
#                 incorrect = False
#                 print("yay")


# # # once for loop is done, they win the level