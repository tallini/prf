import mongoose, { Document, Model, Schema, Types } from 'mongoose';

interface IBookClub extends Document {
  name: String;
  admin: Types.ObjectId;
  members: [Types.ObjectId];
  description: String;
  scedule: String;
  events: [
    {
      [x: string]: any;
      bookTitle: String;
      author: String;
      cover: Buffer;
      date: string;
      description: String;
      meetingLink: String;
      comments: [Types.ObjectId];
    }
  ];
}

const BookClubSchema: Schema<IBookClub> = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: { type: [Schema.Types.ObjectId], ref: 'User' },
  description: { type: String, required: true },
  scedule: { type: String, required: true },
  events: {
    type: [
      {
        bookTitle: { type: String, required: true },
        author: { type: String, required: true },
        cover: { data: Buffer, contentType: String },
        description: { type: String, required: true },
        date: { type: String, required: true },
        meetingLink: String,
        participants: { type: [Schema.Types.ObjectId], ref: 'User' },
        comments: { type: [Schema.Types.ObjectId], ref: 'Comment' },
      },
    ],
  },
});

export const BookClub: Model<IBookClub> = mongoose.model<IBookClub>(
  'BookClub',
  BookClubSchema
);
