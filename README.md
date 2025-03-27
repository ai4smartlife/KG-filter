#install environment
pip install -r requirements.txt

#RUN from main folder
linux:
uvicorn main:app --reload --port 8085 
window:
python -m uvicorn main:app --reload

(change port if necessary)

#send json:
{
  "question": "string question"
}

or from terminal

curl -X 'POST' \
  'http://127.0.0.1:8085/biomedical-response/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "question": "change your question"
}'

