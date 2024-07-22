import { Hono } from 'hono'
import Home from './pages/home';
import login from './pages/login';
import crypto from 'crypto';
import { PrismaClient, type Todos } from '@prisma/client'

const app = new Hono();
const prisma = new PrismaClient()


const session: any = {
    username: null
}

app.get('/', async (c)=> {
    if (!session.username){
        return c.redirect('/login')
    }
    prisma.$connect()
    const todos: any = await prisma.todos.findMany();
    prisma.$disconnect()
    console.log(todos)
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

    prisma.$connect()
    const user = await prisma.user.findUnique({where: {
        username: username
    }});
    prisma.$disconnect()

    if(user){
        if(user.password === hashGerado)
            session.username = username
            return c.redirect('/')
    }
    return c.text('User not found')
})


app.post('/getTodo', async (c)=> {
    if (!session.username){
        return c.redirect('/login')
    }
    const body = await c.req.formData()
    
    const todo: any = body.get("todo")
    if (!todo){
        return c.text('error')
    }
    prisma.$connect()
    await prisma.todos.create({
        data: {
            todo: todo
        }
    })
    prisma.$disconnect()
    return c.redirect('/')
    
})

app.post('/deleteTodo', async (c)=> {
    if (!session.username){
        return c.redirect('/login')
    }
    const body = await c.req.formData()

    const todoToDelete: any = body.get('todoToDelete')
    console.log(todoToDelete)

    prisma.$connect()
    prisma.todos.delete({where: todoToDelete})
    prisma.$disconnect()

    return c.redirect('/')
})


console.log(`app is running on port 3000 - http://localhost:3000`);
export default app

