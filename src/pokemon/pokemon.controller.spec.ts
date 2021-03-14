import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PokemonEntity } from './pokemon.entity';
import { PokemonTypeEntity } from './pokemon-type.entity';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { PokemonsRepositoryFake } from './test/pokemon-fake.repository';
import { PokemonTypesRepositoryFake } from './test/pokemon-type-fake.repository';
import { PokemonQueryApi } from './pokemon-query-api';
import { NotFoundException } from '@nestjs/common';

describe('PokemonController', () => {
  let controller: PokemonController;
  let service: PokemonService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [PokemonService, 
        {
          provide: getRepositoryToken(PokemonEntity),
          useClass: PokemonsRepositoryFake,
        },
        {
          provide: getRepositoryToken(PokemonTypeEntity),
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
      .mockResolvedValue([new PokemonEntity()]);
    const query = new PokemonQueryApi();

    controller.findAll(query);
    expect(pokemonsServiceFindAllSpy).toBeCalledTimes(1);
    expect(pokemonsServiceFindAllSpy).toBeCalledWith(query);   
  });

  it('test find all - Not Found', async () => {
    const pokemonsServiceFindAllSpy = jest
      .spyOn(service, 'findAll')
      .mockResolvedValue([]);

    await expect(controller.findAll(new PokemonQueryApi())).rejects.toThrow(NotFoundException);
    expect(pokemonsServiceFindAllSpy).toBeCalledTimes(1);
  });

  it('test find by id', () => {
    const pokemonsServiceFindByIdSpy = jest
      .spyOn(service, 'findById')
      .mockResolvedValue(new PokemonEntity());

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
      .mockResolvedValue(new PokemonEntity());

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
      .mockResolvedValue([new PokemonTypeEntity()]);

    controller.findAllTypes();
    expect(pokemonsServiceFindByNameSpy).toBeCalledTimes(1);
  });

  it('test find all types - Not Found', async () => {
    const pokemonsServiceFindByNameSpy = jest
      .spyOn(service, 'findAllTypes')
      .mockResolvedValue([]);

    await expect(controller.findAllTypes()).rejects.toThrow(NotFoundException)
    expect(pokemonsServiceFindByNameSpy).toBeCalledTimes(1);
  });

  it('test mark as favorite', async () => {
    const pokemon = new PokemonEntity();
    const pokemonsServiceFindByIdSpy = jest
      .spyOn(service, 'findById')
      .mockResolvedValue(pokemon);
    const pokemonsServiceUpdateFavoriteSpy = jest
      .spyOn(service, 'updateFavorite')
      .mockResolvedValue(pokemon);

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
    const pokemon = new PokemonEntity();
    const pokemonsServiceFindByIdSpy = jest
      .spyOn(service, 'findById')
      .mockResolvedValue(pokemon);
    const pokemonsServiceUpdateFavoriteSpy = jest
      .spyOn(service, 'updateFavorite')
      .mockResolvedValue(pokemon);

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
