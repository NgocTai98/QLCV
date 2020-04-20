import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { type } from "os";
import { Users } from "src/users/user.entity";

@Entity()
export class Project extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    location: string;

    @Column()
    projectName: string;

    @Column()
    description: string;

    @Column()
    technology: string;

    @Column()
    reference: string;

    @ManyToOne(type => Users, user => user.projects)
    user: Users
}
