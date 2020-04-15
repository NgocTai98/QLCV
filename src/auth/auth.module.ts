import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserRepository } from 'src/users/user.repository';
import { UserRepository } from '../users/user.repository';




@Module({
    imports: [
        JwtModule.register({
            secret: 'secretKey',
            signOptions: {
                expiresIn: 3600,
            }
        }),
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        TypeOrmModule.forFeature([UserRepository])
        
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {
}
