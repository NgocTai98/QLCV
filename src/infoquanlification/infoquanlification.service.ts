import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Infoquanlification } from './infoquanlification.entity';
import { Repository } from 'typeorm';
import { InfoQuanRepository } from './infoquanlification.repository';
import { QuanlificationService } from 'src/quanlification/quanlification.service';
import { InfoQuanCredentialsDto } from './dto/infoquanlification-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { HistoryService } from 'src/history/history.service';


@Injectable()
export class InfoquanlificationService {
    constructor(
        @InjectRepository(Infoquanlification) private InfoQuanRepository: Repository<Infoquanlification>,
        private infoQuanRepository: InfoQuanRepository,
        private quanlificationService: QuanlificationService,
        private jwtService: JwtService,
        private historyService: HistoryService
    ) { }

    async getInfoQuan(id: number): Promise<Infoquanlification[]> {
        return await this.infoQuanRepository.getInfoQuan(id);
    }

    async create(idCv: number, idEm: any) {
        let quan = await this.quanlificationService.findQuan(idEm);
        
        for (let i = 0; i < quan.length; i++) {
            const e = quan[i];
            let newInfoQuan = await this.infoQuanRepository.createDefault(idCv, e.name);
        }
    }

    async updateInfoQuan(idCv: number, infoQuanCredentialsDto: InfoQuanCredentialsDto, id: number, token: string): Promise<Infoquanlification> {
        let userId = await this.jwtService.verify(token);
        let info = await this.infoQuanRepository.updateInfoQuan(idCv, infoQuanCredentialsDto, id);
        await this.historyService.createHistory(idCv, userId.sub);
        return info;
    }

    async deleteInfoQuan(idCv: number, id: number, token: string) {
        let userId = await this.jwtService.verify(token);
        let info = await this.infoQuanRepository.deleteInfoQuan(id);
        await this.historyService.createHistory(idCv, userId.sub);
        return info;
    }
    async createInfoQuan(idCv: number, body: any, token: string): Promise<void> {
        let userId = await this.jwtService.verify(token);
        let newinfoQuan =  await this.infoQuanRepository.createInfoQuan(idCv, body);
        await this.historyService.createHistory(idCv, userId.sub);
        return newinfoQuan;
    }

    async deleteToCv(cvId: number){
        let info = await this.InfoQuanRepository.find({
            where: {cv: cvId}
        });
        for (let i = 0; i < info.length; i++) {
            const e = info[i];
            await this.InfoQuanRepository.delete(e.id);
        }
    }
}
