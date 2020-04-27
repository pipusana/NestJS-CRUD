import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { YoutubeController } from './youtube.controller';
import { YoutubeService } from './youtube.service';
import { YoutubeSchema } from './youtube.schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Youtube', schema: YoutubeSchema }])],
  controllers: [YoutubeController],
  providers: [YoutubeService],
})

export class YoutubeModule { }