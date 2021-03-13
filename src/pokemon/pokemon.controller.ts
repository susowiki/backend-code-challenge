import { Controller, Get, Param, Put, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../entity/Pokemon';
import { PokemonType } from '../entity/PokemonType';
import { ListPokemonDto } from './pokemon-list.dto';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll(@Query() query: ListPokemonDto) {
    return this.pokemonService.findAll(query);
  }

  @Get('id/:id')
  findById(@Param('id') id: string): Promise<Pokemon> {
    return this.pokemonService.findById(id);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string): Promise<Pokemon> {
    return this.pokemonService.findByName(name);
  }

  @Get('types')
  findAllTypes(): Promise<PokemonType[]> {
    return this.pokemonService.findAllTypes();
  }

  @Put('favorite/:id')
  markAsFavorite(@Param('id') id: string): Promise<string> {
    return this.pokemonService.updateFavorite(id, true);
  }

  @Put('unfavorite/:id')
  unmarkAsFavorite(@Param('id') id: string): Promise<string> {
    return this.pokemonService.updateFavorite(id, false);
  }
}
