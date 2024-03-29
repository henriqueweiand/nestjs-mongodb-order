# NestJS-Mongo-Orders

[![Run E2E Tests](https://github.com/henriqueweiand/nestjs-mongodb-order/actions/workflows/run-e2e-tests.yml/badge.svg)](https://github.com/henriqueweiand/nestjs-mongodb-order/actions/workflows/run-e2e-tests.yml)
[![Run Unit Tests](https://github.com/henriqueweiand/nestjs-mongodb-order/actions/workflows/run-unit-tests.yml/badge.svg)](https://github.com/henriqueweiand/nestjs-mongodb-order/actions/workflows/run-unit-tests.yml)

Exercise using MongoDB, NestJS, JWT, Jest. This is a simple aplication that some endpoints require login and some not, and the user can create products and than create and order that has those products.

-   [x] User module
-   [x] Product module
-   [x] Order module
-   [x] Auth module
-   [x] Create indexes
-   [x] Guards module
-   [x] FindMany with Filters
-   [x] 1 example unit and 1 e2e tests
-   [x] Diagram of the solution
-   [x] Github actions to run all the tests
-   [x] Middleware to audit all order creation

## Running locally

1. Instal the dependecies
2. copy .env.example to .env'
3. run `docker-compose up -d`, it will create a Mongo instance
4. run `yarn start:dev`
5. Access `http://localhost:3000/api`

## Modules and relations

![Preview](https://github.com/henriqueweiand/nestjs-mongodb-order/blob/master/assets/modules-view.png)

## Swagger

![Preview](https://github.com/henriqueweiand/nestjs-mongodb-order/blob/master/assets/swagger.png)
