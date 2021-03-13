import "reflect-metadata";
import {createConnection} from "typeorm";
import {Pokemon} from "./entity/Pokemon";
import {PokemonType} from "./entity/PokemonType";
import pokemonsToLoad from '../pokemons.json'

createConnection().then(async connection => {

    console.log("Importing Pokemons from json file...");

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
        thePokemon.favorite = false;

        try {
            await connection.manager.save(thePokemon);
        } catch(e) {
            if(e.code !== 11000) { // Ignore duplicate key error
                console.log("Error inserting type: ", e);
            }
        }
        
        for(let type of thePokemon.types){
            const theType = new PokemonType();
            theType.name = type;

            try {
                await connection.manager.save(theType);
            } catch(e) {
                if(e.code !== 11000) { // Ignore duplicate key error
                    console.log("Error inserting type: ", e);
                }
            }
        }
        
     }

    try {
        const pokemonsFromDB = await connection.manager.find(Pokemon);
        console.log(`Loaded ${pokemonsFromDB.length} pokemons`);
    } catch(e) {
        console.log("Error reading pokemons: ", e);
    }

    try {
        const pokemonTypesFromDB = await connection.manager.find(PokemonType);
        console.log(`Loaded ${pokemonTypesFromDB.length} pokemon types`);
    } catch(e) {
        console.log("Error reading pokemon types: ", e);
    }

    console.log("Load finished");

    return process.exit(0);
}).catch(error => console.log(error));
