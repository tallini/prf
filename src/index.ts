import MainClass from './main_class';
import express, { Request, Response } from 'express';

const port = 5000;

const app = express();

app.get('/', (req: Request, res: Response) => {
    let myClass = new MainClass();
    res.status(200).send('Hello world');
});

app.get('/promise', async (req: Request, res: Response) => {
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

app.listen(port, () => {
    console.log('Server is listening on port: ' + port.toString());
});
