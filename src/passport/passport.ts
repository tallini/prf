import { PassportStatic } from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../model/user';

export const configurePassport = (passport: PassportStatic): PassportStatic => {
    passport.serializeUser((user: Express.User, done) => {
        console.log('user is serialized.');
        done(null, user);
    });

    passport.deserializeUser((user: Express.User, done) => {
        console.log('user is deserialized.');
        done(null, user);
    });

    passport.use(
        'local',
        new Strategy((username, password, done) => {
            if (username === 'test@test.com' && password === 'pass') {
                done(null, new User(username, password));
            } else {
                done('Incorrect username or password.');
            }
        })
    );

    return passport;
};
