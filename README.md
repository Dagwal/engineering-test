# Quick test

## Introduction

Thanks for using this test. We have created a simple api that deploys in a docker container. 
We've devised some small tasks that will help us guage your fit. 

Please follow the installation instructions carefully and don't spend any more time than allocated in the tasks below, if you run out of time or it is too exhausting please post what you have and we will review it regardless.

## Installation (15 minutes)

### Prerequisites

- docker installed | https://docs.docker.com/get-docker/
- git installed | https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
- WSL2 for windows | https://learn.microsoft.com/en-us/windows/wsl/install
- A database GUI
- NPM | https://docs.npmjs.com/cli/v6/commands/npm-install
- Postman | https://www.postman.com/

### Steps

1. Git clone the repository `git clone https://github.com/sheez/engineering-test.git`
2. `cd` into the engineering-test directory
3. run `docker-compose up -d --force-recreate`  (some versions of docker will use docker compose rather than docker-compose)
4. run `docker exec -it engineering-test_sheez-api_1 npm run seed:run` (sometimes the name is different, check with docker ps)
5. Check that there is data in the database tables (see below for connection details). Also review the api documentation at http://localhost:3001/api
6. Load the postman collection from the root directory 'Engineering.postman_collection.json' and test the api endpoints

#### Connection details
Credentials for your database GUI 

HOST=localhost
PORT=5433
USER=postgres
PASSWORD=postgres
NAME=sheez_api


# Tasks

Your task is to answer some questions and complete the following tasks below - We're looking for solutions that demonstrate passion, effort and knowledge (typescript, caching, testing, state etc.). Send a link with your solution and accompanying notes to engineering@sheez.co.uk or your representative. <b>Please note we can't accept zip files containing solutions, please utilise github, dropbox or google drive.</b>

With all tasks - **please add comments, utilise tests and submit clear instructions on running your solution.**

Task 1 & 2 notes along with anything else you want to say can be placed in `NOTES.md`.

## Task 1 (15 minutes)

 - Review the `sheez_api` database and make notes on the current structure and state of the database. How would you improve it using relational database best practices? We're mainly interested in how you would improve the database theoretically

## Task 2 (10 minutes)

- Brief explanation of the latest practices in your respective field of expertise.

## Task 3 (1 hour)

:warning: Please note that you should just picks the tasks that fit your specialisation e.g. .NET developer should choose `[.Net]` tasks. <i>Do not do all the tasks</i>

The API at localhost:3001 is what you will communicate with. It has 3 entity collections with various CRUD operations. 

However some of the endpoints do fail sometimes and return exceptions or 500 error responses every so often.

<b>Please note we would appreciate Typescript being used.</b>

### **[.Net Only]**

Create a .NET core client service that consumes the api (as seen on http://localhost:3001/api) and actions the api endpoints. This service should handle api failures or bad responses. 


### **[Node Only]**

Create a Node client service that consumes the api (as seen on http://localhost:3001/api) and actions the api endpoints. This service should handle api failures or bad responses. 

An example of a test(s) is expected.


### **[Frontend Only]**

Using your favourite frontend framework please interact with the API and handle potential API failures.


# Thanking you
Please understand we don't expect you too spend too much time on this. We're happy to review whatever you finish at engineering@sheez.co.uk
