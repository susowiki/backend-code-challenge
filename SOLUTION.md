# Challenges Coding Exercise Backend [SOLUTION]
I've used NestJS and MongoDB as tools for developing the solution

### Pre-flight checks

You must have installed:

- npm (mine was 7.6.2)
- NodeJS 12 (mine was 12.21.0)
- Docker (mine was 20.10.2)
- Docker compose (mine was 1.25.4)

### How to run
Steps to run this project:

1. Run: ```npm i```
2. To setup mongodb dockerized instance, run: ```docker-compose up -d```
3. To load Pokemon list from json to mongodb, run: ```npm run load-database```
4. To start server at: http://127.0.0.1:3000/, run: ```npm run start```
5. To run unit tests, run: ```npm run test```
6. To run end to end tests, run: ```npm run test:e2e```
7. To check test coverage, run: ```npm run test:cov```

### API Endpoints

* GET /pokemon: Retrieves a list of Pokemons with the given optional filter parameters: 
    * offset: integer
    * limit: integer
    * type: string
    * name: string
    * favorite: boolean
    * sort: string, possible values: id, name, classification, fleeRate, maxCP, maxHP, favorite. Default id
    * order: string, possible values: ASC, DESC. Default ASC
* GET /pokemon/id/{id}: Retrieves a Pokemon with the given id
* GET /pokemon/name/{name}: Retrieves a Pokemon with the given name
* GET /pokemon/types: Retrieves the list of Pokemon Types
* PUT /pokemon/favorite/{id}: Marks a Pokemon as favorite
* PUT /pokemon/unfavorite/{id}: Marks a Pokemon as not favorite

### Technical clarifications
* List endpoints return 404 when no content is found (normally if no data is present in the db)
* GET /pokemon returns 400 when query params format is incorrect
* End to end tests relies on a fresh-loaded database with the 151 pokemons. To properly run them, start up a new mongodb instance and run the data load script
* I've splitted application logic in presentation (controller), business (service) and persistence (repository) layers
* Even though Pokemon entity and Pokemon model are quite similar (only difference is internal _id from mongo), I wanted to keep them separated to hide database schema from api consumers, which improves security
