import { Module } from '@nestjs/common';
import { CvprojectService } from './cvproject.service';
import { CvprojectController } from './cvproject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvProjectRepository } from './cvproject.repository';
import { Cvproject } from './cvproject.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { PassportModule } from '@nestjs/passport';
import { HistoryModule } from 'src/history/history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CvProjectRepository]),
    TypeOrmModule.forFeature([Cvproject]),
    JwtModule.register({
      secret: jwtConstants.clientSecret,
      signOptions: {
        expiresIn: '1d',
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    HistoryModule
  ],
  providers: [CvprojectService],
  controllers: [CvprojectController],
  exports: [CvprojectService]
})
export class CvprojectModule {}
