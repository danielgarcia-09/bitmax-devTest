import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { error } from 'console';
import { appConfig } from 'src/config';
import { AnnouncementEntity } from 'src/database/entities/announcement.entity';
import { FilterDTO } from 'src/dtos/general/filter.dto';
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
        }).catch((error) => {console.error(error)})
    }

    async create(data: Partial<AnnouncementEntity>): Promise<AnnouncementEntity> {
        const entity = this.coinRepository.create(data);
        return await this.coinRepository.save(entity);
    }

    async findAll(filter?: FilterDTO): Promise<AnnouncementEntity[]> {
        
        const { search, dateRange, orderBy, skip, take } = filter;

        let betweenDates: FindOperator<Date> = null;

        if(dateRange) {
            betweenDates = Between(new Date(dateRange.from), new Date(dateRange.to));
        }

        const formattedSearch = search && ILike(`%${search}%`);

        const formattedWhere: FindOptionsWhere<AnnouncementEntity>[] =  [
            { title: formattedSearch, date: betweenDates },
            { link: formattedSearch, date: betweenDates },
            { content: formattedSearch, date: betweenDates}
        ]
        
        return await this.coinRepository.find({
            where: search ? formattedWhere : { date : betweenDates },
            skip: calculateSkip(skip),
            take: calculateTake(skip, take),
            order: {
                date: orderBy
            }
        });
    }
 
    async findOne(id: number): Promise<AnnouncementEntity> {
        return await this.coinRepository.findOne({ where: { id } });
    }

    async update(criteria: FindOptionsWhere<AnnouncementEntity>, data: Partial<AnnouncementEntity>): Promise<AnnouncementEntity> {
        const updateResult = await this.coinRepository.update(criteria, data);
        if(updateResult.affected > 0) {
            return await this.coinRepository.findOne({ where: criteria });
        }
        return null;
    }

    async remove(criteria: FindOptionsWhere<AnnouncementEntity>): Promise<AnnouncementEntity> {
        const entity = await this.coinRepository.findOne({ where: criteria });
        const deleteResult = await this.coinRepository.delete(criteria);
        if(deleteResult.affected > 0) {
            return entity;
        }
        return null;
    }
}
