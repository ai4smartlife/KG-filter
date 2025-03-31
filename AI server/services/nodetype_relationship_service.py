from langchain.schema import HumanMessage, SystemMessage
from utils.get_llm import gemini_2_flash, chatgroq
from utils.get_env_variables import EXPLORE_KG_NODETYPES, EXPLORE_KG_RELATIONSHIP
from utils.constant import NODE_TYPES, RELATIONSHIP_TYPES
from services.notification_service import send_message

def get_nodes_in_question(question, llm=gemini_2_flash):
    # send_message('Extracting relevant node types from question ...')
    # print('Question: ',question)
    messages = [
        (
            SystemMessage(EXPLORE_KG_NODETYPES)
        ),
        (
            HumanMessage(question)
        ),
    ]
    messagesai_msg = llm.invoke(messages)
    nodes_in = [node for node in NODE_TYPES if (messagesai_msg.content.find(node) != -1)]

    return nodes_in

def get_relationship_in_question(nodes_in, llm=chatgroq):
    # send_message('Extracting relevant relationships from question ...')
    nodes_in_str = ", ".join(nodes_in)

    messages_rela = [
    (
        SystemMessage(EXPLORE_KG_RELATIONSHIP)
    ),
    (
        HumanMessage(nodes_in_str)
    ),
    ]

    res_relationship = llm.invoke(messages_rela)
    rela_in = [rela[1] for rela in RELATIONSHIP_TYPES if (res_relationship.content.find(rela[1]) != -1)]
    return rela_in