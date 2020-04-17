import { Repository, EntityRepository } from "typeorm";
import { Quanlification } from "./quanlification.entity";
import { QuanlificationCredentialsDto } from "./dto/quanlification-credentials.dto";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Quanlification)
export class QuanlificationRepository extends Repository<Quanlification> {

    async getQuanlification(): Promise<void> {
       await this.find({select: ["name", "employee", "user"]});
       
    }

    async createQuanlification(idEm: any, quanlificationCredentials: QuanlificationCredentialsDto, userId: any) {
        const {name} = quanlificationCredentials;
        const quan = new Quanlification();
        quan.name = name;
        quan.employee = idEm;
        quan.user = userId;
        try {
            await quan.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }

    }

    async updateQuanlification(id: any, quanlificationCredentials: QuanlificationCredentialsDto, quanId: number, userId: any) {
        const {name} = quanlificationCredentials;
        const updateQuan = await this.findOne(quanId);
        updateQuan.name = name;
        updateQuan.employee = id;
        updateQuan.user = userId;
        try {
            await updateQuan.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async deleteQuanlification(id: number, quanId: number) {
        await this.delete(quanId);
    }

}