from services.disease_service import recognize_disease_entity
from services.nodetype_relationship_service import get_nodes_in_question, get_relationship_in_question
from services.neo4j_service import explore_subgraph_evidence
from utils.constant import SELF_RELATIONSHIPS
from langchain_core.prompts import PromptTemplate
from utils.get_env_variables import *
from utils.get_llm import gemini_2_flash, chatgpt4o, deepseek, chatgpt4tubo
# from services.notification_service import send_message

def get_similar_diseases(sub_graphs):
    # send_message('Exploring similar diseases to the extracted diseases entities ...')
    triplets = []
    for neighbor_based_subgraph in sub_graphs['neighbor_based_subgraphs']:
        triplets.extend( 
            [
                [triplet, neighbor_based_subgraph[1]]  
                for triplet in neighbor_based_subgraph[0]
            ]
        )

    ads = list(set((disease[0][2], disease[1]) for disease in triplets))  # Use tuples instead of lists

    result = [(disease[0].replace("Disease ", ""),disease[1]) for disease in ads]
    return result

def get_all_neighbor_graph(sub_graphs):
    triplets = []
    for neighbor_based_subgraph in sub_graphs['neighbor_based_subgraphs']:
        triplets.extend(  # Use extend instead of append to flatten the list
            [
                [triplet, neighbor_based_subgraph[1]]  
                for triplet in neighbor_based_subgraph[0]            
            ]
        )
    # print('triplets',triplets)
    for item in triplets:
    # Lấy phần tử đầu tiên (mảng con) và phần tử thứ hai (tuple)
        sub_array = item[0]
        replacement_tuple = item[1]

        # Kiểm tra và thay thế giá trị trong mảng con
        if sub_array[0] == f'{replacement_tuple[0]}':
            sub_array[0] = f'{replacement_tuple[1]}'
    result = [triplet[0] for triplet in triplets]
    return result

def fetch_final_answer(question, context, llm=gemini_2_flash):
    prompt_template = PromptTemplate.from_template(FINAL_ANSWER_PROMPT_TEMPLATE)
    formatted_prompt = prompt_template.invoke({"question": question, "context": context})
    response = llm.invoke(formatted_prompt)
    return response

def get_answer(question):
    entities = []
    entities = recognize_disease_entity(question)
    print('entities', entities)
    # send_message('entities: '+entity for entity in entities)
    list_nodes_in = get_nodes_in_question(question)
    print('list_nodes_in',list_nodes_in)
    # send_message('list nodes: '+list_node_in for list_node_in in list_nodes_in)
    relationships = get_relationship_in_question(list_nodes_in)
    print('relationships',relationships)
    # send_message('relationships: ' +relationship for relationship in relationships)
    subgraphs = explore_subgraph_evidence(list_node_names=entities, relationships=relationships)
    print('subgraphs',subgraphs)
    neighbor_based_subgraphs = get_all_neighbor_graph(subgraphs)
    # print('neighbor_based_subgraphs',neighbor_based_subgraphs)
    similar_diseases = get_similar_diseases(sub_graphs=explore_subgraph_evidence(list_node_names=entities, relationships=SELF_RELATIONSHIPS))
    print('similar_diseases',similar_diseases)
    # send_message('similar_diseases: '+similar_disease for similar_disease in similar_diseases)
    subgraphs_similar_diseases = explore_subgraph_evidence(list_node_names=similar_diseases,relationships=relationships)
    print('subgraphs_similar_diseases',subgraphs_similar_diseases)
    # send_message('Mapping the relationships to the similar diseases ...')
    neighbor_based_subgraphs.extend(get_all_neighbor_graph(subgraphs_similar_diseases))
    result = [' '.join(neighbor_based_subgraph) for neighbor_based_subgraph in neighbor_based_subgraphs]
    result = list(set(result))

    # send_message('Gathering all the context ...')
    context = '. '.join(result)
    print(context,'context')
    output_all = fetch_final_answer(question=question, context=context, llm=gemini_2_flash)
    return output_all
