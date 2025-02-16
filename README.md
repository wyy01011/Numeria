# Numeria

This project is an AI-powered math tutor that generates grade-specific math questions based on a given curriculum. It uses the **DeepSeek API** and **LangChain** to generate questions and answers dynamically.

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

## 🔑 API Configuration
This project uses the **DeepSeek API**. We must set up our API key in an `.env` file.

📦 Numeria
 -├── 📜 README.md   # Project Documentation
 -├── 📂 src         # Source Code
 -├── 📜 .env        # API Key (not to be shared)
 -├── 📜 requirements.txt # Python Dependencies

## ▶️ Running the Application
To launch the Streamlit app, run:
```bash
streamlit run main.py
```


