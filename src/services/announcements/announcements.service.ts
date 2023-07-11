import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { error } from 'console';
import { appConfig } from 'src/config';
import { AnnouncementEntity } from 'src/database/entities/announcement.entity';
import { FilterDTO } from 'src/dtos/general/filter.dto';
import { ErrorI } from 'src/interfaces/general/general.interface';
import { calculateSkip, calculateTake } from 'src/utils/math.util';
import { Between, FindOperator, FindOptionsWhere, ILike, Repository } from 'typeorm';

@Injectable()
export class AnnouncementsService {

    constructor(
        @InjectRepository(AnnouncementEntity)
        private readonly coinRepository: Repository<AnnouncementEntity>
    ) { }

    async fillDB() {
        axios.get(appConfig.bitmapAnnouncementUrl).then(async (response) => {
            const announcements: AnnouncementEntity[] = response.data;
            console.log("❗ ~ file: announcements.service.ts:22 ~ AnnouncementsService ~ axios.get ~ announcements:", announcements)
            for (const announcement of announcements) {
                const entity = this.coinRepository.create(announcement);
                await this.coinRepository.save(entity);
            }
        }).catch((error) => { console.error(error) })
    }

    async create(data: Partial<AnnouncementEntity>): Promise<AnnouncementEntity | ErrorI> {
        try {
            const entity = this.coinRepository.create(data);
            return await this.coinRepository.save(entity);
        } catch (error) {
            console.log("❗ ~ file: announcements.service.ts:36 ~ AnnouncementsService ~ create ~ error:", error)
            return { message: "Something went wrong creating the announcement, try again", code: 500 }
        }
    }

    async findAll(filter?: FilterDTO): Promise<AnnouncementEntity[] | ErrorI> {

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

            return await this.coinRepository.find({
                where: search ? formattedWhere : { date: betweenDates },
                skip: calculateSkip(skip),
                take: calculateTake(skip, take),
                order: {
                    date: orderBy
                }
            });
        } catch (error) {
            console.log("❗ ~ file: announcements.service.ts:68 ~ AnnouncementsService ~ findAll ~ error:", error)
            return { message: "Something went wrong getting the announcements, try again", code: 500 }
        }
    }

    async findOne(id: number): Promise<AnnouncementEntity> {
        return await this.coinRepository.findOne({ where: { id } });
    }

    async update(criteria: FindOptionsWhere<AnnouncementEntity>, data: Partial<AnnouncementEntity>): Promise<AnnouncementEntity | ErrorI> {
        try {
            const updateResult = await this.coinRepository.update(criteria, data);
            if (updateResult.affected > 0) {
                return await this.coinRepository.findOne({ where: criteria });
            }
            return null;
        } catch (error) {
            console.log("❗ ~ file: announcements.service.ts:86 ~ AnnouncementsService ~ update ~ error:", error)
            return { message: "Something went wrong updating the announcement, try again", code: 500 }
        }
    }

    async remove(criteria: FindOptionsWhere<AnnouncementEntity>): Promise<AnnouncementEntity| ErrorI> {
        try {
            const entity = await this.coinRepository.findOne({ where: criteria });
            const deleteResult = await this.coinRepository.delete(criteria);
            if (deleteResult.affected > 0) {
                return entity;
            }
            return null;

        } catch (error) {
            console.log("❗ ~ file: announcements.service.ts:95 ~ AnnouncementsService ~ remove ~ error:", error)
            return { message: "Something went wrong deleting the announcement, try again", code: 500 }
        }
    }
}
