import * as mongoose from 'mongoose';

export const YoutubeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  like: { type: Number, required: true },
  dislike: { type: Number, required: true },
});