import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { GoogleStrategy } from './google.strategy';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';






@Module({
    imports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: '1d',
            }
        }),
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        TypeOrmModule.forFeature([UserRepository]),   
        // UsersService  ,
        // forwardRef(() => UsersModule)   
        UsersModule
    ],
    providers: [AuthService, JwtStrategy, GoogleStrategy],
    controllers: [AuthController],
    exports: [JwtStrategy, PassportModule]
})
export class AuthModule {
}
