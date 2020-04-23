import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './experience.entity';
import { Repository } from 'typeorm';
import { ExperiencesRepository } from './experience.repository';
import { JwtService } from '@nestjs/jwt';
import { ExperienceCredentialsDto } from './dto/experience-credentials.dto';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class ExperienceService {
    constructor(
        @InjectRepository(Experience) private ExperienceRepository: Repository<Experience>,
        private ExperiencesRepository: ExperiencesRepository,
        private jwtService: JwtService,
        private employeeService: EmployeeService
    ) { }

    async getExperience(id: number): Promise<Experience[]> {

        return await this.ExperiencesRepository.getExperience(id);
    }

    async createExperience(id: any, experienceCredentialsDto: ExperienceCredentialsDto, token: string): Promise<Experience> {

        let userId = await this.jwtService.verify(token);
        let newEx = await this.ExperiencesRepository.createExperience(id, experienceCredentialsDto, userId.sub);
        let employee = await this.employeeService.findOneEmployee(id);
        employee.user = userId.sub;
        employee.save();

        return newEx;
    }

    async updateExxperience(id: number, experienceCredentialsDto: ExperienceCredentialsDto, idEx: number, token: string): Promise<Experience> {
        let userId = await this.jwtService.verify(token);
        let updateEx = await this.ExperiencesRepository.updateExperience(id, experienceCredentialsDto, idEx, userId.sub);
        let employee = await this.employeeService.findOneEmployee(id);
        employee.user = userId.sub;
        employee.save();
        return updateEx;
    }

    async deleteExxperience(id: number, idEx: number, token: string): Promise<void> {
        let userId = await this.jwtService.verify(token);
        await this.ExperiencesRepository.deleteExperience(id, idEx);
        let employee = await this.employeeService.findOneEmployee(id);
        employee.user = userId.sub;
        employee.save();
    }
}
