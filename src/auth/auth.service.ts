import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from '../users/user.repository';
import { sign, verify } from 'jsonwebtoken';
import { jwtConstants } from './constants';



export enum Provider
{
    GOOGLE = 'google'
}

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private usersRepository: UserRepository,
        private jwtService: JwtService,
        
    ) { }


    async signUp(authCredentialsDto: AuthCredentialsDto, ) {
       
        await this.usersRepository.signUp(authCredentialsDto);

        return authCredentialsDto;
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) {
        let result = await this.usersRepository.validateUserPassword(authCredentialsDto);

        if (result != null) {
            const payload = { email: result.email, sub: result.id };
            const access_token = this.jwtService.sign(payload);
            return [result, access_token];
        } else {
            throw new UnauthorizedException('email or password incorrect');
        }

    }

    async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string>
    {
        try 
        {
            
            const payload = {
                thirdPartyId,
                provider
            }
            const jwt: string = sign(payload, jwtConstants.secret, { expiresIn: '1d' });
                return jwt;
            }
        catch (err)
        {
            
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
   
    }

}
