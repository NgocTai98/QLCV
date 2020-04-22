import { Controller, Get, UseGuards, Post, Put, Delete, Param, Response } from '@nestjs/common';
import { HistoryService } from './history.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('cv')
export class HistoryController {
    constructor(
        private historyService: HistoryService
    ) { }

    @Get(':id/history')
    @UseGuards(AuthGuard('jwt'))
    async getHistory(@Param() param: any, @Response() res: any) {
        try {
            let history = await this.historyService.getHistory(param.id);
            return res.json({
                message: "Lịch sử sửa CV",
                data: history
            })
        } catch (error) {
            return res.json({
                message: "Không thể hiển thị"
            })
        }
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createHistory() {

    }

    @Put()
    @UseGuards(AuthGuard('jwt'))
    async updateHistory() {

    }

    @Delete()
    @UseGuards(AuthGuard('jwt'))
    async deleteHistory() {

    }
}
