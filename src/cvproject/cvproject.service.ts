import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cvproject } from './cvproject.entity';
import { Repository } from 'typeorm';
import { CvProjectRepository } from './cvproject.repository';
import { JwtService } from '@nestjs/jwt';
import { CvProjectCredentialsDto } from './dto/cvproject-credentials.dto';
import { HistoryService } from 'src/history/history.service';
import { Readable } from 'stream';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class CvprojectService {
    constructor(
        @InjectRepository(Cvproject) private CvprojectRepository: Repository<Cvproject>,
        private cvprojectRepository: CvProjectRepository,
        private jwtService: JwtService,
        private historyService: HistoryService,
        private projectService: ProjectService
    ) { }
    async getCvProject(id: number) {
        return await this.cvprojectRepository.getCvProject(id);
    }

    async createCvProject(id: number, body: any, token: string): Promise<void> {
        let userId = await this.jwtService.verify(token);
        let newCvpro = await this.cvprojectRepository.createCvProject(id, body);
        let history = await this.historyService.createHistory(id, userId.sub);
       
    }

    async updateCvProject(id: number, cvProjectCredentialsDto: CvProjectCredentialsDto, idCvpro: number, token: string): Promise<Cvproject> {
        let userId = await this.jwtService.verify(token);
        let updateCvpro = await this.cvprojectRepository.updateCvProject(id, cvProjectCredentialsDto, idCvpro);
        let history = await this.historyService.createHistory(id, userId.sub);
        return updateCvpro;
    }

    async deleteCvProject(id: number, idCvpro: number, token: string): Promise<void> {
        let userId = await this.jwtService.verify(token);
        await this.cvprojectRepository.deleteCvProject(id, idCvpro);
        let history = await this.historyService.createHistory(id, userId.sub);
    }

    async duplicateCv(id: number) {
        await this.cvprojectRepository.duplicatecv(id);
    }

    async findTechnology(tech: string) {
        return await this.cvprojectRepository.findTechnology(tech);
    }

    async addCvPro(idCv: number) {
        let project = await this.projectService.findAll();
        for (let i = 0; i < project.length; i++) {
            const e = project[i];
            let cvpro = await this.cvprojectRepository.addCvPro(idCv,e.id)
        }
    }
}
