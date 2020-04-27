import { Repository, EntityRepository } from "typeorm";
import { Cv } from "./cv.entity";
import { CvCredentialsDto } from "./dto/cv-credentials.dto";
import * as moment from 'moment'
import { InternalServerErrorException } from "@nestjs/common";
import { Like } from "typeorm";

@EntityRepository(Cv)
export class CvRepository extends Repository<Cv> {

    async listCv(): Promise<Cv[]> {
        let listCv = await this.find({ select: ["hashTag", "createdAt"], relations: ["employee", "user"] });
        listCv.forEach(element => {
            delete element.employee.id;
            delete element.employee.reference;
            delete element.user.id;
            delete element.user.password;
            delete element.user.role;
        });
        return listCv;
    }

    async getCv(id: number): Promise<Cv[]> {
        let cv = await this.find({ select: ["hashTag", "createdAt"], relations: ["employee", "title", "user"], where: [{ employee: id }] })
        cv.forEach(element => {
            delete element.employee.id;
            delete element.employee.reference;
            delete element.title.id;
            delete element.user.id;
            delete element.user.password;
            delete element.user.role;
        });
        return cv;
    }

    async createCv(id: any, cvCredentialsDto: CvCredentialsDto, userId: any): Promise<Cv> {

        const { hashTag, titleId } = cvCredentialsDto;
        const newCv = new Cv();
        newCv.hashTag = hashTag;
        newCv.createdAt = moment().utc().format();
        newCv.title = titleId;
        newCv.employee = id;
        newCv.user = userId;
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

    // async searchUserCreater(cvCredentialsDto: CvCredentialsDto) {
    //     const { fullname } = cvCredentialsDto;
    //     let result = await this.find({

    //     })
    // }

    async searchTechnology(cvId: any) {
        let cvs = [];
        for (let i = 0; i < cvId.length; i++) {
            let result = await this.findOne({
                where: [{ id: cvId[i] }]
            })
            cvs.push(result);
        }

        return cvs;
    }

    async filterUser(id: number): Promise<Cv[]> {
        let result = await this.find({ where: [{ user: id }], select: ["hashTag", "createdAt"], relations: ["employee", "user"] });
        result.forEach(element => {
            delete element.employee.id;
            delete element.employee.reference;
            delete element.user.id;
            delete element.user.password;
            delete element.user.role;
        });
        return result;
    }

    async filterEmployee(id: number): Promise<Cv[]> {
        let result = await this.find({ where: [{ employee: id }], select: ["hashTag", "createdAt"], relations: ["employee", "user"] });
        result.forEach(element => {
            delete element.employee.id;
            delete element.employee.reference;
            delete element.user.id;
            delete element.user.password;
            delete element.user.role;
        });
        return result;
    }

    async searchHashTag(body: any): Promise<Cv[]> {
        let result = await this.find({
            where: { hashTag: Like(`%${body.search}%`) },
            select: ["hashTag", "createdAt"], relations: ["employee", "user"]
        })
        result.forEach(element => {
            delete element.employee.id;
            delete element.employee.reference;
            delete element.user.id;
            delete element.user.password;
            delete element.user.role;
        });
        return result;
    }
}