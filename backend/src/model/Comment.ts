import mongoose, {
  CallbackWithoutResultAndOptionalError,
  Document,
  Model,
  Schema,
  Types,
} from 'mongoose';
import { BookClub } from './BookClub';

interface IComment extends Document {
  writer: Types.ObjectId;
  rate: Number;
  text: string;
}

const CommentSchema: Schema<IComment> = new mongoose.Schema(
  {
    writer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rate: { type: Number, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

CommentSchema.pre<IComment>(
  'deleteOne',
  function (next: CallbackWithoutResultAndOptionalError) {
    const comment = this;

    this.model('BookClub').updateMany(
      {},
      { $pull: { 'events.$.comments': comment._id } },
      next
    );
  }
);

export const Comment: Model<IComment> = mongoose.model<IComment>(
  'Comment',
  CommentSchema
);
