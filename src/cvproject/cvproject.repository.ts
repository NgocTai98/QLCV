import { Repository, EntityRepository } from "typeorm";
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
        return getCvProjects;

    }

    async createCvProject(id: any, cvProjectCredentialsDto: CvProjectCredentialsDto) {
        const { responsibility, technology, projectId } = cvProjectCredentialsDto;
        const newCvpro = new Cvproject();
        newCvpro.responsibility = responsibility;
        newCvpro.technology = technology;
        newCvpro.cv = id;
        newCvpro.project = projectId;
        try {
            await newCvpro.save();
            return newCvpro;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async updateCvProject(id: any, cvProjectCredentialsDto: CvProjectCredentialsDto, idCvpro: number) {
        const { responsibility, technology} = cvProjectCredentialsDto;
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

    async deleteCvProject(id: any, idCvpro: number) {
        return await this.delete(idCvpro);
    }
}