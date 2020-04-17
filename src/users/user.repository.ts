import { Repository, EntityRepository } from "typeorm";
import { Users } from './user.entity';
import { AuthCredentialsDto } from "src/auth/dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { UserCredentialsDto } from "./dto/user-credentials.dto";



@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
    async signUp(authCredentialsDto: AuthCredentialsDto) {
        const { email, password, fullname, lastEditedBy } = authCredentialsDto;

        const salt = await bcrypt.genSalt();


        const user = new Users();
        user.email = email;
        user.password = await this.hashPassword(password, salt);

        user.fullname = fullname;
        user.lastEditedBy = lastEditedBy;


        try {
            await user.save();

        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('email already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }

    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto) {
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

    async getUsers() {

        let users = await this.find({ select: ['email', 'fullname'] });

        return users;

    }
    async createUser(userCredentialsDto: UserCredentialsDto) {
        const { email, password, fullname } = userCredentialsDto;
        const newUser = new Users();
        newUser.email = email;
        const salt = await bcrypt.genSalt();
        newUser.password = await this.hashPassword(password, salt);
        newUser.fullname = fullname;
        newUser.lastEditedBy = 1;

        try {
            await newUser.save();

        } catch (error) {

            if (error.code === '23505') {
                throw new ConflictException('email already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async updateUser(id: number, userCredentialsDto: UserCredentialsDto, userId: number) {
        const { email, password, fullname } = userCredentialsDto;
        const userUpdate = await this.findOne(id);

        userUpdate.email = email;
        userUpdate.fullname = fullname;
        const salt = await bcrypt.genSalt();
        userUpdate.password = await this.hashPassword(password, salt);
        userUpdate.lastEditedBy = userId
        try {
            await userUpdate.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }


    }
    async deleteUser(id: number) {
        return this.delete(id);
    }
}