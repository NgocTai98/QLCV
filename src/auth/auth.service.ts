import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from '../users/user.repository';
import { sign, verify } from 'jsonwebtoken';
import { jwtConstants } from './constants';
import { Users } from 'src/users/user.entity';



export enum Provider {
    GOOGLE = 'google'
}

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private usersRepository: UserRepository,
        private jwtService: JwtService,

    ) { }


    // async signUp(authCredentialsDto: AuthCredentialsDto, ): Promise<Users> {

    //     let newUser = await this.usersRepository.signUp(authCredentialsDto);

    //     return newUser;
    // }

    // async signIn(authCredentialsDto: AuthCredentialsDto): Promise<(string | Users)[]> {
    //     let result = await this.usersRepository.validateUserPassword(authCredentialsDto);

    //     if (result != null) {
    //         const payload = { email: result.email, sub: result.id };
    //         const access_token = this.jwtService.sign(payload);
    //         return [result, access_token];
    //     } else {
    //         throw new UnauthorizedException('email or password incorrect');
    //     }

    // }
    async signIn(id: number, role: string) {

        const payload = { role: role, sub: id };
        const access_token = this.jwtService.sign(payload);
       
        return access_token;
    }

    async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string> {
        try {
            const payload = {
                thirdPartyId,
                provider
            }
            const jwt: string = sign(payload, jwtConstants.clientSecret, { expiresIn: '1d' });
            return jwt;
        }
        catch (err) {
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }

    }

}
