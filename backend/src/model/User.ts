import mongoose, {
  CallbackWithoutResultAndOptionalError,
  Document,
  Model,
  Schema,
} from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';
import Roles from './Roles';

const SALT_FACTOR = 10;

interface IUser extends Document {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: String;
  comparePassword: (
    candidatePassword: string,
    callback: (error: Error | null, isMatch: boolean) => void
  ) => void;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: [Roles.admin, Roles.manager, Roles.user],
    required: true,
  },
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre<IUser>(
  'deleteOne',
  function (next: CallbackWithoutResultAndOptionalError) {
    const user = this;

    this.model('BookClub').updateMany(
      {},
      { $pull: { members: user._id } },
      next
    );
  }
);

// hook
UserSchema.pre<IUser>('save', function (next) {
  const user = this;

  bcrypt.genSalt(SALT_FACTOR, (error, salt) => {
    if (error) {
      return next(error);
    }
    bcrypt.hash(user.password, salt, (err, encrypted) => {
      if (err) {
        return next(err);
      }
      user.password = encrypted;
      next();
    });
  });
});

UserSchema.pre<IUser>('findOneAndUpdate', function (next) {
  const user = this;

  bcrypt.genSalt(SALT_FACTOR, (error, salt) => {
    if (error) {
      return next(error);
    }
    bcrypt.hash(user.password, salt, (err, encrypted) => {
      if (err) {
        return next(err);
      }
      user.password = encrypted;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (
  candidatePassword: string,
  callback: (error: Error | null, isMatch: boolean) => void
): void {
  const user = this;

  bcrypt.compare(candidatePassword, user.password, (error, isMatch) => {
    if (error) {
      callback(error, false);
    }
    callback(null, isMatch);
  });
};

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
