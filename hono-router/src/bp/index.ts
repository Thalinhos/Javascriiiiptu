import { Hono } from 'hono'
import Home from './pages/Home'

const bp = new Hono()

bp.get('/', (c) => {
  return c.html(Home())
})

export default bp
