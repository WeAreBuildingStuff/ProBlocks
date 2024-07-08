import express, { Express } from "express";
import cors from "cors"
import geminiRoutes from "../routes/gemini";

function createServer() {
  const app: Express = express();
  app
    .use(cors())
    .use(express.json());
  geminiRoutes(app)

  return app
}

export default createServer;
