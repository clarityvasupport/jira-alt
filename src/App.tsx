import { useState } from 'react';
import { 
  Home, Users, Settings, MapPin, ChevronRight, CheckSquare, Search, Plus, X, 
  LayoutDashboard, Phone, Mail, DollarSign, Trash2
} from 'lucide-react';

type Tab = 'home' | 'pipeline' | 'contacts' | 'jobs' | 'settings';

interface Lead {
  id: number;
  company: string;
  contact: string;
  location: string;
  value: string;
  status: string;
  description: string;
}

const mockLeads: Lead[] = [
  { id: 1, company: 'Sparkle Cleaning Co.', contact: 'Sarah Jenkins', location: 'Austin, TX', value: '$1,200/mo', status: 'New Lead', description: 'Looking for weekly commercial cleaning for a 5,000 sq ft office space.' },
  { id: 2, company: 'Modern Design Studio', contact: 'David Chen', location: 'Seattle, WA', value: '$8,500', status: 'Qualified', description: 'Full interior renovation for a new downtown office. Needs quote by Friday.' },
  { id: 3, company: 'Elite Renovations', contact: 'Mike Ross', location: 'Denver, CO', value: '$15,000', status: 'Proposal', description: 'Kitchen and bathroom remodel. Follow up on contract status.' },
];

interface Job {
  id: number;
  title: string;
  client: string;
  type: 'One-time' | 'Recurring';
  frequency?: string;
  interval?: number;
  status: 'Pending' | 'In Progress' | 'Completed';
  progress: number;
  tasks: { id: number; title: string; completed: boolean }[];
}

