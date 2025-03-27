from pydantic import BaseModel, validator
from fastapi import FastAPI
from answer import get_answer

class QuestionAnswerRequest(BaseModel):
    question: str
    @validator('question')
    def clean_question(cls, v):
        if not v:
            raise ValueError("Question cannot be empty")
        
        v = v.replace('\\', '\\\\')
        v = v.replace('"', '\\"')
        v = v.replace("'", "\\'")
        
        v = v.strip()
        v = ' '.join(v.split())

        return v

app = FastAPI(
    title="KG-Filter API",
    description="APIs to answer biomedical questions using SPOKE and LLM",
    version="1.0.0"
)

@app.post("/biomedical-response/")
async def generate_biomedical_response(request: QuestionAnswerRequest):
    question = request.question
    answer = get_answer(question=question)
    print('answer',answer)
    return answer.content

@app.get("/")
def read_root():
    return {"message": "oke"}
