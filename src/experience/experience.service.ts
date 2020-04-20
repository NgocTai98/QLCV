import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './experience.entity';
import { Repository } from 'typeorm';
import { ExperiencesRepository } from './experience.repository';
import { JwtService } from '@nestjs/jwt';
import { ExperienceCredentialsDto } from './dto/experience-credentials.dto';

@Injectable()
export class ExperienceService {
    constructor(
        @InjectRepository(Experience) private ExperienceRepository: Repository<Experience>,
        private ExperiencesRepository: ExperiencesRepository,
        private jwtService: JwtService
    ) { }

    async getExperience() {
       
       return await this.ExperiencesRepository.getExperience();
    }

    async createExperience(id: any, experienceCredentialsDto: ExperienceCredentialsDto, token: string) {
      
        let userId = await this.jwtService.verify(token);       
        await this.ExperiencesRepository.createExperience(id, experienceCredentialsDto, userId.sub)
        return experienceCredentialsDto;
    }

    async updateExxperience(id: number, experienceCredentialsDto: ExperienceCredentialsDto, idEx: number, token: string) {
        let userId = await this.jwtService.verify(token);
        await this.ExperiencesRepository.updateExperience(id, experienceCredentialsDto, idEx, userId.sub);
        return experienceCredentialsDto;
    }

    async deleteExxperience(id: number, idEx: number) {
        await this.ExperiencesRepository.deleteExperience(id, idEx);
    }
}
