import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';


@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
    constructor(
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.clientSecret,
        });
    }


    async validate(payload: any, done: Function) {
        try {
           
            if (payload.role == 1) {
               
                return { sub: payload.id, email: payload.email };
            }
           
        }
        catch (err) {
            return new UnauthorizedException('unauthorized', err.message);
        }

    }

}