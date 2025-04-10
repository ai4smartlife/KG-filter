from langchain_huggingface import HuggingFaceEmbeddings 
from .get_env_variables import SENTENCE_EMBEDDING_MODEL_FOR_CONTEXT_RETRIEVAL, SENTENCE_EMBEDDING_MODEL_FOR_NODE_RETRIEVAL

embedding_model_node_retrieval = HuggingFaceEmbeddings(model_name=SENTENCE_EMBEDDING_MODEL_FOR_NODE_RETRIEVAL)
embedding_function_context_retrieval = HuggingFaceEmbeddings(model_name=SENTENCE_EMBEDDING_MODEL_FOR_CONTEXT_RETRIEVAL)
