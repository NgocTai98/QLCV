import { Repository, EntityRepository, Like } from "typeorm";
import { Cvproject } from "./cvproject.entity";
import { CvProjectCredentialsDto } from "./dto/cvproject-credentials.dto";
import { InternalServerErrorException, All } from "@nestjs/common";

@EntityRepository(Cvproject)
export class CvProjectRepository extends Repository<Cvproject> {
    async getCvProject(id: number) {

        const array = await this.find({ select: ["responsibility", "technology"], relations: ["cv", "project"], where: [{ cv: id }] });
        const getCvProjects = [];

        array.forEach(function (item: any) {
            var existing = getCvProjects.filter(function (cv) {
                return cv.project.id == item.project.id;
            });
            if (existing.length) {
                var existingIndex = getCvProjects.indexOf(existing[0]);
                getCvProjects[existingIndex].responsibility = getCvProjects[existingIndex].responsibility.concat(item.responsibility);
            } else {
                if (typeof item.responsibility == 'string')
                    item.responsibility = [item.responsibility];
                getCvProjects.push(item);
            }
        });

        array.forEach(element => {
            delete element.cv.id;
            delete element.project.id;
        });

        return getCvProjects;

    }

    async createCvProject(id: any, body: any): Promise<void> {

        let responsibility = body.responsibility;
        let technology = body.technology;
        let projectId = body.projectId;
        for (let i = 0; i < responsibility.length; i++) {
            const element = responsibility[i];
            const newCvpro = new Cvproject();
            newCvpro.responsibility = element;
            newCvpro.technology = technology;
            newCvpro.cv = id;
            newCvpro.project = projectId;
            try {
                await newCvpro.save();
            } catch (error) {
                throw new InternalServerErrorException();
            }
        }

    }

    async updateCvProject(id: any, cvProjectCredentialsDto: CvProjectCredentialsDto, idCvpro: number): Promise<Cvproject> {
        const { responsibility, technology } = cvProjectCredentialsDto;
        const updateCvpro = await this.findOne(idCvpro);
        updateCvpro.responsibility = responsibility;
        updateCvpro.technology = technology;
        updateCvpro.cv = id;
        try {
            await updateCvpro.save();
            return updateCvpro;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async deleteCvProject(id: any, idCvpro: number): Promise<void> {
        await this.delete(idCvpro);
    }

    async duplicatecv(id: number) {

    }

    async findTechnology(tech: string) {
        let result = await this.find({
            where: { technology: Like(`%${tech}%`) },
            relations: ["cv", "project"]
        })

        let cvs = [];
        result.forEach(element => {
            cvs.push(element.cv.id);
        });
        let cvId = [...new Set(cvs)];

        return cvId;

    }

    async addCvPro(idCv: any, idPro: any) {
        const newcvpro = new Cvproject();
        newcvpro.cv = idCv;
        newcvpro.project = idPro;
        newcvpro.save();
    }
}