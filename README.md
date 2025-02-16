# Numeria

This project is an AI-powered math tutor that generates grade-specific math questions based on a given Grade, Country and Curriculum. It uses the **DeepSeek API** and **LangChain** to generate questions and answers dynamically.

We have 3 stages of our project:
  1) Setting up environment and make a ChatBot:
     - we have used DeepSeek API and other libraries like langchain , langchain-groq we have created a ChatBot.We are targeting
       children from grade 1 to 5 and across all countries and they can provide their curriculum and ChatBot will ask three questions.

  2) Deploy ChatBot using Streamlit:
     - We are using Streamlit for deployment.
       
  3) User Interface:

## 🚀 Features
- Generates math questions based on a curriculum for grades 1-5.
- Uses **DeepSeek API** for AI-generated questions.
- Allows selection of country-specific curriculums.
- Built using **Streamlit** for an interactive UI.

## 🛠️ Tech Stack & Dependencies
To run this project, we need to install the following dependencies:

```bash
pip install langchain langchain-groq python-dotenv langchain-community streamlit
```
## 🛠️ Tech Stack & Dependencies

![Python](https://img.shields.io/badge/Python-3.8%2B-blue?style=for-the-badge&logo=python)
![Streamlit](https://img.shields.io/badge/Streamlit-red?style=for-the-badge&logo=streamlit)
![LangChain](https://img.shields.io/badge/LangChain-yellow?style=for-the-badge)
![DeepSeek AI](https://img.shields.io/badge/DeepSeek_API-green?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![Canva](https://img.shields.io/badge/Canva-00C4CC?style=for-the-badge&logo=canva&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)


## 🔑 API Configuration
This project uses the **DeepSeek API**. We must set up our API key in an `.env` file.

📦 Numeria
 - ├── 📜 README.md   # Project Documentation
 - ├── 📂 src         # Source Code
 - ├── 📜 .env        # API Key 
 - ├── 📜 requirements.txt # Python Dependencies

## ▶️ Running the Application
To launch the Streamlit app, run:
```bash
streamlit run main.py
```
## Scaling the project

- We are planning to connect educators aswell so they can add this game in classroom and track progress of students.

- This is a web app right now we are planning to make a mobile and dektop app.


