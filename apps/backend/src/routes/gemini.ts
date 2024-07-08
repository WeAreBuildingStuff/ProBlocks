import { Express, Request, Response } from "express"
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

function geminiRoutes(app: Express) {
  app.get('/api/gemini', async (req: Request, res: Response) => {

  
    // res.status(200).json({ message: message});
  });
  
}

export default geminiRoutes;