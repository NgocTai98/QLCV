import { Module } from '@nestjs/common';
import { QuanlificationService } from './quanlification.service';
import { QuanlificationController } from './quanlification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuanlificationRepository } from './quanlification.repository';
import { Quanlification } from './quanlification.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuanlificationRepository]),
    TypeOrmModule.forFeature([Quanlification]),
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
  providers: [QuanlificationService],
  controllers: [QuanlificationController]
})
export class QuanlificationModule {}
