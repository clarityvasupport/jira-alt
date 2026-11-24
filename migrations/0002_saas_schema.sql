-- Tenants table (the SaaS customers)
CREATE TABLE tenants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Leads table (the main feed)
CREATE TABLE leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id TEXT NOT NULL,
  company TEXT NOT NULL,
  contact TEXT NOT NULL,
  location TEXT,
  value TEXT,
  status TEXT DEFAULT 'New Lead',
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Insert a dummy tenant for testing
INSERT INTO tenants (id, name) VALUES ('tenant_1', 'Demo Agency');

-- Insert dummy leads linked to the dummy tenant
INSERT INTO leads (tenant_id, company, contact, location, value, status, description) VALUES 
('tenant_1', 'Sparkle Cleaning Co.', 'Sarah Jenkins', 'Austin, TX', '$1,200/mo', 'New Lead', 'Looking for weekly commercial cleaning for a 5,000 sq ft office space.'),
('tenant_1', 'Modern Design Studio', 'David Chen', 'Seattle, WA', '$8,500', 'Qualified', 'Full interior renovation for a new downtown office. Needs quote by Friday.'),
('tenant_1', 'Elite Renovations', 'Mike Ross', 'Denver, CO', '$15,000', 'Proposal Sent', 'Kitchen and bathroom remodel. Follow up on contract status.');