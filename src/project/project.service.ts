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

    async getProject(): Promise<Project[]> {
        return await this.projectsRepository.getProject();
    }

    async createProject(projectCredentialsDto: ProjectCredentialsDto, token: string): Promise<Project> {
        let userId = await this.jwtService.verify(token);
        let newPro = await this.projectsRepository.createProject(projectCredentialsDto, userId.sub);
        return newPro;
    }

    async updateProject(id: number, projectCredentialsDto: ProjectCredentialsDto, token: string): Promise<Project> {
        let userId = await this.jwtService.verify(token);
        let updatePro = await this.projectsRepository.updateProject(id, projectCredentialsDto, userId.sub);
        return updatePro;
    }

    async deleteProject(id: number): Promise<void> {
        await this.projectsRepository.deleteProject(id);
    }

    async findAll() {
        return await this.ProjectRespository.find();
    }
}
