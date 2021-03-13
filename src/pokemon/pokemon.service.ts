import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from '../entity/Pokemon';
import { PokemonType } from '../entity/PokemonType';
import { ListPokemonDto } from './pokemon-list.dto';

@Injectable()
export class PokemonService {
    constructor(
        @InjectRepository(Pokemon)
        private pokemonsRepository: Repository<Pokemon>,
        @InjectRepository(PokemonType)
        private pokemonTypesRepository: Repository<PokemonType>,
      ) {}

    findAll(query: ListPokemonDto): Promise<Pokemon[]> {
        const whereStatement = {};

        if(query.type) whereStatement['types'] = query.type;
        if(query.name) whereStatement['name'] = query.name;
        if(query.favorite) whereStatement['favorite'] = query.favorite === 'true';

        return this.pokemonsRepository.find({skip: query.offset ? parseInt(query.offset) : 0, 
                                             take: query.limit ? parseInt(query.limit) : 1000, 
                                             where: whereStatement });
    }

    findById(id: string): Promise<Pokemon> {
        return this.pokemonsRepository.findOne({ where: { id: id } });
    }

    findByName(name: string): Promise<Pokemon> {
        return this.pokemonsRepository.findOne({ where: { name: name } });
    }

    findAllTypes(): Promise<PokemonType[]> {
        return this.pokemonTypesRepository.find();
    }

    updateFavorite(id: string, isFavorite: boolean): Promise<string> {
        return this.pokemonsRepository.findOne({ where: { id: id } }).then(pokemon => {
            pokemon.favorite = isFavorite;
            this.pokemonsRepository.save(pokemon);
            return 'OK';
        });
    }
}
