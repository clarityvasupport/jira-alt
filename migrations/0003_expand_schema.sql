-- Add tenant_id to existing leads if it's not there (it should be, but just in case)
-- Pipeline Stages
CREATE TABLE pipeline_stages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id TEXT NOT NULL,
  name TEXT NOT NULL,
  position INTEGER NOT NULL,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Insert default stages for the dummy tenant
INSERT INTO pipeline_stages (tenant_id, name, position) VALUES 
('tenant_1', 'New Lead', 1),
('tenant_1', 'Qualified', 2),
('tenant_1', 'Proposal', 3),
('tenant_1', 'Closed Won', 4);

-- Jobs
CREATE TABLE jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id TEXT NOT NULL,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  type TEXT NOT NULL, -- 'One-time' or 'Recurring'
  frequency TEXT,     -- e.g., 'Weeks'
  interval INTEGER,   -- e.g., 2
  status TEXT DEFAULT 'Pending', -- 'Pending', 'In Progress', 'Completed'
  progress INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Job Tasks
CREATE TABLE job_tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT 0,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

-- Insert a dummy job and tasks for testing
INSERT INTO jobs (tenant_id, title, client, type, frequency, interval, status, progress) 
VALUES ('tenant_1', 'Deep Clean - Office', 'Sparkle Cleaning Co.', 'Recurring', 'Weeks', 2, 'In Progress', 50);

INSERT INTO job_tasks (job_id, title, completed) VALUES 
(1, 'Initial site visit', 1),
(1, 'Deep clean main floor', 1),
(1, 'Clean executive offices', 0);

-- Custom Fields
CREATE TABLE custom_fields (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- e.g., 'Text', 'Number', 'Dropdown'
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Automations
CREATE TABLE automations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id TEXT NOT NULL,
  name TEXT NOT NULL,
  active BOOLEAN DEFAULT 1,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

INSERT INTO automations (tenant_id, name, active) VALUES 
('tenant_1', 'Auto-assign new leads', 1),
('tenant_1', 'Send welcome email', 1),
('tenant_1', 'Create task on stage change', 0);