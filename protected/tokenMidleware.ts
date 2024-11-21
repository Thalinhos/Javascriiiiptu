import { Request, Response } from "npm:@types/express";
import jwt from "npm:jsonwebtoken";

// deno-lint-ignore no-explicit-any
export const jwtMidleware = (req: Request, res: Response, next: any): void => {
  const token = req.headers.cookie?.split("=")[1];

  if (!token) {
    return res.json("Token inválido ou expirado").status(401);
  }

  // deno-lint-ignore no-explicit-any
  jwt.verify(token, "seeeeeecret", (err: any, decoded: any) => {
    if (err) {
      return res.json("Token inválido ou expirado").status(401);
    }

    req.user = decoded;

    next();
  });
};
