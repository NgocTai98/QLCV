import { EntityRepository, Repository } from "typeorm";
import { Experience } from "./experience.entity";
import { ExperienceCredentialsDto } from "./dto/experience-credentials.dto";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Experience)
export class ExperiencesRepository extends Repository<Experience> {

    async getExperience(id: any): Promise<Experience[]> {
        let getEx = await this.find({ select: ["location", "startTime", "endTime"], relations: ["user", "employee"], where: [{ employee: id }] });
        getEx.forEach(element => {
            delete element.user.id;
            delete element.user.password;
            delete element.employee.id;
            delete element.employee.reference;
        });
        return getEx;
    }

    async createExperience(id: any, experienceCredentialsDto: ExperienceCredentialsDto, userId: any): Promise<Experience> {

        const { location, startTime, endTime } = experienceCredentialsDto;


        const newExperience = new Experience();
        newExperience.location = location;
        newExperience.startTime = startTime;
        newExperience.endTime = endTime;
        newExperience.employee = id;
        newExperience.user = userId;

        try {
            await newExperience.save();
            return newExperience;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async updateExperience(id: any, experienceCredentialsDto: ExperienceCredentialsDto, idEx: number, userId: any): Promise<Experience> {
        const { location, startTime, endTime } = experienceCredentialsDto;
        const updateEx = await this.findOne(idEx);

        updateEx.location = location;
        updateEx.startTime = startTime;
        updateEx.endTime = endTime;
        updateEx.employee = id;
        updateEx.user = userId;

        try {
            await updateEx.save();
            return updateEx;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async deleteExperience(id: number, idEx: number): Promise<void> {
        await this.delete(idEx);
    }
}