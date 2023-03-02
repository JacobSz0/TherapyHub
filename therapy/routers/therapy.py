from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.therapy import (
    TherapyIn,
    TherapyOut,
    TherapyRepository,
    Error,
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


@router.get("/therapy/{therapy_id}", response_model=Optional[TherapyOut])
def get_one_therapist(
    therapy_id: int,
    response: Response,
    repo: TherapyRepository = Depends(),
) -> TherapyOut:
    therapy = repo.get_one_therapist(therapy_id)
    if therapy is None:
        response.status_code = 404
    return therapy


@router.put("/therapy/{therapy_id}", response_model=Union[TherapyOut, Error])
def update_therapy(
    therapy_id: int,
    therapy: TherapyIn,
    repo: TherapyRepository = Depends(),
) -> Union[Error, TherapyOut]:
    return repo.update_therapy(therapy_id, therapy)


@router.delete("/therapy/{therapy_id}", response_model=bool)
def delete_therapy(
    therapy_id: int,
    repo: TherapyRepository = Depends(),
) -> bool:
    return repo.delete_therapy(therapy_id)


@router.get("/therapistacc", response_model=Optional[TherapyOut])
def get_therapist_by_account_id(
    account_id: int,
    response: Response,
    repo: TherapyRepository = Depends(),
) -> TherapyOut:
    therapist = repo.get_therapist_by_account_id(account_id)
    if therapist is None:
        response.status_code = 404
    return therapist
