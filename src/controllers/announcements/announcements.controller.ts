import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AnnouncementEntity } from 'src/database/entities/announcement.entity';
import { CreateAnnouncementDTO } from 'src/dtos/announcements/create.dto';
import { FilterDTO } from 'src/dtos/general/filter.dto';
import { AnnouncementsService } from 'src/services/announcements/announcements.service';

@Controller('announcements')
export class AnnouncementsController {

    constructor(private readonly announcementService: AnnouncementsService) { }

    @Post("fill")
    async fillDB() {
        return this.announcementService.fillDB();
    }

    @Get()
    async findAll(@Body() filter: FilterDTO) {
        return await this.announcementService.findAll(filter);
    }

    @Post()
    async create(@Body() payload: CreateAnnouncementDTO) {
        console.log("❗ ~ file: announcements.controller.ts:24 ~ AnnouncementsController ~ create ~ payload:", payload)
        return await this.announcementService.create(payload);
    }

    @Put(":uuid")
    async update(@Param("uuid") uuid: string, @Body() payload: Partial<AnnouncementEntity>) {
        return await this.announcementService.update({ uuid }, payload);
    }

    @Delete(":uuid")
    async remove(@Param("uuid") uuid: string) {
        return await this.announcementService.remove({ uuid });
    }

}
