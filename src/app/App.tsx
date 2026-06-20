import { useState } from 'react';
import {
  Contract,
  RiskFinding,
  MissingClause,
  User,
  AuditLog,
  initialContracts,
  initialUsers,
  initialAuditLogs,
  generateGenericAIResponse,
  aiPrescriptedQAs
} from './mockData';
import { LowFiPrototype } from './components/LowFiPrototype';
import { HighFiPrototype } from './components/HighFiPrototype';
import { Info, Settings, Shield, RefreshCw } from 'lucide-react';

export default function App() {
  // Global States
  const [contracts, setContracts] = useState<Contract[]>(initialContracts);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  
  // Set default logged in user to Jane Doe (Admin) for easy onboarding
  const [currentUser, setCurrentUser] = useState<User | null>(initialUsers[0]);
  
  // Fidelity toggle: true = High-Fi SaaS, false = Low-Fi Wireframe
  const [isHighFi, setIsHighFi] = useState<boolean>(true);
  
  // Screen management
  const [currentScreen, setScreen] = useState<string>('dashboard');
  const [selectedContractId, setSelectedContractId] = useState<string>('con-1');
  
  // Chat history state per contract
  const [chatHistory, setChatHistory] = useState<Record<string, { role: 'user' | 'ai'; text: string; citationId?: string }[]>>({
    'con-1': [
      { role: 'ai', text: 'Hello! I am your local Kontraktus AI. I have completed risk scanning for NDA - Acme Corp. Ask me any questions, or click a preset below.', citationId: 'con-1-p1' }
    ],
    'con-2': [
      { role: 'ai', text: 'Hello! I have completed analyzing Vendor Agreement - TechCorp. I flagged 3 compliance risks. How can I help you review this software license?', citationId: 'con-2-p1' }
    ]
  });

  // Reset Environment
  const handleReset = () => {
    setContracts(initialContracts);
    setUsers(initialUsers);
    setAuditLogs(initialAuditLogs);
    setCurrentUser(initialUsers[0]);
    setScreen('dashboard');
    setSelectedContractId('con-1');
    setChatHistory({
      'con-1': [{ role: 'ai', text: 'Hello! I am your local Kontraktus AI. I have completed risk scanning for NDA - Acme Corp.', citationId: 'con-1-p1' }],
      'con-2': [{ role: 'ai', text: 'Hello! I have completed analyzing Vendor Agreement - TechCorp.', citationId: 'con-2-p1' }]
    });
    addAuditLog('SYSTEM', 'System State', 'Reset prototype environment to initial mock baseline.');
  };

  // Log Helper
  const addAuditLog = (userName: string, action: string, details: string, roleOverride?: string) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp,
      user: userName,
      role: roleOverride || (currentUser ? currentUser.role : 'Guest'),
      action,
      ipAddress: '127.0.0.1',
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Auth actions
  const handleLogin = (role: string) => {
    const matchingUser = users.find(u => u.role === role && u.status === 'Active');
    if (matchingUser) {
      setCurrentUser(matchingUser);
      setScreen('dashboard');
      addAuditLog(matchingUser.name, 'User Sign In', `Logged in successfully via quick selection.`, matchingUser.role);
    } else {
      alert(`No active user found with the role ${role}`);
    }
  };

  const handleLogout = () => {
    if (currentUser) {
      addAuditLog(currentUser.name, 'User Sign Out', `Logged out of the portal.`);
    }
    setCurrentUser(null);
    setScreen('dashboard');
  };

  // Upload Action
  const handleUploadContract = (file: { name: string; type: string; size: string }) => {
    const newId = `con-${contracts.length + 1}`;
    
    // Create new contract object with sample paragraphs & risk
    const newContract: Contract = {
      id: newId,
      name: file.name,
      type: file.type,
      uploadedBy: currentUser ? currentUser.name : 'Bob Builder',
      uploadDate: new Date().toISOString().substring(0, 16).replace('T', ' '),
      status: 'Analysed',
      fileType: file.name.endsWith('.docx') ? 'DOCX' : file.name.endsWith('.txt') ? 'TXT' : 'PDF',
      fileSize: file.size,
      paragraphs: [
        { id: `${newId}-p1`, clauseTitle: 'SERVICE PROCUREMENT AGREEMENT', text: `This Service Procurement Agreement is entered into by the client organization and the vendor providing services related to: ${file.type}.` },
        { id: `${newId}-p2`, clauseTitle: 'Clause 1: Term', text: 'This Agreement shall commence on the Effective Date and shall continue in force for an initial term of twelve (12) months, renewing automatically unless terminated with 90 days notice.' },
        { id: `${newId}-p3`, clauseTitle: 'Clause 2: Indemnity & Damages', text: 'THE VENDOR AGREES TO FULLY INDEMNIFY AND HOLD HARMLESS THE CLIENT FROM ANY CLAIMS, ACTIONS, LOSSES OR DAMAGES OF ANY KIND, INCLUDING INDIRECT OR PUNITIVE DAMAGES, ARISING OUT OF OR IN CONNECTION WITH THE SERVICES.', riskId: `${newId}-risk-1` },
        { id: `${newId}-p4`, clauseTitle: 'Clause 3: Governing Law', text: 'This contract shall be construed in accordance with the laws of the United Kingdom, with dispute resolution via arbitration in London.' }
      ],
      risks: [
        {
          id: `${newId}-risk-1`,
          title: 'Uncapped Vendor Indemnity Obligation',
          severity: 'High',
          reason: 'The indemnity clause binds the vendor to cover all client damages without direct cap limits or exclusions for consequential damages.',
          impact: 'Exposes the vendor to unlimited litigation liability and severe financial risks.',
          evidenceLocation: 'Clause 2 (Indemnity & Damages)',
          suggestedAction: 'Add a clause capping mutual indemnity at the total fees paid under the contract during the preceding 12 months.',
          status: 'pending'
        }
      ],
      missingClauses: [
        {
          id: `${newId}-miss-1`,
          title: 'Data Security Addendum (DPA)',
          description: 'No explicit standard data protection language or security protocols are documented.',
          suggestion: 'Append a standard cybersecurity clause safeguarding corporate network assets and user logs.'
        }
      ]
    };

    setContracts(prev => [...prev, newContract]);
    
    // Add welcome AI message
    setChatHistory(prev => ({
      ...prev,
      [newId]: [
        { role: 'ai', text: `Hello! I have completed local RAG analysis for your uploaded contract: ${file.name}. I found 1 high-risk clause and 1 missing clause.`, citationId: `${newId}-p1` }
      ]
    }));

    addAuditLog(currentUser ? currentUser.name : 'SYSTEM', 'Contract Upload', `Uploaded contract ${file.name} classified as ${file.type}.`);
    addAuditLog('SYSTEM (Local AI)', 'AI Analysis', `Completed local embedding extraction & risk scan for ${file.name}.`);
  };

  const handleUpdateContractStatus = (contractId: string, status: Contract['status']) => {
    setContracts(prev => prev.map(c => c.id === contractId ? { ...c, status } : c));
    addAuditLog(currentUser ? currentUser.name : 'SYSTEM', 'Status Change', `Updated status of contract ${contractId} to ${status}.`);
  };

  const handleUpdateRiskStatus = (contractId: string, riskId: string, status: RiskFinding['status']) => {
    setContracts(prev => prev.map(c => {
      if (c.id === contractId) {
        return {
          ...c,
          risks: c.risks.map(r => r.id === riskId ? { ...r, status } : r)
        };
      }
      return c;
    }));
    
    const c = contracts.find(c => c.id === contractId);
    const r = c?.risks.find(r => r.id === riskId);
    
    addAuditLog(
      currentUser ? currentUser.name : 'SYSTEM',
      'Risk Assessment',
      `${status === 'accepted' ? 'Accepted' : 'Rejected'} risk finding "${r?.title || 'Unknown'}" in ${c?.name}.`
    );
  };

  const handleUpdateRiskSeverity = (contractId: string, riskId: string, severity: RiskFinding['severity']) => {
    setContracts(prev => prev.map(c => {
      if (c.id === contractId) {
        return {
          ...c,
          risks: c.risks.map(r => r.id === riskId ? { ...r, severity } : r)
        };
      }
      return c;
    }));

    const c = contracts.find(c => c.id === contractId);
    const r = c?.risks.find(r => r.id === riskId);

    addAuditLog(
      currentUser ? currentUser.name : 'SYSTEM',
      'Risk Modification',
      `Changed severity of "${r?.title || 'Unknown'}" to ${severity} in ${c?.name}.`
    );
  };

  // Admin Actions
  const handleCreateUser = (name: string, email: string, role: User['role']) => {
    const newUser: User = {
      id: `usr-${users.length + 1}`,
      name,
      email,
      role,
      status: 'Active'
    };
    setUsers(prev => [...prev, newUser]);
    addAuditLog(currentUser ? currentUser.name : 'SYSTEM', 'User Management', `Created user account for ${name} (${email}) as ${role}.`);
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Active' ? 'Disabled' : 'Active';
        
        // Prevent disabling yourself
        if (currentUser && currentUser.id === userId) {
          alert("Security Error: You cannot disable your own active administrator account.");
          return u;
        }

        addAuditLog(
          currentUser ? currentUser.name : 'SYSTEM',
          'User Management',
          `${nextStatus === 'Active' ? 'Enabled' : 'Disabled'} user account: ${u.name}`
        );

        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  // AI Chat Q&A Interaction
  const handleSendChatMessage = (contractId: string, message: string) => {
    const activeCon = contracts.find(c => c.id === contractId);
    if (!activeCon) return;

    const userMsg = { role: 'user' as const, text: message };
    
    // Update local state with user message
    setChatHistory(prev => {
      const current = prev[contractId] || [];
      return { ...prev, [contractId]: [...current, userMsg] };
    });

    addAuditLog(currentUser ? currentUser.name : 'SYSTEM', 'AI Chat Query', `Submitted natural language question: "${message}"`);

    // Simulate AI thinking and output (200ms delay for realism)
    setTimeout(() => {
      // 1. Check if there's a prescripted question matching the query
      const match = (aiPrescriptedQAs[contractId] || []).find(
        qa => qa.query.toLowerCase().trim() === message.toLowerCase().trim()
      );

      let aiMsg: { role: 'ai'; text: string; citationId?: string };
      
      if (match) {
        aiMsg = {
          role: 'ai',
          text: match.answer,
          citationId: match.citationId
        };
      } else {
        // 2. Generate a smart response based on matches
        const response = generateGenericAIResponse(message, activeCon);
        aiMsg = {
          role: 'ai',
          text: response.answer,
          citationId: response.citationId
        };
      }

      setChatHistory(prev => {
        const current = prev[contractId] || [];
        return { ...prev, [contractId]: [...current, aiMsg] };
      });
      
      addAuditLog(
        'SYSTEM (Local AI)',
        'AI Chat Answer',
        `Generated response referencing citation section ${aiMsg.citationId || 'none'}.`
      );
    }, 250);
  };

  // Quick Role switch from top switcher bar
  const handleTopBarRoleChange = (role: string) => {
    const matchingUser = users.find(u => u.role === role && u.status === 'Active');
    if (matchingUser) {
      setCurrentUser(matchingUser);
      // Ensure we don't stay on admin screen if new role doesn't support it
      if (currentScreen === 'admin' && role !== 'Administrator') {
        setScreen('dashboard');
      }
      addAuditLog(matchingUser.name, 'Role Switch', `Switched active profile to ${role} (Fast Switcher)`);
    } else {
      alert(`Cannot switch: No active ${role} found in database.`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* PERSISTENT GLOBAL TOP SWITCHER BAR */}
      <div className="bg-slate-900 border-b border-slate-800 py-2.5 px-4 text-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-blue-950 border border-blue-900 text-blue-400 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">
            <Settings className="w-3.5 h-3.5 animate-spin" /> PROTOTYPE CONTROL PANEL
          </div>
          <span className="text-slate-400 hidden lg:inline">Toggle design fidelity or active user roles instantly:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {/* Fidelity switches */}
          <div className="flex bg-slate-950 border border-slate-800 rounded p-0.5">
            <button
              onClick={() => setIsHighFi(false)}
              className={`px-3 py-1 rounded transition-colors font-bold ${!isHighFi ? 'bg-slate-200 text-black font-extrabold' : 'text-slate-400 hover:text-white'}`}
            >
              Prototype 1: Low-Fi (Wireframe)
            </button>
            <button
              onClick={() => setIsHighFi(true)}
              className={`px-3 py-1 rounded transition-colors font-bold ${isHighFi ? 'bg-blue-600 text-white font-extrabold' : 'text-slate-400 hover:text-white'}`}
            >
              Prototype 2: High-Fi (SaaS)
            </button>
          </div>

          {/* Quick Role switcher (RBAC validation) */}
          {currentUser && (
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded p-0.5">
              <span className="text-[10px] text-slate-500 font-bold px-2 uppercase">Role:</span>
              <select
                value={currentUser.role}
                onChange={e => handleTopBarRoleChange(e.target.value)}
                className="bg-transparent text-slate-200 border-0 outline-none text-xs px-2 py-0.5 pr-4 font-semibold cursor-pointer"
              >
                <option value="Administrator" className="bg-slate-950 text-slate-200">Administrator</option>
                <option value="Legal Reviewer" className="bg-slate-950 text-slate-200">Legal Reviewer</option>
                <option value="Compliance Officer" className="bg-slate-950 text-slate-200">Compliance Officer</option>
                <option value="Contract Manager" className="bg-slate-950 text-slate-200">Contract Manager</option>
              </select>
            </div>
          )}

          {/* Reset Environment */}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded font-semibold transition-all cursor-pointer"
            title="Reset contract lists, user logs and risks to defaults"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>

      {/* RENDER SELECTED PROTOTYPE VERSION */}
      <div className="flex-1 flex flex-col">
        {isHighFi ? (
          <HighFiPrototype
            currentUser={currentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
            contracts={contracts}
            onUploadContract={handleUploadContract}
            onUpdateContractStatus={handleUpdateContractStatus}
            onUpdateRiskStatus={handleUpdateRiskStatus}
            onUpdateRiskSeverity={handleUpdateRiskSeverity}
            users={users}
            onCreateUser={handleCreateUser}
            onToggleUserStatus={handleToggleUserStatus}
            auditLogs={auditLogs}
            currentScreen={currentScreen}
            setScreen={setScreen}
            selectedContractId={selectedContractId}
            setSelectedContractId={setSelectedContractId}
            chatHistory={chatHistory}
            onSendChatMessage={handleSendChatMessage}
          />
        ) : (
          <LowFiPrototype
            currentUser={currentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
            contracts={contracts}
            onUploadContract={handleUploadContract}
            onUpdateContractStatus={handleUpdateContractStatus}
            onUpdateRiskStatus={handleUpdateRiskStatus}
            onUpdateRiskSeverity={handleUpdateRiskSeverity}
            users={users}
            onCreateUser={handleCreateUser}
            onToggleUserStatus={handleToggleUserStatus}
            auditLogs={auditLogs}
            currentScreen={currentScreen}
            setScreen={setScreen}
            selectedContractId={selectedContractId}
            setSelectedContractId={setSelectedContractId}
            chatHistory={chatHistory}
            onSendChatMessage={handleSendChatMessage}
          />
        )}
      </div>
    </div>
  );
}
