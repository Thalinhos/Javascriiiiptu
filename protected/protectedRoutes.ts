import express from "npm:express";
import { Router, Request, Response } from "npm:@types/express";
import { jwtMidleware } from "./tokenMidleware.ts";

export const router: Router = express.Router()

router.get('/protected', jwtMidleware,(_req: Request, res: Response)=> {
    res.send("sucesso")
})

