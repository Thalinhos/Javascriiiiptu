import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';

const auth = new Hono();
const secret = 'asheiuasnmfl1kj2n34iu1g2780dyashue1827gdubjaske17';

auth.post('/getToken', async (c) => {
    const body = await c.req.json();
    const name = body.name

    const payload = { name: name, exp: Math.floor(Date.now() / 1000) + 60 * 60 };
  
    const token = await sign(payload, secret);

    return c.json({ token: token, name: name });
});

auth.post('/verifyToken', async (c) => {
    const body = await c.req.json()
    const token = body.token;

    const verifiedToken = await verify(token, secret)
    return c.json({token: verifiedToken})
})


export default auth;
