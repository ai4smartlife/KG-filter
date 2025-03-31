
from utils.get_vector_store import qdrant_client
from utils.get_sentence_models import embedding_model_node_retrieval

def search_qdrant(disease_name, collection_name='SPOKE_DISEASES', limit=1):
    # disease_embedding = embedding_model_node_retrieval.embed_documents([disease_name])[0]
    disease_embedding = embedding_model_node_retrieval.embed_query(disease_name)

    search_result = qdrant_client.search(
        collection_name=collection_name,  
        query_vector=disease_embedding,
        limit=limit
    )

    most_similar_disease = search_result if search_result else None
    
    return most_similar_disease