import { BaseEntity, Entity, Column, OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { type } from "os";
import { Cv } from "src/cv/cv.entity";
import { Project } from "src/project/project.entity";

@Entity()
export class Cvproject extends BaseEntity {
    @PrimaryGeneratedColumn()
    cvprojectId: number


    @Column()
    responsibility: string

    @Column()
    technology: string

    @ManyToOne(type => Cv, cv => cv.cvprojects)
    cv: Cv

    @ManyToOne(type => Project, project => project.cvprojects)
    project: Project
}
