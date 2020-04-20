import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { type } from 'os';
import { Employee } from 'src/employee/employee.entity';
import { Quanlification } from '../quanlification/quanlification.entity';
import { Experience } from 'src/experience/experience.entity';
import { Education } from 'src/education/education.entity';

@Entity()
@Unique(['email'])
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    email:string;

    @Column({ length: 255 }) 
    password:string;

    @Column({ length: 255 }) 
    fullname:string;

    @Column()
    lastEditedBy: Number

    @OneToMany(type => Employee, employee => employee.user)
    employees: Employee[];

    @OneToMany(type => Quanlification, quanlification => quanlification.user)
    quanlifications: Quanlification[]
    
    @OneToMany(type => Experience, experience => experience.user)
    experiences: Experience[]

    @OneToMany(type => Education, education => education.user)
    educations: Education[]
    

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.compare(password,this.password);
       
        return hash;
        
    }
}