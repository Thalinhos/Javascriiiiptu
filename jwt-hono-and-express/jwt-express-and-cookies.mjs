
import express from 'express'
import jwt from 'jsonwebtoken';
import { verifyToken } from './jwt-middleware/index.mjs';

const SECRET = process.env.SECRET;

const app = express()
const port = 3000

const user = {
    name: "admin",
    password: "admin"
}

app.get('/', (req, res) => {
    const token = jwt.sign({username: user.name}, SECRET, {expiresIn: '1min'})

    res.cookie('token', token, {
        sameSite: 'strict',
        httpOnly: true
    })

    res.send('Hello World!')
})

app.get('/protected', verifyToken,(req, res) => {
    
    res.send(req.user)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


// import jwt from 'jsonwebtoken';
// const { verify } = jwt;

// const SECRET = process.env.SECRET;

// const verifyToken = ((req, res, next) => {
    
//     const rawToken = req.headers.cookie
//     const token = rawToken?.split('=')[1]

//     if(!token){
//         return res.status(401).send('Token inválido ou expirado');
//     }

//     verify(token, SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(401).send('Token inválido ou expirado');        }
        
//         req.user = decoded;

//         next()
//     });

// })

// export { verifyToken }
