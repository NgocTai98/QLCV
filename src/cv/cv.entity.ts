import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Title } from "src/title/title.entity";
import { type } from "os";
import { Employee } from "src/employee/employee.entity";
import { Cvproject } from "src/cvproject/cvproject.entity";
import { History } from "src/history/history.entity";
import { Users } from "src/users/user.entity";
import { Infoquanlification } from "src/infoquanlification/infoquanlification.entity";

@Entity()
export class Cv extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    hashTag: string

    @Column()
    createdAt: string

    @ManyToOne(type => Title, title => title.cvs)
    title: Title

    @OneToMany(type => Cvproject, cvproject => cvproject.cv)
    cvprojects: Cvproject[]

    @OneToMany(type => History, history => history.cv)
    histories: History[]

    @ManyToOne(type => Employee, employee => employee.cvs)
    employee: Employee

    @ManyToOne(type => Users, user => user.cvs)
    user: Users

    @OneToMany(type => Infoquanlification, infoquan => infoquan.cv)
    infoquans: Infoquanlification

}
