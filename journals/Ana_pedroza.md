## February 15, 2023

Today, I worked on:

* Connecting PgAdmin with the therapy and account systems, and creating a new endpoint for posts.


As a team, we created our first post endpoint and verified it was correctly stored in the Pg database. We also completed our first merge and pull, but encountered some errors in the pipeline. To address this, we decided to comment out part of the GitLab-CI and ran some flake8 tests to ensure the formatting was correct.

In addition, we created the issues in GitLab and plan to assign points tomorrow.

## February 16, 2023

Today, I worked on;

* fix bug in package.json.

I worked with Rosheen to fix this bug: "Error: Cannot find module ‘/app/npm install -g npm@9.5.0’therapy-hub-ghi-1". We spent almost all afternoon on it. We tried deleting the repo and docker container to fix the problem, and made some changes in the Docker YAML. However, none of these attempts worked. We eventually solved the problem by reinstalling the npm directly in the GHI file and adding "start": "node ./windows-setup.js && ./node_modules/.bin/react-scripts start" to the package.json file.

 

