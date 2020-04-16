import { Controller, Get, Param, Post, Put, Delete, Body, Response, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserCredentialsDto } from './dto/user-credentials.dto';

@Controller('users')
export class UsersController {
    constructor(private Userservice: UsersService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getUsers(@Response() res: any, @Request() req: any) {
        try {
            
            let user = await this.Userservice.listUsers();
            return res.json({
                message: 'Danh sách users',
                data: user
            })

        } catch (error) {
            return res.json({
                message: 'Không thể hiển thị danh sách users',
            })

        }


    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async getUser(@Param() params: any, @Response() res: any) {
        try {
            let user = await this.Userservice.getUser(params.id);
            if (user) {
                return res.json({
                    message: 'Đã hiển thị thông tin của user này',
                    data: user
                })
            }

        } catch (error) {
            return res.json({
                message: 'Không thể hiển thị user',
            })

        }

    }
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body(ValidationPipe) userCredentialsDto: UserCredentialsDto, @Response() res: any) {
        try {
            let userCreate = await this.Userservice.createUser(userCredentialsDto);
            return res.json({
                message: 'Đã thêm thành công',
                data: userCreate
            })

        } catch (error) {
            return res.json({
                message: 'Thêm user mới không thành công',
            })
        }
        // return await this.Userservice.createUser(userCredentialsDto);

    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param() Params, @Body(ValidationPipe) userCredentialsDto: UserCredentialsDto, @Response() res: any, @Request() req: any) {
        try {
           
            let parts = req.headers.authorization.split(' ');
            let token = parts[1]
          
            let userUpdate = await this.Userservice.updateUser(Params.id, userCredentialsDto, token);
            return res.json({
                message: 'Đã sửa thông tin của user này',
                data: userUpdate
            })

        } catch (error) {
            return res.json({
                message: 'Không sửa thông tin user này',
            })

        }

    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteUser(@Param() params, @Response() res) {
        try {
            await this.Userservice.deleteUser(params.id);
            return res.json({
                message: 'Đã xóa thành công',
            })

        } catch (error) {
            return res.json({
                message: 'Không thể xóa user',
            })
        }

    }
}
