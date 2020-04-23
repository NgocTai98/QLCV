import { Repository, EntityRepository } from "typeorm";
import { Cv } from "./cv.entity";
import { CvCredentialsDto } from "./dto/cv-credentials.dto";
import * as moment from 'moment'
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Cv)
export class CvRepository extends Repository<Cv> {
    async getCv(id: number): Promise<Cv[]> {
        let cv = await this.find({ select: ["hashTag", "createdAt"], relations: ["employee", "title"], where: [{ employee: id }] })
        cv.forEach(element => {
            delete element.employee.id;
            delete element.employee.reference;
            delete element.title.id;
        });
        return cv;
    }

    async createCv(id: any, cvCredentialsDto: CvCredentialsDto): Promise<Cv> {

        const { hashTag, titleId } = cvCredentialsDto;
        const newCv = new Cv();
        newCv.hashTag = hashTag;
        newCv.createdAt = moment().utc().format();
        newCv.title = titleId;
        newCv.employee = id;

        try {
            await newCv.save();
            return newCv;

        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
    async updateCv(id: any, cvCredentialsDto: CvCredentialsDto, idCv: any): Promise<Cv> {
        const { hashTag, titleId } = cvCredentialsDto;
        const updateCv = await this.findOne(idCv);

        updateCv.hashTag = hashTag;
        updateCv.title = titleId;
        updateCv.employee = id;

        try {
            await updateCv.save();
            return updateCv;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async deleteCv(idCv: number): Promise<void> {
        await this.delete(idCv);
    }
}