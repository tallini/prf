import mongoose, { Document, Model, Schema, Types } from 'mongoose';

interface IComment extends Document {
  writer: Types.ObjectId;
  rate: Number;
  text: string;
  timeStamp: Date;
}

const CommentSchema: Schema<IComment> = new mongoose.Schema({
  writer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rate: { type: Number, required: true },
  text: { type: String, required: true },
  timeStamp: { type: Date, required: true },
});

export const Comment: Model<IComment> = mongoose.model<IComment>(
  'Comment',
  CommentSchema
);
