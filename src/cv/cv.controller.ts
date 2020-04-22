import { Controller, Get, UseGuards, Post, Put, Delete, Param, Body, ValidationPipe, Response, Request } from '@nestjs/common';
import { CvService } from './cv.service';
import { AuthGuard } from '@nestjs/passport';
import { CvCredentialsDto } from './dto/cv-credentials.dto';

@Controller('employee')
export class CvController {
    constructor(
        private cvService: CvService
    ){}

    @Get(':id/cv')
    @UseGuards(AuthGuard('jwt'))
    async getCv(@Param() param: any, @Response() res: any) {
        try {
            let cv = await this.cvService.getCv(param.id);
            return res.json({
                message: "Danh sách CV",
                data: cv
            })
        } catch (error) {
            
        }
    }

    @Post(':id/cv')
    @UseGuards(AuthGuard('jwt'))
    async createCv(@Param() param: any, @Body(ValidationPipe) cvCredentialsDto: CvCredentialsDto, @Response() res: any, @Request() req: any) {
        try {
            let parts = req.headers.authorization.split(" ");
            let token = parts[1];
            let newCv = await this.cvService.createCv(param.id, cvCredentialsDto, token);
            return res.json({
                message: "Đã thêm thành công",
                data: newCv
            })
        } catch (error) {
            return res.json({
                message: "Không thể thêm mới"
            })
        }
    }

    @Put(':id/cv/:idCv')
    @UseGuards(AuthGuard('jwt'))
    async updateCv(@Param() param: any, @Body(ValidationPipe) cvCredentialsDto: CvCredentialsDto, @Response() res: any, @Request() req: any) {
        try {
            let parts = req.headers.authorization.split(" ");
            let token = parts[1];
            let updateCv = await this.cvService.updateCv(param.id, cvCredentialsDto, param.idCv, token);
            return res.json({
                message: "Đã sửa thành công",
                data: updateCv
            })
        } catch (error) {
            return res.json({
                message: "Không thể sửa thành công"
            })
        }
    }

    @Delete(':id/cv/:idCv')
    @UseGuards(AuthGuard('jwt'))
    async deleteCv(@Param() param: any, @Response() res: any) {
        try {
            await this.cvService.deleteCv(param.idCv);
            return res.json({
                message: "Đã xóa thành công"
            })
        } catch (error) {
            return res.json({
                message: "Không thể xóa"
            })
        }
    }
}
