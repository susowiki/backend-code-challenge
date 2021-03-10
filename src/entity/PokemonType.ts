import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";

@Entity()
export class PokemonType {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column({unique: true})
    name: string;

}
