import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { EmployeesRepository } from './employees.repository';
import { EmployeeCredentialsDto } from './dto/employee-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee) private EmployeeRepository: Repository<Employee>,
        private employeesRepository: EmployeesRepository,
        private jwtService: JwtService
    ) { }

    async getEmployee() {

        return await this.employeesRepository.getEmployee();
    }

    async createEmployee(employeeCredentialsDto: EmployeeCredentialsDto, token: string) {
        let userId = this.jwtService.verify(token);
       
        await this.employeesRepository.createEmployee(employeeCredentialsDto, userId.sub);
        return employeeCredentialsDto;
    }

    async deleteEmployee(id: number): Promise<void> {
        await this.employeesRepository.deleteEmployee(id);
    }

    async updateEmployee(id: number, employeeCredentialsDto: EmployeeCredentialsDto, token: string) {
        let userId = this.jwtService.verify(token);
       
        await this.employeesRepository.updateEmployee(id, employeeCredentialsDto, userId.sub);
        return employeeCredentialsDto;
    }

    async findOneEmployee(id: number){
       
        return await this.employeesRepository.findOneEmployee(id);
    }

}
