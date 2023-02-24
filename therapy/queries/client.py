from pydantic import BaseModel
from typing import Union, List, Optional
from queries.pool import pool


class Error(BaseModel):
    message: str

class ClientIn(BaseModel):
    name: str
    city: str
    state: str
    zipcode: int
    additional_notes: str
    account_id: int
    wish_list: list



class ClientOut(BaseModel):
    id: int
    name: str
    city: str
    state: str
    zipcode: int
    additional_notes: str
    account_id: int
    wish_list: list



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
                            additional_notes,
                            account_id,
                            wish_list)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            client.name,
                            client.city,
                            client.state,
                            client.zipcode,
                            client.additional_notes,
                            client.account_id,
                            client.wish_list
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
                    additional_notes=record[5], account_id=record[6], wish_list=record[7]) for record in db]
        except Exception:
            return {"message": "Can't get list"}


    def update_client(self, client_id: int, client: ClientIn) -> Union[ClientOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE client
                        SET name = %s
                            , city = %s
                            , state = %s
                            , zipcode = %s
                            , additional_notes = %s
                            , account_id = %s
                            , wish_list = %s
                        WHERE id = %s
                        """,
                        [
                            client.name,
                            client.city,
                            client.state,
                            client.zipcode,
                            client.additional_notes,
                            client.account_id,
                            client.wish_list,
                            client_id,
                        ]
                    )
                    old_data = client.dict()
                    return ClientOut(id=client_id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not get client"}

    def get_one_client(self, client_id: int) -> Optional[ClientOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
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
                        account_id=record[6],
                        wish_list=record[7]
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not view that client"}

    def delete_client(self, client_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM client
                        WHERE id = %s
                        """,
                        [client_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False
