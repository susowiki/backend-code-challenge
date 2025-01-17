import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as bulbasaurNotFavoritedJson from './response/bulbasaur-not-favorited.json'
import * as bulbasaurFavoritedJson from './response/bulbasaur-favorited.json'

describe('PokemonController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET pokemons', () => {
    return request(app.getHttpServer())
      .get('/pokemon')
      .expect(200)
      .expect((res) => {
        const responseBody = JSON.parse(res.text);
        expect(responseBody.total).toEqual(151);
        expect(responseBody.items).toHaveLength(151);
      });
  });

  it('GET pokemons with limit param', () => {
    return request(app.getHttpServer())
      .get('/pokemon?limit=10')
      .expect(200)
      .expect((res) => {
        const responseBody = JSON.parse(res.text);
        expect(responseBody.total).toEqual(151);
        expect(responseBody.items).toHaveLength(10);
      });
  });

  it('GET pokemons with sort param', () => {
    return request(app.getHttpServer())
      .get('/pokemon?sort=name')
      .expect(200)
      .expect((res) => {
        const polemonList = JSON.parse(res.text);
        expect(polemonList.total).toEqual(151);
        expect(polemonList.items).toHaveLength(151);
        expect(polemonList.items[0].name).toEqual('Abra');
      }); 
  });

  it('GET pokemons with pagination', () => {
    return request(app.getHttpServer())
      .get('/pokemon?offset=50')
      .expect(200)
      .expect((res) => {
        const polemonList = JSON.parse(res.text);
        expect(polemonList.total).toEqual(151);
        expect(polemonList.items).toHaveLength(101);
        expect(polemonList.items[0].id).toEqual('051');
      }); 
  });

  it('GET pokemons with type', () => {
    return request(app.getHttpServer())
      .get('/pokemon?type=Water')
      .expect(200)
      .expect((res) => {
        const polemonList = JSON.parse(res.text);
        expect(polemonList.total).toEqual(32);
        expect(polemonList.items).toHaveLength(32);
        expect(polemonList.items[0].name).toEqual('Squirtle');
      }); 
  });

  it('GET pokemon by id', () => {
    return request(app.getHttpServer())
      .get('/pokemon/id/001')
      .expect(200)
      .expect(JSON.stringify(bulbasaurNotFavoritedJson));
  });

  it('GET pokemon by id - Not Found', () => {
    return request(app.getHttpServer())
      .get('/pokemon/id/999')
      .expect(404);
  });

  it('GET pokemon by name', () => {
    return request(app.getHttpServer())
      .get('/pokemon/name/Bulbasaur')
      .expect(200)
      .expect(JSON.stringify(bulbasaurNotFavoritedJson));;
  });

  it('GET pokemon by name - Not Found', () => {
    return request(app.getHttpServer())
      .get('/pokemon/name/Chikorita')
      .expect(404);
  });

  it('Get Pokemon Types', () => {
    return request(app.getHttpServer())
      .get('/pokemon/types')
      .expect(200)
      .expect((res) => expect(JSON.parse(res.text)).toHaveLength(17)); 
  });

  it('Mark Pokemon as favorite', () => {
    return request(app.getHttpServer())
      .put('/pokemon/favorite/001')
      .expect(200)
      .expect(JSON.stringify(bulbasaurFavoritedJson));
  });

  it('Mark Pokemon as favorite - Not Found', () => {
    return request(app.getHttpServer())
      .put('/pokemon/favorite/999')
      .expect(404);
  });

  it('Unmark Pokemon as favorite', () => {
    return request(app.getHttpServer())
      .put('/pokemon/unfavorite/001')
      .expect(200)
      .expect(JSON.stringify(bulbasaurNotFavoritedJson));
  });

  it('Unmark Pokemon as favorite - Not Found', () => {
    return request(app.getHttpServer())
      .put('/pokemon/unfavorite/999')
      .expect(404);
  });
});