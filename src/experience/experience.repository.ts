import { EntityRepository, Repository } from "typeorm";
import { Experience } from "./experience.entity";
import { ExperienceCredentialsDto } from "./dto/experience-credentials.dto";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Experience)
export class ExperiencesRepository extends Repository<Experience> {
    
    async getExperience(id: any) {
       
       return await this.find({select: ["location", "startTime", "endTime"], relations: ["user", "employee"], where: [{employee: id}]});
    }

    async createExperience(id: any, experienceCredentialsDto: ExperienceCredentialsDto, userId: any) {
      
        const {location, startTime, endTime} = experienceCredentialsDto;
      
        
        const newExperience = new Experience();
        newExperience.location = location;
        newExperience.startTime = startTime;
        newExperience.endTime = endTime;
        newExperience.employee = id;
        newExperience.user = userId;

        try {
            await newExperience.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async updateExperience(id: any, experienceCredentialsDto: ExperienceCredentialsDto, idEx: number, userId: any)    {
        const {location, startTime, endTime} = experienceCredentialsDto;
        const updateEx = await this.findOne(idEx);

        updateEx.location = location;
        updateEx.startTime = startTime;
        updateEx.endTime = endTime;
        updateEx.employee = id;
        updateEx.user = userId;

        try {
            await updateEx.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async deleteExperience(id: number, idEx: number) {
        return this.delete(idEx);
    }
}