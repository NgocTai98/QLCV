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

    async getUser(id: number): Promise<Users> {
        let user = await this.userRepository.getUser(id);
        return user;

    }
    async createUser(userCredentialsDto: UserCredentialsDto): Promise<Users> {
        let newUser = await this.userRepository.createUser(userCredentialsDto);
        return newUser;

    }
    async updateUser(id: number, userCredentialsDto: UserCredentialsDto, token: string): Promise<Users> {
        let userId = this.jwtService.verify(token);

        let updateUser = await this.userRepository.updateUser(id, userCredentialsDto, userId.sub);
        return updateUser;
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.deleteUser(id);


    }
}
