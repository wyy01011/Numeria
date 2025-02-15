from dotenv import load_dotenv
import os 
from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from langchain_community.document_loaders import TextLoader


# model setup

load_dotenv()
api_key : str  = os.getenv("key")
# print(api_key)
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


# Define the function of the chatbot
template = ("""
You are a math teacher. You are teaching students in grade {grade} in {location}.   
Based on the Curriculum provided, can you come up with one question in each category in the curriculum.
While you read through the curriculum and think about the categories, don't output any of your thoughts.
The output should only be the math questions. List each of the questions as a numbered list.
Curriculum: {curriculum}
""")

stuGrade = 1
stuLocation = "Ontario, Canada"
template = template.format(grade = stuGrade, location = stuLocation, curriculum = data)
# print(template)

answer = deepseek_chain.invoke(template)
print(answer)