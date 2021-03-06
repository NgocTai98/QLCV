import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Education } from './education.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { EducationsRepository } from './education.repository';
import { EducationCredentialsDto } from './dto/education-credentials.dto';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class EducationService {
    constructor(
        @InjectRepository(Education) private EducationRespository: Repository<Education>,
        private educationsRespository: EducationsRepository,
        private jwtService: JwtService,
        private employeeService: EmployeeService
    ) { }

    async getEducation(id: number): Promise<Education[]> {
        return await this.educationsRespository.getEducation(id);
    }

    async createEducation(id: number, educationCredentialsDto: EducationCredentialsDto, token: string): Promise<Education> {
        let userId = await this.jwtService.verify(token);
        let newEdu = await this.educationsRespository.createEducation(id, educationCredentialsDto, userId.sub);

        let employee = await this.employeeService.findOneEmployee(id);
        employee.user = userId.sub;
        employee.save();
        return newEdu;
    }

    async updateEducation(id: number, educationCredentialsDto: EducationCredentialsDto, idEdu: number, token: string): Promise<Education> {
        let userId = await this.jwtService.verify(token);
        let updateEdu = await this.educationsRespository.updateEducation(id, educationCredentialsDto, idEdu, userId.sub);
        let employee = await this.employeeService.findOneEmployee(id);
        employee.user = userId.sub;
        employee.save();
        return updateEdu;
    }

    async deleteEducation(id: number, idEdu: number, token: string): Promise<void> {
        let userId = await this.jwtService.verify(token);
        await this.educationsRespository.deleteEducation(idEdu);
        let employee = await this.employeeService.findOneEmployee(id);
        employee.user = userId.sub;
        employee.save();
    }

}
