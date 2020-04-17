import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from 'src/users/user.entity';


@Entity()

export class Employee extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    employeeCode:string;

    @Column({ length: 255 }) 
    name:string;

    @Column({ length: 255 }) 
    reference:string;

   
    @ManyToOne(type => Users, user => user.employees)
    @JoinColumn({name: "lastEditedBy"})
    user: Users

    

    


   
}