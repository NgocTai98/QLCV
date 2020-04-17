import { Controller, Get, UseGuards, Response, Post, Body, ValidationPipe, Request, Delete, Param, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { AuthGuard } from '@nestjs/passport';
import { EmployeeCredentialsDto } from './dto/employee-credentials.dto';

@Controller('employee')
export class EmployeeController {
    constructor (
        private EmployeeService: EmployeeService
    ) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getEmployees(@Response() res: any) {
        try {
            let employees = await this.EmployeeService.getEmployee();
            return res.json({
                message: "Danh sách employee",
                data: employees
            })
        } catch (error) {
            return res.json({
                message: "Không thể hiển thị danh sách employee"
            })
        }
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createEmployee(@Body(ValidationPipe) employeeCredentialsDto: EmployeeCredentialsDto, @Response() res: any, @Request() req: any) {
        try {
            let parts = req.headers.authorization.split(' ');
            let token = parts[1];
            let newEmployee = await this.EmployeeService.createEmployee(employeeCredentialsDto, token);
            return res.json({
                message: "Thêm mới employee thành công",
                data: newEmployee
            })
        } catch (error) {
            return res.json({
                message: "Thêm mới employee không thành công"
            })
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteEmployee(@Param() params: any, @Response() res: any) {
        try {
            await this.EmployeeService.deleteEmployee(params.id);
            return res.json({
                message: "Đã xóa thành công"
            })
        } catch (error) {
            return res.json({
                message: "Xóa employee không thành công"
            })
        }
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async updateEmployee(@Body(ValidationPipe) employeeCredentialsDto: EmployeeCredentialsDto, @Response() res: any, @Request() req: any, @Param() params: any){
        try {
            let parts = req.headers.authorization.split(' ');
            let token = parts[1];
            let updateEmployee = await this.EmployeeService.updateEmployee(params.id, employeeCredentialsDto, token);
            return res.json({
                message: "Đã sửa thành công employee",
                data: updateEmployee
            })
        } catch (error) {
            
        }
    }


}
