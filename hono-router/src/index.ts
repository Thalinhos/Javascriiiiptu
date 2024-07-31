import { Hono } from 'hono'
import bp from './bp'

const app = new Hono()

app.route('/bp', bp)

export default app
