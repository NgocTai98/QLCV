import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './cv.entity';
import { Repository } from 'typeorm';
import { CvRepository } from './cv.repository';
import { JwtService } from '@nestjs/jwt';
import { CvCredentialsDto } from './dto/cv-credentials.dto';
import { HistoryService } from 'src/history/history.service';

@Injectable()
export class CvService {
    constructor(
        @InjectRepository(Cv) private CvRepository: Repository<Cv>,
        private cvRepository: CvRepository,
        private jwtService: JwtService,
        private historyService: HistoryService
    ){}

    async getCv(id: number) {
        return await this.cvRepository.getCv(id);
    }

    async createCv(id: number, cvCredentialsDto: CvCredentialsDto, token: string) {
        let userId = await this.jwtService.verify(token);
        let newCv = await this.cvRepository.createCv(id, cvCredentialsDto);
       
        await this.historyService.createHistory(newCv.id, userId.sub);
       
        return newCv;
    }
    async updateCv(id: number, cvCredentialsDto: CvCredentialsDto, idCv: number, token: string) {
        let userId = await this.jwtService.verify(token);
        let updateCv = await this.cvRepository.updateCv(id, cvCredentialsDto, idCv);
        let history = await this.historyService.createHistory(idCv, userId.sub);
        return updateCv;
    }

    async deleteCv(idCv: number) {
        return await this.cvRepository.deleteCv(idCv);
    }
}
