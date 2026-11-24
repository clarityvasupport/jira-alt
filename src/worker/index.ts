import { Hono } from 'hono'
import type { D1Database } from '@cloudflare/workers-types'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Fetch real leads
app.get('/api/leads', async (c) => {
  try {
    // Hardcoding tenant_1 for now until we build Auth
    const { results } = await c.env.DB.prepare('SELECT * FROM leads WHERE tenant_id = ?1 ORDER BY created_at DESC').bind('tenant_1').all()
    return c.json(results)
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e)
    return c.json({ error: message }, 500)
  }
})

export default app