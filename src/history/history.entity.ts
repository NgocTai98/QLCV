import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { type } from "os";
import { Users } from "src/users/user.entity";
import { Cv } from "src/cv/cv.entity";

@Entity()
export class History extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    time: string

    @ManyToOne(type => Users, user => user.histories)
    user: Users

    @ManyToOne(type => Cv, cv => cv.histories)
    cv: Cv


}
