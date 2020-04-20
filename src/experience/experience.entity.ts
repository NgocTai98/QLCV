import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { type } from "os";
import { Employee } from "src/employee/employee.entity";
import { Users } from "src/users/user.entity";

@Entity()
export class Experience extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    location: string;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @ManyToOne(type => Employee, employee => employee.experiences)
    employee: Employee;

    @ManyToOne(type => Users, user => user.experiences)
    @JoinColumn({name: "lastEditedBy"})
    user: Users;
}
