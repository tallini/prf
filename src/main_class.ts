import { Observable, Subscriber } from 'rxjs';

class MainClass {
    avalibility_trashold: number = 50;

    constructor() {
        console.log('Constructor called! Yay! :)');
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
}

export default MainClass;
