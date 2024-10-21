import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        return;
    }

    const body = await readBody(event);

    const { token } = await body;

    if(!token) {
        return { message: "Token not found" };
    }

    const tokens = JSON.parse(token);
    const tokenInfo = tokens.tokenInfo;
    const tokenHash = tokens.tokenHash;

    const decodedToken = Buffer.from(tokenInfo, 'base64').toString('utf-8');

    const time = decodedToken.split('.')[2]

    const tokenHashVerify = crypto.createHmac('sha256', apiKey)
                                                    .update(decodedToken)
                                                    .digest('base64');

    const validToken = tokenHash === tokenHashVerify;

    console.log('--------------------------------------------')
    console.log('tokens: ', tokens);
    console.log('decodedToken', decodedToken);
    console.log('tokenInfo:', tokenInfo);
    console.log('tokenHash:', tokenHash);
    console.log('time:', time);
    console.log('tnow:', Date.now())
    console.log('tokenHashVerify:', tokenHashVerify);
    console.log('validtoken', validToken)
    console.log('--------------------------------------------')

    const users = await prisma.user.findMany({
        select: {
            id:   true,
            name: true,
            role: true
        }
    })

    if(parseInt(time) < Date.now() && validToken){
        return { message: "Sucesso", token: decodedToken, users: users };
    }
    else{
        return { message: "Erro, token inválido" }
    }
});
