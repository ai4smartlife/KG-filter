**from AI folder**

# install environment
pip install -r requirements.txt

# setup env
remember to see .env.example

## GROQ_API_KEY and GROQ_API_KEY_1
get groq api key free from https://console.groq.com/keys
we use two GROQ_API_KEY because of preventing the limitation of free key. 

## qdrant setup
  1. create cluster free from https://cloud.qdrant.io/
  2. save QDRANT_URL and QDRANT_API_KEY
  3. change your QDRANT_URL and QDRANT_API_KEY in notebook file: save_diseases_qdrant.ipynb
  4. run save_diseases_qdrant.ipynb to save all nodes to qdrant

## neo4j setup
Two ways:
### neo4j local
  1. Install neo4j Desktop from https://neo4j.com/download/
  2. Config NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD
  3. Import dump file to local database
### neo4j Aura (free deployment)
  1. Register account in https://console-preview.neo4j.io/
  2. Import dump file



# RUN from main folder

_linux_:

uvicorn main:app --reload --port 8085 

_window_:

python -m uvicorn main:app --reload

(change port if necessary)

# send json:

## from fastapi _domain_/docs:

example json:
{
  "question": "string"
}

## OR from terminal

curl -X 'POST' \
  'http://127.0.0.1:8085/biomedical-response/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "question": "change your question"
}'

_replace http://127.0.0.1:8085 with your domain
_
