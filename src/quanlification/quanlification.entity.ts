import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { type } from 'os';
import { Employee } from 'src/employee/employee.entity';
import { Users } from 'src/users/user.entity';

@Entity()
export class Quanlification extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name:string;

    @ManyToOne(type => Employee, employee => employee.quanlifications)
    employee: Employee

    @ManyToOne(type => Users, user => user.quanlifications)
    @JoinColumn({name: "lastEditedBy"})
    user: Users

}
