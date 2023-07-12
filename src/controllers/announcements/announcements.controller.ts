import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put, Query } from '@nestjs/common';
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
    async findAll(@Query() filter: FilterDTO) {
        const result = await this.announcementService.findAll(filter);
        if (result.error) throw new InternalServerErrorException(result.error);
        return result.data;
    }

    @Post()
    async create(@Body() payload: CreateAnnouncementDTO) {
        const result = await this.announcementService.create(payload);
        if (result.error) throw new InternalServerErrorException(result.error);
        return result.data;
    }

    @Put(":uuid")
    async update(@Param("uuid") uuid: string, @Body() payload: Partial<AnnouncementEntity>) {
        const result = await this.announcementService.update({ uuid }, payload);
        if (result.error) throw new InternalServerErrorException(result.error);
        return result.data;
    }

    @Delete(":uuid")
    async remove(@Param("uuid") uuid: string) {
        const result = await this.announcementService.remove({ uuid });
        if (result.error) throw new InternalServerErrorException(result.error);
        return result.data;
    }

}
