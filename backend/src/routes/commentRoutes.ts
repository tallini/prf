import { Request, Response, Router } from 'express';
import { PassportStatic } from 'passport';
import { BookClub } from '../model/BookClub';
import { Types } from 'mongoose';
import { Comment } from '../model/Comment';

export const commentRoutes = (
  passport: PassportStatic,
  router: Router
): Router => {
  router.get('/get-all', async (req: Request, res: Response) => {
    try {
      const data = await Comment.find();
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error.');
    }
  });

  router.get('/get', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      try {
        const clubId = req.query.clubId;
        const eventId = req.query.eventId;

        const data = await BookClub.findById(clubId).populate({
          path: 'events',
          match: { _id: eventId },
          populate: { path: 'comments' },
        });

        const event = data?.events.find((event) => event?.id === eventId);

        const comments = event?.comments;

        res.status(200).send(comments);
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
      }
    } else {
      res.status(500).send('User is not logged in.');
    }
  });

  router.post('/create', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      try {
        const clubId = req.body.clubId;
        const eventId = req.body.eventId;
        const writer = req.body.writerId;
        const rate = req.body.rate;
        const text = req.body.text;

        const comment = new Comment({
          writer: new Types.ObjectId(writer),
          rate: rate,
          text: text,
        });

        const commentData = await comment.save();
        const clubData = await BookClub.findOneAndUpdate(
          { _id: clubId, 'events._id': eventId },
          {
            $push: { 'events.$.comments': new Types.ObjectId(commentData._id) },
          },
          { new: true }
        );
        res.status(200).send(clubData);
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
      }
    } else {
      res.status(500).send('User is not logged in.');
    }
  });

  router.put('/update', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      try {
        const commentId = req.body.commentId;
        const writer = req.body.writerId;
        const rate = req.body.rate;
        const text = req.body.text;

        const returnedData = await Comment.findByIdAndUpdate(
          commentId,
          {
            $set: {
              writer: writer,
              rate: rate,
              text: text,
            },
          },
          { new: true }
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

  router.delete('/delete', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      try {
        const id = req.body.commentId;

        const data = await Comment.deleteOne({ _id: id });
        res.status(200).send(data);
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
