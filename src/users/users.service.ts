import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
// import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) { }

    async getUsers(): Promise<Users[]> {
        return await this.usersRepository.find();
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
    async createUser(user: Users) {
        let newUser = await this.usersRepository.save(user);
        if (!newUser) {
            throw new HttpException('Không thể thêm mới', 400);
        }
        return newUser;
    }
    async updateUser(user: Users) {
        await this.usersRepository.update(user.id, user);
        let userUpdate = await this.usersRepository.findOne(user.id);
        if (!userUpdate) {
            throw new HttpException('Không thể update', 400)
        }
        return userUpdate;

    }

    async deleteUser(_id: number) {
        let user = await this.usersRepository.delete(_id);
        let user1 = await this.usersRepository.findOne(_id);
        
        if (user1) {
            throw new HttpException('Không thể xóa', 400)
        }
        return user;

    }
}
