import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './history.entity';
import { Repository } from 'typeorm';
import { HistoryRepository } from './history.repository';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment'
import { InternalServerErrorException } from "@nestjs/common";


@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(History) private HistoryRepository: Repository<History>,
        private historyRepository: HistoryRepository,
        private jwtService: JwtService
    ) { }

    async getHistory(id: number): Promise<History[]> {
        let history = await this.HistoryRepository.find({ select: ["time"], relations: ["cv", "user"], where: [{ cv: id }] });
        history.forEach(element => {
            delete element.cv.id;
            delete element.user.id;
            delete element.user.password;
            delete element.user.role;
        });
        return history;

    }

    async createHistory(idCv: any, userId: any): Promise<History> {
        const newHistory = new History();
        newHistory.time = moment().utc().format();
        newHistory.cv = idCv;
        newHistory.user = userId;
        try {
            await newHistory.save();
            return newHistory;
        } catch (error) {
            throw new InternalServerErrorException();
        }


    }

    async updateHistory() {

    }

    async deleteHistory(idCv: number) {
        let history = await this.HistoryRepository.find({
            where: { cv: idCv }
        })
        for (let i = 0; i < history.length; i++) {
            const e = history[i];
            await this.HistoryRepository.delete(e.id);
        }
    }
}
