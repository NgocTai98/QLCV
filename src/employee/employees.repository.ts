import { Repository, EntityRepository } from "typeorm";
import { Employee } from "./employee.entity";
import { EmployeeCredentialsDto } from "./dto/employee-credentials.dto";
import { InternalServerErrorException } from '@nestjs/common'

@EntityRepository(Employee)
export class EmployeesRepository extends Repository<Employee> {
    async getEmployee() {
        let employees = await this.find({ select: ["employeeCode", "name", "reference", "user"], relations: ["user", "quanlifications", "experiences", "educations"] });
        return employees;
    }
    async createEmployee(employeeCredentialsDto: EmployeeCredentialsDto, id: any) {
        const { employeeCode, name, reference } = employeeCredentialsDto;
        const newEmployee = new Employee();
        newEmployee.employeeCode = employeeCode;
        newEmployee.name = name;
        newEmployee.reference = reference;
        newEmployee.user = id;
        try {
            await newEmployee.save();
        } catch (error) {
            throw new InternalServerErrorException();

        }
    }

    async deleteEmployee(id: number) {
        
        return await this.delete(id);
    }
    async updateEmployee(id: number, employeeCredentialsDto: EmployeeCredentialsDto, userId: any) {
        const { employeeCode, name, reference } = employeeCredentialsDto;
        
        const employee = await this.findOne(id);
       
        employee.employeeCode = employeeCode;
        employee.name = name;
        employee.reference = reference;
        employee.user = userId;
        try {
            await employee.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }

    }

    async findOneEmployee(id: number){
       return await this.findOne(id);
    }
}