from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


# Arrange/Act


def do_zipcode(zip_code, radius):

    response = client.post(f"zipcode?zip_code={zip_code}&radius={radius}")
    print("DO ZIPCODE ***********", response)
    return response


# Assert


def test_zipcode():
    app.dependency_overrides = {}
    response = do_zipcode(98133, 5)
    print("DO RESPONSE *&*&*&*&*&*&*&*&*", response)
    expected = "98177"
    assert response.status_code == 200
    assert expected in response.json()