const mockJobs: Job[] = [
  { 
    id: 1, 
    title: 'Deep Clean - Office', 
    client: 'Sparkle Cleaning Co.', 
    type: 'Recurring', 
    frequency: 'Weeks',
    interval: 2,
    status: 'In Progress', 
    progress: 50,
    tasks: [
      { id: 1, title: 'Initial site visit', completed: true },
      { id: 2, title: 'Deep clean main floor', completed: true },
      { id: 3, title: 'Clean executive offices', completed: false },
      { id: 4, title: 'Final walkthrough', completed: false },
    ]
  },
  { 
    id: 2, 
    title: 'Kitchen Remodel', 
    client: 'Elite Renovations', 
    type: 'One-time', 
    status: 'Pending', 
    progress: 0,
    tasks: [
      { id: 1, title: 'Demolition', completed: false },
      { id: 2, title: 'Plumbing rough-in', completed: false },
      { id: 3, title: 'Cabinet installation', completed: false },
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [showFabMenu, setShowFabMenu] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [settingsView, setSettingsView] = useState<'main' | 'team' | 'fields' | 'automations' | 'forms' | 'pipeline'>('main');
  
  const [stages, setStages] = useState<string[]>(['New Lead', 'Qualified', 'Proposal', 'Closed Won']);
  const [newStageName, setNewStageName] = useState('');
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  
  // Mock Automations State
  const [automations, setAutomations] = useState([
    { id: 1, name: 'Auto-assign new leads', active: true },
    { id: 2, name: 'Send welcome email', active: true },
    { id: 3, name: 'Create task on stage change', active: false },
  ]);
  
  // Modals & Drawers
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [drawerTab, setDrawerTab] = useState<'details' | 'activity' | 'jobs'>('details');
  
  // Form State
  const [formData, setFormData] = useState({ company: '', contact: '', location: '', value: '', status: 'New Lead', description: '' });
  
  // New Modals State
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactData, setContactData] = useState({ name: '', company: '', email: '', phone: '' });
  
  const [showJobModal, setShowJobModal] = useState(false);
  const [jobData, setJobData] = useState({ title: '', client: '', type: 'One-time' as 'One-time' | 'Recurring', frequency: 'Weeks', interval: 1 });

  return (
    <div className="max-w-md mx-auto h-[100dvh] bg-gray-50 relative flex flex-col overflow-hidden shadow-2xl sm:border-x sm:border-gray-200 font-sans">
      
      {/* Header */}
      <header className="h-14 bg-white flex items-center justify-between px-4 border-b border-gray-100 z-10 flex-shrink-0">
        <div className="font-bold text-lg text-indigo-600 tracking-tight capitalize">
          {activeTab === 'home' ? 'SaaS CRM' : activeTab}
        </div>
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm cursor-pointer">
          CV
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative bg-gray-50">
        
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="h-full w-full overflow-y-auto snap-y snap-mandatory scrollbar-hide">
            {leads.map((lead) => (
              <div key={lead.id} className="h-full w-full snap-start snap-always p-5 flex flex-col bg-white border-b border-gray-100">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold w-max mb-4 border border-indigo-100">
                    {lead.status}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-3">{lead.company}</h2>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <Users size={16} /><span>{lead.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-8">
                    <MapPin size={16} /><span>{lead.location}</span>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">"{lead.description}"</p>
                  <div className="text-2xl font-mono font-bold text-gray-900 mb-8">{lead.value}</div>
                </div>
                <div className="pb-4">
                  <button onClick={() => { setSelectedLead(lead); setDrawerTab('details'); }} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition">
                    View Details <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PIPELINE TAB */}
        {activeTab === 'pipeline' && (
          <div className="h-full overflow-x-auto flex gap-4 p-4 items-start snap-x">
            {stages.map(stage => (
              <div key={stage} className="w-72 flex-shrink-0 bg-gray-100 rounded-xl p-3 snap-center flex flex-col gap-3 h-full overflow-y-auto">
                <div className="flex justify-between items-center px-1">
                  <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">{stage}</h3>
                  <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    {leads.filter(l => l.status === stage).length}
                  </span>
                </div>
                {leads.filter(l => l.status === stage).map(lead => (
                  <div key={lead.id} onClick={() => { setSelectedLead(lead); setDrawerTab('details'); }} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-2 cursor-pointer hover:border-indigo-300 transition">
                    <div className="font-bold text-gray-900">{lead.company}</div>
                    <div className="text-sm text-gray-500">{lead.contact}</div>
                    <div className="text-sm font-mono text-gray-700 mt-2">{lead.value}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* CONTACTS TAB */}
        {activeTab === 'contacts' && (
          <div className="p-4 h-full overflow-y-auto">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input type="text" placeholder="Search contacts..." className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-500 bg-white" />
            </div>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              {leads.map(lead => (
                <div key={lead.id} onClick={() => { setSelectedLead(lead); setDrawerTab('details'); }} className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                  <div>
                    <div className="font-semibold text-gray-900">{lead.contact}</div>
                    <div className="text-sm text-gray-500">{lead.company}</div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}

                {/* JOBS TAB */}
        {activeTab === 'jobs' && (
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex gap-2 mb-4">
              <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium shadow-sm">All Jobs</button>
              <button className="flex-1 bg-white text-gray-600 border border-gray-200 py-2 rounded-lg text-sm font-medium">Recurring</button>
            </div>

            <div className="space-y-3">
              {jobs.map(job => (
                <div key={job.id} onClick={() => setSelectedJob(job)} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm cursor-pointer hover:border-indigo-300 transition">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-gray-900">{job.title}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      job.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                      job.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{job.client} • {job.type} {job.type === 'Recurring' && `(Every ${job.interval} ${job.frequency})`}</p>
                  
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
                    <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${job.progress}%` }}></div>
                  </div>
                  <div className="text-right text-[10px] font-semibold text-gray-400">{job.progress}% COMPLETE</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="p-4 h-full overflow-y-auto bg-gray-50">
            
            {/* MAIN SETTINGS MENU */}
            {settingsView === 'main' && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                  <div onClick={() => setSettingsView('team')} className="p-4 border-b border-gray-100 font-medium hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                    <div className="flex items-center gap-3 text-gray-800"><Users size={18} className="text-gray-400" /> Team Members</div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                  <div onClick={() => setSettingsView('fields')} className="p-4 border-b border-gray-100 font-medium hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                    <div className="flex items-center gap-3 text-gray-800"><LayoutDashboard size={18} className="text-gray-400" /> Custom Fields</div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                  <div onClick={() => setSettingsView('automations')} className="p-4 border-b border-gray-100 font-medium hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                    <div className="flex items-center gap-3 text-gray-800"><Settings size={18} className="text-gray-400" /> Automations</div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                  <div onClick={() => setSettingsView('forms')} className="p-4 border-b border-gray-100 font-medium hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                    <div className="flex items-center gap-3 text-gray-800"><CheckSquare size={18} className="text-gray-400" /> Client Forms</div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                  <div onClick={() => setSettingsView('pipeline')} className="p-4 border-b border-gray-100 font-medium hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                    <div className="flex items-center gap-3 text-gray-800"><LayoutDashboard size={18} className="text-gray-400" /> Pipeline Settings</div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="p-4 font-medium text-red-600 hover:bg-red-50 cursor-pointer text-center">Sign Out</div>
                </div>
                <p className="text-center text-xs text-gray-400 mt-6">SaaS CRM v1.0.0 • Free Plan</p>
              </div>
            )}

            {/* TEAM MEMBERS SUB-PAGE */}
            {settingsView === 'team' && (
              <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-200">
                <button onClick={() => setSettingsView('main')} className="text-sm font-semibold text-indigo-600 mb-2 flex items-center gap-1">&larr; Back</button>
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Team Members</h2>
                    <p className="text-xs text-gray-500">3 of 5 users used (Free Plan)</p>
                  </div>
                  <button className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-semibold">+ Invite</button>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                  {['Clarity VA (You)', 'Sarah Jenkins', 'Mike Ross'].map((name, i) => (
                    <div key={name} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">{name.substring(0,2)}</div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{name}</div>
                          <div className="text-xs text-gray-500">{i === 0 ? 'Admin' : 'Field Worker'}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CUSTOM FIELDS SUB-PAGE */}
            {settingsView === 'fields' && (
              <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-200">
                <button onClick={() => setSettingsView('main')} className="text-sm font-semibold text-indigo-600 mb-2 flex items-center gap-1">&larr; Back</button>
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Custom Fields</h2>
                    <p className="text-xs text-gray-500">2 of 5 fields used</p>
                  </div>
                  <button className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-semibold">+ Add Field</button>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                  {['Property Type (Dropdown)', 'Square Footage (Number)'].map(field => (
                    <div key={field} className="p-4 flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-800">{field}</span>
                      <span className="text-xs text-gray-400">Edit</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FORMS SUB-PAGE */}
            {settingsView === 'forms' && (
              <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-200">
                <button onClick={() => setSettingsView('main')} className="text-sm font-semibold text-indigo-600 mb-2 flex items-center gap-1">&larr; Back</button>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Client Forms</h2>
                  <p className="text-xs text-gray-500">Intake forms and checklists</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                  {['New Client Intake', 'Post-Job Satisfaction Survey', 'Site Visit Checklist'].map((formName, i) => (
                    <div key={i} className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50" onClick={() => setSelectedForm(formName)}>
                      <span className="text-sm font-medium text-gray-800">{formName}</span>
                      <span className="text-xs text-indigo-600 font-semibold">Fill &rarr;</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PIPELINE SUB-PAGE */}
            {settingsView === 'pipeline' && (
              <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-200">
                <button onClick={() => setSettingsView('main')} className="text-sm font-semibold text-indigo-600 mb-2 flex items-center gap-1">&larr; Back</button>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Pipeline Stages</h2>
                  <p className="text-xs text-gray-500">Customize your sales process</p>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50 mb-4">
                  {stages.map((stage, i) => (
                    <div key={i} className="p-4 flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-800">{stage}</span>
                      {stages.length > 1 && (
                        <button onClick={() => setStages(stages.filter((_, idx) => idx !== i))} className="text-xs text-red-500 font-semibold hover:text-red-700">Remove</button>
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (newStageName.trim() && !stages.includes(newStageName.trim())) {
                    setStages([...stages, newStageName.trim()]);
                    setNewStageName('');
                  }
                }} className="flex gap-2">
                  <input required value={newStageName} onChange={(e) => setNewStageName(e.target.value)} placeholder="New stage name..." className="flex-1 border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500 text-sm" />
                  <button type="submit" className="bg-indigo-600 text-white px-4 rounded-xl font-semibold text-sm hover:bg-indigo-700">Add</button>
                </form>
              </div>
            )}

            {/* AUTOMATIONS SUB-PAGE */}
            {settingsView === 'automations' && (
              <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-200">
                <button onClick={() => setSettingsView('main')} className="text-sm font-semibold text-indigo-600 mb-2 flex items-center gap-1">&larr; Back</button>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Automations</h2>
                  <p className="text-xs text-gray-500">15 of 100 runs used this month</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                  {automations.map(auto => (
                    <div key={auto.id} className="p-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-800">{auto.name}</span>
                      <button 
                        onClick={() => {
                          setAutomations(automations.map(a => a.id === auto.id ? { ...a, active: !a.active } : a));
                        }}
                        className={`w-11 h-6 rounded-full transition-colors relative ${auto.active ? 'bg-indigo-600' : 'bg-gray-200'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${auto.active ? 'left-6' : 'left-1'}`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* FAB */}
      <div className="absolute bottom-20 right-4 z-30 flex flex-col items-end gap-2">
        {showFabMenu && (
          <div className="bg-white p-2 rounded-xl shadow-lg border border-gray-100 flex flex-col gap-1 w-40 mb-2">
            <button onClick={() => { setShowLeadModal(true); setShowFabMenu(false); }} className="text-left px-3 py-2 text-sm font-medium hover:bg-gray-50 rounded-lg text-gray-700">New Lead</button>
            <button onClick={() => { setShowContactModal(true); setShowFabMenu(false); }} className="text-left px-3 py-2 text-sm font-medium hover:bg-gray-50 rounded-lg text-gray-700">New Contact</button>
            <button onClick={() => { setShowJobModal(true); setShowFabMenu(false); }} className="text-left px-3 py-2 text-sm font-medium hover:bg-gray-50 rounded-lg text-gray-700">New Job</button>
          </div>
        )}
        <button 
          onClick={() => setShowFabMenu(!showFabMenu)}
          className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform active:scale-95"
        >
          {showFabMenu ? <X size={24} /> : <Plus size={24} />}
        </button>
      </div>

      {/* GLOBAL DETAIL DRAWER */}
      {selectedLead && (
        <div className="absolute inset-0 bg-black/40 z-50 flex flex-col justify-end" onClick={() => setSelectedLead(null)}>
          <div className="bg-white rounded-t-2xl h-[85%] flex flex-col shadow-2xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
            {/* Drawer Header */}
            <div className="p-5 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">{selectedLead.company}</h2>
                <p className="text-gray-500 mt-1">{selectedLead.contact}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-2 bg-gray-100 rounded-full text-gray-600">
                <X size={20} />
              </button>
            </div>

            {/* Drawer Tabs */}
            <div className="flex border-b border-gray-100 px-2">
              {['details', 'activity', 'jobs'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setDrawerTab(tab as 'details' | 'activity' | 'jobs')}
                  className={`flex-1 py-3 text-sm font-semibold capitalize border-b-2 transition ${drawerTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
              {drawerTab === 'details' && (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 text-green-700 rounded-lg"><DollarSign size={20} /></div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase font-semibold">Deal Value</div>
                        <div className="font-bold text-gray-900">{selectedLead.value}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-50 flex items-center gap-3">
                      <Phone size={18} className="text-gray-400" />
                      <span className="text-gray-700 font-medium">+1 (555) 123-4567</span>
                    </div>
                    <div className="p-4 border-b border-gray-50 flex items-center gap-3">
                      <Mail size={18} className="text-gray-400" />
                      <span className="text-gray-700 font-medium">{selectedLead.contact.toLowerCase().replace(' ', '.')}@example.com</span>
                    </div>
                    <div className="p-4 flex items-center gap-3">
                      <MapPin size={18} className="text-gray-400" />
                      <span className="text-gray-700 font-medium">{selectedLead.location}</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{selectedLead.description}</p>
                  </div>

                  <button className="w-full py-3 bg-white border border-red-200 text-red-600 font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-red-50 transition">
                    <Trash2 size={18} /> Delete Lead
                  </button>
                </div>
              )}

              {drawerTab === 'activity' && (
                <div className="space-y-4">
                  <button className="w-full py-3 bg-indigo-50 text-indigo-700 font-semibold rounded-xl border border-indigo-100 mb-4">
                    + Add Note
                  </button>
                  <div className="relative border-l-2 border-gray-200 ml-3 space-y-6 pb-4">
                    <div className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 bg-indigo-600 border-4 border-white rounded-full"></div>
                      <div className="text-xs text-gray-400 font-medium mb-1">Today, 10:30 AM</div>
                      <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm text-sm text-gray-700">Status updated to <strong className="text-indigo-600">{selectedLead.status}</strong>.</div>
                    </div>
                    <div className="relative pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 bg-gray-300 border-4 border-white rounded-full"></div>
                      <div className="text-xs text-gray-400 font-medium mb-1">Yesterday, 2:15 PM</div>
                      <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm text-sm text-gray-700">Called {selectedLead.contact}. Left a voicemail regarding the quote.</div>
                    </div>
                  </div>
                </div>
              )}

              {drawerTab === 'jobs' && (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-gray-900 text-sm">Initial Site Visit</h4>
                      <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Pending</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Assigned to: You</p>
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
                      <input type="checkbox" className="rounded text-indigo-600 w-4 h-4" />
                      Mark as complete
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CREATE LEAD MODAL */}
      {showLeadModal && (
        <div className="absolute inset-0 bg-black/40 z-50 flex flex-col justify-end" onClick={() => setShowLeadModal(false)}>
          <div className="bg-white rounded-t-2xl p-5 h-[85%] overflow-y-auto flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">New Lead</h2>
              <button onClick={() => setShowLeadModal(false)} className="p-2 bg-gray-100 rounded-full text-gray-600"><X size={20} /></button>
            </div>
            
            <form className="flex flex-col gap-4 flex-1" onSubmit={(e) => {
              e.preventDefault();
              const newLead: Lead = { ...formData, id: Date.now() };
              setLeads([newLead, ...leads]);
              setShowLeadModal(false);
              setFormData({ company: '', contact: '', location: '', value: '', status: 'New Lead', description: '' });
            }}>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Company</label>
                <input required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500" placeholder="e.g. Acme Corp" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Contact Name</label>
                <input required value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500" placeholder="e.g. John Doe" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Location</label>
                  <input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500" placeholder="City, State" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Value</label>
                  <input value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500" placeholder="$5,000" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 h-24 resize-none focus:outline-none focus:border-indigo-500" placeholder="Details about the lead..." />
              </div>
              <div className="mt-auto pt-4 pb-safe">
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* JOB DETAIL DRAWER */}
      {selectedJob && (
        <div className="absolute inset-0 bg-black/40 z-50 flex flex-col justify-end" onClick={() => setSelectedJob(null)}>
          <div className="bg-white rounded-t-2xl h-[85%] flex flex-col shadow-2xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-900 leading-tight">{selectedJob.title}</h2>
                <p className="text-gray-500 mt-1 text-sm">{selectedJob.client}</p>
              </div>
              <button onClick={() => setSelectedJob(null)} className="p-2 bg-gray-100 rounded-full text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 bg-gray-50 space-y-4">
              <div className="flex gap-2">
                 <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-100">
                   {selectedJob.type} {selectedJob.type === 'Recurring' ? `• Every ${selectedJob.interval} ${selectedJob.frequency}` : ''}
                 </span>
                 <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">{selectedJob.status}</span>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                  <h4 className="font-semibold text-gray-800 text-sm">Task Checklist</h4>
                </div>
                <div className="divide-y divide-gray-50">
                  {selectedJob.tasks.map(task => (
                    <div key={task.id} className="p-4 flex items-center gap-3">
                      <input type="checkbox" checked={task.completed} readOnly className="w-5 h-5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                      <span className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-sm transition">
                Update Job Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE CONTACT MODAL */}
      {showContactModal && (
        <div className="absolute inset-0 bg-black/40 z-50 flex flex-col justify-end" onClick={() => setShowContactModal(false)}>
          <div className="bg-white rounded-t-2xl p-5 h-[80%] overflow-y-auto flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">New Contact</h2>
              <button onClick={() => setShowContactModal(false)} className="p-2 bg-gray-100 rounded-full text-gray-600"><X size={20} /></button>
            </div>
            <form className="flex flex-col gap-4 flex-1" onSubmit={(e) => {
              e.preventDefault();
              alert(`Contact ${contactData.name} added (UI only)`);
              setShowContactModal(false);
              setContactData({ name: '', company: '', email: '', phone: '' });
            }}>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Full Name</label>
                <input required value={contactData.name} onChange={e => setContactData({...contactData, name: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500" placeholder="e.g. Jane Doe" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Company</label>
                <input value={contactData.company} onChange={e => setContactData({...contactData, company: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500" placeholder="e.g. Acme Corp" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Email</label>
                <input type="email" required value={contactData.email} onChange={e => setContactData({...contactData, email: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500" placeholder="jane@example.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Phone</label>
                <input type="tel" value={contactData.phone} onChange={e => setContactData({...contactData, phone: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="mt-auto pt-4 pb-safe">
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700">Save Contact</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE JOB MODAL */}
      {showJobModal && (
        <div className="absolute inset-0 bg-black/40 z-50 flex flex-col justify-end" onClick={() => setShowJobModal(false)}>
          <div className="bg-white rounded-t-2xl p-5 h-[80%] overflow-y-auto flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">New Job</h2>
              <button onClick={() => setShowJobModal(false)} className="p-2 bg-gray-100 rounded-full text-gray-600"><X size={20} /></button>
            </div>
            <form className="flex flex-col gap-4 flex-1" onSubmit={(e) => {
              e.preventDefault();
              const newJob: Job = {
                id: Date.now(),
                title: jobData.title,
                client: jobData.client,
                type: jobData.type,
                frequency: jobData.type === 'Recurring' ? jobData.frequency : undefined,
                interval: jobData.type === 'Recurring' ? jobData.interval : undefined,
                status: 'Pending',
                progress: 0,
                tasks: []
              };
              setJobs([newJob, ...jobs]);
              setShowJobModal(false);
              setJobData({ title: '', client: '', type: 'One-time', frequency: 'Weeks', interval: 1 });
            }}>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Job Title</label>
                <input required value={jobData.title} onChange={e => setJobData({...jobData, title: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500" placeholder="e.g. Deep Clean - Office" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Client / Company</label>
                <input required value={jobData.client} onChange={e => setJobData({...jobData, client: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500" placeholder="e.g. Sparkle Cleaning Co." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Job Type</label>
                <select value={jobData.type} onChange={e => setJobData({...jobData, type: e.target.value as 'One-time' | 'Recurring'})} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500 bg-white">
                  <option value="One-time">One-time</option>
                  <option value="Recurring">Recurring</option>
                </select>
              </div>
              {jobData.type === 'Recurring' && (
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Every</label>
                    <input type="number" min="1" required value={jobData.interval} onChange={e => setJobData({...jobData, interval: parseInt(e.target.value) || 1})} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Frequency</label>
                    <select value={jobData.frequency} onChange={e => setJobData({...jobData, frequency: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500 bg-white">
                      <option value="Days">Days</option>
                      <option value="Weeks">Weeks</option>
                      <option value="Months">Months</option>
                    </select>
                  </div>
                </div>
              )}
              <div className="mt-auto pt-4 pb-safe">
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700">Create Job</button>
              </div>
            </form>
          </div>
        </div>
      )}

            {/* FILL FORM MODAL */}
      {selectedForm && (
        <div className="absolute inset-0 bg-black/40 z-50 flex flex-col justify-end" onClick={() => setSelectedForm(null)}>
          <div className="bg-white rounded-t-2xl p-5 h-[85%] overflow-y-auto flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">{selectedForm}</h2>
              <button onClick={() => setSelectedForm(null)} className="p-2 bg-gray-100 rounded-full text-gray-600"><X size={20} /></button>
            </div>
            <form className="flex flex-col gap-4 flex-1" onSubmit={(e) => {
              e.preventDefault();
              alert('Form submitted successfully (UI only)');
              setSelectedForm(null);
            }}>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Full Name</label>
                <input required className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500" placeholder="Client Name" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Property Address</label>
                <input required className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500" placeholder="123 Main St" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Service Needed</label>
                <select className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500 bg-white">
                  <option>Deep Clean</option>
                  <option>Renovation</option>
                  <option>Consultation</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Additional Notes</label>
                <textarea rows={3} className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500 resize-none" placeholder="Tell us more..."></textarea>
              </div>
              <div className="mt-auto pt-4 pb-safe">
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700">Submit Form</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="h-16 bg-white border-t border-gray-200 flex items-center justify-around pb-safe z-40 flex-shrink-0">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'home' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <Home size={22} strokeWidth={activeTab === 'home' ? 2.5 : 2} /><span className="text-[10px] font-medium">Home</span>
        </button>
        <button onClick={() => setActiveTab('pipeline')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'pipeline' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <LayoutDashboard size={22} strokeWidth={activeTab === 'pipeline' ? 2.5 : 2} /><span className="text-[10px] font-medium">Pipeline</span>
        </button>
        <button onClick={() => setActiveTab('contacts')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'contacts' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <Users size={22} strokeWidth={activeTab === 'contacts' ? 2.5 : 2} /><span className="text-[10px] font-medium">Contacts</span>
        </button>
        <button onClick={() => setActiveTab('jobs')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'jobs' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <CheckSquare size={22} strokeWidth={activeTab === 'jobs' ? 2.5 : 2} /><span className="text-[10px] font-medium">Jobs</span>
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'settings' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <Settings size={22} strokeWidth={activeTab === 'settings' ? 2.5 : 2} /><span className="text-[10px] font-medium">Settings</span>
        </button>
      </nav>
    </div>
  );
}