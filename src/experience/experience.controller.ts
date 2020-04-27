import { Controller, Get, UseGuards, Response, Request, Post, Body, ValidationPipe, Param, Put, Delete } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { AuthGuard } from '@nestjs/passport';
import { ExperienceCredentialsDto } from './dto/experience-credentials.dto';

@Controller('employee')
export class ExperienceController {
    constructor(
        private ExperienceService: ExperienceService
    ) { }

    @Get(':id/experiences')
    @UseGuards(AuthGuard('jwt'))
    async getExperience(@Response() res: any, @Param() param: any) {
        try {
            let experience = await this.ExperienceService.getExperience(param.id);
            return res.json({
                message: "Danh sách experience",
                data: experience
            })
        } catch (error) {

        }
    }

    @Post(':id/experience')
    @UseGuards(AuthGuard('jwt'))
    async createExperience(@Param() param: any,@Body(ValidationPipe) experienceCredentialsDto: ExperienceCredentialsDto, @Response() res: any, @Request() req: any) {

        try {
            let parts = req.headers.authorization.split(' ');
            let token = parts[1];
            let newExperience = await this.ExperienceService.createExperience(param.id, experienceCredentialsDto, token);
            return res.json({
                message: "Thêm mới thành công",
                data: newExperience
            })

        } catch (error) {
            return res.json({
                message: "Không thể thêm mới"
            })
        }
    }

    @Put(':id/experience/:idEx')
    @UseGuards(AuthGuard('jwt'))
    async updateExperience(@Param() param: any, @Body(ValidationPipe) experienceCredentialsDto: ExperienceCredentialsDto, @Response() res: any, @Request() req: any) {
        try {
            let parts = req.headers.authorization.split(" ");
            let token = parts[1];
            let updateEx = await this.ExperienceService.updateExxperience(param.id, experienceCredentialsDto, param.idEx, token);
            return res.json({
                message: "Đã sửa thành công",
                data: updateEx
            })
        } catch (error) {
            
        }
    }

    @Delete(':id/experience/:idEx')
    @UseGuards(AuthGuard('jwt'))
    async deleteExperience(@Param() param: any, @Response() res: any, @Request() req: any) {
        try {
            let parts = req.headers.authorization.split(" ");
            let token = parts[1];
            await this.ExperienceService.deleteExxperience(param.id, param.idEx, token);
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
