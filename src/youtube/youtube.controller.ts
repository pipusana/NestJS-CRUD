import { Controller, Post, Get, Body, Put, Delete, Param } from '@nestjs/common';
import { YoutubeService } from './youtube.service';

@Controller()
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Post('/youtube')
  async createYoutubeVideo(
    @Body('name') name: string,
    @Body('like') like: number,
    @Body('dislike') dislike: number,
  ) {
    const insertData = {
        name: name,
        like: like,
        dislike: dislike,
    }
    return { id: await this.youtubeService.createYoutubeVideo(insertData) }
  }

  @Get('/youtube')
  async getYoutubeVideos() {
    return await this.youtubeService.getYoutubeVideos()
  }

  @Get('/youtube/:id')
  getYoutubeVideo(@Param('id') youtubeId: string) {
    return this.youtubeService.getYoutubeVideo(youtubeId);
  }

  @Put('/youtube/:id')
  async updateYoutubeVideo(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('like') like: number,
    @Body('dislike') dislike: number,
  ) {
    return await this.youtubeService.updateYoutubeVideo(id, name, like, dislike);;
  }

  @Delete('/youtube/:id')
  async removeYoutubeVideo(@Param('id') prodId: string) {
      return await this.youtubeService.deleteProduct(prodId);;
  }
}
