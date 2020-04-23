import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quanlification } from './quanlification.entity';
import { QuanlificationRepository } from './quanlification.repository';
import { QuanlificationCredentialsDto } from './dto/quanlification-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class QuanlificationService {
    constructor(
        @InjectRepository(Quanlification) private quanlificationRepository: QuanlificationRepository,
        private jwtService: JwtService,
        private employeeService: EmployeeService
    ) { }

    async getQuanlification(id: number): Promise<Quanlification[]> {
        return await this.quanlificationRepository.getQuanlification(id);
    }

    async createQuanlification(id: number, quanlificationCredentials: QuanlificationCredentialsDto, token: string): Promise<Quanlification> {
        let userId = this.jwtService.verify(token);
        let newQuan = await this.quanlificationRepository.createQuanlification(id, quanlificationCredentials, userId.sub);
        let employee = await this.employeeService.findOneEmployee(id);
        employee.user = userId.sub;
        employee.save();
        return newQuan;
    }

    async updateQuanlification(id: number, quanlificationCredentials: QuanlificationCredentialsDto, quanId: number, token: string ): Promise<Quanlification> {
        let userId = this.jwtService.verify(token);
        let updateQuan = await this.quanlificationRepository.updateQuanlification(id, quanlificationCredentials, quanId, userId.sub);
        let employee = await this.employeeService.findOneEmployee(id);
        employee.user = userId.sub;
        employee.save();
        return updateQuan;
    }

    async deleteQuanlification(id: number, quanId: number, token: string): Promise<void> {
        let userId = this.jwtService.verify(token); 
        await this.quanlificationRepository.deleteQuanlification(id, quanId);
        let employee = await this.employeeService.findOneEmployee(id);
        employee.user = userId.sub;
        employee.save();
    }
}
