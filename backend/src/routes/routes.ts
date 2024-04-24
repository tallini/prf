import { NextFunction, Request, Response, Router } from 'express';
import passport, { PassportStatic } from 'passport';
import { User } from '../model/User';

export const configureRoutes = (
  passport: PassportStatic,
  router: Router
): Router => {
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

  router.post('/logout', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      req.logout((error) => {
        if (error) {
          console.log(error);
          res.status(500).send('Internal server error.');
        }
        res.status(200).send('Successfully logged out.');
      });
    } else {
      res.status(500).send('User is not logged in.');
    }
  });

  router.post('/register', async (req: Request, res: Response) => {
    const userName = req.body.userName;
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
      userName: userName,
      lastName: lastName,
      firstName: firstName,
      email: email,
      password: password,
    });
    try {
      const data = await user.save();
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get('/get-all-users', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const query = User.find();
      query
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send('Internal server error.');
        });
    } else {
      res.status(500).send('User is not logged in.');
    }
  });

  router.get('/checkAuth', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      res.status(200).send(true);
    } else {
      res.status(500).send(false);
    }
  });

  router.delete('/deleteUser', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const id = req.query.id;
      const query = User.deleteOne({ _id: id });
      query
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send('Internal server error.');
        });
    } else {
      res.status(500).send('User is not logged in.');
    }
  });

  return router;
};
