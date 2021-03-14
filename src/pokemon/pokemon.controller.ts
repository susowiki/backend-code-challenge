import { Controller, Get, Param, Put, Query, NotFoundException } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonModel } from './pokemon.model';
import { PokemonTypeModel } from './pokemon-type.model';
import { PokemonQuery } from './pokemon-query';
import { PokemonAdapter } from './pokemon.adapter';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async findAll(@Query() query: PokemonQuery): Promise<PokemonModel[]> {
    const result = await this.pokemonService.findAll(query);
    if(result.length > 0) {
      return result.map(ent => PokemonAdapter.toApi(ent));
    } else {
      throw new NotFoundException();
    }
  }

  @Get('id/:id')
  async findById(@Param('id') id: string): Promise<PokemonModel> {
    const result = await this.pokemonService.findById(id);
    if(result) {
      return PokemonAdapter.toApi(result);
    } else {
      throw new NotFoundException();
    }
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<PokemonModel> {
    const result = await this.pokemonService.findByName(name);
    if(result) {
      return PokemonAdapter.toApi(result);
    } else {
      throw new NotFoundException();
    }
  }

  @Get('types')
  async findAllTypes(): Promise<PokemonTypeModel[]> {
    const result = await this.pokemonService.findAllTypes();
    if(result.length > 0) {
      return result.map(ent => PokemonAdapter.typeToApi(ent));
    } else {
      throw new NotFoundException();
    }
  }

  @Put('favorite/:id')
  async markAsFavorite(@Param('id') id: string): Promise<PokemonModel> {
    const pokemon = await this.pokemonService.findById(id);
    if(pokemon) {
      const updatedPokemonEntity = await this.pokemonService.updateFavorite(pokemon, true);
      return PokemonAdapter.toApi(updatedPokemonEntity);
    } else {
      throw new NotFoundException();
    }
  }

  @Put('unfavorite/:id')
  async unmarkAsFavorite(@Param('id') id: string): Promise<PokemonModel> {
    const pokemon = await this.pokemonService.findById(id);
    if(pokemon) {
      const updatedPokemonEntity = await this.pokemonService.updateFavorite(pokemon, false);
      return PokemonAdapter.toApi(updatedPokemonEntity);
    } else {
      throw new NotFoundException();
    }
  }
}
