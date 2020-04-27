import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Youtube } from './youtube.interface';
import { CreateYoutubeDto } from './youtube.entity';

@Injectable()
export class YoutubeService {
    constructor(@InjectModel('Youtube') private readonly youtubeModel: Model<Youtube>) {}

    async createYoutubeVideo(createYoutubeDto: CreateYoutubeDto) {
        const createdYoutubeVideo = new this.youtubeModel(createYoutubeDto);
        const result = await createdYoutubeVideo.save();
        return result.id as string
    }

    async getYoutubeVideos() {
        const youtubeVideoList = await this.youtubeModel.find().exec()
        return youtubeVideoList.map(youtubeVideo => ({
            id: youtubeVideo.id,
            name: youtubeVideo.name,
            like: youtubeVideo.like,
            dislike: youtubeVideo.dislike,
        }))
    }

    async getYoutubeVideo(youtubeVideoId: string) {
        const youtubeVideo = await this.findYoutubeVideo(youtubeVideoId);
        return {
          id: youtubeVideo.id,
          name: youtubeVideo.name,
          like: youtubeVideo.like,
          dislike: youtubeVideo.dislike,
        };
      }
    
      async updateYoutubeVideo(
        youtubeId: string,
        name: string,
        like: number,
        dislike: number,
      ) {
        const youtubeUpdated = await this.findYoutubeVideo(youtubeId);

        if (name) {
          youtubeUpdated.name = name;
        }
        if (like) {
          youtubeUpdated.like = like;
        }
        if (dislike) {
          youtubeUpdated.dislike = dislike;
        }
        
        const result = await await this.youtubeModel.updateOne(
            { _id: youtubeId },
            {
                name: youtubeUpdated.name,
                like: youtubeUpdated.like,
                dislike: youtubeUpdated.dislike
            },
            { upsert: true },
        )

        if (result.n === 0) {
            throw new NotFoundException('Could not find youtube video.');
        }

        return result
      }
    
      async deleteProduct(prodId: string) {
        const result = await this.youtubeModel.deleteOne({_id: prodId}).exec();
        if (result.n === 0) {
          throw new NotFoundException('Could not find youtube video.');
        }
        
        return result
      }
    
      private async findYoutubeVideo(id: string): Promise<Youtube> {
        let youtube;
        try {
          youtube = await this.youtubeModel.findById(id).exec();
        } catch (error) {
          throw new NotFoundException('Could not find youtube.');
        }
        if (!youtube) {
          throw new NotFoundException('Could not find youtube.');
        }
        return youtube;
      }
}