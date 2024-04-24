import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';

const SALT_FACTOR = 10;

interface IUser extends Document {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  comparePassword: (
    candidatePassword: string,
    callback: (error: Error | null, isMatch: boolean) => void
  ) => void;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.plugin(uniqueValidator);

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
