import "reflect-metadata";
import {createConnection} from "typeorm";
import {PokemonEntity} from "./pokemon/pokemon.entity";
import {PokemonTypeEntity} from "./pokemon/pokemon-type.entity";
import * as pokemonsToLoad from '../pokemons.json'

createConnection().then(async connection => {

    console.log("Importing Pokemons from json file...");

    for(let pokemon of pokemonsToLoad){
        const thePokemon = new PokemonEntity();
        thePokemon.id = pokemon.id;
        thePokemon.name = pokemon.name;
        thePokemon.classification = pokemon.classification;
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
            const theType = new PokemonTypeEntity();
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
        const pokemonsFromDB = await connection.manager.find(PokemonEntity);
        console.log(`Loaded ${pokemonsFromDB.length} pokemons`);
    } catch(e) {
        console.log("Error reading pokemons: ", e);
    }

    try {
        const pokemonTypesFromDB = await connection.manager.find(PokemonTypeEntity);
        console.log(`Loaded ${pokemonTypesFromDB.length} pokemon types`);
    } catch(e) {
        console.log("Error reading pokemon types: ", e);
    }

    console.log("Load finished");

    return process.exit(0);
}).catch(error => console.log(error));
