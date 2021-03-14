import { PokemonTypeEntity } from './pokemon-type.entity';
import { PokemonTypeModel } from './pokemon-type.model';
import { PokemonEntity } from './pokemon.entity';
import { PokemonModel } from './pokemon.model';

export class PokemonAdapter {
  static toApi(pokemonEntity: PokemonEntity): PokemonModel {
    const pokemonModel = new PokemonModel();
    pokemonModel.id = pokemonEntity.id;
    pokemonModel.name = pokemonEntity.name;
    pokemonModel.classification = pokemonEntity.classification;
    pokemonModel.types = pokemonEntity.types;
    pokemonModel.resistant = pokemonEntity.resistant;
    pokemonModel.weaknesses = pokemonEntity.weaknesses;
    pokemonModel.weight = pokemonEntity.weight;
    pokemonModel.height = pokemonEntity.height;
    pokemonModel.fleeRate = pokemonEntity.fleeRate;
    pokemonModel.evolutionRequirements = pokemonEntity.evolutionRequirements;
    pokemonModel.evolutions = pokemonEntity.evolutions;
    pokemonModel.maxCP = pokemonEntity.maxCP;
    pokemonModel.maxHP = pokemonEntity.maxHP;
    pokemonModel.attacks = pokemonEntity.attacks;
    pokemonModel.favorite = pokemonEntity.favorite;

    return pokemonModel;
  }

  static typeToApi(pokemonTypeEntity: PokemonTypeEntity): PokemonTypeModel {
    const pokemonTypeModel = new PokemonTypeModel();
    pokemonTypeModel.name = pokemonTypeEntity.name;

    return pokemonTypeModel;
  }
}
