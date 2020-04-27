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
import { ProjectModule } from './project/project.module';
import { TitleModule } from './title/title.module';
import { CvModule } from './cv/cv.module';
import { CvprojectModule } from './cvproject/cvproject.module';
import { HistoryModule } from './history/history.module';
import { InfoquanlificationModule } from './infoquanlification/infoquanlification.module';






@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    // UsersModule,
     forwardRef(() => UsersModule),
    AuthModule,
    EmployeeModule,
    QuanlificationModule,
    ExperienceModule,
    EducationModule,
    ProjectModule,
    TitleModule,
    CvModule,
    CvprojectModule,
    HistoryModule,
    InfoquanlificationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
