from fastapi.testclient import TestClient
from queries.therapy import TherapyRepository
from main import app


client = TestClient(app)


class UpdateTherapist:
    def update_therapy(self, therapy_id, therapy):
        therapy_id = 6
        return {
            "id": therapy_id,
            **therapy.dict(),
        }


def test_update_therapy():

    app.dependency_overrides[TherapyRepository] = UpdateTherapist

    json = {
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

    expected = {
        "id": 6,
        **json,
    }

    response = client.put("/therapy/6", json=json)

    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
