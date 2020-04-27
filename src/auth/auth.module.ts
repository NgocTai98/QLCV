import { Module, forwardRef, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { GoogleStrategy } from './google.strategy';
import { UsersModule } from 'src/users/users.module';
import { OAuth2Client } from 'google-auth-library';
import { AdminStrategy } from './admin.strategy'






@Module({
    imports: [
        JwtModule.register({
            secret: jwtConstants.clientSecret,
            signOptions: {
                expiresIn: '1d',
            }
        }),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        TypeOrmModule.forFeature([UserRepository]),  
        forwardRef(() => UsersModule),
    ],
    providers: [AuthService, JwtStrategy, GoogleStrategy, OAuth2Client, AdminStrategy],
    controllers: [AuthController],
    exports: [JwtStrategy, PassportModule, AdminStrategy]
})
export class AuthModule {
}
