import { Controller, Get, UseGuards, Post, Put, Delete, Response, Param, Body, ValidationPipe, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from '@nestjs/passport';
import { ProjectCredentialsDto } from './dto/project-credentials.dto';

@Controller('project')
export class ProjectController {
    constructor(
        private ProjectService: ProjectService
    ) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getProject(@Response() res: any) {
        try {
            let pro = await this.ProjectService.getProject();
            return res.json({
                message: "Danh sách project",
                data: pro
            })
        } catch (error) {
            return res.json({
                message: "Không thể hiển thị"
            })
        }
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createProject(@Param() param: any, @Body(ValidationPipe) projectCredentialsDto: ProjectCredentialsDto, @Response() res: any, @Request() req: any) {
        try {
            let parts = req.headers.authorization.split(" ");
            let token = parts[1];
            let newPro = await this.ProjectService.createProject(projectCredentialsDto, token);
            return res.json({
                message: "Đã thêm thành công",
                data: newPro
            })
        } catch (error) {
            return res.json({
                message: "Thêm mới không thành công"
            })
        }
    }

    @Put(':id') 
    @UseGuards(AuthGuard('jwt'))
    async updateProject(@Param() param: any, @Body(ValidationPipe) projecCredentiaslDto: ProjectCredentialsDto, @Response() res: any, @Request() req: any) {
        try {
            let parts = req.headers.authorization.split(" ");
            let token = parts[1];
            let updatePro = await this.ProjectService.updateProject(param.id, projecCredentiaslDto, token);
            return res.json({
                message: "Đã sửa thành công",
                data: updatePro
            })
        } catch (error) {
            return res.json({
                message: "Không thể sửa thành công"
            })
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteProject(@Param() param: any, @Response() res: any) {
        try {
            await this.ProjectService.deleteProject(param.id);
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
