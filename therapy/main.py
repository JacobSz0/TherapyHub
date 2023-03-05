from fastapi import FastAPI
from routers import therapy, client, accounts, zipcode
from routers.authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
import os


app = FastAPI()
app.include_router(therapy.router)
app.include_router(client.router)
app.include_router(accounts.router)
app.include_router(zipcode.router)
app.include_router(authenticator.router)

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", "REACT_APP_THERAPYHUB_API_HOST"),
    'http://localhost:8090'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
