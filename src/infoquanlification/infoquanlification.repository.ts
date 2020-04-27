import { Repository, EntityRepository } from "typeorm";
import { Infoquanlification } from "./infoquanlification.entity";
import { InternalServerErrorException } from "@nestjs/common";
import { InfoQuanCredentialsDto } from "./dto/infoquanlification-credentials.dto";

@EntityRepository(Infoquanlification)
export class InfoQuanRepository extends Repository<Infoquanlification>{
    async getInfoQuan(id: number): Promise<Infoquanlification[]> {
        let infoQuans = await this.find({
            where: { cv: id },
            select: ["name"],
            relations: ["cv"]
        })
        return infoQuans;
    }

    async createDefault(cvId: any, name: string) {
        const newInfoQuan = new Infoquanlification();
        newInfoQuan.name = name;
        newInfoQuan.cv = cvId;
        try {
            await newInfoQuan.save();
            // return newInfoQuan;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async updateInfoQuan(idCv: any, infoQuanCredentialsDto: InfoQuanCredentialsDto, id: number): Promise<Infoquanlification> {
        const { name } = infoQuanCredentialsDto;
        const infoQuan = await this.findOne({
            where: { id: id }
        });
        infoQuan.name = name;
        infoQuan.cv = idCv;
        try {
            await infoQuan.save();
            return infoQuan;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async deleteInfoQuan(id: number) {
        return await this.delete(id);
    }

    async createInfoQuan(idCv: any, infoQuanCredentialsDto: InfoQuanCredentialsDto): Promise<Infoquanlification> {
        const { name } = infoQuanCredentialsDto;
        const newInfoQuan = new Infoquanlification();
        newInfoQuan.name = name;
        newInfoQuan.cv = idCv;
        try {
            await newInfoQuan.save();
            return newInfoQuan;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}