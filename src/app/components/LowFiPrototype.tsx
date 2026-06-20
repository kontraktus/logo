import React, { useState, useEffect } from 'react';
import { Contract, RiskFinding, MissingClause, User, AuditLog } from '../mockData';

interface LowFiPrototypeProps {
  currentUser: User | null;
  onLogin: (role: string) => void;
  onLogout: () => void;
  contracts: Contract[];
  onUploadContract: (file: { name: string; type: string; size: string }) => void;
  onUpdateContractStatus: (contractId: string, status: Contract['status']) => void;
  onUpdateRiskStatus: (contractId: string, riskId: string, status: RiskFinding['status']) => void;
  onUpdateRiskSeverity: (contractId: string, riskId: string, severity: RiskFinding['severity']) => void;
  users: User[];
  onCreateUser: (name: string, email: string, role: User['role']) => void;
  onToggleUserStatus: (userId: string) => void;
  auditLogs: AuditLog[];
  currentScreen: string;
  setScreen: (screen: string) => void;
  selectedContractId: string;
  setSelectedContractId: (id: string) => void;
  chatHistory: Record<string, { role: 'user' | 'ai'; text: string; citationId?: string }[]>;
  onSendChatMessage: (contractId: string, message: string) => void;
}

export function LowFiPrototype({
  currentUser,
  onLogin,
  onLogout,
  contracts,
  onUploadContract,
  onUpdateContractStatus,
  onUpdateRiskStatus,
  onUpdateRiskSeverity,
  users,
  onCreateUser,
  onToggleUserStatus,
  auditLogs,
  currentScreen,
  setScreen,
  selectedContractId,
  setSelectedContractId,
  chatHistory,
  onSendChatMessage
}: LowFiPrototypeProps) {
  // Local state for forms and interactions
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Upload Screen State
  const [uploadType, setUploadType] = useState('Non-Disclosure Agreement');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState('');

  // AI Chat input
  const [chatInput, setChatInput] = useState('');
  
  // Admin Screen form
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'Contract Manager' | 'Compliance Officer' | 'Legal Reviewer' | 'Administrator'>('Contract Manager');
  const [adminSearch, setAdminSearch] = useState('');

  // Selected citation highlight in the contract text
  const [highlightedParagraphId, setHighlightedParagraphId] = useState<string | null>(null);

  // Handle active contract
  const activeContract = contracts.find(c => c.id === selectedContractId) || contracts[0];

  // Simulated upload timeline
  const startSimulatedUpload = (fileName: string) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadStage('Extraction');

    const intervals = [
      { progress: 25, stage: 'Chunking', delay: 1000 },
      { progress: 50, stage: 'Embedding', delay: 2000 },
      { progress: 75, stage: 'Indexing', delay: 3000 },
      { progress: 100, stage: 'Complete', delay: 4000 }
    ];

    intervals.forEach(step => {
      setTimeout(() => {
        setUploadProgress(step.progress);
        setUploadStage(step.stage);
        if (step.progress === 100) {
          setTimeout(() => {
            onUploadContract({
              name: fileName,
              type: uploadType,
              size: '1.5 MB'
            });
            setIsUploading(false);
            setUploadProgress(0);
            setScreen('dashboard');
          }, 800);
        }
      }, step.delay);
    });
  };

  // Check roles permissions for sidebar
  const hasAccess = (screen: string): boolean => {
    if (!currentUser) return false;
    const role = currentUser.role;
    if (role === 'Administrator') return true; // Admins see all
    
    if (screen === 'admin') return false; // Admin only
    
    if (role === 'Compliance Officer') {
      return ['dashboard', 'analysis', 'report'].includes(screen);
    }
    if (role === 'Legal Reviewer') {
      return ['dashboard', 'upload', 'analysis', 'report'].includes(screen);
    }
    if (role === 'Contract Manager') {
      return ['dashboard', 'upload', 'analysis'].includes(screen);
    }
    return false;
  };

  // Render Login Screen if not logged in
  if (!currentUser) {
    return (
      <div className="font-mono p-8 max-w-md mx-auto my-12 border-2 border-black bg-white shadow-none text-xs">
        <div className="text-center border-b-2 border-black pb-4 mb-4">
          <p className="font-bold text-lg">[WIRE-FRAME: LOGIN SCREEN]</p>
          <p className="text-slate-500">Kontraktus Client Portal (Simple Version)</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-bold mb-1">Username (Email):</label>
            <input
              type="text"
              value={usernameInput}
              onChange={e => setUsernameInput(e.target.value)}
              placeholder="user@kontraktus.local"
              className="w-full p-2 border-2 border-black focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Password:</label>
            <input
              type="password"
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
              placeholder="********"
              className="w-full p-2 border-2 border-black focus:outline-none"
            />
          </div>
          <button
            onClick={() => {
              // Standard demo fallback
              onLogin('Administrator');
            }}
            className="w-full p-2 bg-slate-200 border-2 border-black font-bold hover:bg-slate-300"
          >
            Sign In (Default: Admin)
          </button>
          <div className="border-t border-dashed border-black pt-4">
            <p className="font-bold mb-2 text-center text-red-600">[PRESET ROLES FOR EASY TESTING]</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onLogin('Administrator')}
                className="p-1 border border-black hover:bg-slate-100 text-center"
              >
                Login as Administrator
              </button>
              <button
                onClick={() => onLogin('Legal Reviewer')}
                className="p-1 border border-black hover:bg-slate-100 text-center"
              >
                Login as Legal Reviewer
              </button>
              <button
                onClick={() => onLogin('Compliance Officer')}
                className="p-1 border border-black hover:bg-slate-100 text-center"
              >
                Login as Compliance Officer
              </button>
              <button
                onClick={() => onLogin('Contract Manager')}
                className="p-1 border border-black hover:bg-slate-100 text-center"
              >
                Login as Contract Manager
              </button>
            </div>
          </div>
          <div className="text-center text-slate-500">
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Forgot password clicked (Simulated)"); }} className="underline">Forgot Password?</a>
          </div>
        </div>
      </div>
    );
  }

  // Filter contracts
  const filteredContracts = contracts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="font-mono text-xs flex flex-row min-h-screen bg-white text-black border-4 border-black m-4 p-4 gap-4">
      {/* PERSISTENT SIDEBAR NAVIGATION */}
      <div className="w-56 border-r-2 border-black pr-4 flex flex-col justify-between">
        <div>
          <div className="border-2 border-black p-2 mb-4 text-center bg-slate-100">
            <p className="font-bold text-sm">[KONTRAKTUS LOGO]</p>
            <p className="text-[10px] font-bold mt-1">LOW-FI WIREFRAME</p>
          </div>

          <div className="border border-black p-2 mb-4 bg-slate-50">
            <p className="font-bold">Active User Role:</p>
            <p className="text-red-600 font-bold">{currentUser.role}</p>
            <p className="text-[10px] text-slate-500">{currentUser.name}</p>
          </div>

          <p className="font-bold mb-2">[NAVIGATION MENU]</p>
          <ul className="space-y-1">
            {hasAccess('dashboard') && (
              <li>
                <button
                  onClick={() => setScreen('dashboard')}
                  className={`w-full text-left p-1 border ${currentScreen === 'dashboard' ? 'bg-black text-white font-bold' : 'border-black hover:bg-slate-100'}`}
                >
                  * Dashboard
                </button>
              </li>
            )}
            {hasAccess('upload') && (
              <li>
                <button
                  onClick={() => setScreen('upload')}
                  className={`w-full text-left p-1 border ${currentScreen === 'upload' ? 'bg-black text-white font-bold' : 'border-black hover:bg-slate-100'}`}
                >
                  * Upload Contract
                </button>
              </li>
            )}
            {hasAccess('analysis') && (
              <li>
                <button
                  onClick={() => setScreen('analysis')}
                  className={`w-full text-left p-1 border ${currentScreen === 'analysis' ? 'bg-black text-white font-bold' : 'border-black hover:bg-slate-100'}`}
                >
                  * Contract Analysis
                </button>
              </li>
            )}
            {hasAccess('report') && (
              <li>
                <button
                  onClick={() => setScreen('report')}
                  className={`w-full text-left p-1 border ${currentScreen === 'report' ? 'bg-black text-white font-bold' : 'border-black hover:bg-slate-100'}`}
                >
                  * Risk Report
                </button>
              </li>
            )}
            {hasAccess('admin') && (
              <li>
                <button
                  onClick={() => setScreen('admin')}
                  className={`w-full text-left p-1 border ${currentScreen === 'admin' ? 'bg-black text-white font-bold' : 'border-black hover:bg-slate-100'}`}
                >
                  * Admin Console [ADMIN]
                </button>
              </li>
            )}
          </ul>
        </div>

        <div className="pt-4 border-t border-dashed border-black">
          <button
            onClick={onLogout}
            className="w-full p-1 border border-black bg-slate-100 hover:bg-slate-200 font-bold"
          >
            [Sign Out]
          </button>
        </div>
      </div>

      {/* CORE WORKSPACE CONTENT AREA */}
      <div className="flex-1 flex flex-col gap-4">
        {/* SCREEN 2: DASHBOARD */}
        {currentScreen === 'dashboard' && (
          <div className="space-y-4">
            <div className="border-b-2 border-black pb-2 flex justify-between items-center">
              <h2 className="text-base font-bold">[SCREEN: DASHBOARD]</h2>
              {hasAccess('upload') && (
                <button
                  onClick={() => setScreen('upload')}
                  className="p-1 border-2 border-black bg-slate-200 font-bold hover:bg-slate-300"
                >
                  + Upload Contract
                </button>
              )}
            </div>

            {/* Quick Status Metrics (Wireframe format) */}
            <div className="grid grid-4 gap-2">
              <div className="border border-black p-2 bg-slate-50">
                <p className="font-bold">Total Contracts</p>
                <p className="text-xl font-bold">{contracts.length}</p>
              </div>
              <div className="border border-black p-2 bg-slate-50">
                <p className="font-bold">Status: Analysed</p>
                <p className="text-xl font-bold">{contracts.filter(c => c.status === 'Analysed').length}</p>
              </div>
              <div className="border border-black p-2 bg-slate-50">
                <p className="font-bold">Status: Under Review</p>
                <p className="text-xl font-bold">{contracts.filter(c => c.status === 'Under Review').length}</p>
              </div>
              <div className="border border-black p-2 bg-slate-50">
                <p className="font-bold">Status: Approved</p>
                <p className="text-xl font-bold">{contracts.filter(c => c.status === 'Approved').length}</p>
              </div>
            </div>

            {/* Outstanding Tasks */}
            <div className="border border-black p-2">
              <p className="font-bold mb-2 border-b border-black pb-1">[OUTSTANDING TASKS]</p>
              <ul className="space-y-1">
                {contracts.filter(c => c.status === 'Uploaded' || c.status === 'Under Review').map(c => (
                  <li key={c.id} className="flex justify-between items-center border-b border-dashed border-slate-200 pb-1">
                    <span>Task: Review newly uploaded / updated contract - {c.name}</span>
                    <button
                      onClick={() => {
                        setSelectedContractId(c.id);
                        setScreen('analysis');
                      }}
                      className="p-0.5 border border-black hover:bg-slate-100"
                    >
                      [Review]
                    </button>
                  </li>
                ))}
                {contracts.filter(c => c.status === 'Uploaded' || c.status === 'Under Review').length === 0 && (
                  <li className="text-slate-500">No outstanding tasks. All contracts processed.</li>
                )}
              </ul>
            </div>

            {/* Contracts Table Wireframe */}
            <div className="border border-black p-2">
              <p className="font-bold mb-2 border-b border-black pb-1">[CONTRACTS LIST]</p>
              
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Search contracts..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 p-1 border border-black focus:outline-none"
                />
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="p-1 border border-black"
                >
                  <option value="All">All Statuses</option>
                  <option value="Uploaded">Uploaded</option>
                  <option value="Analysed">Analysed</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Escalated">Escalated</option>
                </select>
              </div>

              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-left border-b border-black">
                    <th className="p-1 border-r border-black font-bold">Contract Name</th>
                    <th className="p-1 border-r border-black font-bold">Type</th>
                    <th className="p-1 border-r border-black font-bold">Upload Date</th>
                    <th className="p-1 border-r border-black font-bold">Status</th>
                    <th className="p-1 border-r border-black font-bold">File</th>
                    <th className="p-1 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContracts.map(c => (
                    <tr key={c.id} className="border-b border-black hover:bg-slate-50">
                      <td className="p-1 border-r border-black font-bold underline">{c.name}</td>
                      <td className="p-1 border-r border-black">{c.type}</td>
                      <td className="p-1 border-r border-black">{c.uploadDate}</td>
                      <td className="p-1 border-r border-black">
                        <span className="p-0.5 border border-black bg-slate-100 font-bold">{c.status.toUpperCase()}</span>
                      </td>
                      <td className="p-1 border-r border-black">{c.fileType} ({c.fileSize})</td>
                      <td className="p-1 space-x-1">
                        <button
                          onClick={() => {
                            setSelectedContractId(c.id);
                            setScreen('analysis');
                          }}
                          className="p-0.5 border border-black bg-slate-100 hover:bg-slate-200"
                        >
                          [Analyze]
                        </button>
                        {hasAccess('report') && c.status !== 'Uploaded' && (
                          <button
                            onClick={() => {
                              setSelectedContractId(c.id);
                              setScreen('report');
                            }}
                            className="p-0.5 border border-black bg-slate-100 hover:bg-slate-200"
                          >
                            [Report]
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredContracts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-2 text-center text-slate-500">No contracts match filter options.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SCREEN 3: UPLOAD CONTRACT */}
        {currentScreen === 'upload' && (
          <div className="space-y-4">
            <div className="border-b-2 border-black pb-2">
              <h2 className="text-base font-bold">[SCREEN: UPLOAD CONTRACT]</h2>
            </div>

            <div className="grid grid-2 gap-4">
              {/* Upload settings & Drop zone */}
              <div className="border border-black p-4 space-y-4">
                <div>
                  <label className="block font-bold mb-1">Contract Classification / Type:</label>
                  <select
                    value={uploadType}
                    onChange={e => setUploadType(e.target.value)}
                    className="w-full p-1.5 border border-black focus:outline-none"
                  >
                    <option value="Non-Disclosure Agreement">Non-Disclosure Agreement (NDA)</option>
                    <option value="Software License Agreement">Software License Agreement (EULA)</option>
                    <option value="Service Level Agreement">Service Level Agreement (SLA)</option>
                    <option value="Employment Contract">Employment Contract</option>
                  </select>
                </div>

                {/* Drag and Drop Box Wireframe */}
                <div className="border-2 border-dashed border-black p-8 text-center bg-slate-50 space-y-2">
                  <p className="font-bold">[DRAG AND DROP CONTRACT FILE HERE]</p>
                  <p className="text-slate-500">Supported formats: PDF, DOCX, TXT (Max size 15MB)</p>
                  <div className="flex justify-center gap-2 pt-2">
                    <button
                      onClick={() => startSimulatedUpload('Vendor_Agreement_Final.docx')}
                      disabled={isUploading}
                      className="p-1 border border-black bg-slate-200 font-bold hover:bg-slate-300 disabled:opacity-50"
                    >
                      [Select &amp; Upload Vendor_Agreement.docx]
                    </button>
                    <button
                      onClick={() => startSimulatedUpload('Employment_Agreement_John.pdf')}
                      disabled={isUploading}
                      className="p-1 border border-black bg-slate-200 font-bold hover:bg-slate-300 disabled:opacity-50"
                    >
                      [Select &amp; Upload Employment.pdf]
                    </button>
                  </div>
                </div>
              </div>

              {/* Processing Progress visualization */}
              <div className="border border-black p-4 space-y-4">
                <p className="font-bold border-b border-black pb-1">[AI PIPELINE PROCESSING LOGS (LOCAL PROCESSING)]</p>
                {isUploading ? (
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold">Overall Progress: {uploadProgress}%</p>
                      <div className="w-full border-2 border-black h-4 bg-slate-100 relative">
                        <div
                          className="bg-black h-full"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className={`font-bold ${uploadStage === 'Extraction' || uploadProgress > 25 ? 'line-through text-slate-500' : ''}`}>
                        Stage 1: Extracting text from file... {uploadStage === 'Extraction' ? '[IN PROGRESS]' : '[DONE]'}
                      </p>
                      <p className={`font-bold ${uploadProgress < 25 ? 'opacity-40' : uploadStage === 'Chunking' || uploadProgress > 50 ? 'line-through text-slate-500' : ''}`}>
                        Stage 2: Chunking document segments... {uploadStage === 'Chunking' ? '[IN PROGRESS]' : uploadProgress > 25 ? '[DONE]' : '[PENDING]'}
                      </p>
                      <p className={`font-bold ${uploadProgress < 50 ? 'opacity-40' : uploadStage === 'Embedding' || uploadProgress > 75 ? 'line-through text-slate-500' : ''}`}>
                        Stage 3: Embedding vectors using local LLM... {uploadStage === 'Embedding' ? '[IN PROGRESS]' : uploadProgress > 50 ? '[DONE]' : '[PENDING]'}
                      </p>
                      <p className={`font-bold ${uploadProgress < 75 ? 'opacity-40' : uploadStage === 'Indexing' ? '' : uploadProgress === 100 ? 'line-through text-slate-500' : ''}`}>
                        Stage 4: Indexing embeddings into local ChromaDB... {uploadStage === 'Indexing' ? '[IN PROGRESS]' : uploadProgress > 75 ? '[DONE]' : '[PENDING]'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-500 text-center py-12">
                    <p>No document is being processed.</p>
                    <p>Select a file from the left to start the local AI pipeline.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 4: CONTRACT ANALYSIS */}
        {currentScreen === 'analysis' && (
          <div className="space-y-4 flex-1 flex flex-col min-h-0">
            <div className="border-b-2 border-black pb-2 flex justify-between items-center">
              <h2 className="text-base font-bold">[SCREEN: CONTRACT ANALYSIS - {activeContract.name}]</h2>
              <div className="flex gap-2">
                <select
                  value={activeContract.id}
                  onChange={e => setSelectedContractId(e.target.value)}
                  className="p-1 border border-black"
                >
                  {contracts.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.status})</option>
                  ))}
                </select>
                {hasAccess('report') && activeContract.status !== 'Uploaded' && (
                  <button
                    onClick={() => setScreen('report')}
                    className="p-1 border border-black bg-slate-200 font-bold hover:bg-slate-300"
                  >
                    [View Risk Report]
                  </button>
                )}
              </div>
            </div>

            {/* Two-Pane layout wireframe */}
            <div className="grid grid-cols-2 gap-4 flex-1 min-h-[400px]">
              {/* Left Side: Contract Viewer */}
              <div className="border-2 border-black p-2 flex flex-col bg-white">
                <p className="font-bold border-b border-black pb-1 mb-2 bg-slate-100 p-1">[LEFT PANE: CONTRACT VIEWER]</p>
                <div className="overflow-y-auto flex-1 space-y-4 pr-2 max-h-[500px]">
                  {activeContract.paragraphs.map(p => {
                    const isHighlighted = highlightedParagraphId === p.id;
                    const linkedRisk = activeContract.risks.find(r => r.id === p.riskId);
                    
                    let highlightClass = 'border-l-4 border-transparent pl-2';
                    if (isHighlighted) {
                      highlightClass = 'border-l-4 border-black bg-slate-100 p-2 font-bold';
                    } else if (linkedRisk) {
                      // Wireframe severity style
                      if (linkedRisk.severity === 'Critical') highlightClass = 'border-l-4 border-red-600 bg-red-50 pl-2';
                      else if (linkedRisk.severity === 'High') highlightClass = 'border-l-4 border-orange-500 bg-orange-50 pl-2';
                      else highlightClass = 'border-l-4 border-yellow-500 bg-yellow-50 pl-2';
                    }

                    return (
                      <div
                        key={p.id}
                        id={`para-${p.id}`}
                        className={`${highlightClass} relative`}
                      >
                        {p.clauseTitle && <p className="font-bold text-slate-800 underline mb-1">{p.clauseTitle}</p>}
                        <p className="leading-relaxed">{p.text}</p>
                        {linkedRisk && (
                          <div className="mt-1 text-[10px] text-red-600 font-bold border border-red-300 bg-red-50 p-1">
                            [RISK DETECTED ({linkedRisk.severity}): {linkedRisk.title}]
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Side: AI Chat & Citations */}
              <div className="border-2 border-black p-2 flex flex-col bg-white">
                <p className="font-bold border-b border-black pb-1 mb-2 bg-slate-100 p-1">[RIGHT PANE: LOCAL AI RAG CHAT]</p>
                
                {/* Chat dialogue display */}
                <div className="flex-1 overflow-y-auto border border-black p-2 mb-2 space-y-3 bg-slate-50 max-h-[350px]">
                  <p className="text-[10px] text-slate-500 text-center font-bold">[CHAT LOG - ALL DATA PROCESSED LOCALLY]</p>
                  
                  {/* Render messages */}
                  {(chatHistory[activeContract.id] || []).map((msg, idx) => (
                    <div key={idx} className={`p-2 border ${msg.role === 'user' ? 'bg-white border-black text-right ml-12' : 'bg-slate-200 border-black mr-12'}`}>
                      <p className="font-bold underline mb-1">{msg.role === 'user' ? 'You' : 'Local AI Agent'}</p>
                      <p className="whitespace-pre-line text-left">{msg.text}</p>
                      {msg.citationId && (
                        <button
                          onClick={() => {
                            setHighlightedParagraphId(msg.citationId || null);
                            // Scroll element into view
                            const element = document.getElementById(`para-${msg.citationId}`);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                          }}
                          className="mt-1 p-0.5 border border-black bg-white hover:bg-slate-100 text-[10px] font-bold inline-block"
                        >
                          [Go to Citation: {activeContract.paragraphs.find(p => p.id === msg.citationId)?.clauseTitle || 'Cited Section'}]
                        </button>
                      )}
                    </div>
                  ))}

                  {(!chatHistory[activeContract.id] || chatHistory[activeContract.id].length === 0) && (
                    <p className="text-slate-500 text-center py-12">Ask any question about this contract in the box below.</p>
                  )}
                </div>

                {/* Preset sample questions */}
                <div className="mb-2">
                  <p className="font-bold mb-1">[PRESET SUGGESTIONS]:</p>
                  <div className="flex flex-wrap gap-1">
                    <button
                      onClick={() => onSendChatMessage(activeContract.id, 'What is the liability cap?')}
                      className="p-1 border border-black hover:bg-slate-100"
                    >
                      "liability cap?"
                    </button>
                    <button
                      onClick={() => onSendChatMessage(activeContract.id, 'How long do confidentiality obligations survive?')}
                      className="p-1 border border-black hover:bg-slate-100"
                    >
                      "confidentiality survival?"
                    </button>
                    <button
                      onClick={() => onSendChatMessage(activeContract.id, 'Are there data privacy rules?')}
                      className="p-1 border border-black hover:bg-slate-100"
                    >
                      "data privacy terms?"
                    </button>
                  </div>
                </div>

                {/* Query Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type natural language query..."
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && chatInput.trim()) {
                        onSendChatMessage(activeContract.id, chatInput);
                        setChatInput('');
                      }
                    }}
                    className="flex-1 p-1.5 border border-black focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      if (chatInput.trim()) {
                        onSendChatMessage(activeContract.id, chatInput);
                        setChatInput('');
                      }
                    }}
                    className="p-1.5 border border-black bg-slate-200 font-bold hover:bg-slate-300"
                  >
                    [Send]
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 5: RISK REPORT */}
        {currentScreen === 'report' && (
          <div className="space-y-4">
            <div className="border-b-2 border-black pb-2 flex justify-between items-center">
              <h2 className="text-base font-bold">[SCREEN: RISK REPORT - {activeContract.name}]</h2>
              <button
                onClick={() => {
                  alert(`Exporting PDF compliance report for ${activeContract.name}... (Simulated download)`);
                }}
                className="p-1 border-2 border-black bg-slate-200 font-bold hover:bg-slate-300"
              >
                [Export Report to PDF]
              </button>
            </div>

            {/* Risk findings list */}
            <div className="space-y-4">
              <p className="font-bold border-b border-black pb-1">[DETECTED RISKS &amp; COMPLIANCE ISSUES]</p>
              
              <div className="grid grid-2 gap-4">
                {activeContract.risks.map(r => (
                  <div key={r.id} className="border border-black p-3 space-y-2 bg-slate-50">
                    <div className="flex justify-between items-center border-b border-black pb-1">
                      <span className="font-bold text-red-600">[{r.severity.toUpperCase()} RISK]: {r.title}</span>
                      <span className={`p-0.5 border border-black text-[9px] font-bold ${r.status === 'accepted' ? 'bg-black text-white' : r.status === 'rejected' ? 'bg-red-200' : 'bg-white'}`}>
                        {r.status.toUpperCase()}
                      </span>
                    </div>
                    <p><strong>Reason:</strong> {r.reason}</p>
                    <p><strong>Potential Impact:</strong> {r.impact}</p>
                    <p><strong>Location:</strong> <span className="underline font-bold">{r.evidenceLocation}</span></p>
                    <p><strong>Suggested Action:</strong> {r.suggestedAction}</p>

                    {/* Actions on findings */}
                    <div className="flex gap-2 pt-2 border-t border-dashed border-black">
                      <button
                        onClick={() => onUpdateRiskStatus(activeContract.id, r.id, 'accepted')}
                        className={`p-1 border border-black ${r.status === 'accepted' ? 'bg-black text-white' : 'hover:bg-slate-200'}`}
                      >
                        [Accept Finding]
                      </button>
                      <button
                        onClick={() => onUpdateRiskStatus(activeContract.id, r.id, 'rejected')}
                        className={`p-1 border border-black ${r.status === 'rejected' ? 'bg-red-600 text-white' : 'hover:bg-slate-200'}`}
                      >
                        [Reject Finding]
                      </button>
                      <select
                        value={r.severity}
                        onChange={e => onUpdateRiskSeverity(activeContract.id, r.id, e.target.value as RiskFinding['severity'])}
                        className="p-1 border border-black"
                      >
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>
                ))}
                {activeContract.risks.length === 0 && (
                  <div className="col-span-2 border border-dashed border-black p-8 text-center text-slate-500">
                    No risk findings identified for this contract.
                  </div>
                )}
              </div>
            </div>

            {/* Missing Clauses Section */}
            <div className="border border-black p-3 space-y-2">
              <p className="font-bold border-b border-black pb-1 mb-2">[MISSING CLAUSES IDENTIFIED]</p>
              <div className="space-y-3">
                {activeContract.missingClauses.map(m => (
                  <div key={m.id} className="border border-black border-dashed p-2 bg-slate-50">
                    <p className="font-bold">Missing: {m.title}</p>
                    <p><strong>Description:</strong> {m.description}</p>
                    <p><strong>Recommendation:</strong> {m.suggestion}</p>
                  </div>
                ))}
                {activeContract.missingClauses.length === 0 && (
                  <p className="text-slate-500 text-center py-4">No gaps detected. All critical standard clauses appear to be present.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 6: ADMIN CONSOLE */}
        {currentScreen === 'admin' && currentUser.role === 'Administrator' && (
          <div className="space-y-4">
            <div className="border-b-2 border-black pb-2">
              <h2 className="text-base font-bold">[SCREEN: ADMIN CONSOLE (ADMINISTRATORS ONLY)]</h2>
            </div>

            <div className="grid grid-2 gap-4">
              {/* User management */}
              <div className="border border-black p-3 space-y-3">
                <p className="font-bold border-b border-black pb-1">[USER MANAGEMENT]</p>
                
                {/* Create user form wireframe */}
                <div className="border border-dashed border-black p-2 space-y-2 bg-slate-50">
                  <p className="font-bold">Create New User Profile:</p>
                  <div className="grid grid-3 gap-2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={newUserName}
                      onChange={e => setNewUserName(e.target.value)}
                      className="p-1 border border-black"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={newUserEmail}
                      onChange={e => setNewUserEmail(e.target.value)}
                      className="p-1 border border-black"
                    />
                    <select
                      value={newUserRole}
                      onChange={e => setNewUserRole(e.target.value as any)}
                      className="p-1 border border-black"
                    >
                      <option value="Contract Manager">Contract Manager</option>
                      <option value="Compliance Officer">Compliance Officer</option>
                      <option value="Legal Reviewer">Legal Reviewer</option>
                      <option value="Administrator">Administrator</option>
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      if (newUserName.trim() && newUserEmail.trim()) {
                        onCreateUser(newUserName, newUserEmail, newUserRole);
                        setNewUserName('');
                        setNewUserEmail('');
                      } else {
                        alert("Please fill in Name and Email.");
                      }
                    }}
                    className="p-1.5 border border-black bg-slate-200 font-bold hover:bg-slate-300"
                  >
                    [Add User Account]
                  </button>
                </div>

                {/* User table */}
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-left border-b border-black">
                      <th className="p-1 border-r border-black font-bold">Name</th>
                      <th className="p-1 border-r border-black font-bold">Role</th>
                      <th className="p-1 border-r border-black font-bold">Status</th>
                      <th className="p-1 font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} className="border-b border-black">
                        <td className="p-1 border-r border-black font-bold">{u.name} ({u.email})</td>
                        <td className="p-1 border-r border-black">{u.role}</td>
                        <td className="p-1 border-r border-black">
                          <span className={`p-0.5 border ${u.status === 'Active' ? 'bg-green-100 border-green-800' : 'bg-red-100 border-red-800 text-red-800'}`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="p-1">
                          <button
                            onClick={() => onToggleUserStatus(u.id)}
                            className="p-0.5 border border-black bg-slate-50 hover:bg-slate-200"
                          >
                            [{u.status === 'Active' ? 'Disable' : 'Enable'}]
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Audit logs viewer */}
              <div className="border border-black p-3 space-y-3">
                <p className="font-bold border-b border-black pb-1">[SYSTEM AUDIT LOGS]</p>
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Filter logs..."
                    value={adminSearch}
                    onChange={e => setAdminSearch(e.target.value)}
                    className="w-full p-1 border border-black focus:outline-none"
                  />
                </div>
                <div className="overflow-y-auto max-h-[300px] border border-black p-2 bg-slate-50 space-y-2">
                  {auditLogs
                    .filter(log =>
                      log.action.toLowerCase().includes(adminSearch.toLowerCase()) ||
                      log.user.toLowerCase().includes(adminSearch.toLowerCase()) ||
                      log.details.toLowerCase().includes(adminSearch.toLowerCase())
                    )
                    .map(log => (
                      <div key={log.id} className="border-b border-dashed border-slate-300 pb-1 text-[10px]">
                        <p className="font-bold">[{log.timestamp}] - {log.user} ({log.role})</p>
                        <p className="underline">Action: {log.action} | IP: {log.ipAddress}</p>
                        <p className="text-slate-600">{log.details}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
