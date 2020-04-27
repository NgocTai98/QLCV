import { Controller, Get, UseGuards, Post, Put, Delete, Param, Body, ValidationPipe, Response, Request } from '@nestjs/common';
import { CvService } from './cv.service';
import { AuthGuard } from '@nestjs/passport';
import { CvCredentialsDto } from './dto/cv-credentials.dto';

@Controller()
export class CvController {
    constructor(
        private cvService: CvService
    ) { }

    @Get('employee/:id/cvs')
    @UseGuards(AuthGuard('jwt'))

    async getCv(@Param() param: any, @Response() res: any, @Request() req: any) {
        try {

            let cv = await this.cvService.getCv(param.id);
            return res.json({
                message: "Danh sách CV",
                data: cv
            })
        } catch (error) {

        }
    }

    @Post('employee/:id/cv')
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

    @Put('employee/:id/cv/:idCv')
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

    @Delete('employee/:id/cv/:idCv')
    @UseGuards(AuthGuard('jwt'))
    async deleteCv(@Param() param: any, @Response() res: any, @Request() req: any) {
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


    @Get('cvs')
    @UseGuards(AuthGuard('jwt'))
    async listCv(@Response() res: any) {
        try {
            let listCv = await this.cvService.listCv();
            return res.json({
                message: "Danh sách cv",
                data: listCv
            })
        } catch (error) {
            return res.json({
                message: "Không thể hiển thị"
            })
        }
    }

    @Get('cvs/filter/user/:id')
    @UseGuards(AuthGuard('jwt'))
    async filterUser(@Response() res: any, @Param() param: any) {
        try {
            let result = await this.cvService.filterUser(param.id);
            return res.json({
                message: "Danh sách tìm kiếm",
                data: result
            })
        } catch (error) {
            return res.json({
                message: "Không thể hiển thị"
            })
        }
    }

    @Get('cvs/filter/employee/:id')
    @UseGuards(AuthGuard('jwt'))
    async filterEmployee(@Response() res: any, @Param() param: any) {
        try {
            let result = await this.cvService.filterEmployee(param.id);
            return res.json({
                message: "Danh sách tìm kiếm",
                data: result
            })
        } catch (error) {
            return res.json({
                message: "Không thể hiển thị"
            })
        }
    }

    @Get('cvs/search/technology')
    @UseGuards(AuthGuard('jwt'))
    async searchTechnology(@Response() res: any, @Body(ValidationPipe) cvCredentialsDto: CvCredentialsDto) {
        try {
            let result = await this.cvService.searchTechnology(cvCredentialsDto);
            return res.json({
                message: "Danh sách tìm kiếm",
                data: result
            })
        } catch (error) {
            return res.json({
                message: "Không thể hiển thị"
            })
        }
    }


    // @Get('cvs/search/user')
    // @UseGuards(AuthGuard('jwt'))
    // async searchUserCreater(@Response() res: any, @Body(ValidationPipe) cvCredentialsDto: CvCredentialsDto) {
    //     try {
    //         let result = await this.cvService.searchUserCreater(cvCredentialsDto);
    //         return res.json({
    //             message: "Danh sách tìm kiếm",
    //             data: result
    //         })
    //     } catch (error) {
    //         return res.json({
    //             message: "Không thể hiển thị"
    //         })
    //     }
    // }

    @Get('cvs/search/hashTag')
    @UseGuards(AuthGuard('jwt'))
    async searchHashTag(@Response() res: any, @Body() body: any) {
        try {
            let result = await this.cvService.searchHashTag(body);
            return res.json({
                message: "Danh sách tìm kiếm",
                data: result
            })
        } catch (error) {
            return res.json({
                message: "Không thể hiển thị"
            })
        }
    }

}
