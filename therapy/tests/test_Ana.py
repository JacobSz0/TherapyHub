from fastapi.testclient import TestClient
from queries.client import ClientRepository
from main import app

client = TestClient(app)


class GetOneClient:
    def get_one_client(self, client_id):
        client_id = 6
        return {
            "id": client_id,
            "name": "Alice",
            "city": "Los Angeles",
            "state": "CA",
            "zipcode": 90001,
            "additional_notes": "Some additional notes",
            "account_id": 1,
            "wish_list": ["Andres", "Paris", "Tokyo"],
        }


class UpdateClient:
    def update_client(self, client_id, client):
        client_id = 6
        return {
            "id": client_id,
            **client.dict(),
        }


def test_update_client():
    # Arrange
    app.dependency_overrides[ClientRepository] = UpdateClient

    json = {
        "name": "Alice",
        "city": "Los Angeles",
        "state": "CA",
        "zipcode": 90001,
        "additional_notes": "Some additional notes",
        "account_id": 1,
        "wish_list": ["Andres", "Paris", "Tokyo"],
    }

    expected = {
        "id": 6,
        **json,
    }

    # Act
    response = client.put("/client/6", json=json)

    # Assert
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


def test_get_one_client():

    app.dependency_overrides[ClientRepository] = GetOneClient

    expected = {
        "id": 6,
        "name": "Alice",
        "city": "Los Angeles",
        "state": "CA",
        "zipcode": 90001,
        "additional_notes": "Some additional notes",
        "account_id": 1,
        "wish_list": ["Andres", "Paris", "Tokyo"],
    }

    # Act
    response = client.get("/client/6")

    # Assert
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
