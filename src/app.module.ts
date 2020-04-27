import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { YoutubeModule } from './youtube/youtube.module';

@Module({
  imports: [YoutubeModule, MongooseModule.forRoot('mongodb://user:password@127.0.0.1:27017/')],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
