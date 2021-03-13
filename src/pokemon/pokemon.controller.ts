import { Controller, Get, Param, Put, Query, NotFoundException } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.entity';
import { PokemonType } from './pokemon-type.entity';
import { ListPokemonDto } from './pokemon-list.dto';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async findAll(@Query() query: ListPokemonDto) {
    const result = await this.pokemonService.findAll(query);
    if(result) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  @Get('id/:id')
  async findById(@Param('id') id: string): Promise<Pokemon> {
    const result = await this.pokemonService.findById(id);
    if(result) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<Pokemon> {
    const result = await this.pokemonService.findByName(name);
    if(result) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  @Get('types')
  async findAllTypes(): Promise<PokemonType[]> {
    const result = await this.pokemonService.findAllTypes();
    if(result) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  @Put('favorite/:id')
  async markAsFavorite(@Param('id') id: string): Promise<Pokemon> {
    const pokemon = await this.pokemonService.findById(id);
    if(pokemon) {
      return this.pokemonService.updateFavorite(pokemon, true);
    } else {
      throw new NotFoundException();
    }
  }

  @Put('unfavorite/:id')
  async unmarkAsFavorite(@Param('id') id: string): Promise<Pokemon> {
    const pokemon = await this.pokemonService.findById(id);
    if(pokemon) {
      return this.pokemonService.updateFavorite(pokemon, false);
    } else {
      throw new NotFoundException();
    }
  }
}
