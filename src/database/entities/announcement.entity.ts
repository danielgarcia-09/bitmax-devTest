import { Column, Entity } from "typeorm";
import { _BaseEntity } from "./base.entity";

@Entity({ name: 'announcements' })
export class AnnouncementEntity extends _BaseEntity {

    @Column()
    link: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({type: "timestamptz"})
    date: Date;

}