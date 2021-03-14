import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PokemonEntity } from './pokemon.entity';
import { PokemonTypeEntity } from './pokemon-type.entity';
import { PokemonService } from './pokemon.service';
import { PokemonsRepositoryFake } from './test/pokemon-fake.repository';
import { PokemonTypesRepositoryFake } from './test/pokemon-type-fake.repository';
import { PokemonQueryApi } from './pokemon-query-api';

describe('PokemonService', () => {
  let service: PokemonService;
  let pokemonsRepository: Repository<PokemonEntity>;
  let pokemonTypesRepository: Repository<PokemonTypeEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonService, 
        {
          provide: getRepositoryToken(PokemonEntity),
          useClass: PokemonsRepositoryFake,
        },
        {
          provide: getRepositoryToken(PokemonTypeEntity),
          useClass: PokemonTypesRepositoryFake,
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    pokemonsRepository = module.get(getRepositoryToken(PokemonEntity));
    pokemonTypesRepository = module.get(getRepositoryToken(PokemonTypeEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('test find all with params', () => {
    const mockResult = [];
    ['Bulbasaur', 'Charmander', 'Squirtle'].forEach(name=> {
      const mockPokemon = new PokemonEntity();
      mockPokemon.name = name;
      mockResult.push(mockPokemon);
    });
    const pokemonsRepositoryFindSpy = jest
      .spyOn(pokemonsRepository, 'find')
      .mockResolvedValue(mockResult);

    const query = new PokemonQueryApi();

    service.findAll(query);
    expect(pokemonsRepositoryFindSpy).toBeCalledTimes(1);
    expect(pokemonsRepositoryFindSpy).toBeCalledWith({"skip": 0, "take": 1000, order: {"id": "ASC"}, "where": {}});   
  });

  it('test find by id', () => {
    const mockResult = new PokemonEntity();
    mockResult.id = '001';
    mockResult.name = 'Bulbasaur';
    const pokemonsRepositoryFindOneSpy = jest
      .spyOn(pokemonsRepository, 'findOne')
      .mockResolvedValue(mockResult);
    
    service.findById('001');
    expect(pokemonsRepositoryFindOneSpy).toBeCalledTimes(1);
    expect(pokemonsRepositoryFindOneSpy).toBeCalledWith({"where": {"id": "001"}});   
  });

  it('test find by name', () => {
    const mockResult = new PokemonEntity();
    mockResult.id = '001';
    mockResult.name = 'Bulbasaur';
    const pokemonsRepositoryFindOneSpy = jest
      .spyOn(pokemonsRepository, 'findOne')
      .mockResolvedValue(mockResult);
    
    service.findByName('Bulbasaur');
    expect(pokemonsRepositoryFindOneSpy).toBeCalledTimes(1);  
    expect(pokemonsRepositoryFindOneSpy).toBeCalledWith({"where": {"name": "Bulbasaur"}});  
  });

  it('test find all types', () => {
    const mockResult = [];
    ['Fire', 'Water'].forEach(typeName=> {
      const mockType = new PokemonTypeEntity();
      mockType.name = typeName;
      mockResult.push(mockType);
    });
    const pokemonTypesRepositoryFindSpy = jest
      .spyOn(pokemonTypesRepository, 'find')
      .mockResolvedValue(mockResult);
    
    service.findAllTypes();
    expect(pokemonTypesRepositoryFindSpy).toBeCalledTimes(1); 
  });

  it('test mark as favorite', () => {
    const pokemon = new PokemonEntity();
    pokemon.id = '001';
    pokemon.name = 'Bulbasaur';

    const pokemonsRepositorySaveSpy = jest
    .spyOn(pokemonsRepository, 'save');
    
    service.updateFavorite(pokemon, true);
    expect(pokemonsRepositorySaveSpy).toBeCalledTimes(1);
    expect(pokemonsRepositorySaveSpy).toHaveBeenCalledWith(pokemon);
  });
});
