import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProvider } from 'src/database';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseProvider
    ],
    exports: [DatabaseProvider]

})
export class DatabaseModule { }
