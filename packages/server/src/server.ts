import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3000;

app.get('/ping', (req: Request, res: Response) => {
  res.send('PONG!');
});

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});