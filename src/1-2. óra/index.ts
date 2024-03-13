import MainClass from './main_class';
import express, { Request, Response } from 'express';

const port = 5000;

const app = express();

app.get('/', (req: Request, res: Response) => {
    let myClass = new MainClass();
    res.status(200).send('Hello world');
});

app.get('/callback', (req: Request, res: Response) => {
    let myClass = new MainClass();

    myClass.monitoringCallback((error, result) => {
        if (error) {
            res.write(error);
            res.status(505).end();
        } else {
            res.write(result);
            res.status(200).end();
        }
    });
});

app.get('/promise', async (req: Request, res: Response) => {
    let myClass = new MainClass();

    /*myClass
        .monitoringPromise()
        .then((data) => {
            res.write(data);
            res.status(200).end();
        })
        .catch((error) => {
            res.write(error);
            res.status(400).end();
        });
    */
    // async-await
    // Ezzel "szinkron kódot" lehet írni, amit utána írok, az utána is fog lefutni

    try {
        const data = await myClass.monitoringPromise();
        res.write(data);
        res.status(200).end();
    } catch (error) {
        res.write(error);
        res.status(400).end();
    }

    // az awaitet tartalmazó függvényre kell az asyncet kitenni!!
});

app.get('/observable', (req: Request, res: Response) => {
    let myClass = new MainClass();
    res.setHeader('Content-Type', 'text/html; character=UTF-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    myClass.monitoringObservable().subscribe({
        next(data: string) {
            res.write(data);
        },
        error(error: string) {
            // res.write(error);
            res.status(400).end(error);
        },
        complete() {
            res.status(200).end();
        },
    });
});

app.listen(port, () => {
    console.log('Server is listening on port: ' + port.toString());
});

// 2. typescript óra - asyncron

// szinkron kód: olyan sorban amilyenben írtam

// 1. typescript óra

// (port as any).listen()

// unknown and any => difference: az unknown nem adható értékül

// let a: any = 10
// let b: unknown = 10

// let c: string = a ---good
// let c: string = b ---baad

// undefined is not inicialized
// null az egy érték!!
