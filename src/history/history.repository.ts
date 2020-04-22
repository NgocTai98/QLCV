import { Repository, EntityRepository } from "typeorm";
import { History } from "./history.entity";
import * as moment from 'moment'
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(History)
export class HistoryRepository extends Repository<History> {

    async getHistory() {
       
    }

    async createHistory() {
        
       
    }

    async updateHistory() {

    }

    async deleteHistory() {

    }
}