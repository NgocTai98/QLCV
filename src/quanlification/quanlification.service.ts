import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quanlification } from './quanlification.entity';
import { QuanlificationRepository } from './quanlification.repository';
import { QuanlificationCredentialsDto } from './dto/quanlification-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class QuanlificationService {
    constructor(
        @InjectRepository(Quanlification) private quanlificationRepository: QuanlificationRepository,
        private jwtService: JwtService
    ) { }

    async getQuanlification(): Promise<void> {
        await this.quanlificationRepository.getQuanlification();
    }

    async createQuanlification(id: number, quanlificationCredentials: QuanlificationCredentialsDto, token: string) {
        let userId = this.jwtService.verify(token);
        await this.quanlificationRepository.createQuanlification(id, quanlificationCredentials, userId.sub);
        return quanlificationCredentials;
    }

    async updateQuanlification(id: number, quanlificationCredentials: QuanlificationCredentialsDto, quanId: number, token: string ) {
        let userId = this.jwtService.verify(token);
        await this.quanlificationRepository.updateQuanlification(id, quanlificationCredentials, quanId, userId.sub);
        return quanlificationCredentials;
    }

    async deleteQuanlification(id: number, quanId: number) {
        await this.quanlificationRepository.deleteQuanlification(id, quanId);
    }
}
