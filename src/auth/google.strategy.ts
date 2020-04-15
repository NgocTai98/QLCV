import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { AuthService, Provider } from "./auth.service";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{
    
    constructor(
        private readonly authService: AuthService
    )
    {
        super({
            clientID    : '829062708980-ms9d1e1p7povurfm24iotgauv56gaih1.apps.googleusercontent.com',     // <- Replace this with your client id
            clientSecret: 'BjeY8CEYUL0rV1AWOob2vCY4', // <- Replace this with your client secret
            callbackURL : 'http://localhost:3000/auth/google/callback',
            passReqToCallback: true,
            scope: ['profile']
        })
    }


    async validate(request: any, accessToken: string, refreshToken: string, profile: { id: string; }, done: Function)
    {
        try
        {
            console.log(profile);

            const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE);
            const user = 
            {
                jwt
            }

            done(accessToken, user);
        }
        catch(err)
        {
            console.log(err)
            done(err, false);
        }
    }

}