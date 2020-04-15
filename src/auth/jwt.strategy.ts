import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    // async validate(payload: any) {
    //     if (payload.role == 1) {
    //         return { role: payload.role, email: payload.email };
    //     } else {
    //         throw new UnauthorizedException('Your permission is not admin so you can not access to system');
    //     }
    // }

    async validate(payload: any, done: Function)
    {
        try
        {
            // You could add a function to the authService to verify the claims of the token:
            // i.e. does the user still have the roles that are claimed by the token
            // const validClaims = await this.authService.verifyTokenClaims(payload);
            
            // if (!validClaims)
            //    return done(new UnauthorizedException('invalid token claims'), false);
    
            // done(validClaims, payload);
            done(null, payload);
        }
        catch (err)
        {
            throw new UnauthorizedException('unauthorized', err.message);
        }
    }

}