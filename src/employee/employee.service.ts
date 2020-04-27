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

    async getEmployee(): Promise<Employee[]> {

        return await this.employeesRepository.getEmployee();
    }

    async createEmployee(employeeCredentialsDto: EmployeeCredentialsDto, token: string): Promise<Employee> {
        let userId = this.jwtService.verify(token);

        let newEm = await this.employeesRepository.createEmployee(employeeCredentialsDto, userId.sub);
        return newEm;
    }

    async deleteEmployee(id: number): Promise<void> {
        await this.employeesRepository.deleteEmployee(id);
    }

    async updateEmployee(id: number, employeeCredentialsDto: EmployeeCredentialsDto, token: string): Promise<Employee> {
        let userId = this.jwtService.verify(token);

        let updateEm = await this.employeesRepository.updateEmployee(id, employeeCredentialsDto, userId.sub);
        return updateEm;
    }

    async findOneEmployee(id: number): Promise<Employee> {

        return await this.employeesRepository.findOneEmployee(id);
    }

    async searchEmployee(body: any): Promise<Employee[]> {
       return await this.employeesRepository.searchEmployee(body);
    }

    // async findEmployee(id: number){
    //     return await this.employeesRepository.findOneEmployee(id);
    // }

}
