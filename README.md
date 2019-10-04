# lolapi

### Contents
1. [Local Hosting With Docker](#local-hosting-with-docker)
2. [Local Hosting Without Docker](#local-hosting-without-docker)

## Local Hosting With Docker

* Download [Docker Desktop](https://www.docker.com/products/docker-desktop)
    * This will include support for `docker` and `docker-compose` commands
* From a command terminal, navigate to the project's top-level firectory and run `docker-compose up` to execute all services.
OR
Run `docker-compose run --rm {SERVICE_NAME}` to run just one of them.  In this project, `docker-compose run --rm dev` is the only one configured.
    * Note, the Docker config includes a script `npm run dev`.  The "dev" here corresponds to the `package.json` "dev" script, which performs two actions.
        1. Call `npm run build`, which refers to the "build" script that ensures a `.env` file exists and all modules are installed.
        2. Run `nodemon`, which monitors changes to project files and updates the locally-hosted app without having to restart the service.
* To apply new dependencies via the Docker image's Node installation:
    * Run `docker-compose run dev sh`.  This will enter a command-shell within the docker image itself.
    * Execute `npm install {PACKAGE_NAME} --save` within that shell.

## Local Hosting Without Docker

* Simply execute `npm run dev`.  However loses the benefit of the `docker-compose.yml` configurations that instruct your system what resources to pull in from the official Docker repositories to establish an ecosystem supportive of your app, and assumes you've already manually installed them.