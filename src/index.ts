import express, { Request, Response } from 'express';
import { configureRoutes } from './routes/routes';
import bodyParser from 'body-parser';
import passport from 'passport';
import { configurePassport } from './passport/passport';
import expressSession from 'express-session';
import cookieParser from 'cookie-parser';

const app = express();
const port = 5000;

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
app.use('/app', configureRoutes(passport, express.Router()));

app.listen(port, () => {
    console.log('Server is listening on port: ' + port.toString());
});
