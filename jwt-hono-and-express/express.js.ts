const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

const secret = 'uih4iu123gh789eyh12u3dbh-73t-17g9u3bwd1734uibjw'

app.post('/getToken', function (req, res) {
    const { name }  = req.body
    const token = jwt.sign({name: name}, secret, { expiresIn: '3600s' })
  res.json({token: token, name: name})
})

app.post('/verifyToken', (req, res) => {
    let verifiedToken = ''
    const { token } = req.body
    jwt.verify(token, secret, (err, data) => {
        if (err) {
            console.log(err)
        }
        verifiedToken = data
    })
    return res.json({data: verifiedToken})
})

app.listen(3000, () => {
    console.log('http://localhost:3000/')
})