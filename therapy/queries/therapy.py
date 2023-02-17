from pydantic import BaseModel
from typing import Union, List, Optional
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
                    return [TherapyOut(id=record[0], name=record[1],
                    license_information=record[2], state=record[3],
                    zipcode=record[4], picture=record[5],
                    specialties=record[6], about_me=record[7], payment=record[8],
                    languages=record[9]) for record in db]
        except Exception:
            return {"message": "Create did not work"}


class ClientIn(BaseModel):
    name: str
    city: str
    state: str
    zipcode: int
    additional_notes: str



class ClientOut(BaseModel):
    id: int
    name: str
    city: str
    state: str
    zipcode: int
    additional_notes: str


class ClientRepository:
    def create_client(self, client: ClientIn) -> Union[ClientOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO client
                            (name,
                            city,
                            state,
                            zipcode,
                            additional_notes)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            client.name,
                            client.city,
                            client.state,
                            client.zipcode,
                            client.additional_notes,
                        ],
                    )
                    id = result.fetchone()[0]
                    # Return new data
                    old_data = client.dict()
                    print("old_dta**************", old_data)
                    return ClientOut(id=id, **old_data)
                    # return self.vacation_in_to_out(id, vacation)
        except Exception:
            return {"message": "Create did not work"}

    def get_all_clients(self) -> Union[Error, List[ClientOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        SELECT * FROM client
                        """
                    )
                    return [ClientOut(id=record[0],
                    name=record[1], city=record[2],
                    state=record[3], zipcode=record[4],
                    additional_notes=record[5]) for record in db]
        except Exception:
            return {"message": "Create did not work"}


    def get_one_client(self, client_id: int) -> Optional[ClientOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                        , name
                        , city
                        , state
                        , zipcode
                        , additional_notes
                        FROM client
                        WHERE id = %s
                        """,
                        [client_id]
                    )
                    record = result.fetchone()
                    return ClientOut(
                        id=record[0],
                        name=record[1],
                        city=record[2],
                        state=record[3],
                        zipcode=record[4],
                        additional_notes=record[5],
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not view that client"}
