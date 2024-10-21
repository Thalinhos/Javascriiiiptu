import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  
  const body = await readBody(event);

  const { name, password } = body;

  const userVerify = await prisma.user.findFirst({
    where: {
      name: name
    }
  })

  if(!userVerify){
    return {error: "User not found."};
  }

  const isPasswordValid = await bcrypt.compare(password ,userVerify.password);

  if (!isPasswordValid){
    return {error: "User invalid"};
  }  

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error('API_KEY não está definida nas variáveis de ambiente.');
  }

  const expiration = Date.now() + 30000; //3600000 change this for 1 hour 

  const tokenInfo = Buffer.from(`${userVerify.id}.${userVerify.name}.${expiration}`).toString('base64');

  const tokenHash = crypto.createHmac('sha256', apiKey)
                      .update(`${userVerify.id}.${userVerify.name}.${expiration}`)
                      .digest('base64');

  return { success: true, tokenInfo: tokenInfo, tokenHash: tokenHash };
})
