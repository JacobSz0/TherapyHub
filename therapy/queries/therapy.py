from pydantic import BaseModel
from typing import Union, List, Optional
from queries.pool import pool


class Error(BaseModel):
    message: str


class TherapyIn(BaseModel):
    name: str
    license_information: str
    city: str
    state: str
    zipcode: int
    picture: str
    specialties: list
    about_me: str
    payment: list
    languages: str
    email: str
    phone: str
    account_id: int


class TherapyOut(BaseModel):
    id: int
    name: str
    license_information: str
    city: str
    state: str
    zipcode: int
    picture: str
    specialties: list
    about_me: str
    payment: list
    languages: str
    email: str
    phone: str
    account_id: int


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
                            city,
                            state,
                            zipcode,
                            picture,
                            specialties,
                            about_me,
                            payment,
                            languages,
                            email,
                            phone,
                            account_id)
                        VALUES
                            (
                                %s, %s, %s, %s, %s, %s,
                                %s, %s, %s, %s, %s, %s, %s
                                )
                        RETURNING id;
                        """,
                        [
                            therapy.name,
                            therapy.license_information,
                            therapy.city,
                            therapy.state,
                            therapy.zipcode,
                            therapy.picture,
                            therapy.specialties,
                            therapy.about_me,
                            therapy.payment,
                            therapy.languages,
                            therapy.email,
                            therapy.phone,
                            therapy.account_id,
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

    def get_all(self) -> Union[Error, List[TherapyOut]]:
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
                    return [
                        TherapyOut(
                            id=record[0],
                            name=record[1],
                            license_information=record[2],
                            city=record[3],
                            state=record[4],
                            zipcode=record[5],
                            picture=record[6],
                            specialties=record[7],
                            about_me=record[8],
                            payment=record[9],
                            languages=record[10],
                            email=record[11],
                            phone=record[12],
                            account_id=record[13],
                        )
                        for record in db
                    ]
        except Exception:
            return {"message": "Create did not work"}

    def get_one_therapist(self, therapy_id: int) -> Optional[TherapyOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM therapy
                        WHERE id = %s
                        """,
                        [therapy_id],
                    )
                    record = result.fetchone()
                    return TherapyOut(
                        id=record[0],
                        name=record[1],
                        license_information=record[2],
                        city=record[3],
                        state=record[4],
                        zipcode=record[5],
                        picture=record[6],
                        specialties=record[7],
                        about_me=record[8],
                        payment=record[9],
                        languages=record[10],
                        email=record[11],
                        phone=record[12],
                        account_id=record[13],
                    )

        except Exception as e:
            print(e)
            return {"message": "Could not view that therapist"}

    def update_therapy(
        self, therapy_id: int, therapy: TherapyIn
    ) -> Union[TherapyOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE therapy
                        SET name = %s
                            , license_information = %s
                            , city = %s
                            , state = %s
                            , zipcode = %s
                            , picture = %s
                            , specialties = %s
                            , about_me = %s
                            , payment = %s
                            , languages = %s
                            , email = %s
                            , phone = %s
                            , account_id = %s
                        WHERE id = %s
                        """,
                        [
                            therapy.name,
                            therapy.license_information,
                            therapy.city,
                            therapy.state,
                            therapy.zipcode,
                            therapy.picture,
                            therapy.specialties,
                            therapy.about_me,
                            therapy.payment,
                            therapy.languages,
                            therapy.email,
                            therapy.phone,
                            therapy.account_id,
                            therapy_id,
                        ],
                    )
                    old_data = therapy.dict()
                    return TherapyOut(id=therapy_id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not update therapy"}

    def delete_therapy(self, therapy_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DElETE FROM therapy
                        WHERE id = %s
                        """,
                        [therapy_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_therapist_by_account_id(
        self, account_id: int
    ) -> Optional[TherapyOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM therapy
                        WHERE account_id = %s
                        """,
                        [account_id]
                    )
                    record = result.fetchone()
                    return TherapyOut(
                        id=record[0],
                        name=record[1],
                        license_information=record[2],
                        city=record[3],
                        state=record[4],
                        zipcode=record[5],
                        picture=record[6],
                        specialties=record[7],
                        about_me=record[8],
                        payment=record[9],
                        languages=record[10],
                        email=record[11],
                        phone=record[12],
                        account_id=record[13]
                        )

        except Exception as e:
            print(e)
            return {"message": "Could not view that therapist"}
