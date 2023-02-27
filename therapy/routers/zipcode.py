from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
import requests, json

router = APIRouter()

@router.post("/zipcode")
def zipcode_request(zip_code, radius):
    headers = {
        "apikey": "b83b94c0-b214-11ed-96d0-09ef0e38d573"}
    params = (
        ("code",zip_code),
        ("radius",radius),
        ("country","us"),
    )

    response = requests.get('https://app.zipcodebase.com/api/v1/radius', headers=headers, params=params)
    zipcode_list=[]
    zip=response.text
    zip=json.loads(zip)
    zip=zip["results"]
    for i in zip:
        zipcode_list.append(i["code"])
    print(zipcode_list)
    zipcode_list=json.dumps(zipcode_list)
    return zipcode_list
