import { Repository, EntityRepository } from "typeorm";
import { Project } from "./project.entity";
import { ProjectCredentialsDto } from "./dto/project-credentials.dto";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Project)
export class ProjectsRepository extends Repository<Project> {
    async getProject(): Promise<Project[]> {
        let projects = await this.find({select: ["location", "projectName", "description", "technology", "reference"], relations: ["user"]})
        projects.forEach(element => {
            delete element.user.id;
            delete element.user.password;
        });
        return projects;
    }

    async createProject(projecCredentialsDto: ProjectCredentialsDto, userId: any): Promise<Project> {
        const {location, projectName, description, technology, reference} = projecCredentialsDto;
        const newPro = new Project();
        newPro.location = location;
        newPro.projectName = projectName;
        newPro.description = description;
        newPro.technology = technology;
        newPro.reference = reference;
        newPro.user = userId;
        try {
            await newPro.save();
            return newPro;
        } catch (error) {
            throw new InternalServerErrorException();
        } 
    }

    async updateProject(id: number, projecCredentialsDto: ProjectCredentialsDto, userId: any): Promise<Project> {
        const {location, projectName, description, technology, reference} = projecCredentialsDto;
        const updatePro = await this.findOne(id);
        updatePro.location = location;
        updatePro.projectName = projectName;
        updatePro.description = description;
        updatePro.technology = technology;
        updatePro.reference = reference;
        updatePro.user = userId;
        try {
            await updatePro.save();
            return updatePro;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async deleteProject(id: number): Promise<void> {
         await this.delete(id);
    }
}