
from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.client import ClientIn, ClientOut, ClientRepository, Error

router = APIRouter()

@router.post("/client", response_model=Union[ClientOut, Error])
def create_client(client: ClientIn, repo: ClientRepository = Depends()):
    print("client", client)
    return repo.create_client(client)


@router.get("/client", response_model=Union[List[ClientOut], Error])
def get_all_clients(
    repo: ClientRepository = Depends(),
):
    return repo.get_all_clients()

@router.put("/client/{client_id}", response_model=Union[ClientOut, Error])
def update_client(
    client_id: int,
    client: ClientIn,
    repo: ClientRepository = Depends(),
) -> Union[Error, ClientOut]:
    return repo.update_client(client_id, client)

@router.get("/client/{client_id}", response_model=Optional[ClientOut])
def get_one_client(
    client_id: int,
    response: Response,
    repo: ClientRepository = Depends(),
) -> ClientOut:
    client = repo.get_one_client(client_id)
    if client is None:
        response.status_code = 404
    return client

@router.delete("/client/{client_id}", response_model=bool)
def delete_client(
    client_id: int,
    repo: ClientRepository = Depends(),
) -> bool:
    return repo.delete_client(client_id)

@router.get("/clientacc", response_model=Optional[ClientOut])
def get_client_by_account_id(
    account_id: int,
    response: Response,
    repo: ClientRepository = Depends(),
) -> ClientOut:
    client = repo.get_client_by_account_id(account_id)
    if client is None:
        response.status_code = 404
    return client
