import { Repository, EntityRepository } from "typeorm";
import { Title } from "./title.entity";
import { TitleCredentialsDto } from "./dto/title-credentiasl.dto";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Title)
export class TitleRepository extends Repository<Title> {
    async getTitle(): Promise<Title[]> {
        let getTitle =  await this.find({
            select: ["companyName", "address", "linkWeb", "phone"],
            relations: ["user"],
            
        });
        getTitle.forEach(element => {
            delete element.user.id;
            delete element.user.password;
            delete element.user.role;
        });
        return getTitle;
    }

    async createTitle(titleCredentialsDto: TitleCredentialsDto, userId: any): Promise<Title> {
        const { companyName, address, linkWeb, phone } = titleCredentialsDto;
        const newTitle = new Title();
        newTitle.companyName = companyName;
        newTitle.address = address;
        newTitle.linkWeb = linkWeb;
        newTitle.phone = phone;
        newTitle.user = userId;
        try {
            await newTitle.save();
            return newTitle;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async updateTitle(id: number, titleCredentialsDto: TitleCredentialsDto, userId: any): Promise<Title> {
        const { companyName, address, linkWeb, phone } = titleCredentialsDto;
        const updateTitle = await this.findOne(id);
        updateTitle.companyName = companyName;
        updateTitle.address = address;
        updateTitle.linkWeb = linkWeb;
        updateTitle.phone = phone;
        updateTitle.user = userId;
        try {
            await updateTitle.save();
            return updateTitle;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async deleteTitle(id: number): Promise<void> {
         await this.delete(id);
    }
}