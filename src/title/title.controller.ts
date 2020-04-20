import { Controller, Get, UseGuards, Response, Request, Post, Body, ValidationPipe, Param, Put, Delete } from '@nestjs/common';
import { TitleService } from './title.service';
import { AuthGuard } from '@nestjs/passport';
import { TitleCredentialsDto } from './dto/title-credentiasl.dto';

@Controller('title')
export class TitleController {
    constructor(
        private titleService: TitleService
    ){}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getTitle(@Response() res: any){
        try {
           let titles = await this.titleService.getTitle();
           return res.json({
               message: "Danh sách title",
               data: titles
           })
        } catch (error) {
            return res.json({
                message: "Không thể hiển thị"
            })
        }
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createTitle(@Body(ValidationPipe) titleCredentialsDto: TitleCredentialsDto, @Response() res: any, @Request() req: any){
        try {
            let parts = req.headers.authorization.split(" ");
            let token = parts[1];
            let newTitle = await this.titleService.createTitle(titleCredentialsDto, token);
            return res.json({
                message: "Đã thêm thành công",
                data: newTitle
            })
        } catch (error) {
            return res.json({
                message: "Không thể thêm thành công"
            })
        }
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async updateTitle(@Param() param: any, @Body(ValidationPipe) titleCredentialsDto: TitleCredentialsDto, @Response() res: any, @Request() req: any){
        try {
            let parts = req.headers.authorization.split(" ");
            let token = parts[1];
            let updateTitle = await this.titleService.updateTitle(param.id, titleCredentialsDto, token);
            return res.json({
                message: "Đã sửa thành công",
                data: updateTitle
            })
        } catch (error) {
            return res.json({
                message: "Không thể sửa"
            })
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteTitle(@Param() param: any, @Response() res: any){
        try {
            await this.titleService.deleteTitle(param.id);
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
