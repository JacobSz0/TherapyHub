from fastapi import APIRouter, Depends
from typing import Union, List
from queries.therapy import (
    TherapyIn, TherapyOut,
    TherapyRepository, Error, ClientIn, ClientOut, ClientRepository
)

router = APIRouter()


@router.post("/therapy", response_model=Union[TherapyOut, Error])
def create_therapy(therapy: TherapyIn, repo: TherapyRepository = Depends()):
    print("therapy", therapy)
    return repo.create_therapy(therapy)


@router.get("/therapy", response_model=Union[List[TherapyOut], Error])
def get_all(
    repo: TherapyRepository = Depends(),
):
    return repo.get_all()


@router.post("/client", response_model=Union[ClientOut, Error])
def create_client(client: ClientIn, repo: ClientRepository = Depends()):
    print("client", client)
    return repo.create_client(client)


@router.get("/client", response_model=Union[List[ClientOut], Error])
def get_all_clients(
    repo: ClientRepository = Depends(),
):
    return repo.get_all_clients()