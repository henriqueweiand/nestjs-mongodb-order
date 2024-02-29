# nestjs-mongo-orders

Exercise using MongoDB, NestJS, JWT. This is a simple aplication that some endpoints require login and some not, and the user can create products and than create and order that has those products.

- [x] User module
- [x] Product module
- [x] Order module
- [x] Auth module
- [x] Guards module
- [x] FindMany with Filters
- [ ] Tests
- [ ] Returns any data using lookup
- [ ] Diagram of the solution

## Running locally

1. Instal the dependecies
2. copy .env.example to .env'
3. run `docker-compose up -d`, it will create a Mongo instance
4. run `yarn start:dev`
5. Access `http://localhost:3000/api`

## Diagram of the solution

## Swagger

![Preview](https://raw.githubusercontent.com/henriqueweiand/nestjs-mongodb-order/master/assets/swagger.png)
