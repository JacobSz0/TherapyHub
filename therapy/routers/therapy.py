from fastapi import APIRouter, Depends
from typing import Union
from queries.therapy import TherapyIn, TherapyOut, TherapyRepository, Error

router = APIRouter()


@router.post("/therapy", response_model=Union[TherapyOut, Error])
def create_therapy(therapy: TherapyIn, repo: TherapyRepository = Depends()):
    print("therapy", therapy)
    return repo.create_therapy(therapy)


@router.get("/therapy")
def get_all(
    repo: TherapyRepository = Depends(),
):
    return repo.get_all()
