import { PokemonQueryOrder } from './pokemon-query-order.enum';
import { PokemonQuerySort } from './pokemon-query-sort.enum';
import { PokemonQueryDB } from './pokemon-query-db';
import { PokemonQueryApi } from './pokemon-query-api';

export class PokemonQueryMapper {
  static fromApiToDB(apiQuery: PokemonQueryApi): PokemonQueryDB {
    const dbQuery = new PokemonQueryDB();

    dbQuery.skip = apiQuery.offset ? parseInt(apiQuery.offset) : 0;
    dbQuery.take = apiQuery.limit ? parseInt(apiQuery.limit) : 1000;

    dbQuery.where = {};
    if(apiQuery.type) dbQuery.where['types'] = apiQuery.type;
    if(apiQuery.name) dbQuery.where['name'] = apiQuery.name;
    if(apiQuery.favorite) dbQuery.where['favorite'] = apiQuery.favorite === 'true';

    dbQuery.order = {[apiQuery.sort ? apiQuery.sort : PokemonQuerySort[PokemonQuerySort.id]]: (apiQuery.order ? apiQuery.order : PokemonQueryOrder[PokemonQueryOrder.ASC] )};

    return dbQuery;
  }
}
