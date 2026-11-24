import { useState, useEffect } from 'react';
import { Home, Briefcase, Users, Settings, MapPin, ChevronRight } from 'lucide-react';

type Tab = 'home' | 'pipeline' | 'contacts' | 'settings';

interface Lead {
  id: number;
  company: string;
  contact: string;
  location: string;
  value: string;
  status: string;
  description: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => setLeads(data))
      .catch(err => console.error("Failed to fetch leads:", err));
  }, []);

  return (
    // Mobile App Container
    <div className="max-w-md mx-auto h-[100dvh] bg-gray-50 relative flex flex-col overflow-hidden shadow-2xl sm:border-x sm:border-gray-200 font-sans">
      
      {/* Top Header */}
      <header className="h-14 bg-white flex items-center justify-between px-4 border-b border-gray-100 z-10">
        <div className="font-bold text-lg text-indigo-600 tracking-tight">SaaS CRM</div>
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm cursor-pointer hover:bg-indigo-200 transition">
          CV
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        
        {/* HOME TAB (TikTok-style Feed) */}
        {activeTab === 'home' && (
          <div className="h-full w-full overflow-y-auto snap-y snap-mandatory scrollbar-hide" style={{ scrollSnapType: 'y mandatory' }}>
            {leads.map((lead) => (
              <div key={lead.id} className="h-full w-full snap-start snap-always p-4 flex flex-col bg-white border-b border-gray-100">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold w-max mb-4 border border-indigo-100">
                    {lead.status}
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-2">{lead.company}</h2>
                  
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                    <Users size={16} />
                    <span>{lead.contact}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-8">
                    <MapPin size={16} />
                    <span>{lead.location}</span>
                  </div>

                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    "{lead.description}"
                  </p>

                  <div className="text-2xl font-mono font-bold text-gray-900 mb-8">
                    {lead.value}
                  </div>
                </div>
                
                <div className="pb-8">
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-200">
                    View Details <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PIPELINE TAB */}
        {activeTab === 'pipeline' && (
          <div className="p-4 h-full overflow-y-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 mt-2">Pipeline</h1>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">New Leads</h3>
              <div className="h-24 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">Drop here</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Qualified</h3>
              <div className="h-24 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">Drop here</div>
            </div>
          </div>
        )}

        {/* CONTACTS TAB */}
        {activeTab === 'contacts' && (
          <div className="p-4 h-full overflow-y-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 mt-2">Contacts</h1>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              {leads.map(lead => (
                <div key={lead.id} className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
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

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="p-4 h-full overflow-y-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 mt-2">Settings</h1>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 text-gray-700 font-medium hover:bg-gray-50 cursor-pointer">Profile</div>
              <div className="p-4 border-b border-gray-100 text-gray-700 font-medium hover:bg-gray-50 cursor-pointer">Team Members</div>
              <div className="p-4 text-gray-700 font-medium hover:bg-gray-50 cursor-pointer">Billing</div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="h-16 bg-white border-t border-gray-200 flex items-center justify-around pb-safe z-20">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'home' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}>
          <Home size={22} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button onClick={() => setActiveTab('pipeline')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'pipeline' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}>
          <Briefcase size={22} strokeWidth={activeTab === 'pipeline' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Pipeline</span>
        </button>
        <button onClick={() => setActiveTab('contacts')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'contacts' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}>
          <Users size={22} strokeWidth={activeTab === 'contacts' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Contacts</span>
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 w-16 transition-colors ${activeTab === 'settings' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}>
          <Settings size={22} strokeWidth={activeTab === 'settings' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Settings</span>
        </button>
      </nav>

    </div>
  );
}

export default App;