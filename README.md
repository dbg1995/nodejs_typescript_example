# Project structure
![danh](https://user-images.githubusercontent.com/30023917/96204809-71dd4a80-0f8f-11eb-88b0-2d8ef05ab8f9.jpg)

# Description
| Folder | Description |
|------|---------|
| .vscode | .vscode directory contains settings for the visual code editor |
|  dist/  the folder that has the output from the compiler |
| node_modules/ | the folder containing the packages that the app and dev tools require |
| src/ | the folder containing the source code files that will be compiled by the TypeScript compiler |
| test/ | the folder containing all unit test for the source code|
| .env.example | examples of environment variables used when running the project |
| .prettierrc, .eslintrc.js | the configuration for the eslint tool |
| docker-compose.yml | a fille containing the script to run project with docker, but I just write script to run mongodb because I have more time |
| jestconfig.json | Jest's configuration can be defined in the jestconfig.json |
| package.json/ |  the folder containing the top-level package dependencies for a project |
| package_lock.json/ | a file containing the complete list of package dependencies of a project |
| tsconfig.json, tsconfig.build.json | a file having the config settings of the TypeScript compiler |

# Installation
- Docker
    - Install: https://docs.docker.com/engine/install/ubuntu/
- NPM
    - Install: https://github.com/nvm-sh/nvm#install--update-script
- Node
    - Install: https://nodejs.org/en/download/package-manager/#nvm

# Preparation
```
# create .env file and update the correct content
$ cp .env.example .env 

# run database
$ docker-compose up -d mongo
```

# Compile the source code
```
$ npm run build
```

# Running the app
```
# debug mode
$ npm run start:debug

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Test
```
#  debug mode
$ npm run test:debug
```

# Lint
```
# just checking
$ npm run lint

# check and auto fix
$ npm run lint:fix
```

