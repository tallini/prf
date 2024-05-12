import { NextFunction, Request, Response, Router } from 'express';
import { PassportStatic } from 'passport';
import { User } from '../model/User';
import Roles from '../model/Roles';

export const userRoutes = (
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
            req.login(user, async (err: string | null) => {
              if (err) {
                console.log(err);
                res.status(500).send('Internal server error');
              } else {
                try {
                  const userData = await User.findById(user);
                  console.log(userData?.role);

                  res.status(200).send({
                    _id: userData?._id,
                    username: userData?.username,
                    firstName: userData?.firstName,
                    lastName: userData?.lastName,
                    email: userData?.email,
                    role: userData?.role,
                  });
                } catch (error) {
                  console.log(err);
                  res.status(500).send('Internal server error');
                }
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
    const username = req.body.username;
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
      username: username,
      lastName: lastName,
      firstName: firstName,
      email: email,
      password: password,
      role: Roles.user,
    });
    try {
      const data = await user.save();
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get('/check-auth', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      res.status(200).send(true);
    } else {
      res.status(500).send(false);
    }
  });

  router.put('/update', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const id = req.user;
      const username = req.body.username;
      const lastName = req.body.lastName;
      const firstName = req.body.firstName;
      const email = req.body.email;

      try {
        const update = {
          username: username,
          lastName: lastName,
          firstName: firstName,
          email: email,
        };
        const returnedData = await User.findOneAndUpdate({ _id: id }, update, {
          new: true,
        });
        res.status(200).send(returnedData);
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
      }
    } else {
      res.status(500).send('User is not logged in.');
    }
  });

  router.delete('/delete', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      try {
        const admin = req.user as string;
        const id = req.body.id;

        const userData = await User.findById(admin);
        if (userData?.role !== Roles.admin || admin !== id) {
          res.status(403).send('Forbidden');
          return;
        }

        const data = await User.deleteOne({ _id: id });
        res.status(200).send(data);
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
      }
    } else {
      res.status(500).send('User is not logged in.');
    }
  });

  router.get('/get-all', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      try {
        const admin = req.user as string;

        const userData = await User.findById(admin);
        if (userData?.role !== Roles.admin) {
          res.status(403).send('Forbidden');
          return;
        }

        const data = await User.find();
        res.status(200).send(
          data.map((user) => ({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            id: user._id,
          }))
        );
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
      }
    } else {
      res.status(500).send('User is not logged in.');
    }
  });

  router.post('/create-admin', async (req: Request, res: Response) => {
    const username = req.body.username;
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
      username: username,
      lastName: lastName,
      firstName: firstName,
      email: email,
      password: password,
      role: Roles.admin,
    });
    try {
      const data = await user.save();
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  return router;
};
