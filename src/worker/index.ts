import { Hono } from 'hono'
import type { D1Database } from '@cloudflare/workers-types'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/api/health', async (c) => {
  try {
    const { results } = await c.env.DB.prepare('SELECT 1 as ok').all()
    return c.json({ status: 'ok', db: 'connected', result: results[0] })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e)
    return c.json({ status: 'error', message }, 500)
  }
})

export default app