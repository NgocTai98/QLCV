import { Controller, Get, UseGuards, Post, Put, Delete, Response, Request, Param, Body, ValidationPipe } from '@nestjs/common';
import { EducationService } from './education.service';
import { AuthGuard } from '@nestjs/passport';
import { EducationCredentialsDto } from './dto/education-credentials.dto';

@Controller('employee')
export class EducationController {
    constructor(
        private EuducationService: EducationService
    ) { }

    @Get(':id/education')
    @UseGuards(AuthGuard('jwt'))
    async getEducation(@Response() res: any) {
        try {
            let edu = await this.EuducationService.getEducation();
            return res.json({
                message: "Danh sách education"
            })
        } catch (error) {
            return res.json({
                message: "Không thể hiển thị danh sách"
            })
        }
    }

    @Post(':id/education')
    @UseGuards(AuthGuard('jwt'))
    async createEducation(@Param() param: any, @Body(ValidationPipe) educationCredentialsDto: EducationCredentialsDto, @Response() res: any, @Request() req: any) {
        try {
            let parts = req.headers.authorization.split(" ");
            let token = parts[1];
            let newEdu = await this.EuducationService.createEducation(param.id, educationCredentialsDto, token);
            return res.json({
                message: "Đã thêm mới thành công",
                data: newEdu
            })
        } catch (error) {
            return res.json({
                message: "Không thể thêm mới thành công"
            })
        }

    }

    @Put(':id/education/:idEdu')
    @UseGuards(AuthGuard('jwt'))
    async updateEducation(@Param() param: any, @Body(ValidationPipe) educationCredentialsDto: EducationCredentialsDto, @Response() res: any, @Request() req: any) {
        try {
            let parts = req.headers.authorization.split(" ");
            let token = parts[1];
            let updateEdu = await this.EuducationService.updateEducation(param.id, educationCredentialsDto, param.idEdu, token);
            return res.json({
                message: "Đã sửa thành công",
                data: updateEdu
            })
        } catch (error) {
            return res.json({
                message: "Sửa không thành công"
            })
        }
    }

    @Delete(':id/education/:idEdu')
    @UseGuards(AuthGuard('jwt'))
    async deleteEducation(@Param() param: any, @Response() res: any, @Request() req: any) {
        try {
            let parts = req.headers.authorization.split(" ");
            let token = parts[1];
            await this.EuducationService.deleteEducation(param.id, param.idEdu, token);
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
