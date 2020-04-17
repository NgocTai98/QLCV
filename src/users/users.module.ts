import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { PassportModule } from '@nestjs/passport';




@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Users]),
    // AuthModule,
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1d',
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),

  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [
    TypeOrmModule,
    UsersService,

  ]

})
export class UsersModule { }
