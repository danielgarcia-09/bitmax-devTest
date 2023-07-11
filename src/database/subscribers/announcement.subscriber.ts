import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { AnnouncementEntity } from "../entities/announcement.entity";


@EventSubscriber()
export class AnnouncementSubscriber implements EntitySubscriberInterface<AnnouncementEntity>  {

    listenTo(): typeof AnnouncementEntity {
        return AnnouncementEntity
    }

    beforeInsert(event: InsertEvent<AnnouncementEntity>) {
        if(event.entity.content) event.entity.content = event.entity.content.replace(/<[^>]+>/g, '');
    }
}