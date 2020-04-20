import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Education } from './education.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { EducationsRepository } from './education.repository';
import { EducationCredentialsDto } from './dto/education-credentials.dto';

@Injectable()
export class EducationService {
    constructor(
        @InjectRepository(Education) private EducationRespository: Repository<Education>,
        private educationsRespository: EducationsRepository,
        private jwtService: JwtService
    ) { }

    async getEducation() {
        await this.educationsRespository.getEducation();
    }

    async createEducation(id: number, educationCredentialsDto: EducationCredentialsDto, token: string) {
        let userId = await this.jwtService.verify(token);
        await this.educationsRespository.createEducation(id, educationCredentialsDto, userId.sub);
        return educationCredentialsDto;
    }

    async updateEducation(id: number, educationCredentialsDto: EducationCredentialsDto, idEdu: number, token: string) {
        let userId = await this.jwtService.verify(token);
        await this.educationsRespository.updateEducation(id, educationCredentialsDto, idEdu, userId.sub);
        return educationCredentialsDto;
    }

    async deleteEducation(idEdu: number) {
        await this.educationsRespository.deleteEducation(idEdu);
    }

}
