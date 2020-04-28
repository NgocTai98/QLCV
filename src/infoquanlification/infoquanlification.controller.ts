import { Controller, Get, Param, Response, Request, UseGuards, Post, Put, Delete, Body, ValidationPipe } from '@nestjs/common';
import { InfoquanlificationService } from './infoquanlification.service';
import { AuthGuard } from '@nestjs/passport';
import { InfoQuanCredentialsDto } from './dto/infoquanlification-credentials.dto';

@Controller('cv')
export class InfoquanlificationController {
    constructor(
        private infoQuanService: InfoquanlificationService
    ) { }

    @Get(':idCv/infoQuans')
    @UseGuards(AuthGuard('jwt'))
    async getInfoQuan(@Param() param: any, @Response() res: any) {
        try {
            let infoQuan = await this.infoQuanService.getInfoQuan(param.idCv);
            return res.json({
                message: 'Danh sách infoquan',
                data: infoQuan
            })
        } catch (error) {
            return res.json({
                message: "Không thể hiển thị"
            })
        }
    }

    @Post(':idCv/infoQuan')
    @UseGuards(AuthGuard('jwt'))
    async createInfoQuan(@Param() param: any, @Body(ValidationPipe) body: any, @Response() res: any, @Request() req: any) {
        try {
            let parts = req.headers.authorization.split(" ");
            let token = parts[1];
            let newinfoQuan = await this.infoQuanService.createInfoQuan(param.idCv, body, token);
            return res.json({
                message: 'đã thêm infoquan',
                data: newinfoQuan
            })
        } catch (error) {
            return res.json({
                message: "Không thể thêm"
            })
        }
    }

    @Put(':idCv/infoQuan/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateInfoQuan(@Param() param: any, @Body(ValidationPipe) infoQuanCredentialsDto: InfoQuanCredentialsDto, @Response() res: any, @Request() req: any) {
        try {
            let parts = req.headers.authorization.split(" ");
            let token = parts[1];
            let infoQuan = await this.infoQuanService.updateInfoQuan(param.idCv, infoQuanCredentialsDto, param.id, token);
            return res.json({
                message: 'Đã sửa infoquan',
                data: infoQuan
            })
        } catch (error) {
            return res.json({
                message: "Không thể sửa"
            })
        }
    }

    @Delete(':idCv/infoQuan/:id')
    @UseGuards(AuthGuard('jwt'))
    async deleteInfoQuan(@Param() param: any, @Response() res: any, @Request() req: any) {
        try {
            let parts = req.headers.authorization.split(" ");
            let token = parts[1];
            let infoQuan = await this.infoQuanService.deleteInfoQuan(param.idCv, param.id, token);
            return res.json({
                message: 'Đã xóa infoquan',
              
            })
        } catch (error) {
            return res.json({
                message: "Không thể xóa"
            })
        }
    }
}
