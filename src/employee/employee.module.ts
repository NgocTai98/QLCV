import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesRepository } from './employees.repository';
import { Employee } from './employee.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeesRepository]),
    TypeOrmModule.forFeature([Employee]),
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
  providers: [EmployeeService],
  controllers: [EmployeeController],
  exports: [EmployeeService]
})
export class EmployeeModule { }
