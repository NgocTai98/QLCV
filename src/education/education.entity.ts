import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { type } from "os";
import { Employee } from "src/employee/employee.entity";
import { Users } from "src/users/user.entity";

@Entity()
export class Education extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    location: string;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @ManyToOne(type => Employee, employee => employee.educations)
    employee: Employee

    @ManyToOne(type => Users, user => user.educations)
    user: Users
}
