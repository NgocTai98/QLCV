import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { AuthService, Provider } from "./auth.service";
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from "src/users/users.service";
import { compare } from "bcrypt";



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{

    constructor(
        private readonly authService: AuthService,
        private usersService: UsersService
    ) {
        super({
            clientID: '829062708980-ms9d1e1p7povurfm24iotgauv56gaih1.apps.googleusercontent.com',     // <- Replace this with your client id
            clientSecret: 'BjeY8CEYUL0rV1AWOob2vCY4', // <- Replace this with your client secret
            callbackURL: 'http://localhost:3000/auth/google/callback',
            passReqToCallback: true,
            scope: ['profile', 'email']
        })
    }


    async validate(request: any, accessToken: string, refreshToken: string, profile: any, done: Function) {
        try {
            const oAuth2Client = new OAuth2Client(
                '829062708980-ms9d1e1p7povurfm24iotgauv56gaih1.apps.googleusercontent.com',
                'BjeY8CEYUL0rV1AWOob2vCY4',
                'http://localhost:3000/auth/google/callback'
            );

            let email = await oAuth2Client.getTokenInfo(accessToken);

            let result = await this.usersService.getUsers();

            for (let i = 0; i < result.length; i++) {
                const e = result[i];

                if (e.email == email.email) {
                    const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE);
                    const user =
                    {
                        jwt
                    }

                    return user;

                }

            }

        }
        catch (err) {
            console.log(err)
            done(err, false);
        }
    }

}