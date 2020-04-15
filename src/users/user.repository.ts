import { Repository, EntityRepository } from "typeorm";
import { Users } from './user.entity';
import { AuthCredentialsDto } from "src/auth/dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'


@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
    async signUp(authCredentialsDto: AuthCredentialsDto) {
        const {email, password, fullname, level, rememberToken} = authCredentialsDto;

        const salt = await bcrypt.genSalt();
       

        const user = new Users();
        user.email = email;
        user.password = await this.hashPassword(password, salt);
       
        user.fullname = fullname;
        user.level = level;
        user.rememberToken = rememberToken;
        
        try {
            await user.save();    
           
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('email already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
       
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto) {
        const {email, password} = authCredentialsDto;
        const user = await this.findOne({email});
       
        if (user && await user.validatePassword(password)) {
            return user;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}