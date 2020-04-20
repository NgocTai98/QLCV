import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { ProjectsRepository } from './project.repository';
import { JwtService } from '@nestjs/jwt';
import { ProjectCredentialsDto } from './dto/project-credentials.dto';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project) private ProjectRespository: Repository<Project>,
        private projectsRepository: ProjectsRepository,
        private jwtService: JwtService
    ) { }

    async getProject() {
       return await this.projectsRepository.getProject();
    }

    async createProject(projectCredentialsDto: ProjectCredentialsDto, token: string) {
        let userId = await this.jwtService.verify(token);
        await this.projectsRepository.createProject(projectCredentialsDto, userId.sub);
        return projectCredentialsDto;
    }

    async updateProject(id: number, projectCredentialsDto: ProjectCredentialsDto, token: string) {
        let userId = await this.jwtService.verify(token);
        await this.projectsRepository.updateProject(id, projectCredentialsDto, userId.sub);
        return projectCredentialsDto;
    }

    async deleteProject(id: number) {
        await this.projectsRepository.deleteProject(id);
    }
}
