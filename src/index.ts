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

// Update issue (status, title, description)
app.put('/issues/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    
    // Get existing issue first
    const existing: any = await c.env.jira_db.prepare('SELECT * FROM issues WHERE id = ?1').bind(id).first()
    if (!existing) {
      return c.json({ error: 'Issue not found' }, 404)
    }

    const newStatus = body.status || existing.status
    const newTitle = body.title || existing.title
    const newDesc = body.description !== undefined ? body.description : existing.description

    const stmt = c.env.jira_db.prepare(
      'UPDATE issues SET status = ?1, title = ?2, description = ?3 WHERE id = ?4 RETURNING *'
    ).bind(newStatus, newTitle, newDesc, id)

    const result = await stmt.first()
    return c.json(result)
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// Delete issue
app.delete('/issues/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await c.env.jira_db.prepare('DELETE FROM issues WHERE id = ?1').bind(id).run()
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

export default app