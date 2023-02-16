from fastapi import FastAPI
from routers import therapy


app = FastAPI()
app.include_router(therapy.router)
