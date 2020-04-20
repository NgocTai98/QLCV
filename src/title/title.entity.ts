import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { type } from "os";
import { Users } from "src/users/user.entity";

@Entity()
export class Title extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    companyName: string

    @Column()
    address: string

    @Column()
    linkWeb: string

    @Column()
    phone: string

    @ManyToOne(type => Users, user => user.titles)
    user: Users

}
