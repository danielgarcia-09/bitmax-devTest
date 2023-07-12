import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { appConfig } from 'src/config';
import { AnnouncementEntity } from 'src/database/entities/announcement.entity';
import { FilterDTO } from 'src/dtos/general/filter.dto';
import { ResultI } from 'src/interfaces/general/general.interface';
import { calculateSkip, calculateTake } from 'src/utils/math.util';
import { Between, FindOperator, FindOptionsWhere, ILike, Repository } from 'typeorm';

@Injectable()
export class AnnouncementsService {

    constructor(
        @InjectRepository(AnnouncementEntity)
        private readonly announcementRepository: Repository<AnnouncementEntity>
    ) { }

    async fillDB() {
        axios.get(appConfig.bitmexAnnouncementUrl).then(async (response) => {
            const announcements: AnnouncementEntity[] = response.data;
            for (const announcement of announcements) {
                const entity = this.announcementRepository.create(announcement);
                await this.announcementRepository.save(entity);
            }
        }).catch((error) => { console.error(error) })
    }

    async create(data: Partial<AnnouncementEntity>): Promise<ResultI> {
        try {
            const entity = this.announcementRepository.create(data);
            const createdEntity = await this.announcementRepository.save(entity);
            return { data: createdEntity };
        } catch (error) {
            console.log("❗ ~ file: announcements.service.ts:36 ~ AnnouncementsService ~ create ~ error:", error)
            return { error: { message: "Something went wrong creating the announcement, try again", code: 500 } }
        }
    }

    async findAll(filter?: FilterDTO): Promise<ResultI> {

        try {
            const { search, dateRange, orderBy, skip, take } = filter;

            let betweenDates: FindOperator<Date> = null;

            if (dateRange) {
                betweenDates = Between(new Date(dateRange.from), new Date(dateRange.to));
            }

            const formattedSearch = search && ILike(`%${search}%`);

            const formattedWhere: FindOptionsWhere<AnnouncementEntity>[] = [
                { title: formattedSearch, date: betweenDates },
                { link: formattedSearch, date: betweenDates },
                { content: formattedSearch, date: betweenDates }
            ]

            const announcements = await this.announcementRepository.find({
                where: search ? formattedWhere : { date: betweenDates },
                skip: calculateSkip(skip),
                take: calculateTake(skip, take),
                order: {
                    date: orderBy
                }
            });

            return { data: announcements }
        } catch (error) {
            console.log("❗ ~ file: announcements.service.ts:68 ~ AnnouncementsService ~ findAll ~ error:", error)
            return { error: { message: "Something went wrong getting the announcements, try again", code: 500 } }
        }
    }

    async findOne(id: number): Promise<AnnouncementEntity> {
        return await this.announcementRepository.findOne({ where: { id } });
    }

    async update(criteria: FindOptionsWhere<AnnouncementEntity>, data: Partial<AnnouncementEntity>): Promise<ResultI> {
        try {
            const updateResult = await this.announcementRepository.update(criteria, data);
            if (updateResult.affected > 0) {
                const updatedEntity = await this.announcementRepository.findOne({ where: criteria });
                return { data: updatedEntity };
            }
            return null;
        } catch (error) {
            console.log("❗ ~ file: announcements.service.ts:86 ~ AnnouncementsService ~ update ~ error:", error)
            return { error: { message: "Something went wrong updating the announcement, try again", code: 500 } }
        }
    }

    async remove(criteria: FindOptionsWhere<AnnouncementEntity>): Promise<ResultI> {
        try {
            const entity = await this.announcementRepository.findOne({ where: criteria });
            const deleteResult = await this.announcementRepository.delete(criteria);
            if (deleteResult.affected > 0) {
                return { data: entity };
            }
            return null;

        } catch (error) {
            console.log("❗ ~ file: announcements.service.ts:95 ~ AnnouncementsService ~ remove ~ error:", error)
            return { error: { message: "Something went wrong deleting the announcement, try again", code: 500 } }
        }
    }
}
