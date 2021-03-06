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
            secretOrKey: jwtConstants.clientSecret,
        });
    }


    async validate(payload: any, done: Function) {
        try {
           
            return { sub: payload.id, role: payload.role };

        }
        catch (err) {
            return new UnauthorizedException('unauthorized', err.message);
        }

    }

}