import { Repository, EntityRepository } from "typeorm";
import { Quanlification } from "./quanlification.entity";
import { QuanlificationCredentialsDto } from "./dto/quanlification-credentials.dto";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Quanlification)
export class QuanlificationRepository extends Repository<Quanlification> {

    async getQuanlification(id: any) : Promise<Quanlification[]> {
        //  return  await this.find({select: ["name"], relations: ["employee", "user"], where:[{employee: id}]});
        const quanlifications =  await this.createQueryBuilder("quanlification")
        .select("quanlification.name")
        .leftJoinAndSelect("quanlification.employee", "employee")
        .leftJoinAndSelect("quanlification.user", "user")
        .where("quanlification.employee = :id", {id: id})
        .getMany();

        quanlifications.forEach(element => {
            delete element.employee.id;
            delete element.employee.reference;
            delete element.user.id;
            delete element.user.password;
        });

        return quanlifications;
    }

    async createQuanlification(idEm: any, quanlificationCredentials: QuanlificationCredentialsDto, userId: any): Promise<Quanlification> {
        const { name } = quanlificationCredentials;
        const quan = new Quanlification();
        quan.name = name;
        quan.employee = idEm;
        quan.user = userId;
        try {
            await quan.save();
            return quan;
        } catch (error) {
            throw new InternalServerErrorException();
        }

    }

    async updateQuanlification(id: any, quanlificationCredentials: QuanlificationCredentialsDto, quanId: number, userId: any): Promise<Quanlification> {
        const { name } = quanlificationCredentials;
        const updateQuan = await this.findOne(quanId);
        updateQuan.name = name;
        updateQuan.employee = id;
        updateQuan.user = userId;
        try {
            await updateQuan.save();
            return updateQuan;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async deleteQuanlification(id: number, quanId: number): Promise<void> {
        await this.delete(quanId);
    }

}