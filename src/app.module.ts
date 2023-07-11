import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnnouncementsModule } from './modules/announcements/announcements.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [DatabaseModule, AnnouncementsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {

  static port: number;

  constructor(
    private readonly configService: ConfigService,
  ) {
    AppModule.port = this.configService.get('APP_PORT')
  }
}
