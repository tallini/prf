import mongoose, { Document, Model, Schema, Types } from 'mongoose';

interface IBookClub extends Document {
  admin: Types.ObjectId;
  members: [Types.ObjectId];
  description: String;
  scedule: String;
  events: [
    {
      bookTitle: String;
      coverUrl: String;
      description: String;
      meetingLink: String;
      participants: [Types.ObjectId];
      comments: [Types.ObjectId];
    }
  ];
}

const BookClubSchema: Schema<IBookClub> = new mongoose.Schema({
  admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: { type: [Schema.Types.ObjectId], ref: 'User' },
  description: { type: String, required: true },
  scedule: { type: String, required: true },
  events: {
    type: [
      {
        bookTitle: { type: String, required: true },
        coverUrl: String,
        description: { type: String, required: true },
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
