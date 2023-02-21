from fastapi import FastAPI
from routers import therapy, client, accounts
from routers.authenticator import authenticator



app = FastAPI()
app.include_router(therapy.router)
app.include_router(client.router)
app.include_router(accounts.router)
app.include_router(authenticator.router)
