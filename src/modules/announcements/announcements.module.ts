import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementsController } from 'src/controllers/announcements/announcements.controller';
import { AnnouncementEntity } from 'src/database/entities/announcement.entity';
import { AnnouncementsService } from 'src/services/announcements/announcements.service';

@Module({
    imports: [TypeOrmModule.forFeature([AnnouncementEntity])], // Import the DatabaseModule
    providers: [AnnouncementsService],
    exports: [AnnouncementsService],
    controllers: [AnnouncementsController],
})
export class AnnouncementsModule { }
