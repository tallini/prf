import { NextFunction, Request, Response, Router } from 'express';
import MainClass from '../main_class';
import passport, { PassportStatic } from 'passport';
import { User } from '../model/user';

export const configureRoutes = (
    passport: PassportStatic,
    router: Router
): Router => {
    router.get('/', (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.status(200).send('Hello world');
    });

    router.get('/promise', async (req: Request, res: Response) => {
        let myClass = new MainClass();

        try {
            const data = await myClass.monitoringPromise();
            res.write(data);
            res.status(200).end();
        } catch (error) {
            res.write(error);
            res.status(400).end();
        }
    });

    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate(
            'local',
            (error: string | null, user: typeof User) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    if (!user) {
                        res.status(400).send('User not found!');
                    } else {
                        req.login(user, (err: string | null) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send('Internal server error');
                            } else {
                                res.status(200).send(user);
                            }
                        });
                    }
                }
            }
        )(req, res, next);
    });

    router.post('/register', async (req: Request, res: Response) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = new User({ username: username, password: password });
        try {
            const data = await user.save();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    return router;
};
