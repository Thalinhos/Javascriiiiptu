
import express from 'express'

import { Router, type Request, type Response } from 'express';

const app = express();

const route = Router()

app.use(express.json())

route.get('/', (req: Request, res: Response) => {
  res.cookie('name', 'thalinhos123', 
    {   
        maxAge:  3600 * 1000,
        sameSite: 'strict',
        httpOnly: true
    }
)
  res.cookie('timeStamp', Date.now() + 3600)

  res.json({ message: 'hello world with Typescript' })
})


route.get('/cookie', (req: Request, res: Response) => {

    const cookies = req.headers.cookie;

    if (!cookies) {
        return res.status(400).send('No cookies sent');
    }

    let timeStamp: string[] = [];

    const cookieSplit = cookies.split(';');

    for (let i = 0; i < cookieSplit.length; i++) {
        const cookie = cookieSplit[i].trim();
        if (cookie.startsWith('timeStamp=')) {
            timeStamp = cookie.split('=');
            break; 
        }
    }

    if (timeStamp.length > 1) {
        const cookieTime = parseInt(timeStamp[1]);

        if (cookieTime < Date.now()) {
            return res.status(400).send('Error, cookie invalid');
        }
        return res.send(`Cookies: ${cookies}`);
    } else {
        return res.status(400).send('timeStamp cookie not found');
    }
});

app.use(route)


app.listen(3333, () => console.log('server running on port 3333'))