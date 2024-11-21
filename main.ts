import express from "npm:express";
import { Request, Response } from "npm:@types/express";
import  jwt  from "npm:jsonwebtoken";

import { router } from "./protected/protectedRoutes.ts";

const app = express();

app.use(router)

app.get("/", (_req: Request, res: Response) => {

  const token = jwt.sign({ name: "thalinhos" }, "seeeeeecret", {
    expiresIn: "1min",
  });

  

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: 'strict'
  });

  // res.status(200).json({ message: "sucesso!" });
  res.json({message: "sucesso!"}).status(200)
});


app.listen(3000, () => {
  console.log("running on http://localhost:3000");
});
