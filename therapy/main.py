from fastapi import FastAPI
from routers import therapy, client


app = FastAPI()
app.include_router(therapy.router)
app.include_router(client.router)
