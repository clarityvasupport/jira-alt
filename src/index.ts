import { Hono } from 'hono'

type Bindings = {
  jira_db: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

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

// Update issue status
app.put('/issues/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    
    if (!body.status) {
      return c.json({ error: 'Status is required' }, 400)
    }

    const stmt = c.env.jira_db.prepare(
      'UPDATE issues SET status = ?1 WHERE id = ?2 RETURNING *'
    ).bind(body.status, id)

    const result = await stmt.first()
    if (!result) {
      return c.json({ error: 'Issue not found' }, 404)
    }
    
    return c.json(result)
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

export default app