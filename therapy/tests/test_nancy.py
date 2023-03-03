from fastapi.testclient import TestClient
from queries.client import ClientRepository
from main import app


client = TestClient(app)


class EmptyClientRepository:
    def get_all_clients(self):
        return []


class CreateClient:
    def create_client(self, client):
        return {
            "id": 6,
            **client.dict(),
        }


def test_get_all_clients():
    # Arrange
    app.dependency_overrides[ClientRepository] = EmptyClientRepository

    # Act
    response = client.get("/client")

    # Assert
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_create_client():
    # Arrange
    app.dependency_overrides[ClientRepository] = CreateClient

    json = {
        "name": "Alice",
        "city": "Los Angeles",
        "state": "CA",
        "zipcode": 90001,
        "additional_notes": "Some additional notes",
        "account_id": 1,
        "wish_list": ["Hawaii", "Paris", "Tokyo"],
    }

    expected = {
        "id": 6,
        **json,
    }

    # Act
    response = client.post("/client", json=json)

    # Assert
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
