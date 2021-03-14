import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PokemonEntity } from './pokemon.entity';
import { PokemonTypeEntity } from './pokemon-type.entity';
import { PokemonQuery } from './pokemon-query';

@Injectable()
export class PokemonService {
    constructor(
        @InjectRepository(PokemonEntity)
        private pokemonsRepository: Repository<PokemonEntity>,
        @InjectRepository(PokemonTypeEntity)
        private pokemonTypesRepository: Repository<PokemonTypeEntity>,
      ) {}

    findAll(query: PokemonQuery): Promise<PokemonEntity[]> {
        const whereStatement = {};

        if(query.type) whereStatement['types'] = query.type;
        if(query.name) whereStatement['name'] = query.name;
        if(query.favorite) whereStatement['favorite'] = query.favorite === 'true';

        return this.pokemonsRepository.find({skip: query.offset ? parseInt(query.offset) : 0, 
                                             take: query.limit ? parseInt(query.limit) : 1000, 
                                             where: whereStatement });
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
