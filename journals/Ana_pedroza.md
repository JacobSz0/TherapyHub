## February 15, 2023

Today, I worked on:

* Connecting PgAdmin with the therapy and account systems, and creating a new endpoint for posts.


As a team, we created our first post endpoint and verified it was correctly stored in the Pg database. We also completed our first merge and pull, but encountered some errors in the pipeline. To address this, we decided to comment out part of the GitLab-CI and ran some flake8 tests to ensure the formatting was correct.

In addition, we created the issues in GitLab and plan to assign points tomorrow.

## February 16, 2023

Today, I worked on;

* fix bug in package.json.

I worked with Rosheen to fix this bug: "Error: Cannot find module ‘/app/npm install -g npm@9.5.0’therapy-hub-ghi-1". We spent almost all afternoon on it. We tried deleting the repo and docker container to fix the problem, and made some changes in the Docker YAML. However, none of these attempts worked. We eventually solved the problem by reinstalling the npm directly in the GHI file and adding "start": "node ./windows-setup.js && ./node_modules/.bin/react-scripts start" to the package.json file.

## February 17, 2023

Today, I worked on;

* update_therapy and delete therapy.

I worked on the endpoint for updating and deleting therapy instances. Now, we are able to update every instance of therapy and delete them if we choose to do so.


## February 19, 2023

Today, I worked on;

* Accounts, update tables.

I worked on how a therapist or client can login. I created an 'account' table that has a foreign key 'role_id', so we know what type of account it is when the user log in. 


## February 20, 2023

Today, I worked on;

* Authentication

As a team, we tried to fix some bugs in the account creation process. For some reason, we were unable to create a new account. When we added the 'role_id' to the account, we realized that it was missing from the 'get_one_account' query. Now, we are able to create an account, log in, log out, and delete an account. However, we still have some bugs in the 'get_all_accounts' query. We plan to find a solution tomorrow with the help of a SEIR.


## February 21, 2023

Today, I worked on;

* Today, I worked on the monolithic application

During the day, we decided to consolidate the backend by merging all microservices into one. As a result, we deleted the account microservice. However, we encountered some issues with Docker while making these changes. After a couple of hours of troubleshooting with the SIer, we were able to resolve the issues and the container is now working. Also, we divided the work and assigned points to each feature. 


## February 22, 2023

Today, I worked on;

* Firstly, I updated the client table, and secondly, I came up with some ideas on how to implement the wish list table.

Throughout the day, we worked on a way to implement the wish list feature. Additionally, we updated the client table by adding a foreign key account_id, and we also updated the endpoints.


## February 23, 2023

Today, I worked on;

* Today, we connected the back-end with the front-end and created an account signup form..

Today, I learned how to connect the back-end to the front-end and retrieve information from the back-end to display it on the front-end. I realized that we were missing CORS, so I added the CORSMiddleware to the main.py file. In addition, I collaborated with Will to implement an account signup feature in the front-end, allowing new therapists or clients to sign up.


## February 24, 2023

Today, I worked on;

* add information Form.

Today, I worked on implementing a form where a new client can fill out personal information. Once the client fills out the account form, they are redirected to the add information form. I have almost finished the form, but I am having trouble passing a value from the account form to the add information form. I hope I can solve this problem with a SEIR. 


## February 27, 2023

Today, I worked on;

* access to token and decode it.

Today, I worked on accessing and decoding a token. Finally, I was able to successfully access the account_id by implementing authentication in the front end and passing the token value to app.js. With this, I was able to successfully add the value account-id when the client fill out the add information form. 

## February 28, 2023

Today, I worked on;

* create a therapist profile

 I worked on creating a therapist profile. I successfully created the profile and now therapists have access to their detail page. Additionally, I merged our changes to the main branch, ensuring it is up-to-date. I also collaborated with Jacob to implement the 'add to wishlist' button.", we haven't be able to make it work yet. 


 ## March 01, 2023

Today, I worked on;

* update the profile therapist and merge 

 I updated the therapist form to make it look better. I also added a function in the navigation bar so that the therapist can see the "Update" button when they are logged in. As a team, we worked on fixing the Flake8 errors to make the pipeline pass, and we started working on deployment.

  ## March 02, 2023

Today, I worked on;

* Deployment and navigation bar.

 Today, I worked with Jacob on deployment. We were trying to pass the pipeline with the front end. I also spent some time on navigation bar. Additionally, we helped Nancy debug some of her code. She was having trouble displaying the ID for the client. Although we were not able to solve the entire problem, we did make some progress.


  ## March 03, 2023

Today, I worked on;

* unit test and deployment.

 I worked on unit testing and deployment. I also made some changes to the navigation, and we merged our work. 
