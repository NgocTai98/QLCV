import { Repository, EntityRepository } from "typeorm";
import { Title } from "./title.entity";
import { TitleCredentialsDto } from "./dto/title-credentiasl.dto";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Title)
export class TitleRepository extends Repository<Title> {
    async getTitle() {
        return await this.find({
            select: ["companyName", "address", "linkWeb", "phone"],
            relations: ["user"],
            
        });
    }

    async createTitle(titleCredentialsDto: TitleCredentialsDto, userId: any) {
        const { companyName, address, linkWeb, phone } = titleCredentialsDto;
        const newTitle = new Title();
        newTitle.companyName = companyName;
        newTitle.address = address;
        newTitle.linkWeb = linkWeb;
        newTitle.phone = phone;
        newTitle.user = userId;
        try {
            await newTitle.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async updateTitle(id: number, titleCredentialsDto: TitleCredentialsDto, userId: any) {
        const { companyName, address, linkWeb, phone } = titleCredentialsDto;
        const updateTitle = await this.findOne(id);
        updateTitle.companyName = companyName;
        updateTitle.address = address;
        updateTitle.linkWeb = linkWeb;
        updateTitle.phone = phone;
        updateTitle.user = userId;
        try {
            await updateTitle.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async deleteTitle(id: number) {
        return await this.delete(id);
    }
}