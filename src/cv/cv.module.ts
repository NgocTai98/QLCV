import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvRepository } from './cv.repository';
import { Cv } from './cv.entity';
import { HistoryModule } from 'src/history/history.module';

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
    TypeOrmModule.forFeature([CvRepository]),
    TypeOrmModule.forFeature([Cv]),
    HistoryModule
  ],
  providers: [CvService],
  controllers: [CvController]
})
export class CvModule {}
