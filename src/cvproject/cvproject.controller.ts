import { Controller, Get, UseGuards, Post, Put, Delete, Param, Response, Request, Body, ValidationPipe, Header } from '@nestjs/common';
import { CvprojectService } from './cvproject.service';
import { AuthGuard } from '@nestjs/passport';
import { CvProjectCredentialsDto } from './dto/cvproject-credentials.dto';

@Controller('cv')
export class CvprojectController {
    constructor(
        private cvprojectService: CvprojectService
    ) { }

    @Get(':id/cvprojects')
    @UseGuards(AuthGuard('jwt'))
    async getCvProject(@Param() param: any, @Response() res: any) {
        try {
            let cvpro = await this.cvprojectService.getCvProject(param.id);
            return res.json({
                message: "Danh sách cvproject",
                data: cvpro
            })
        } catch (error) {
            return res.json({
                message: "Không thể hiển thị"
            })
        }
    }

    @Post(':id/cvproject')
    @UseGuards(AuthGuard('jwt'))
    async createCvProject(@Param() param: any, @Body() body: any, @Response() res: any, @Request() req: any) {
        try {
            let parts = req.headers.authorization.split(" ");
            let token = parts[1];
            let newCvpro = await this.cvprojectService.createCvProject(param.id, body, token);
            return res.json({
                message: "Đã thêm thành công",
                data: newCvpro
            })
        } catch (error) {
            return res.json({
                message: "Không thể thêm thành công"
            })
        }
    }

    @Put(':id/cvproject/:idCvpro')
    @UseGuards(AuthGuard('jwt'))
    async updateCvProject(@Param() param: any, @Body(ValidationPipe) cvProjectCredentialsDto: CvProjectCredentialsDto, @Response() res: any, @Request() req: any) {
        try {
            let parts = req.headers.authorization.split(" ");
            let token = parts[1];
            let updateCvpro = await this.cvprojectService.updateCvProject(param.id, cvProjectCredentialsDto, param.idCvpro, token);
            return res.json({
                message: "Đã sửa thành công",
                data: updateCvpro
            })
        } catch (error) {
            return res.json({
                message: "Không thể sửa thành công"
            })
        }
    }

    @Delete(':id/cvproject/:idCvpro')
    @UseGuards(AuthGuard('jwt'))
    async deleteCvProject(@Param() param: any, @Response() res: any, @Request() req: any) {
        try {
            let parts = req.headers.authorization.split(" ");
            let token = parts[1];
            await this.cvprojectService.deleteCvProject(param.id, param.idCvpro, token);
            return res.json({
                message: "Đã xóa thành công"
            })
        } catch (error) {
            return res.json({
                message: "Không thể xóa thành công"
            })
        }
    }

    @Post(':id/duplicatecv/idEm')
    @UseGuards(AuthGuard('jwt'))
    async duplicateCv(@Response() res: any, @Param() param: any) {
        try {
            let newCv = await this.cvprojectService.duplicateCv(param.id);
            return res.json({
                message: "Đã sao chép thành công",
                data: newCv
            })
        } catch (error) {
            return res.json({
                message: "Không thể sao chép"
            })
        }
    }


}
