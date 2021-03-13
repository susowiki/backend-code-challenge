import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from 'src/entity/Pokemon';
import { PokemonType } from 'src/entity/PokemonType';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon, PokemonType])],
  controllers: [PokemonController],
  providers: [PokemonService]
})
export class PokemonModule {}
