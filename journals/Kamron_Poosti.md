## February 9, 2023

Today, I worked on:
Connecting PgAdmin with the therapy and account systems, and creating a new endpoint for posts.


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


## February 23, 2023

Today, we began working on our respective ends. I Created a logo for our home page. Did some research on how to create search bara and filter the search. I also began working on the therapist list view. Where I was able to successfully pull my data from the backend to the front end. As a team we discussed making changes to our program and explored possibly combining our tables or adding two tables to a single sign up form. Tomorrow, I plan to continue to work on the list view.


## February 24, 2023

Today we continued to work on our respective ends. I was able to complete the therapist list view up until implementing a filter to narrow down the list. As a team we continued to work on authentication.


## February 27, 2023

Today I working on implementing our 3rd party api into the home-page and the therapist list page to filter the therapists by a radius of the inputted zipcode. I also began working on creating an additional filter drop down for the therapist list view. I managed to create the drop down but it does not have any functionality other than a drop down with a list of specialties and payments.


## February 28, 2023

Today I removed the drop down for additional filters because it was not working properly. I spent majority of the day updating our therapy table and create therapy form. I had to rebuild my docker, and volumes.


## March 1, 2023

Today I continued to work on updating the create therapy form. I was able to get the new forms data to show up on the front end. I was able to get the form working with 2 dropdown multiselects for specialties and payments. I also updated the therapist list page to include the additional filter for list of specialties and payments. The therapist list page is now fully functional.


## March 2, 2023

I made some small edits to the therapist list page, removed some unused code. I added a “learn more button” to the therapist cards in the Wishlist. I worked with my group to troubleshoot some blockers a team member was having. As a group we worked on deployment and unit tests. I created a unit test for get therapists and create a therapist.
