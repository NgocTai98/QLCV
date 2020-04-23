import { Repository, EntityRepository } from "typeorm";
import { Education } from "./education.entity";
import { EducationCredentialsDto } from "./dto/education-credentials.dto";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Education)
export class EducationsRepository extends Repository<Education> {

    async getEducation(id: any): Promise<Education[]> {
        let getEdu = await this.find({ select: ["location", "startTime", "endTime"], relations: ["user", "employee"], where: [{ employee: id }] });
        getEdu.forEach(element => {
            delete element.user.id;
            delete element.user.password;
            delete element.employee.id;
            delete element.employee.reference;
        });
        return getEdu;
    }

    async createEducation(id: any, educationCredenntialsDto: EducationCredentialsDto, userId: any): Promise<Education> {
        const { location, startTime, endTime } = educationCredenntialsDto;

        const newEdu = new Education();
        newEdu.location = location;
        newEdu.startTime = startTime;
        newEdu.endTime = endTime;
        newEdu.employee = id;
        newEdu.user = userId;

        try {
            await newEdu.save();
            return newEdu;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async updateEducation(id: any, educationCredenntialsDto: EducationCredentialsDto, idEdu: any, userId: any): Promise<Education> {
        const { location, startTime, endTime } = educationCredenntialsDto;
        const updateEdu = await this.findOne(idEdu);
        updateEdu.location = location;
        updateEdu.startTime = startTime;
        updateEdu.endTime = endTime;
        updateEdu.employee = id;
        updateEdu.user = userId;
        try {
            await updateEdu.save();
            return updateEdu;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async deleteEducation(idEdu: number): Promise<void> {
        await this.delete(idEdu);
    }

}