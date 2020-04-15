import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt'

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
    level:number;

    @Column({ length: 255 })
    rememberToken:string;


    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.compare(password,this.password);
       
        return hash;
        
    }
}