import yaml
import os
from dotenv import load_dotenv
load_dotenv()

QDRANT_API_KEY = os.getenv('QDRANT_API_KEY')
QDRANT_URL = os.getenv('QDRANT_URL')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
CHATGPT_API_KEY = os.getenv('OPENAI_API_KEY')
CHAT_MODEL_ID = os.getenv('LLM')
CHAT_DEPLOYMENT_ID = os.getenv('LLM')
GROQ_API_KEY_1 = os.getenv('GROQ_API_KEY_1') #deepseek
GROQ_API_KEY = os.getenv('GROQ_API_KEY')


with open('config.yaml', 'r') as f:
    config_data = yaml.safe_load(f)

with open('system_prompts.yaml', 'r') as f:
    system_prompts = yaml.safe_load(f)

if 'GPT_CONFIG_FILE' in config_data:
    config_data['GPT_CONFIG_FILE'] = config_data['GPT_CONFIG_FILE'].replace('$HOME', os.environ['HOME'])

SYSTEM_PROMPT = system_prompts["KG_RAG_BASED_TEXT_GENERATION"]
DISEASE_ENTITY_EXTRACTION = system_prompts['DISEASE_ENTITY_EXTRACTION_V2']
PROMPT_ANSWER = system_prompts['PROMPT_ANSWER']
CONTEXT_VOLUME = int(config_data["CONTEXT_VOLUME"])
QUESTION_VS_CONTEXT_SIMILARITY_PERCENTILE_THRESHOLD = float(config_data["QUESTION_VS_CONTEXT_SIMILARITY_PERCENTILE_THRESHOLD"])
QUESTION_VS_CONTEXT_MINIMUM_SIMILARITY = float(config_data["QUESTION_VS_CONTEXT_MINIMUM_SIMILARITY"])
VECTOR_DB_PATH = config_data["VECTOR_DB_PATH"]
NODE_CONTEXT_PATH = config_data["NODE_CONTEXT_PATH"]
LLM_TEMPERATURE = config_data["LLM_TEMPERATURE"]
KG_RAG_FLAG = True # we set false only when RAG without KG
EDGE_EVIDENCE_FLAG = True # Used only when KG_RAG_FLAG=True
SENTENCE_EMBEDDING_MODEL_FOR_NODE_RETRIEVAL = config_data["SENTENCE_EMBEDDING_MODEL_FOR_NODE_RETRIEVAL"]
SENTENCE_EMBEDDING_MODEL_FOR_CONTEXT_RETRIEVAL = config_data["SENTENCE_EMBEDDING_MODEL_FOR_CONTEXT_RETRIEVAL"]
EXPLORE_KG_NODETYPES=system_prompts["EXPLORE_KG_NODETYPES"]
EXPLORE_KG_RELATIONSHIP=system_prompts["EXPLORE_KG_RELATIONSHIP"]
FINAL_ANSWER_PROMPT_TEMPLATE=system_prompts["FINAL_ANSWER_PROMPT_TEMPLATE"]
