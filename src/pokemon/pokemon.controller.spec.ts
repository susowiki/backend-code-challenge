import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pokemon } from './pokemon.entity';
import { PokemonType } from './pokemon-type.entity';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { PokemonsRepositoryFake } from './test/pokemon-fake.repository';
import { PokemonTypesRepositoryFake } from './test/pokemon-type-fake.repository';
import { ListPokemonDto } from './pokemon-list.dto';
import { NotFoundException } from '@nestjs/common';

describe('PokemonController', () => {
  let controller: PokemonController;
  let service: PokemonService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [PokemonService, 
        {
          provide: getRepositoryToken(Pokemon),
          useClass: PokemonsRepositoryFake,
        },
        {
          provide: getRepositoryToken(PokemonType),
          useClass: PokemonTypesRepositoryFake,
        },]
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('test find all', () => {
    const pokemonsServiceFindAllSpy = jest
      .spyOn(service, 'findAll')
      .mockResolvedValue([new Pokemon()]);
    const query = new ListPokemonDto();

    controller.findAll(query);
    expect(pokemonsServiceFindAllSpy).toBeCalledTimes(1);
    expect(pokemonsServiceFindAllSpy).toBeCalledWith(query);   
  });

  it('test find all - Not Found', async () => {
    await expect(controller.findAll(new ListPokemonDto())).rejects.toThrow(NotFoundException)
  });

  it('test find by id', () => {
    const pokemonsServiceFindByIdSpy = jest
      .spyOn(service, 'findById')
      .mockResolvedValue(new Pokemon());

    controller.findById('001');
    expect(pokemonsServiceFindByIdSpy).toBeCalledTimes(1);
    expect(pokemonsServiceFindByIdSpy).toBeCalledWith('001');   
  });

  it('test find by id - Not Found', async () => {
    await expect(controller.findById('152')).rejects.toThrow(NotFoundException)
  });

  it('test find by name', () => {
    const pokemonsServiceFindByNameSpy = jest
      .spyOn(service, 'findByName')
      .mockResolvedValue(new Pokemon());

    controller.findByName('Bulbasaur');
    expect(pokemonsServiceFindByNameSpy).toBeCalledTimes(1);
    expect(pokemonsServiceFindByNameSpy).toBeCalledWith('Bulbasaur');   
  });

  it('test find by name - Not Found', async () => {
    await expect(controller.findById('Chikorita')).rejects.toThrow(NotFoundException)
  });

  it('test find all types', () => {
    const pokemonsServiceFindByNameSpy = jest
      .spyOn(service, 'findAllTypes')
      .mockResolvedValue([new PokemonType()]);

    controller.findAllTypes();
    expect(pokemonsServiceFindByNameSpy).toBeCalledTimes(1);
  });

  it('test find all types - Not Found', async () => {
    await expect(controller.findAllTypes()).rejects.toThrow(NotFoundException)
  });

  it('test mark as favorite', async () => {
    const pokemon = new Pokemon();
    const pokemonsServiceFindByIdSpy = jest
      .spyOn(service, 'findById')
      .mockResolvedValue(pokemon);
    const pokemonsServiceUpdateFavoriteSpy = jest
      .spyOn(service, 'updateFavorite');

    await controller.markAsFavorite('001');
    expect(pokemonsServiceFindByIdSpy).toBeCalledTimes(1);
    expect(pokemonsServiceFindByIdSpy).toBeCalledWith('001');  

    expect(pokemonsServiceUpdateFavoriteSpy).toBeCalledTimes(1);
    expect(pokemonsServiceUpdateFavoriteSpy).toBeCalledWith(pokemon, true);   
  });

  it('test mark as favorite - Not Found', async () => {
    await expect(controller.markAsFavorite('152')).rejects.toThrow(NotFoundException)
  });

  it('test mark as not favorite', async () => {
    const pokemon = new Pokemon();
    const pokemonsServiceFindByIdSpy = jest
      .spyOn(service, 'findById')
      .mockResolvedValue(pokemon);
    const pokemonsServiceUpdateFavoriteSpy = jest
      .spyOn(service, 'updateFavorite');

    await controller.unmarkAsFavorite('001');
    expect(pokemonsServiceFindByIdSpy).toBeCalledTimes(1);
    expect(pokemonsServiceFindByIdSpy).toBeCalledWith('001');  

    expect(pokemonsServiceUpdateFavoriteSpy).toBeCalledTimes(1);
    expect(pokemonsServiceUpdateFavoriteSpy).toBeCalledWith(pokemon, false);  
  });

  it('test unmark as favorite - Not Found', async () => {
    await expect(controller.markAsFavorite('152')).rejects.toThrow(NotFoundException)
  });
});
