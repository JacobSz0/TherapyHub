from queries.pool import pool
from pydantic import BaseModel
from typing import List, Union


class Error(BaseModel):
    message: str

class AccountIn(BaseModel):
    username: str
    email: str
    password: str
    role_id: int
   
class Account(AccountIn):
    id:int

class AccountOut(BaseModel):
    id: int
    username: str
    email: str
    role_id: int
    
class AccountOutWithPassword(AccountOut):
    hashed_password: str

class RoleIn(BaseModel):
    role: str

class RoleOut(BaseModel):
    id: int
    role: str

class DuplicateAccountError(ValueError):
    pass

    

class AccountQueries:
    def create(self, info: AccountIn, hashed_password: str,
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO accounts
                    (
                        username,
                        email,
                        hashed_password,
                        role_id
                    )
                    VALUES
                    (%s, %s, %s, %s)
                    RETURNING id
                    """,
                    [info.username, info.email, hashed_password, info.role_id],
                )
                id = result.fetchone()[0]
                # Return new data
                old_data = info.dict()
                return AccountOut(id=id, **old_data)
    
    def get_one_account(self, username: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                SELECT id, username, email, hashed_password, role_id
                FROM accounts
                WHERE username = %s
                """,
                    [username],
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return record

    # def get_all_accounts(self) -> Union[Error, List[AccountOut]]:
    #     with pool.connection() as conn:
    #         with conn.cursor() as cur:
    #             cur.execute(
    #                 """
    #             SELECT id, username, email, hashed_password, role_id
    #             FROM accounts
    #             """
    #             )
    #             results =[
    #                 AccountOut(id=row[0], username=row[1], email=row[2], role_id=[3])
    #                 for row in cur.fetchall()
    #             ]
    #             return results
        

    def delete(self, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                    DELETE FROM accounts
                    WHERE id = %s
                    """,
                        [id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def account_in_out(self, id: int, account: AccountIn):
        data = account.dict()
        return AccountOut(id=id, **data)

    def record_in_out(self, record):
        return AccountOut(
            id=record[0],
            username=record[1],

        )


class RoleQueries:
    def create(self, role: RoleIn) -> RoleOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO roles
                    (
                        role
                    )
                    VALUES
                    (%s)
                    RETURNING id;
                    """,
                    [role.role],
                )
                id = result.fetchone()[0]
                return self.role_in_out(id, role)
    def roles(self) -> Union[List[RoleOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                        id,
                        role
                        FROM roles
                        """
                    )
                    return [self.records_in_out(record) for record in result]
        except Exception:
            return {"message": "Could not get all roles"}

    def delete(self, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM roles
                        WHERE id = %s
                        """,
                        [id],
                    )
                    return True
        except Exception:
            return False

    def role_in_out(self, id: int, role: RoleIn):
        data = role.dict()
        return RoleOut(id=id, **data)

    def records_in_out(self, record):
        return RoleOut(
            id=record[0],
            role=record[1],
        )








