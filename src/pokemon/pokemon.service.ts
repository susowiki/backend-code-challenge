import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PokemonEntity } from './pokemon.entity';
import { PokemonTypeEntity } from './pokemon-type.entity';
import { PokemonQueryApi } from './pokemon-query-api';
import { PokemonQuerySort } from './pokemon-query-sort.enum';
import { PokemonQueryOrder } from './pokemon-query-order.enum';
import { PokemonQueryMapper } from './pokemon-query.mapper';

@Injectable()
export class PokemonService {
    constructor(
        @InjectRepository(PokemonEntity)
        private pokemonsRepository: Repository<PokemonEntity>,
        @InjectRepository(PokemonTypeEntity)
        private pokemonTypesRepository: Repository<PokemonTypeEntity>,
      ) {}

    findAll(query: PokemonQueryApi): Promise<PokemonEntity[]> {
        return this.pokemonsRepository.find(PokemonQueryMapper.fromApiToDB(query));
    }

    findById(id: string): Promise<PokemonEntity> {
        return this.pokemonsRepository.findOne({ where: { id: id } });
    }

    findByName(name: string): Promise<PokemonEntity> {
        return this.pokemonsRepository.findOne({ where: { name: name } });
    }

    findAllTypes(): Promise<PokemonTypeEntity[]> {
        return this.pokemonTypesRepository.find();
    }

    updateFavorite(pokemon: PokemonEntity, isFavorite: boolean): Promise<PokemonEntity> {
        pokemon.favorite = isFavorite;
        return this.pokemonsRepository.save(pokemon);
    }
}
