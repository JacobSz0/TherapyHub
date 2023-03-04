from fastapi.testclient import TestClient
from queries.therapy import TherapyRepository
from main import app


client = TestClient(app)


class EmptyTherapyRepository:
    def get_all(self):
        return []


class CreateTherapist:
    def create_therapy(self, therapy):
        result = {
                "id": 6,
                "name": "kamron",
                "license_information": "LMFT 124629",
                "city": "Los Angeles",
                "state": "Ca",
                "zipcode": 91343,
                "picture": "string",
                "specialties": [
                    "Anxiety",
                    "Depression",
                    "Trauma"
                ],
                "about_me": "I am a therapist",
                "payment": [
                    "Cash",
                    "Anthem"
                ],
                "languages": "english",
                "email": "kamron@yahoo.com",
                "phone": "5555555555",
                "account_id": 1
        }
        result.update(therapy)
        return result


def test_get_all_therapists():

    # Arrange

    app.dependency_overrides[TherapyRepository] = EmptyTherapyRepository

    response = client.get("/therapy")

    # Act

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []

    # Assert


def test_create_therapy():
    app.dependency_overrides[TherapyRepository] = CreateTherapist

    json = {
        "name": "kamron",
        "license_information": "LMFT 124629",
        "city": "Los Angeles",
        "state": "Ca",
        "zipcode": 91343,
        "picture": "string",
        "specialties": [
            "Anxiety", "Depression", "Trauma"
        ],
        "about_me": "I am a therapist",
        "payment": [
            "Cash", "Anthem"
        ],
        "languages": "english",
        "email": "kamron@yahoo.com",
        "phone": "5555555555",
        "account_id": 1
    }

    expected = {
        "id": 6,
        "name": "kamron",
        "license_information": "LMFT 124629",
        "city": "Los Angeles",
        "state": "Ca",
        "zipcode": 91343,
        "picture": "string",
        "specialties": [
            "Anxiety",
            "Depression",
            "Trauma"
        ],
        "about_me": "I am a therapist",
        "payment": [
            "Cash",
            "Anthem"
        ],
        "languages": "english",
        "email": "kamron@yahoo.com",
        "phone": "5555555555",
        "account_id": 1
    }

    response = client.post("/therapy", json=json)

    app.dependency_overrides = {}

    assert response.status_code == 200

    assert response.json() == expected


class GetOneTherapist:
    def get_one_therapist(self, therapy_id):
        therapy_id = 6
        return {
            "id": therapy_id,
            "name": "kamron",
            "license_information": "LMFT 124629",
            "city": "Los Angeles",
            "state": "Ca",
            "zipcode": 91343,
            "picture": "string",
            "specialties": [
                "Anxiety",
                "Depression",
                "Trauma"
            ],
            "about_me": "I am a therapist",
            "payment": [
                "Cash",
                "Anthem"
            ],
            "languages": "english",
            "email": "kamron@yahoo.com",
            "phone": "5555555555",
            "account_id": 1
        }


def test_get_one_therapist():

    app.dependency_overrides[TherapyRepository] = GetOneTherapist

    expected = {
        "id": 6,
        "name": "kamron",
        "license_information": "LMFT 124629",
        "city": "Los Angeles",
        "state": "Ca",
        "zipcode": 91343,
        "picture": "string",
        "specialties": [
            "Anxiety",
            "Depression",
            "Trauma"
        ],
        "about_me": "I am a therapist",
        "payment": [
            "Cash",
            "Anthem"
        ],
        "languages": "english",
        "email": "kamron@yahoo.com",
        "phone": "5555555555",
        "account_id": 1
    }

    response = client.get("/therapy/6")

    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
