from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI
from utils.get_env_variables import *

gemini_2_flash = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    temperature=LLM_TEMPERATURE,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    api_key=GEMINI_API_KEY
)

chatgroq = ChatGroq(
    temperature=0,
    model_name="llama3-70b-8192",
    api_key = GROQ_API_KEY,
)

deepseek = ChatGroq(
    temperature=0,
    model_name="deepseek-r1-distill-llama-70b-specdec",
    api_key = GROQ_API_KEY_1,
)

chatgpt4o = ChatOpenAI(
    model='gpt-4o-mini',
    temperature=LLM_TEMPERATURE,
    openai_api_key=CHATGPT_API_KEY
)
chatgpt35 = ChatOpenAI(
    model='gpt-3.5-turbo',
    temperature=LLM_TEMPERATURE,
    openai_api_key=CHATGPT_API_KEY
)

chatgpt4tubo = ChatOpenAI(
    model='gpt-4-turbo',
    temperature=LLM_TEMPERATURE,
    openai_api_key=CHATGPT_API_KEY
)