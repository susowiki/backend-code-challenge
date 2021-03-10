import "reflect-metadata";
import {createConnection} from "typeorm";
import {Pokemon} from "./entity/Pokemon";
import {PokemonType} from "./entity/PokemonType";
import pokemonsToLoad from '../pokemons.json'

createConnection().then(async connection => {

    console.log("Importing Pokemons from json file...");

    // console.log(pokemonsToLoad);

    for(let pokemon of pokemonsToLoad){
        const thePokemon = new Pokemon();
        thePokemon.id = pokemon.id;
        thePokemon.name = pokemon.name;
        thePokemon.types = pokemon.types;
        thePokemon.resistant = pokemon.resistant;
        thePokemon.weaknesses = pokemon.weaknesses;
        thePokemon.weight = pokemon.weight;
        thePokemon.height = pokemon.height;
        thePokemon.fleeRate = pokemon.fleeRate;
        thePokemon.evolutionRequirements = pokemon.evolutionRequirements;
        thePokemon.evolutions = pokemon.evolutions;
        thePokemon.maxCP = pokemon.maxCP;
        thePokemon.maxHP = pokemon.maxHP;
        thePokemon.attacks = pokemon.attacks;

        try {
            await connection.manager.save(thePokemon);
        } catch(e) {
            console.log("Error inserting pokemon: ", e);
        }
        
        for(let type of thePokemon.types){
            const theType = new PokemonType();
            theType.name = type;

            try {
                await connection.manager.save(theType);
            } catch(e) {
                console.log("Error inserting type: ", e);
            }
        }
        
     }

    console.log("Loading pokemons from the database...");
    try {
        const pokemonsFromDB = await connection.manager.find(Pokemon);
        console.log("Loaded pokemons: ", pokemonsFromDB);
    } catch(e) {
        console.log("Error reading pokemons: ", e);
    }

    console.log("Loading pokemon types from the database...");
    try {
        const pokemonTypesFromDB = await connection.manager.find(PokemonType);
        console.log("Loaded pokemon types: ", pokemonTypesFromDB);
    } catch(e) {
        console.log("Error reading pokemon types: ", e);
    }

    console.log("Load finished");

    return;
}).catch(error => console.log(error));
