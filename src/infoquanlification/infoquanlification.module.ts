import { Module } from '@nestjs/common';
import { InfoquanlificationService } from './infoquanlification.service';
import { InfoquanlificationController } from './infoquanlification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoQuanRepository } from './infoquanlification.repository';
import { Infoquanlification } from './infoquanlification.entity';
import { QuanlificationModule } from 'src/quanlification/quanlification.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { PassportModule } from '@nestjs/passport';
import { HistoryModule } from 'src/history/history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InfoQuanRepository]),
    TypeOrmModule.forFeature([Infoquanlification]),
    QuanlificationModule,
    HistoryModule,
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
  providers: [InfoquanlificationService],
  controllers: [InfoquanlificationController],
  exports: [InfoquanlificationService]
})
export class InfoquanlificationModule {}
