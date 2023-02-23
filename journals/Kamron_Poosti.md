## February 9, 2023

Today, I worked on:

* Connecting PgAdmin with the therapy and account systems, and creating a new endpoint for posts.

Today, I worked on:

.
As a team, we created our first post endpoint and verified it was correctly stored in the Pg database. We also completed our first merge and pull, but encountered some errors in the pipeline. To address this, we decided to comment out part of the GitLab-CI and ran some flake8 tests to ensure the formatting was correct.

In addition, we created the issues in GitLab and plan to assign points tomorrow.

## February 16, 2023

As a team we created endpoints for creating and listing all clients. I also created an update client endpoint. I merged my branch to create an update client endpoint.

## February 20, 2023

Today, we worked on;

* Authentication

As a team, we tried to fix some bugs in the account creation process. For some reason, we were unable to create a new account. When we added the 'role_id' to the account, we realized that it was missing from the 'get_one_account' query. Now, we are able to create an account, log in, log out, and delete an account. However, we still have some bugs in the 'get_all_accounts' query. We plan to find a solution tomorrow with the help of a SEIR.

## February 21, 2023

Today, as a team we worked on making merges, trouble shooting issues with merges. We assigned point values to our issues and divided our issues among the team. Tomorrow we will find a solution for the issue of getting all accounts and begin working on our respective ends of the project.

## February 22, 2023
Today, as a team we troubleshooted some merge issues, we troubleshooted the get request for list of accounts. As a team we discussed and identified how to implement our wishlist and foreign keys. As a team we connected our clients table to the authentication. I prepared the react frontend for us to be able to start working on the frontend. 