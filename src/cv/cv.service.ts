import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './cv.entity';
import { Repository } from 'typeorm';
import { CvRepository } from './cv.repository';
import { JwtService } from '@nestjs/jwt';
import { CvCredentialsDto } from './dto/cv-credentials.dto';
import { HistoryService } from 'src/history/history.service';
import { CvprojectService } from 'src/cvproject/cvproject.service';
import { InfoquanlificationService } from 'src/infoquanlification/infoquanlification.service';

@Injectable()
export class CvService {
    constructor(
        @InjectRepository(Cv) private CvRepository: Repository<Cv>,
        private cvRepository: CvRepository,
        private jwtService: JwtService,
        private historyService: HistoryService,
        private cvprojectService: CvprojectService,
        private infoQuanService: InfoquanlificationService
    ) { }

    async listCv(): Promise<Cv[]> {
        return await this.cvRepository.listCv();
    }


    async getCv(id: number): Promise<Cv[]> {

        return await this.cvRepository.getCv(id);
    }

    async createCv(id: number, cvCredentialsDto: CvCredentialsDto, token: string): Promise<Cv> {
        let userId = await this.jwtService.verify(token);
        let newCv = await this.cvRepository.createCv(id, cvCredentialsDto, userId.sub);
        await this.infoQuanService.create(newCv.id, newCv.employee);
        await this.cvprojectService.addCvPro(newCv.id);
        await this.historyService.createHistory(newCv.id, userId.sub);

        return newCv;
    }
    async updateCv(id: number, cvCredentialsDto: CvCredentialsDto, idCv: number, token: string): Promise<Cv> {
        let userId = await this.jwtService.verify(token);
        let updateCv = await this.cvRepository.updateCv(id, cvCredentialsDto, idCv);
        let history = await this.historyService.createHistory(idCv, userId.sub);
        return updateCv;
    }

    async deleteCv(idCv: number): Promise<void> {
        // let userId = await this.jwtService.verify(token);
        let infoquanlification = await this.infoQuanService.deleteToCv(idCv);
        let history = await this.historyService.deleteHistory(idCv);

        await this.cvRepository.deleteCv(idCv);
    }

    // async searchUserCreater(cvCredentialsDto: CvCredentialsDto) {
    //     await this.cvRepository.searchUserCreater(cvCredentialsDto);
    // }

    async searchTechnology(cvCredentialsDto: CvCredentialsDto) {
        const { technology } = cvCredentialsDto;
        let cvId = await this.cvprojectService.findTechnology(technology);
        let searchTechnology = await this.cvRepository.searchTechnology(cvId);
        return searchTechnology;

    }

    async filterUser(id: number): Promise<Cv[]> {
        return await this.cvRepository.filterUser(id);
    }

    async filterEmployee(id: number): Promise<Cv[]> {
        return await this.cvRepository.filterEmployee(id);
    }

    async searchHashTag(body: any): Promise<Cv[]> {
        return await this.cvRepository.searchHashTag(body);
    }


}
