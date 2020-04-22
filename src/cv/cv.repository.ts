import { Repository, EntityRepository } from "typeorm";
import { Cv } from "./cv.entity";
import { CvCredentialsDto } from "./dto/cv-credentials.dto";
import * as moment from 'moment'
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Cv)
export class CvRepository extends Repository<Cv> {
    async getCv(id: number) {
        return await this.find({select: ["hashTag", "createdAt"], relations: ["employee", "title"], where: [{employee: id}]})
    }

    async createCv(id: any, cvCredentialsDto: CvCredentialsDto) {
       
        const {hashTag, titleId} = cvCredentialsDto;
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
    async updateCv(id: any, cvCredentialsDto: CvCredentialsDto, idCv: any) {
        const {hashTag, titleId} = cvCredentialsDto;
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

    async deleteCv(idCv: number) {
        return await this.delete(idCv);
    }
}