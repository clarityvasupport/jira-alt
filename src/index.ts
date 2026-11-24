import { Hono } from 'hono'

type Bindings = {
  jira_db: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Health check
app.get('/', async (c) => {
  try {
    const { results } = await c.env.jira_db.prepare('SELECT 1 as ok').all()
    return c.json({ status: 'ok', db: 'connected', result: results[0] })
  } catch (e: any) {
    return c.json({ status: 'error', message: e.message }, 500)
  }
})

// Get all issues
app.get('/issues', async (c) => {
  try {
    const { results } = await c.env.jira_db.prepare('SELECT * FROM issues ORDER BY created_at DESC').all()
    return c.json(results)
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// Create an issue
app.post('/issues', async (c) => {
  try {
    const body = await c.req.json()
    if (!body.title) {
      return c.json({ error: 'Title is required' }, 400)
    }

    const stmt = c.env.jira_db.prepare(
      'INSERT INTO issues (title, description, status) VALUES (?1, ?2, ?3) RETURNING *'
    ).bind(body.title, body.description || null, body.status || 'To Do')

    const result = await stmt.first()
    return c.json(result, 201)
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

export default app