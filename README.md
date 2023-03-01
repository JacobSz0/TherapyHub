## TherapyHub

Created by:
* Kamron Poosti
* Nancy Chavez
* Ana Maria Pedroza
* Will Howe
* Jacob Sullenszino

## Project Description
 TherapyHub is a comprehensive, user-friendly web-application that streamlines the research process by providing a one-stop-shop for finding the perfect therapist, from searching by location to narrowing down your search by therapist specialty.

 * TherapyHub is a web-application that allows users to find a therapist that fits their needs and it allows therapist a place to promote themselves.
 * Users can sign up, log in, and log out of an account.
 * Logged in users can create and view a therapist wishlist.

## Initializing the Project
1. Fork and clone this project using this link: https://gitlab.com/team-swank/therapy-hub
2. Copy and clone HTTPS link into a directory of your choice
3. Open a command terminal and cd into your chosen directory
4. Run `docker volume create postgres-data`
5. Run `docker volume create pg-admin`
6. Run `docker-compose build`
7. Run `docker-compose up`
8. Ensure all containers are running properly in your Docker Desktop
9. To view app in your browser, navigate to: http://localhost:3000
10. To access all the FastAPI endpoints, navigate to:http://localhost:8090/docs

## Functionality
* When clients access the app, they will be able to sign up for an account.
* When therapists access the app, they will be able to sign up for an account.
* Users will have the ability to log in, logout, and create a wishlist.

## Testing
* Run `python -m pytest`
