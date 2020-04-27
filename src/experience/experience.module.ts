import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './experience.entity';
import { ExperiencesRepository } from './experience.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { PassportModule } from '@nestjs/passport';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Experience]),
    TypeOrmModule.forFeature([ExperiencesRepository]),
    JwtModule.register({
      secret: jwtConstants.clientSecret,
      signOptions: {
        expiresIn: '1d',
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    EmployeeModule
  ],
  providers: [ExperienceService],
  controllers: [ExperienceController]
})
export class ExperienceModule {}
