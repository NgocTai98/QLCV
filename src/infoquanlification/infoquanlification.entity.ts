import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { type } from "os";
import { Cv } from "src/cv/cv.entity";

@Entity()
export class Infoquanlification extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(type => Cv, cv => cv.infoquans)
    cv: Cv
}
