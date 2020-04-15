import { Controller, Get, Param, Post, Put, Delete, Body, Response, Render, } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private Userservice: UsersService) { }

    @Get()

    async getUsers(@Response() res) {
        try {
            let user = await this.Userservice.getUsers();
            if (user) {
                return res.json({
                    message: 'Danh sách users',
                    data: user
                })
            }

        } catch (error) {
            return res.json({
                message: 'Không thể hiển thị danh sách users',
            })

        }


    }

    @Get(':id')
    async getUser(@Param() params, @Response() res) {
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
    async create(@Body() user: Users, @Response() res) {
        try {
            let userCreate = await this.Userservice.createUser(user);
            if (userCreate) {
                return res.json({
                    message: 'Đã thêm thành công',
                    data: userCreate
                })
            }

        } catch (error) {
            return res.json({
                message: 'Thêm user mới không thành công',
            })
        }


    }

    @Put(':id')
    async update(@Param() Params, @Body() user: Users, @Response() res) {
        try {
            user.id = Params.id;
            let userUpdate = await this.Userservice.updateUser(user);
            if (user) {
                return res.json({
                    message: 'Đã sửa thông tin của user này',
                    data: userUpdate
                })
            }

        } catch (error) {
            return res.json({
                message: 'Không sửa thông tin user này',
            })

        }

    }

    @Delete(':id')
    async deleteUser(@Param() params, @Response() res) {
        try {
            let user = await this.Userservice.deleteUser(params.id);
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
