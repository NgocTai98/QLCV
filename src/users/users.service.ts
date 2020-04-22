import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async getUsers(): Promise<Users[]> {

        return await this.usersRepository.find();
    }

    async listUsers(): Promise<Users[]> {
        return await this.userRepository.getUsers();
    }

    async getUser(_id: number): Promise<Users[]> {
        let user = await this.usersRepository.find({
            where: [{ "id": _id }]
        });
        if (user.length == 0) {
            throw new HttpException('not user exist', 404);
        }
        return user;
    }
    async createUser(userCredentialsDto: UserCredentialsDto) {
        await this.userRepository.createUser(userCredentialsDto);
        return userCredentialsDto;

    }
    async updateUser(id: number, userCredentialsDto: UserCredentialsDto, token: string): Promise<Users> {
        let userId = this.jwtService.verify(token);

        await this.userRepository.updateUser(id, userCredentialsDto, userId.sub);
        let user = await this.usersRepository.findOne(id, { select: ['email', 'password', 'fullname'] });
        if (!user) {
            throw new HttpException('Không thể sửa', 400);
        }
        return user;
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.deleteUser(id);


    }
}
