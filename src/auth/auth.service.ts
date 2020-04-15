import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
// import { UserRepository } from 'src/users/user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private usersRepository: UserRepository, private jwtService: JwtService){}

   
    async signUp(authCredentialsDto: AuthCredentialsDto) {
        
        await this.usersRepository.signUp(authCredentialsDto);
        
        return authCredentialsDto;
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) {
        let result = await this.usersRepository.validateUserPassword(authCredentialsDto);
        console.log(result);
        
        return result;
        
        // return authCredentialsDto;
    }

}
