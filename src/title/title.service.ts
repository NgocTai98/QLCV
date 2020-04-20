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

    async getTitle() {
        return await this.titlesRepository.getTitle();
    }

    async createTitle(titleCredentialsDto: TitleCredentialsDto, token: string) {
        let userId = await this.jwtService.verify(token);
        await this.titlesRepository.createTitle(titleCredentialsDto, userId.sub);
        return titleCredentialsDto;
    }

    async updateTitle(id: number, titleCredentialsDto, token: string) {
        let userId = await this.jwtService.verify(token);
        await this.titlesRepository.updateTitle(id, titleCredentialsDto, userId.sub);
        return titleCredentialsDto;
    }

    async deleteTitle(id: number) {
        return await this.titlesRepository.deleteTitle(id);
    }
}
