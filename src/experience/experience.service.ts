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

    async getExperience() {
       
       return await this.ExperiencesRepository.getExperience();
    }

    async createExperience(id: any, experienceCredentialsDto: ExperienceCredentialsDto, token: string) {
      
        let userId = await this.jwtService.verify(token);       
        await this.ExperiencesRepository.createExperience(id, experienceCredentialsDto, userId.sub);
        let employee = await this.employeeService.findOneEmployee(id);
        employee.user = userId.sub;
        employee.save();
        
        return experienceCredentialsDto;
    }

    async updateExxperience(id: number, experienceCredentialsDto: ExperienceCredentialsDto, idEx: number, token: string) {
        let userId = await this.jwtService.verify(token);
        await this.ExperiencesRepository.updateExperience(id, experienceCredentialsDto, idEx, userId.sub);
        let employee = await this.employeeService.findOneEmployee(id);
        employee.user = userId.sub;
        employee.save();
        return experienceCredentialsDto;
    }

    async deleteExxperience(id: number, idEx: number, token: string) {
        let userId = await this.jwtService.verify(token);
        await this.ExperiencesRepository.deleteExperience(id, idEx);
        let employee = await this.employeeService.findOneEmployee(id);
        employee.user = userId.sub;
        employee.save();
    }
}
