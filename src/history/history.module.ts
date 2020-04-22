import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './history.entity';
import { HistoryRepository } from './history.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([History]),
    TypeOrmModule.forFeature([HistoryRepository]),
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
  providers: [HistoryService],
  controllers: [HistoryController],
  exports: [HistoryService]
})
export class HistoryModule {}
