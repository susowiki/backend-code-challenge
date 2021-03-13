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

1. Run `npm i` command
2. Run `docker-compose up` command
3. Run `npm run load-database` command
4. Run `npm run start` command
5. Run `npm run test` command (TBD)
6. Run `npm run test:e2e` command (TBD)

### API Endpoints

* GET /pokemon: Retrieves a list of Pokemons with the given filter parameters (offset, limit, type, name, favorite)
* GET /pokemon/id/{id}: Retrieves a Pokemon with the given id
* GET /pokemon/name/{name}: Retrieves a Pokemon with the given name
* GET /pokemon/types: Retrieves the list of Pokemon Types
* PUT /pokemon/favorite/{id}: Marks a Pokemon as favorite
* PUT /pokemon/unfavorite/{id}: Marks a Pokemon as not favorite

