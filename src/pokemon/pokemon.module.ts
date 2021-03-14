import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonEntity } from './pokemon.entity';
import { PokemonTypeEntity } from './pokemon-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonEntity, PokemonTypeEntity])],
  controllers: [PokemonController],
  providers: [PokemonService]
})
export class PokemonModule {}
