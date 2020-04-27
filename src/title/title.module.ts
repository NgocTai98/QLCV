import { Module } from '@nestjs/common';
import { TitleService } from './title.service';
import { TitleController } from './title.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TitleRepository } from './title.repository';
import { Title } from './title.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([TitleRepository]),
    TypeOrmModule.forFeature([Title]),
    JwtModule.register({
      secret: jwtConstants.clientSecret,
      signOptions: {
        expiresIn: '1d',
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
  ],
  providers: [TitleService],
  controllers: [TitleController]
})
export class TitleModule {}
