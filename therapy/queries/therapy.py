from pydantic import BaseModel
from typing import Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class TherapyIn(BaseModel):
    name: str
    license_information: str
    state: str
    zipcode: int
    picture: str
    specialties: str
    about_me: str
    payment: str
    languages: str


class TherapyOut(BaseModel):
    id: int
    name: str
    license_information: str
    state: str
    zipcode: int
    picture: str
    specialties: str
    about_me: str
    payment: str
    languages: str


class TherapyRepository:
    def create_therapy(self, therapy: TherapyIn) -> Union[TherapyOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO therapy
                            (name,
                            license_information,
                            state,
                            zipcode,
                            picture,
                            specialties,
                            about_me,
                            payment,
                            languages)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            therapy.name,
                            therapy.license_information,
                            therapy.state,
                            therapy.zipcode,
                            therapy.picture,
                            therapy.specialties,
                            therapy.about_me,
                            therapy.payment,
                            therapy.languages,
                        ],
                    )
                    id = result.fetchone()[0]
                    # Return new data
                    old_data = therapy.dict()
                    print("old_dta**************", old_data)
                    return TherapyOut(id=id, **old_data)
                    # return self.vacation_in_to_out(id, vacation)
        except Exception:
            return {"message": "Create did not work"}

    def get_all(self):
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        SELECT * FROM therapy
                        """
                    )
                    print(result)
        except Exception:
            return {"message": "Create did not work"}
