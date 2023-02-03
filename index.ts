import bodyParser from "body-parser";
import cors from "cors";
import { randomBytes } from "crypto";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

dotenv.config();
const port = process.env.PORT;

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());

type User = {
  id: string;
  email: string;
  password: string;
};

const users: User[] = [];

app.get("/users", (req: Request, res: Response) => {
  res.send(users);
});

app.post("/users", (req: Request, res: Response) => {
  const id = randomBytes(16).toString("hex");
  const { email, password } = req.body;

  const newUser = {
    id,
    email,
    password,
  };

  users.push(newUser);
  res.send(newUser);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
