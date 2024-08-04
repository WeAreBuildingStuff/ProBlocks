import { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { getCarCommands } from '../utils/gemini/getCarCommands';
import { getTileCommands } from '../utils/gemini/getTileCommands';
import { getDrawBotCommands } from '../utils/gemini/getDrawBotCommands';

dotenv.config({ path: '.env' });

function geminiRoutes(app: Express) {
  app.post('/api/gemini/car-commands', async (req: Request, res: Response) => {
    try {
      const { message } = req.body;

      const response = await getCarCommands(message);

      res.status(201).json({ message: response });
    } catch {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/api/gemini/tile-commands', async (req: Request, res: Response) => {
    try {
      const { message } = req.body;

      const response = await getTileCommands(message);

      res.status(201).json({ message: response });
    } catch {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/api/gemini/draw-bot-commands', async (req: Request, res: Response) => {
    try {
      const { message } = req.body;

      const response = await getDrawBotCommands(message);

      res.status(201).json({ message: response });
    } catch {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
}

export default geminiRoutes;
