import express, { Request, Response } from 'express';
import { userRoutes } from './routes/userRoutes';
import bodyParser from 'body-parser';
import passport from 'passport';
import { configurePassport } from './passport/passport';
import expressSession from 'express-session';
import cookieParser from 'cookie-parser';

import mongoose from 'mongoose';
import cors from 'cors';
import { bookClubRoutes } from './routes/bookClubRoutes';
import { commentRoutes } from './routes/commentRoutes';

const port = 5000;
const app = express();
const dbUrl = 'mongodb://localhost:6000/my_db';

// connection to database

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((error) => {
    console.log(error);
    return;
  });

const whitelist = ['*', 'http://localhost:4200'];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allowed?: boolean) => void
  ) => {
    if (whitelist.indexOf(origin!) !== -1 || whitelist.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS.'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// cookieParser
app.use(cookieParser());

// session
const sessionOptions: expressSession.SessionOptions = {
  secret: 'testsecret',
  resave: false,
  saveUninitialized: false,
};
app.use(expressSession(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

// routes
app.use('/user', userRoutes(passport, express.Router()));
app.use('/book-club', bookClubRoutes(passport, express.Router()));
app.use('/comment', commentRoutes(passport, express.Router()));

app.listen(port, () => {
  console.log('Server is listening on port: ' + port.toString());
});
