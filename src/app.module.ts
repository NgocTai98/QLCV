import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { QuanlificationModule } from './quanlification/quanlification.module';
import { ExperienceModule } from './experience/experience.module';
import { EducationModule } from './education/education.module';






@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    // UsersModule,
     forwardRef(() => UsersModule),
    AuthModule,
    EmployeeModule,
    QuanlificationModule,
    ExperienceModule,
    EducationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
