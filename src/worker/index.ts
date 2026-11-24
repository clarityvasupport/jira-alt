import { Hono } from 'hono'
import type { D1Database } from '@cloudflare/workers-types'

type Bindings = {
  DB: D1Database
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface Job {
  id: number;
  tenant_id: string;
  title: string;
  client: string;
  type: string;
  frequency: string | null;
  interval: number | null;
  status: string;
  progress: number;
  created_at: string;
  tasks: Task[];
}

const app = new Hono<{ Bindings: Bindings }>()

// Fetch Leads
app.get('/api/leads', async (c) => {
  try {
    const { results } = await c.env.DB.prepare('SELECT * FROM leads WHERE tenant_id = ?1 ORDER BY created_at DESC').bind('tenant_1').all()
    return c.json(results)
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e)
    return c.json({ error: message }, 500)
  }
})

// Fetch Jobs with their Tasks
app.get('/api/jobs', async (c) => {
  try {
    const jobsResult = await c.env.DB.prepare('SELECT * FROM jobs WHERE tenant_id = ?1 ORDER BY created_at DESC').bind('tenant_1').all()
    
    const jobs = jobsResult.results as unknown as Job[]

    for (const job of jobs) {
      const tasksResult = await c.env.DB.prepare('SELECT * FROM job_tasks WHERE job_id = ?1').bind(job.id).all()
      
      const rawTasks = tasksResult.results as { id: number, title: string, completed: number }[]
      
      job.tasks = rawTasks.map((t) => ({
        id: t.id,
        title: t.title,
        completed: t.completed === 1
      }))
    }

    return c.json(jobs)
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e)
    return c.json({ error: message }, 500)
  }
})

export default app