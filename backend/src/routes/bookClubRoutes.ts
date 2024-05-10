import { Request, Response, Router } from 'express';
import { PassportStatic } from 'passport';
import { BookClub } from '../model/BookClub';
import { Types } from 'mongoose';

export const bookClubRoutes = (
  passport: PassportStatic,
  router: Router
): Router => {
  router.get('/get-all', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      try {
        const data = await BookClub.find();
        res.status(200).send(
          data.map((club) => ({
            _id: club._id,
            name: club.name,
            admin: club.admin,
            members: club.members,
            description: club.description,
            scedule: club.scedule,
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

  router.get('/get', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      try {
        const clubId = req.query.clubId;
        const returnedData = await BookClub.findById(clubId);
        if (returnedData) {
          res.status(200).send(returnedData);
        } else {
          res.status(404).send('No club with id: ' + clubId);
        }
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      res.status(500).send('User is not logged in.');
    }
  });

  router.post('/create', async (req: Request, res: Response) => {
    console.log(req.isAuthenticated());

    if (req.isAuthenticated()) {
      try {
        let admin;
        if (typeof req.user === 'string') {
          admin = req.user;
        }
        const description = req.body.description;
        const scedule = req.body.scedule;
        const name = req.body.name;

        const club = new BookClub({
          name: name,
          description: description,
          scedule: scedule,
          admin: new Types.ObjectId(admin),
        });

        console.log(club);

        const returnedData = await club.save();
        res.status(200).send(returnedData);
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      res.status(500).send('User is not logged in.');
    }
  });

  router.put('/update', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const name = req.body.name;
      const description = req.body.description;
      const scedule = req.body.scedule;
      const clubId = req.query.clubId;

      try {
        const update = {
          name: name,
          description: description,
          scedule: scedule,
        };
        const returnedData = await BookClub.findByIdAndUpdate(clubId, update, {
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
        const id = req.body.clubId;

        const data = await BookClub.findByIdAndDelete(id);
        res.status(200).send(data);
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
      }
    } else {
      res.status(500).send('User is not logged in.');
    }
  });

  router.post('/add-member', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const clubId = req.body.clubId;
      const userId = req.body.userId;
      try {
        const returnedData = await BookClub.findByIdAndUpdate(
          clubId,
          {
            $push: { members: new Types.ObjectId(userId) },
          },
          {
            new: true,
          }
        );

        res.status(200).send(returnedData?._id);
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
      }
    } else {
      res.status(500).send('User is not logged in.');
    }
  });

  router.delete('/delete-member', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const clubId = req.body.clubId;
      const userId = req.body.userId;
      try {
        if (typeof userId !== 'string') {
          throw new TypeError();
        }
        const returnedData = await BookClub.findByIdAndUpdate(
          clubId,
          {
            $pull: {
              members: new Types.ObjectId(userId),
            },
          },
          {
            new: true,
          }
        );

        res.status(200).send(returnedData?._id);
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
      }
    } else {
      res.status(500).send('User is not logged in.');
    }
  });

  router.post('/add-event', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const clubId = req.body.clubId;
      const bookTitle = req.body.bookTitle;
      const coverUrl = req.body.coverUrl;
      const author = req.body.author;
      const date = req.body.date;
      const description = req.body.description;
      const meetingLink = req.body.meetingLink;
      const newEventId: Types.ObjectId = new Types.ObjectId();

      try {
        await BookClub.findByIdAndUpdate(
          clubId,
          {
            $push: {
              events: {
                _id: newEventId,
                bookTitle: bookTitle,
                coverUrl: coverUrl,
                author: author,
                date: date,
                description: description,
                meetingLink: meetingLink,
              },
            },
          },
          {
            new: true,
          }
        );

        res.status(200).send(newEventId);
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
      }
    } else {
      res.status(500).send('User is not logged in.');
    }
  });

  router.delete('/delete-event', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const clubId = req.body.clubId;
      const eventId = req.body.eventId;
      try {
        const returnedData = await BookClub.findByIdAndUpdate(
          clubId,
          {
            $pull: {
              events: { _id: eventId },
            },
          },
          {
            new: true,
          }
        );

        res.status(200).send(returnedData?._id);
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
      }
    } else {
      res.status(500).send('User is not logged in.');
    }
  });

  router.put('/update-event', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const clubId = req.body.clubId;
      const eventId = req.body.eventId;
      const bookTitle = req.body.bookTitle;
      const coverUrl = req.body.coverUrl;
      const description = req.body.description;
      const meetingLink = req.body.meetingLink;
      const author = req.body.author;
      const date = req.body.date;

      try {
        const returnedData = await BookClub.findByIdAndUpdate(
          clubId,
          {
            $set: {
              [`evets.$[outer].bookTitle`]: bookTitle,
              [`evets.$[outer].coverUrl`]: coverUrl,
              [`evets.$[outer].description`]: description,
              [`evets.$[outer].meetingLink`]: meetingLink,
              [`evets.$[outer].date`]: date,
              [`evets.$[outer].author`]: author,
            },
          },
          {
            arrayFilters: [{ 'outer.id': eventId }],
          }
        );

        res.status(200).send(returnedData);
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
      }
    } else {
      res.status(500).send('User is not logged in.');
    }
  });

  return router;
};