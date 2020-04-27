import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { YoutubeController } from './controller';
import { YoutubeService } from './service';
import { YoutubeSchema } from './schemas.youtube';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Youtube', schema: YoutubeSchema }])],
  controllers: [YoutubeController],
  providers: [YoutubeService],
})

export class YoutubeModule { }