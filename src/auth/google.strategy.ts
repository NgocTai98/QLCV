import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { AuthService, Provider } from "./auth.service";
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from "src/users/users.service";
import { compare } from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{

    constructor(
        private readonly authService: AuthService,
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
        super({
            clientID: jwtConstants.clientID,
            clientSecret: jwtConstants.clientSecret, 
            callbackURL: 'http://localhost:3000/auth/google/callback',
            passReqToCallback: true,
            scope: ['profile', 'email']
        })
    }


    async validate(request: any, accessToken: string, refreshToken: string, profile: any, done: Function) {
        try {
            const oAuth2Client = new OAuth2Client(
                jwtConstants.clientID,
                jwtConstants.clientSecret,
                'http://localhost:3000/auth/google/callback'
            );

            let email = await oAuth2Client.getTokenInfo(accessToken);

            let result = await this.usersService.getUsers();
            const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE);
         
            for (let i = 0; i < result.length; i++) {

                if (result[i].email == email.email) {

                    let user = {
                        sub: result[i].id,
                        role: result[i].role,
                        token: jwt
                    };
                   
                    return user;
                }

            }
            return {};

        }
        catch (err) {
            return err;
        }
    }

}