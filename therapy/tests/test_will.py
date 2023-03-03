from fastapi.testclient import TestClient
from queries.accounts import RoleQueries
from main import app


client = TestClient(app)


class EmptyRoleRepository:
    def roles(self):
        return []


class CreateRole:
    def create(self, role):
        return {
            "id": 1,
            **role.dict(),
        }


def test_get_all_roles():
    # Arrange
    app.dependency_overrides[RoleQueries] = EmptyRoleRepository

    # Act
    response = client.get("/role")

    # Assert
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_create_role():
    # Arrange
    app.dependency_overrides[RoleQueries] = CreateRole

    json = {
        "role": "TESTER",
    }

    expected = {
        "id": 1,
        "role": "TESTER",
    }

    # Act
    response = client.post("/role", json=json)

    # Assert
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
