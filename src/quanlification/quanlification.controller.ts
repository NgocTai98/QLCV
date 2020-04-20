import { Controller, Get, UseGuards, Post, Put, Delete, Response, Body, ValidationPipe, Request, Param } from '@nestjs/common';
import { QuanlificationService } from './quanlification.service';
import { AuthGuard } from '@nestjs/passport';
import { QuanlificationCredentialsDto } from './dto/quanlification-credentials.dto';

@Controller('employee')
export class QuanlificationController {
    constructor(
        private quanlificationService: QuanlificationService
    ) { }

    @Get(':id/quanlification')
    @UseGuards(AuthGuard('jwt'))
    async getQuanlification(@Response() res: any, @Param() param) {
        try {
           
            let quan = await this.quanlificationService.getQuanlification();
            return res.json({
                message: "Danh sach quanlification",
                data: quan
            })
        } catch (error) {
            return res.json({
                message: "khong the hien thi"
            })
        }
    }

    @Post(':id/quanlification')
    @UseGuards(AuthGuard('jwt'))
    async createQuanlification(@Param() param: any, @Body(ValidationPipe) quanlificationCredentials: QuanlificationCredentialsDto, @Response() res: any, @Request() req: any) {
        try {
            let idEmployee = param.id; 
            let parts = req.headers.authorization.split(' ');
            let token = parts[1];
            let newQuan = await this.quanlificationService.createQuanlification(idEmployee, quanlificationCredentials, token);
            return res.json({
                message: "Da them thanh cong",
                data: newQuan
            })
        } catch (error) {
            return res.json({
                message: "Không thể thêm mới thành công"
            })
        }
    }

    @Put(':id/quanlification/:quanId')
    @UseGuards(AuthGuard('jwt'))
    async updateQuanlification(@Param() param: any, @Body(ValidationPipe) quanlificationCredentials: QuanlificationCredentialsDto, @Response() res: any, @Request() req: any) {
        try {
            let parts = req.headers.authorization.split(' ');
            let token = parts[1];
            let updateQuan = await this.quanlificationService.updateQuanlification(param.id, quanlificationCredentials, param.quanId, token);
            return res.json({
                message: "Đã sửa thành công",
                data: updateQuan
            })
        } catch (error) {
            
        }
    }

    @Delete(':id/quanlification/quanId')
    @UseGuards(AuthGuard('jwt'))
    async deleteQuanlification(@Param() param: any, @Response() res: any, @Request() req:any) {
        try {
            let parts = req.headers.authorization.split(' ');
            let token = parts[1];
            await this.quanlificationService.deleteQuanlification(param.id, param.quanId, token);
            return res.json({
                message: "Đã xóa thành công"
            })
        } catch (error) {
            return res.json({
                message: "Xóa không thành công"
            })
        }
    }

}
