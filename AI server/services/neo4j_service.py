from neo4j import GraphDatabase
import os
from dotenv import load_dotenv
import json
from services.notification_service import send_message

load_dotenv()

NEO4J_URI = os.getenv('NEO4J_URI')
NEO4J_USERNAME = os.getenv('NEO4J_USERNAME')
NEO4J_PASSWORD = os.getenv('NEO4J_PASSWORD')

driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USERNAME, NEO4J_PASSWORD))

def create_nodes_and_relationships(tx, row):
    source_type = row['source_type']
    target_type = row['target_type']

    tx.run(f"""
        MERGE (source:{source_type} {{id: $source_id, name: $source_name, type: $source_type}})
    """, source_id=row['source'], source_name=row['source_name'], source_type=source_type)
    
    # Node Target
    tx.run(f"""
        MERGE (target:{target_type} {{id: $target_id, name: $target_name, type: $target_type}})
    """, target_id=row['target'], target_name=row['target_name'], target_type=target_type)

    # Serialize non-primitive types like dictionaries into strings
    evidence = json.dumps(row['evidence']) if isinstance(row['evidence'], dict) else row['evidence']
    context_with_edge = json.dumps(row['context_with_edge']) if isinstance(row['context_with_edge'], dict) else row['context_with_edge']

    # Create relationship between source and target with properties
    tx.run("""
        MATCH (source {id: $source_id})
        MATCH (target {id: $target_id})
        MERGE (source)-[r:RELATIONSHIP_TYPE {type: $edge_type}]->(target)
        SET r.provenance = $provenance,
            r.evidence = $evidence,
            r.predicate = $predicate,
            r.context = $context,
            r.context_with_edge = $context_with_edge
    """, source_id=row['source'], target_id=row['target'], edge_type=row['edge_type'],
         provenance=row['provenance'], evidence=evidence, predicate=row['predicate'],
         context=row['context'], context_with_edge=context_with_edge)
    
def save_df_neo4j(df):
    with driver.session() as session:
        for _, row in df.iterrows():
            session.write_transaction(create_nodes_and_relationships, row)

def getNeo4JGraph(result):
    if not result.peek():
        return []
    
    result_path = []
    for record in result:
        # print('record',record)
        source = dict(record['source'].items())
        target = dict(record['target'].items())
        relationship = dict(record['r'].items())

        # Xử lý source node
        if source['type'] == 'Disease':
            # Thêm identifier vào tên bệnh nếu có
            # print(source,'source')
            if 'identifier' in source:
                head_entity = f"Disease {source['name']}, which has disease ontology identifier {source['identifier']},"
            else:
                head_entity = f"Disease {source['name']}"
        else:
            head_entity = f"{source['name']}"

        # Xử lý target node
        if target['type'] == 'Disease':
            # Thêm identifier vào tên bệnh nếu có
            if 'identifier' in target:
                end_entity = f"Disease {target['name']}, which has disease ontology identifier {target['identifier']}, provenance {relationship['provenance']}"
            else:
                end_entity = f"Disease {target['name']}"
        else:
            end_entity = f"{target['name']}"

        predicate = relationship['predicate'].lower()
        
        neighbor_based_path = [head_entity, predicate, end_entity]
        result_path.append(neighbor_based_path)
    return result_path


def search_neighbors_neo4j(node_name, relationships=None):
    if isinstance(node_name, tuple):
        node_name = node_name[0]
    elif hasattr(node_name, 'point'):
        node_name = str(node_name.point)
    
    node_name = str(node_name)
    # print("Processing node:", node_name)
    
    relationship_condition = ""
    if relationships:
        relationship_types = [f"r.predicate = '{rel}'" for rel in relationships]
        relationship_condition = f" AND ({' OR '.join(relationship_types)})"
    
    query = f"""
    MATCH (source)-[r]->(target)
    WHERE (source:Disease OR target:Disease)
    AND (source.name = $node_name OR target.name = $node_name)
    {relationship_condition}
    RETURN source, target, r
    """
    # print('Query:', query)
    
    with driver.session() as session:
        try:
            result = session.run(query, node_name=node_name)
            graph = getNeo4JGraph(result)
            return graph
        except Exception as e:
            print(f"Error executing query: {e}")
            return []

def explore_subgraph_evidence(list_node_names, relationships=None):
    send_message('Exploring evidence graphs from Neo4j ...')
    neighbor_based_subgraphs = []
    for node_name in list_node_names:
        neighbor_graph = search_neighbors_neo4j(node_name, relationships)
        neighbor_based_subgraphs.append([neighbor_graph,node_name])
    
    return {
        'neighbor_based_subgraphs': neighbor_based_subgraphs
    }  