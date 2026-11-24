import { Hono } from 'hono'

type Bindings = {
  jira_db: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', async (c) => {
  try {
    const { results } = await c.env.jira_db.prepare('SELECT 1 as ok').all()
    return c.json({ status: 'ok', db: 'connected', result: results[0] })
  } catch (e: any) {
    return c.json({ status: 'error', message: e.message }, 500)
  }
})

export default app