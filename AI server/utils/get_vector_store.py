from .get_sentence_models import embedding_model_node_retrieval, embedding_function_context_retrieval
from qdrant_client import QdrantClient
from qdrant_client.http import models as rest
from langchain_qdrant import QdrantVectorStore
from .get_env_variables import QDRANT_API_KEY, QDRANT_URL

def load_qdrant(collection_name, vector_size = 384):
  client = QdrantClient(api_key=QDRANT_API_KEY, url=QDRANT_URL)
  distance_metric = rest.Distance.COSINE

  if not client.collection_exists(collection_name):
      client.create_collection(
          collection_name=collection_name,
          vectors_config=rest.VectorParams(
              size=vector_size,
              distance=distance_metric
          )
      )

  return client

def vector_data_qdrant(client, embeddings_func=embedding_function_context_retrieval, collection_name='SPOKE_DISEASES'):
    qdrant = QdrantVectorStore(
                client=client,
                collection_name = collection_name,
                embedding=embeddings_func
    )
    retriever = qdrant.as_retriever(search_kwargs={"k": 5})
    return retriever

qdrant_client = load_qdrant(collection_name = 'SPOKE_DISEASES', vector_size=384)
qdrant_retriever = vector_data_qdrant(qdrant_client, embedding_model_node_retrieval)