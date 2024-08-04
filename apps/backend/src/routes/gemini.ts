import { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { getMoveCommands } from '../utils/gemini/getMoveCommands';

dotenv.config({ path: '.env' });

function geminiRoutes(app: Express) {
  // app.get('/api/gemini', async (req: Request, res: Response) => {

  //   // res.status(200).json({ message: message});
  // });

  app.post('/api/gemini/test', async (req: Request, res: Response) => {
    try {
      const { message } = req.body;

      const response = await getMoveCommands(message);

      res.status(201).json({ message: response });
    } catch {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
}

export default geminiRoutes;
