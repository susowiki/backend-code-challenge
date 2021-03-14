import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { PokemonEntity } from './pokemon/pokemon.entity';
import { PokemonTypeEntity } from './pokemon/pokemon-type.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    username: '',
    password: '',
    database: 'test',
    entities: [PokemonEntity, PokemonTypeEntity],
    synchronize: true,
  }), PokemonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
