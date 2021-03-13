import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pokemon } from './pokemon.entity';
import { PokemonType } from './pokemon-type.entity';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { PokemonsRepositoryFake } from './test/pokemon-fake.repository';
import { PokemonTypesRepositoryFake } from './test/pokemon-type-fake.repository';
import { ListPokemonDto } from './pokemon-list.dto';

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
      .spyOn(service, 'findAll');
    const query = new ListPokemonDto();

    controller.findAll(query);
    expect(pokemonsServiceFindAllSpy).toBeCalledTimes(1);
    expect(pokemonsServiceFindAllSpy).toBeCalledWith(query);   
  });

  it('test find by id', () => {
    const pokemonsServiceFindByIdSpy = jest
      .spyOn(service, 'findById');

    controller.findById('001');
    expect(pokemonsServiceFindByIdSpy).toBeCalledTimes(1);
    expect(pokemonsServiceFindByIdSpy).toBeCalledWith('001');   
  });

  it('test find by name', () => {
    const pokemonsServiceFindByNameSpy = jest
      .spyOn(service, 'findByName');

    controller.findByName('Bulbasaur');
    expect(pokemonsServiceFindByNameSpy).toBeCalledTimes(1);
    expect(pokemonsServiceFindByNameSpy).toBeCalledWith('Bulbasaur');   
  });

  it('test find all types', () => {
    const pokemonsServiceFindByNameSpy = jest
      .spyOn(service, 'findAllTypes');

    controller.findAllTypes();
    expect(pokemonsServiceFindByNameSpy).toBeCalledTimes(1);
  });

  it('test mark as favorite', () => {
    const pokemonsServiceUpdateFavoriteSpy = jest
      .spyOn(service, 'updateFavorite')
      .mockResolvedValue('OK');

    controller.markAsFavorite('001');
    expect(pokemonsServiceUpdateFavoriteSpy).toBeCalledTimes(1);
    expect(pokemonsServiceUpdateFavoriteSpy).toBeCalledWith('001', true);   
  });

  it('test mark as not favorite', () => {
    const pokemonsServiceUpdateFavoriteSpy = jest
      .spyOn(service, 'updateFavorite')
      .mockResolvedValue('OK');

    controller.unmarkAsFavorite('001');
    expect(pokemonsServiceUpdateFavoriteSpy).toBeCalledTimes(1);
    expect(pokemonsServiceUpdateFavoriteSpy).toBeCalledWith('001', false);   
  });
});
