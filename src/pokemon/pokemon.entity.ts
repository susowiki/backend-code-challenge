import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";

@Entity()
export class Pokemon {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column({unique: true})
    id: string;

    @Column()
    name: string;

    @Column()
    classification: string;

    @Column()
    types: string[];

    @Column()
    resistant: string[];

    @Column()
    weaknesses: string[];

    @Column("json")
    weight: { minimum: string, maximum: string };

    @Column("json")
    height: { minimum: string, maximum: string };

    @Column()
    fleeRate: number;

    @Column("json")
    evolutionRequirements: { amount: number, name: string };

    @Column("json")
    evolutions: { id: number, name: string }[];

    @Column()
    maxCP: number;

    @Column()
    maxHP: number;

    @Column("json")
    attacks: { fast: { "name": string, "type": string, "damage": number}[], special: { "name": string, "type": string, "damage": number}[] };

    @Column()
    favorite: boolean;
}
