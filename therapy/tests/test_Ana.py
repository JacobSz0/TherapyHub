# from fastapi.testclient import TestClient
# from queries.accounts import RoleQueries
# from main import app


# client = TestClient(app)


# class EmptyRoleRepository:
#     def roles(self):
#         return []




# def test_get_all_roles():
#     # Arrange
#     app.dependency_overrides[RoleQueries] = EmptyRoleRepository

#     # Act
#     response = client.get("/role")

#     # Assert
#     app.dependency_overrides = {}
#     assert response.status_code == 200
#     assert response.json() == []
