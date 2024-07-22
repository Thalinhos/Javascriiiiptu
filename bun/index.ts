import { Hono } from 'hono'
import Home from './pages/home';
import login from './pages/login';
import crypto from 'crypto';


const app = new Hono();

const todos = [
    'going home',
    'going to the gym',
    'eat some proteins'
]
const adms = [{
    name: 'thalisson',
    password: 'f8a7199dae4beccbe646b14292ddbbb44d1531875e5ff7e2677a3b5ed1d7bf94'
}]
const session: any = {
    username: null
}

app.get('/', async (c)=> {
    if (!session.username){
        return c.redirect('/login')
    }
    return c.html(Home(todos))
})

app.get('/login', (c)=> {
    return c.html(login())
})

app.post('/logout', (c)=> {
    session.username = null;
    return c.redirect('/login')
})

app.post('/handleLogin', async (c)=> {
    const body = await c.req.formData()

    if(!body.get('username')){
        return c.text('User not found')
    }
    if(!body.get('password')){
        return c.text('User password not found')
    }

    const username: any = body.get('username')
    const password: any = body.get('password')

    const hashGerado: any = crypto.createHash('sha256').update(password).digest('hex');

    for (let i = 0; i < adms.length; i++){
        if (username === adms[i].name){
            if(hashGerado === adms[i].password){
                session.username = username
                return c.redirect('/')
            }
        }
    }
    return c.text('User not found')
})


app.post('/getTodo', async (c)=> {
    if (!session.username){
        return c.redirect('/login')
    }
    const body = await c.req.formData()
    
    const todo = body.get("todo")
    if (typeof todo === null){
        return c.text('error')
    }
    if (typeof todo === 'string') {
        todos.push(todo)
        return c.redirect('/')
    }
})

app.post('/deleteTodo', async (c)=> {
    if (!session.username){
        return c.redirect('/login')
    }
    const body = await c.req.formData()

    const todoToDelete = body.get('todoToDelete')
    console.log(todoToDelete)

    const index = todos.findIndex(todo => todo === todoToDelete)
    todos.splice(index, 1)

    return c.redirect('/')
})


console.log(`app is running on port 3000 - http://localhost:3000`);
export default app

