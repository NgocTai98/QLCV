import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Users } from 'src/users/user.entity';
import { type } from 'os';
import { Quanlification } from '../quanlification/quanlification.entity';
import { Experience } from 'src/experience/experience.entity';
import { Education } from 'src/education/education.entity';
import { Cv } from 'src/cv/cv.entity';


@Entity()

export class Employee extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    employeeCode:string;

    @Column({ length: 255 }) 
    name:string;

    @Column({ length: 255 }) 
    position:string;

    @Column({ length: 255 }) 
    reference:string;

   
    @ManyToOne(type => Users, user => user.employees)
    @JoinColumn({name: "lastEditedBy"})
    user: Users

    @OneToMany(type => Quanlification, quanlification => quanlification.employee)
    quanlifications: Quanlification[]

    @OneToMany(type => Experience, experience => experience.employee)
    experiences: Experience[]

    @OneToMany(type => Education, education => education.employee)
    educations: Education[]

    @OneToMany(type => Cv, cv => cv.employee)
    cvs: Cv[]

    

    


   
}