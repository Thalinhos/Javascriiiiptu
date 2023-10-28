import  express from "express";
import sql from "./db.js";

const app = express();

app.use(express.json())

app.get('/users', async function(req, res) {
    const query = await sql `select * from users`
    res.json(query)
})

app.get('/user/:id', async function(req, res) {
    const { id } = req.params
    const query = await sql `select * from users where id = ${id}`
    if (query.length === 0) {
        res.json({msg: "user not found"})
    }
    else{
        res.json(query[0])
    }
})

app.post('/addUser', async function(req, res){
    const { name, value } = req.body;
    const query = await sql `insert into users (name, value) values (${name}, ${value})`
    res.json({msg: "user added"})
})

app.patch('/updateUser/:id', async function(req, res){
    const { id } = req.params;
    const {name, value} = req.body;
    const hasId = await sql `select * from users where id = ${id}`

    if (hasId && hasId.length > 0) {
        if (name && value){
            const queryNameOnly = await sql `update users set name = ${name}, value = ${value} where id = ${id}`;
            res.json({msg: "updated name and value"})
        }
        else if (name) {
            const queryNameOnly = await sql `update users set name = ${name} where id = ${id}`;
            res.json({msg: "updated only name"})
        }
        else if (value){
            const queryNameOnly = await sql `update users set value = ${value} where id = ${id}`;
            res.json({msg: "updated only value"})
        }
        else{
            res.json({msg: "any argument has been passed"})
        }
    }
    else{
        res.json({msg: "user not found"})
    }
})

app.delete('/deleteUser/:id', async function (req, res){
    const { id } = req.params;
    const hasId = await sql `select * from users where id = ${id}`

    if (hasId && hasId.length > 0){
        const query = await sql `delete from users where id = ${id}`
        res.json({msg: "user deleted"})
    }
    else{
        res.json({msg: "user not found"})
    }
    
})

app.listen(3001, () => {
    console.log('listening on 3001')
})


