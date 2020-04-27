import { Repository, EntityRepository } from "typeorm";
import { Users } from './user.entity';
import { AuthCredentialsDto } from "src/auth/dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { UserCredentialsDto } from "./dto/user-credentials.dto";



@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
    // async signUp(authCredentialsDto: AuthCredentialsDto): Promise<Users> {
    //     const { email, password, fullname } = authCredentialsDto;

    //     const salt = await bcrypt.genSalt();

    //     const user = new Users();
    //     user.email = email;
    //     user.password = await this.hashPassword(password, salt);

    //     user.fullname = fullname;

    //     try {
    //         await user.save();
    //         return user;
    //     } catch (error) {
    //         if (error.code === '23505') {
    //             throw new ConflictException('email already exists');
    //         } else {
    //             throw new InternalServerErrorException();
    //         }
    //     }

    // }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<Users> {
        const { email, password } = authCredentialsDto;
        const user = await this.findOne({ email });

        if (user && await user.validatePassword(password)) {
            return user;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async getUsers(): Promise<Users[]> {

        let users = await this.find({ select: ['email', 'fullname'] });

        return users;

    }
    async createUser(userCredentialsDto: UserCredentialsDto): Promise<Users> {
        const { email, password, fullname, role } = userCredentialsDto;
        const newUser = new Users();
        newUser.email = email;
        const salt = await bcrypt.genSalt();
        newUser.password = await this.hashPassword(password, salt);
        newUser.fullname = fullname;
        newUser.role = role;

        try {
            await newUser.save();
            return newUser;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async updateUser(id: number, userCredentialsDto: UserCredentialsDto, userId: number): Promise<Users> {
        const { email, password, fullname, role } = userCredentialsDto;
        const userUpdate = await this.findOne(id);

        userUpdate.email = email;
        userUpdate.fullname = fullname;
        const salt = await bcrypt.genSalt();
        userUpdate.password = await this.hashPassword(password, salt);
        userUpdate.role = role;

        try {
            await userUpdate.save();
            return userUpdate;
        } catch (error) {
            throw new InternalServerErrorException();
        }

    }
    async deleteUser(id: number): Promise<void> {
        await this.delete(id);
    }

    async getUser(id: number): Promise<Users> {
        return await this.findOne({ where: { id: id } });
    }
}