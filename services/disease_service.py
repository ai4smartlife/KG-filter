from utils.get_env_variables import *
from langchain.schema import HumanMessage, SystemMessage
from services.qdrant_service import search_qdrant
from services.notification_service import send_message
import json
from utils.get_llm import gemini_2_flash, chatgpt4o
import re

def get_json_string(response):

    if isinstance(response, dict):
        return json.dumps(response)  # Chuyển dictionary thành chuỗi JSON

    if isinstance(response, str):
        match = re.search(r'\{.*\}', response, re.DOTALL)  # Trích xuất phần JSON
        if match:
            return match.group(0)  # Lấy phần JSON

    return '{}' 

def fetch_llm_response(question, llm=gemini_2_flash, system_prompt=SYSTEM_PROMPT):
    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=question)
    ]
    
    response = llm.invoke(messages)
    if response.content:
        return response.content
    else:
        return "Unexpected response"

def extract_disease_entity(question):
    # resp = gemini_2_flash
    send_message('Extracting disease entities from question ...')
    resp = fetch_llm_response(question=question, llm=gemini_2_flash, system_prompt=DISEASE_ENTITY_EXTRACTION)
    json_resp = get_json_string(resp)
    try:
        if isinstance(json_resp, str):  # If it's a string, parse it
            entity_dict = json.loads(json_resp)
        else:  # Otherwise, assume it's already a dict
            entity_dict = json_resp
        entities = entity_dict.get("Diseases", [])
        diseases = []
        
        send_message('Matching entities to diseases in database ...')
        for entity in entities: # matching entities
            search_results = search_qdrant(disease_name=entity, limit=1)
            diseases.extend(disease.payload['name'] for disease in search_results)
        return list(set(diseases))
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
    
def recognize_disease_entity(question):
    entities = extract_disease_entity(question)
    if entities is None or entities == []:
        entities = []
        diseases = search_qdrant(question, limit=5)
        entities.extend(entity.payload['name'] for entity in diseases)
    return entities
