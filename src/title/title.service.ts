import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Title } from './title.entity';
import { Repository } from 'typeorm';
import { TitleRepository } from './title.repository';
import { JwtService } from '@nestjs/jwt';
import { TitleCredentialsDto } from './dto/title-credentiasl.dto';

@Injectable()
export class TitleService {
    constructor(
        @InjectRepository(Title) private TitleRepository: Repository<Title>,
        private titlesRepository: TitleRepository,
        private jwtService: JwtService
    ) { }

    async getTitle(): Promise<Title[]> {
        return await this.titlesRepository.getTitle();
    }

    async createTitle(titleCredentialsDto: TitleCredentialsDto, token: string): Promise<Title> {
        let userId = await this.jwtService.verify(token);
        let createTitle = await this.titlesRepository.createTitle(titleCredentialsDto, userId.sub);
        return createTitle;
    }

    async updateTitle(id: number, titleCredentialsDto, token: string): Promise<Title> {
        let userId = await this.jwtService.verify(token);
        let updateTitle = await this.titlesRepository.updateTitle(id, titleCredentialsDto, userId.sub);
        return updateTitle;
    }

    async deleteTitle(id: number): Promise<void> {
         await this.titlesRepository.deleteTitle(id);
    }
}
