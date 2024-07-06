import express, { Express } from "express";
import cors from "cors"


function createServer() {
  const app: Express = express();
  app
    .use(cors())
    .use(express.json());

  return app
}

export default createServer;
