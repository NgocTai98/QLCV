import { Repository, EntityRepository, Like } from "typeorm";
import { Employee } from "./employee.entity";
import { EmployeeCredentialsDto } from "./dto/employee-credentials.dto";
import { InternalServerErrorException } from '@nestjs/common'

@EntityRepository(Employee)
export class EmployeesRepository extends Repository<Employee> {
    async getEmployee(): Promise<Employee[]> {
        let employees = await this.find({ select: ["employeeCode", "name", "reference", "position"], relations: ["user", "quanlifications", "experiences", "educations", "cvs"] });
        employees.forEach(element => {
            delete element.user.id;
            delete element.user.password;
            delete element.user.role;
            element.quanlifications.forEach(e => {
                delete e.id
            });
            element.experiences.forEach(e => {
                delete e.id
            });
            element.educations.forEach(e => {
                delete e.id
            });
            element.cvs.forEach(e => {
                delete e.id
            });
        });
        return employees;
    }
    async createEmployee(employeeCredentialsDto: EmployeeCredentialsDto, id: any): Promise<Employee> {
        const { employeeCode, name, reference, position } = employeeCredentialsDto;
        const newEmployee = new Employee();
        newEmployee.employeeCode = employeeCode;
        newEmployee.name = name;
        newEmployee.position = position;
        newEmployee.reference = reference;
        newEmployee.user = id;
        try {
            await newEmployee.save();
            return newEmployee;
        } catch (error) {
            throw new InternalServerErrorException();

        }
    }

    async deleteEmployee(id: number): Promise<void> {

        await this.delete(id);
    }
    async updateEmployee(id: number, employeeCredentialsDto: EmployeeCredentialsDto, userId: any): Promise<Employee> {
        const { employeeCode, name, reference, position } = employeeCredentialsDto;

        const employee = await this.findOne(id);

        employee.employeeCode = employeeCode;
        employee.name = name;
        employee.position = position;
        employee.reference = reference;
        employee.user = userId;
        try {
            await employee.save();
            return employee;
        } catch (error) {
            throw new InternalServerErrorException();
        }

    }

    async findOneEmployee(id: number): Promise<Employee> {
        return await this.findOne(id);
    }

    async searchEmployee(body: any): Promise<Employee[]> {
        let result = await this.find({
            select: ["employeeCode", "name", "reference", "position"],
            where: {
                name: Like(`%${body.search}%`)
            },
            relations: ["user", "quanlifications", "experiences", "educations", "cvs"]
        })
        let result2 = await this.find({
            select: ["employeeCode", "name", "reference", "position"],
            where: {
                employeeCode: Like(`%${body.search}%`)
            },
            relations: ["user", "quanlifications", "experiences", "educations", "cvs"]
        })
        let result3 = await this.find({
            select: ["employeeCode", "name", "reference", "position"],
            where: {
                position: Like(`%${body.search}%`)
            },
            relations: ["user", "quanlifications", "experiences", "educations", "cvs"]
        })
        if (result.length != 0) {
            result.forEach(element => {
                delete element.user.id;
                delete element.user.password;
                delete element.user.role;
                element.quanlifications.forEach(e => {
                    delete e.id
                });
                element.experiences.forEach(e => {
                    delete e.id
                });
                element.educations.forEach(e => {
                    delete e.id
                });
                element.cvs.forEach(e => {
                    delete e.id
                });
            });
            return result;
        }
        if (result2.length != 0) {
            result2.forEach(element => {
                delete element.user.id;
                delete element.user.password;
                delete element.user.role;
                element.quanlifications.forEach(e => {
                    delete e.id
                });
                element.experiences.forEach(e => {
                    delete e.id
                });
                element.educations.forEach(e => {
                    delete e.id
                });
                element.cvs.forEach(e => {
                    delete e.id
                });
            });
            return result2;
        }
        if (result3.length != 0) {
            result3.forEach(element => {
                delete element.user.id;
                delete element.user.password;
                delete element.user.role;
                element.quanlifications.forEach(e => {
                    delete e.id
                });
                element.experiences.forEach(e => {
                    delete e.id
                });
                element.educations.forEach(e => {
                    delete e.id
                });
                element.cvs.forEach(e => {
                    delete e.id
                });
            });
            return result3;
        }
    }

    // async findEmployee(id: number){
    //     let em = await this.find({
    //         where: {}
    //     })
    // }

    async filterUser(id: number) {
        let employees = await this.find({
            where: {
                user: id
            },
            select: ["employeeCode", "name", "reference", "position"],
            relations: ["user", "quanlifications", "experiences", "educations", "cvs"]
        })
        employees.forEach(element => {
            delete element.user.id;
            delete element.user.password;
            delete element.user.role;
            element.quanlifications.forEach(e => {
                delete e.id
            });
            element.experiences.forEach(e => {
                delete e.id
            });
            element.educations.forEach(e => {
                delete e.id
            });
            element.cvs.forEach(e => {
                delete e.id
            });
        });
        return employees;
    }
}