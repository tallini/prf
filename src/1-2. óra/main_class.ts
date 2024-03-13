import { Observable, Subscriber } from 'rxjs';

class MainClass {
    avalibility_trashold: number = 50;

    constructor() {
        console.log('Constructor called! Yay! :)');
    }

    // Második óra
    // Callback
    // Promise
    // Observable

    monitoringCallback(
        callback: (error: string | null, result: string | null) => void
    ): void {
        setTimeout(() => {
            const randAvability = Math.random() * 100;
            if (randAvability > this.avalibility_trashold) {
                callback(null, 'Successfull: ' + randAvability.toString());
            } else {
                callback('Jajx', null);
            }
        }, 3000);
    }

    monitoringPromise(): Promise<string> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const randAvability = Math.random() * 100;
                if (randAvability > this.avalibility_trashold) {
                    resolve('Successfull: ' + randAvability.toString());
                } else {
                    reject('Jajx');
                }
            }, 3000);
        });
    }

    // rxjs -> reaktív programozás

    monitoringObservable(): Observable<string> {
        return new Observable((subscriber: Subscriber<string>) => {
            let counter = 0;
            const interval = setInterval(() => {
                const randAvability = Math.random() * 100;
                if (randAvability > this.avalibility_trashold) {
                    subscriber.next('Successfull: ' + randAvability.toString());
                } else {
                    subscriber.error('Jajx');
                }
                counter++;
                if (counter > 5) {
                    clearInterval(interval);
                    subscriber.complete();
                }
            }, 2000);
        });
    }
}

export default MainClass;
