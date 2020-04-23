import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cvproject } from './cvproject.entity';
import { Repository } from 'typeorm';
import { CvProjectRepository } from './cvproject.repository';
import { JwtService } from '@nestjs/jwt';
import { CvProjectCredentialsDto } from './dto/cvproject-credentials.dto';
import { HistoryService } from 'src/history/history.service';

@Injectable()
export class CvprojectService {
    constructor(
        @InjectRepository(Cvproject) private CvprojectRepository: Repository<Cvproject>,
        private cvprojectRepository: CvProjectRepository,
        private jwtService: JwtService,
        private historyService: HistoryService
    ) { }
    async getCvProject(id: number) {
        return await this.cvprojectRepository.getCvProject(id);
    }

    async createCvProject(id: number, cvProjectCredentialsDto: CvProjectCredentialsDto, token: string): Promise<Cvproject> {
        let userId = await this.jwtService.verify(token);
        let newCvpro = await this.cvprojectRepository.createCvProject(id, cvProjectCredentialsDto);
        let history = await this.historyService.createHistory(id, userId.sub);
        return newCvpro;
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
}
