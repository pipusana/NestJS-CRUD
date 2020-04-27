import * as mongoose from 'mongoose';

export interface Youtube extends mongoose.Document {
   id: string;
   name: string;
   like: number;
   dislike: number;
}