from fastapi import APIRouter
import json
import requests
import os

router = APIRouter()


@router.post("/zipcode")
def zipcode_request(zip_code, radius):
    print("----------", os.environ.get("ZIPCODE_API_KEY"))
    headers = {"apikey": os.environ.get("ZIPCODE_API_KEY")}
    params = (
        ("code", zip_code),
        ("radius", radius),
        ("country", "us"),
    )

    response = requests.get(
        "https://app.zipcodebase.com/api/v1/radius",
        headers=headers,
        params=params,
    )
    zipcode_list = []
    zip = response.text
    zip = json.loads(zip)
    zip = zip["results"]
    for i in zip:
        zipcode_list.append(i["code"])
    print(zipcode_list)
    zipcode_list = json.dumps(zipcode_list)
    return zipcode_list
