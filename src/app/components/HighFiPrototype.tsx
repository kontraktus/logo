import React, { useState, useEffect, useRef } from 'react';
import { Contract, RiskFinding, MissingClause, User, AuditLog } from '../mockData';
import {
  FileText,
  AlertTriangle,
  UploadCloud,
  UserCheck,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Download,
  Trash2,
  Lock,
  MessageSquare,
  Activity,
  Plus,
  Users,
  Eye,
  LogOut,
  Sparkles,
  Info
} from 'lucide-react';
import { KontraktusLogo } from './KontraktusLogo';

interface HighFiPrototypeProps {
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

export function HighFiPrototype({
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
}: HighFiPrototypeProps) {
  // Input fields
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Upload States
  const [uploadType, setUploadType] = useState('Non-Disclosure Agreement');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // Chat
  const [chatInput, setChatInput] = useState('');
  
  // Admin forms
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'Contract Manager' | 'Compliance Officer' | 'Legal Reviewer' | 'Administrator'>('Contract Manager');
  const [adminSearch, setAdminSearch] = useState('');

  // UI helpers
  const [highlightedParagraphId, setHighlightedParagraphId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeContract = contracts.find(c => c.id === selectedContractId) || contracts[0];
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-clear toast
  useEffect(() => {
    if (toastMessage) {
      const t = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toastMessage]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  const startSimulatedUpload = (fileName: string) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadStage('Extraction');

    const steps = [
      { progress: 28, stage: 'Chunking', delay: 800 },
      { progress: 56, stage: 'Embedding', delay: 1600 },
      { progress: 84, stage: 'Indexing', delay: 2400 },
      { progress: 100, stage: 'Complete', delay: 3200 }
    ];

    steps.forEach(step => {
      setTimeout(() => {
        setUploadProgress(step.progress);
        setUploadStage(step.stage);
        if (step.progress === 100) {
          setTimeout(() => {
            onUploadContract({
              name: fileName,
              type: uploadType,
              size: '1.8 MB'
            });
            setIsUploading(false);
            setUploadProgress(0);
            triggerToast(`Successfully processed and indexed ${fileName}!`);
            // Automatically select the new contract
            const newId = 'con-' + (contracts.length + 1);
            setSelectedContractId(newId);
            setScreen('analysis');
          }, 600);
        }
      }, step.delay);
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      startSimulatedUpload(file.name);
    }
  };

  const hasAccess = (screen: string): boolean => {
    if (!currentUser) return false;
    const role = currentUser.role;
    if (role === 'Administrator') return true;
    if (screen === 'admin') return false;
    
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

  // Login View
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6 font-sans">
        <div className="max-w-md w-full bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl p-8 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
          
          <div className="flex flex-col items-center text-center space-y-4">
            <KontraktusLogo variant="full" size="md" />
            <div className="bg-slate-900 border border-slate-800 rounded-full px-3 py-1 text-[10px] text-blue-400 font-medium uppercase tracking-wider">
              High-Fidelity Prototype
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Corporate Email</label>
              <input
                type="email"
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                placeholder="name@organization.com"
                className="w-full bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <button
              onClick={() => onLogin('Administrator')}
              className="w-full bg-blue-600 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" /> Sign In securely
            </button>
          </div>

          <div className="border-t border-slate-800 pt-6">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center mb-3">
              Testing accounts &amp; RBAC roles
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onLogin('Administrator')}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-850 text-slate-300 rounded px-2 py-1.5 text-left text-xs transition-colors flex items-center justify-between"
              >
                <span>Jane Doe (Admin)</span>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </button>
              <button
                onClick={() => onLogin('Legal Reviewer')}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-850 text-slate-300 rounded px-2 py-1.5 text-left text-xs transition-colors flex items-center justify-between"
              >
                <span>John Smith (Legal)</span>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </button>
              <button
                onClick={() => onLogin('Compliance Officer')}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-850 text-slate-300 rounded px-2 py-1.5 text-left text-xs transition-colors flex items-center justify-between"
              >
                <span>Sarah (Compliance)</span>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </button>
              <button
                onClick={() => onLogin('Contract Manager')}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-850 text-slate-300 rounded px-2 py-1.5 text-left text-xs transition-colors flex items-center justify-between"
              >
                <span>Bob (Manager)</span>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </button>
            </div>
          </div>
          <div className="text-center text-xs">
            <span className="text-slate-500">Local AI processes data on-device. </span>
            <a href="#" onClick={e => e.preventDefault()} className="text-blue-400 hover:underline">Privacy Shield active.</a>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard filtering
  const filteredContracts = contracts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: Contract['status']) => {
    const base = 'px-2.5 py-0.5 rounded-full text-xs font-semibold border ';
    switch (status) {
      case 'Uploaded': return base + 'bg-slate-900 border-slate-800 text-slate-400';
      case 'Analysed': return base + 'bg-blue-950 border-blue-900 text-blue-400';
      case 'Under Review': return base + 'bg-amber-950 border-amber-900 text-amber-400';
      case 'Approved': return base + 'bg-emerald-950 border-emerald-900 text-emerald-400';
      case 'Escalated': return base + 'bg-red-950 border-red-905 text-red-400';
      default: return base + 'bg-slate-900 border-slate-800 text-slate-400';
    }
  };

  const getSeverityBadgeClass = (sev: RiskFinding['severity']) => {
    const base = 'px-2 py-0.5 rounded text-[10px] font-bold border uppercase ';
    switch (sev) {
      case 'Critical': return base + 'bg-red-950 border-red-800 text-red-400';
      case 'High': return base + 'bg-orange-950 border-orange-900 text-orange-400';
      case 'Medium': return base + 'bg-amber-950 border-amber-900 text-amber-400';
      case 'Low': return base + 'bg-blue-950 border-blue-900 text-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans relative">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-slate-900 border border-slate-800 text-slate-200 px-4 py-3 rounded-lg shadow-2xl z-50 flex items-center gap-3 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-900 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Header */}
          <div className="p-6 border-b border-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 flex items-center justify-center bg-blue-600 rounded">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold tracking-tight text-lg text-white">Kontraktus</span>
            </div>
            <span className="bg-slate-900 border border-slate-800 text-slate-500 rounded px-1.5 py-0.5 text-[9px] font-mono">v1.0.0</span>
          </div>

          {/* User Profile Summary */}
          <div className="m-4 p-4 bg-slate-900/60 rounded-xl border border-slate-900 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-inner">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{currentUser.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{currentUser.email}</p>
              </div>
            </div>
            <div className="border-t border-slate-850 pt-2 flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Role:</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-950/80 border border-blue-900 text-blue-400">
                {currentUser.role}
              </span>
            </div>
          </div>

          {/* Nav list */}
          <div className="px-3 py-4 space-y-1">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Main Navigation</p>
            {hasAccess('dashboard') && (
              <button
                onClick={() => setScreen('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${currentScreen === 'dashboard' ? 'bg-blue-600/10 text-blue-400 font-medium' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
              >
                <Activity className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            )}
            {hasAccess('upload') && (
              <button
                onClick={() => setScreen('upload')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${currentScreen === 'upload' ? 'bg-blue-600/10 text-blue-400 font-medium' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload Contract</span>
              </button>
            )}
            {hasAccess('analysis') && (
              <button
                onClick={() => setScreen('analysis')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${currentScreen === 'analysis' ? 'bg-blue-600/10 text-blue-400 font-medium' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
              >
                <FileText className="w-4 h-4" />
                <span>AI Clause Analysis</span>
              </button>
            )}
            {hasAccess('report') && (
              <button
                onClick={() => setScreen('report')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${currentScreen === 'report' ? 'bg-blue-600/10 text-blue-400 font-medium' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Risk &amp; Compliance</span>
              </button>
            )}
            {hasAccess('admin') && (
              <button
                onClick={() => setScreen('admin')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${currentScreen === 'admin' ? 'bg-blue-600/10 text-blue-400 font-medium' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
              >
                <Users className="w-4 h-4" />
                <span>Admin Console</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-slate-900">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-950/20 hover:text-red-400 border border-transparent hover:border-red-900/30 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* CORE WORKSPACE CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 p-6 md:p-8 bg-slate-950 overflow-y-auto">
        
        {/* SCREEN 2: DASHBOARD */}
        {currentScreen === 'dashboard' && (
          <div className="space-y-6">
            {/* Header banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Document Dashboard</h1>
                <p className="text-sm text-slate-400">Manage and audit locally processed agreements.</p>
              </div>
              {hasAccess('upload') && (
                <button
                  onClick={() => setScreen('upload')}
                  className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/15 flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Upload Contract
                </button>
              )}
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/50 border border-slate-900 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Indexed</p>
                  <p className="text-2xl font-bold text-white mt-1">{contracts.length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-800">
                  <FileText className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <div className="bg-slate-900/50 border border-slate-900 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Fully Analysed</p>
                  <p className="text-2xl font-bold text-white mt-1">{contracts.filter(c => c.status === 'Analysed' || c.status === 'Approved').length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-800">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
              </div>
              <div className="bg-slate-900/50 border border-slate-900 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Under Review</p>
                  <p className="text-2xl font-bold text-white mt-1">{contracts.filter(c => c.status === 'Under Review').length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-800">
                  <Activity className="w-5 h-5 text-amber-500" />
                </div>
              </div>
              <div className="bg-slate-900/50 border border-slate-900 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Risks</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {contracts.reduce((acc, c) => acc + c.risks.filter(r => r.status === 'pending').length, 0)}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-800">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
              </div>
            </div>

            {/* Tasks and list split */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* Contracts list table */}
              <div className="xl:col-span-2 bg-slate-900/30 border border-slate-900 rounded-xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <h3 className="font-bold text-white">Repository Agreements</h3>
                  
                  {/* Filters */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search NDA, Vendor..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="bg-slate-950 border border-slate-900 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-350 placeholder-slate-650 focus:outline-none focus:border-blue-500 transition-colors w-44"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value)}
                      className="bg-slate-950 border border-slate-900 rounded-lg px-2.5 py-1.5 text-xs text-slate-400 focus:outline-none cursor-pointer"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Uploaded">Uploaded</option>
                      <option value="Analysed">Analysed</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Approved">Approved</option>
                      <option value="Escalated">Escalated</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-900 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                        <th className="pb-3">Name</th>
                        <th className="pb-3">Classification</th>
                        <th className="pb-3">Indexed On</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900/50 text-xs">
                      {filteredContracts.map(c => (
                        <tr key={c.id} className="hover:bg-slate-900/10">
                          <td className="py-4 pr-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-slate-500 font-bold border border-slate-800">
                                {c.fileType}
                              </div>
                              <div>
                                <span className="font-semibold text-white hover:underline cursor-pointer" onClick={() => { setSelectedContractId(c.id); setScreen('analysis'); }}>
                                  {c.name}
                                </span>
                                <span className="block text-[10px] text-slate-500 mt-0.5">{c.fileSize}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-slate-400">{c.type}</td>
                          <td className="py-4 text-slate-400">{c.uploadDate}</td>
                          <td className="py-4">
                            <span className={getStatusBadgeClass(c.status)}>
                              {c.status}
                            </span>
                          </td>
                          <td className="py-4 text-right space-x-1">
                            <button
                              onClick={() => {
                                setSelectedContractId(c.id);
                                setScreen('analysis');
                              }}
                              className="px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-850 text-blue-400 font-medium transition-colors cursor-pointer inline-flex items-center gap-1.5"
                            >
                              <Eye className="w-3 h-3" /> Analyze
                            </button>
                            {hasAccess('report') && c.status !== 'Uploaded' && (
                              <button
                                onClick={() => {
                                  setSelectedContractId(c.id);
                                  setScreen('report');
                                }}
                                className="px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-850 text-amber-500 font-medium transition-colors cursor-pointer inline-flex items-center gap-1.5"
                              >
                                <AlertTriangle className="w-3 h-3" /> Report
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                      {filteredContracts.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-slate-500">
                            No matching contract documents found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Outstanding reviews tasks sidebar */}
              <div className="bg-slate-900/30 border border-slate-900 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-blue-500" /> Outstanding Tasks
                </h3>
                <p className="text-xs text-slate-500">Pending reviews assigned to your workspace</p>
                
                <div className="space-y-3">
                  {contracts.filter(c => c.status === 'Uploaded' || c.status === 'Under Review').map(c => (
                    <div key={c.id} className="bg-slate-900/60 border border-slate-900 rounded-xl p-3 space-y-3 hover:border-slate-850 transition-colors">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="text-xs font-semibold text-slate-200">{c.name}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">Uploaded by {c.uploadedBy}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-amber-950/40 border border-amber-900/30 text-amber-400 text-[9px] font-bold uppercase">
                          Review
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-1 border-t border-slate-900/50">
                        <span className="text-[10px] text-slate-500">AI Flagged Risks: {c.risks.length}</span>
                        <button
                          onClick={() => {
                            setSelectedContractId(c.id);
                            setScreen('analysis');
                          }}
                          className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold cursor-pointer flex items-center"
                        >
                          Perform Review <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {contracts.filter(c => c.status === 'Uploaded' || c.status === 'Under Review').length === 0 && (
                    <div className="text-center py-12 border border-dashed border-slate-900 rounded-xl">
                      <CheckCircle className="w-8 h-8 text-emerald-500/30 mx-auto mb-2" />
                      <p className="text-xs text-slate-500 font-medium">All tasks cleared.</p>
                      <p className="text-[10px] text-slate-650 mt-1">Excellent work!</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SCREEN 3: UPLOAD CONTRACT */}
        {currentScreen === 'upload' && (
          <div className="space-y-6">
            <div className="border-b border-slate-900 pb-4">
              <h1 className="text-2xl font-bold tracking-tight text-white">Upload Contract Document</h1>
              <p className="text-sm text-slate-400">Process files through local vectorization and privacy-preserving AI checks.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              
              {/* Left Settings & Drag Drop (3 columns) */}
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-slate-900/30 border border-slate-900 rounded-xl p-6 space-y-4">
                  <h3 className="font-bold text-white">Document Settings</h3>
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Contract Category</label>
                    <select
                      value={uploadType}
                      onChange={e => setUploadType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-900 text-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="Non-Disclosure Agreement">Non-Disclosure Agreement (NDA)</option>
                      <option value="Software License Agreement">Software License Agreement (EULA)</option>
                      <option value="Service Level Agreement">Service Level Agreement (SLA)</option>
                      <option value="Employment Contract">Employment Contract</option>
                    </select>
                  </div>

                  {/* High Fidelity drag zone */}
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${dragActive ? 'border-blue-500 bg-blue-600/5' : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'}`}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center border border-blue-900/30">
                        <UploadCloud className="w-6 h-6 text-blue-500 animate-pulse" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Drag and drop your contract here</p>
                        <p className="text-xs text-slate-500 mt-1">Accepting PDF, DOCX, TXT (up to 15MB)</p>
                      </div>
                      <span className="text-xs text-slate-400">or</span>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => startSimulatedUpload('Vendor_License_Agreement.docx')}
                          disabled={isUploading}
                          className="bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-200 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer"
                        >
                          Select Vendor_Agreement.docx
                        </button>
                        <button
                          onClick={() => startSimulatedUpload('Mutual_NDA_Revised.pdf')}
                          disabled={isUploading}
                          className="bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-200 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer"
                        >
                          Select Mutual_NDA.pdf
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pipeline processing visualization (2 columns) */}
              <div className="lg:col-span-2">
                <div className="bg-slate-900/30 border border-slate-900 rounded-xl p-6 space-y-6 h-full flex flex-col">
                  <div>
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <Activity className="w-4.5 h-4.5 text-blue-500" /> AI Processing Pipeline
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Real-time local LLM vectorization logs.</p>
                  </div>

                  {isUploading ? (
                    <div className="flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-semibold">
                          <span className="text-blue-400">{uploadStage.toUpperCase()} IN PROGRESS</span>
                          <span className="text-white">{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-900">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full transition-all duration-300 rounded-full"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Timeline steps */}
                      <div className="space-y-4 flex-1 pt-4">
                        <div className="flex gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${uploadStage === 'Extraction' ? 'bg-blue-600 text-white animate-spin' : uploadProgress > 25 ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-500'}`}>
                            {uploadProgress > 25 ? '✓' : '1'}
                          </div>
                          <div>
                            <p className={`text-xs font-semibold ${uploadStage === 'Extraction' ? 'text-blue-400' : uploadProgress > 25 ? 'text-slate-500 line-through' : 'text-slate-500'}`}>Text Extraction</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">Parse paragraphs, headings and tables.</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${uploadStage === 'Chunking' ? 'bg-blue-600 text-white animate-spin' : uploadProgress > 56 ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-500'}`}>
                            {uploadProgress > 56 ? '✓' : '2'}
                          </div>
                          <div>
                            <p className={`text-xs font-semibold ${uploadStage === 'Chunking' ? 'text-blue-400' : uploadProgress > 56 ? 'text-slate-500 line-through' : 'text-slate-500'}`}>Document Chunking</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">Split text into overlapping semantic passages.</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${uploadStage === 'Embedding' ? 'bg-blue-600 text-white animate-spin' : uploadProgress > 84 ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-500'}`}>
                            {uploadProgress > 84 ? '✓' : '3'}
                          </div>
                          <div>
                            <p className={`text-xs font-semibold ${uploadStage === 'Embedding' ? 'text-blue-400' : uploadProgress > 84 ? 'text-slate-500 line-through' : 'text-slate-500'}`}>Vector Embedding</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">Calculate vectors using local BGE-M3 model.</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${uploadStage === 'Indexing' ? 'bg-blue-600 text-white animate-spin' : uploadProgress === 100 ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-500'}`}>
                            {uploadProgress === 100 ? '✓' : '4'}
                          </div>
                          <div>
                            <p className={`text-xs font-semibold ${uploadStage === 'Indexing' ? 'text-blue-400' : uploadProgress === 100 ? 'text-slate-500 line-through' : 'text-slate-500'}`}>ChromaDB Indexing</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">Store vectors in local vector database.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-900 rounded-xl bg-slate-950/40">
                      <Info className="w-8 h-8 text-slate-700 mb-2" />
                      <p className="text-xs text-slate-400 font-semibold">Ready for processing</p>
                      <p className="text-[10px] text-slate-600 mt-1 max-w-[180px]">
                        Select or drop a contract file. All calculations occur inside the browser web-assembly worker sandbox.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SCREEN 4: CONTRACT ANALYSIS */}
        {currentScreen === 'analysis' && (
          <div className="space-y-6 flex-1 flex flex-col min-h-0">
            {/* Header / Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  AI Clause Analysis <Sparkles className="w-5 h-5 text-blue-500" />
                </h1>
                <p className="text-sm text-slate-400">Scan highlighted risk clauses and interact with local AI RAG assistant.</p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Active Contract:</span>
                <select
                  value={activeContract.id}
                  onChange={e => setSelectedContractId(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {contracts.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.status})</option>
                  ))}
                </select>
                {hasAccess('report') && activeContract.status !== 'Uploaded' && (
                  <button
                    onClick={() => setScreen('report')}
                    className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Risk Register
                  </button>
                )}
              </div>
            </div>

            {/* Two-Pane Workspace Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
              
              {/* Left Pane: Contract Text Viewer (7 cols) */}
              <div className="lg:col-span-7 bg-slate-900/30 border border-slate-900 rounded-xl p-5 flex flex-col min-h-0">
                <div className="flex justify-between items-center border-b border-slate-900 pb-3 mb-4">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" /> Document Viewer
                  </h3>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded bg-red-950/20 border border-red-900/30 text-red-500 text-[10px] font-bold">CRITICAL</span>
                    <span className="px-2 py-0.5 rounded bg-orange-950/20 border border-orange-900/30 text-orange-400 text-[10px] font-bold">HIGH</span>
                    <span className="px-2 py-0.5 rounded bg-amber-950/20 border border-amber-900/30 text-amber-500 text-[10px] font-bold">MEDIUM</span>
                  </div>
                </div>

                {/* Scroller pane */}
                <div
                  ref={scrollContainerRef}
                  className="flex-1 overflow-y-auto pr-3 space-y-5 max-h-[500px]"
                >
                  {activeContract.paragraphs.map(p => {
                    const isHighlighted = highlightedParagraphId === p.id;
                    const linkedRisk = activeContract.risks.find(r => r.id === p.riskId);
                    
                    let highlightClass = 'border-l-2 border-slate-900 pl-4 py-1';
                    if (isHighlighted) {
                      highlightClass = 'border-l-4 border-blue-500 bg-blue-950/15 pl-4 py-3 rounded-r-lg ring-1 ring-blue-500/10 transition-all duration-300';
                    } else if (linkedRisk) {
                      if (linkedRisk.severity === 'Critical') highlightClass = 'border-l-4 border-red-600 bg-red-950/5 pl-4 py-2 rounded-r-lg hover:bg-red-950/10 transition-all';
                      else if (linkedRisk.severity === 'High') highlightClass = 'border-l-4 border-orange-500 bg-orange-950/5 pl-4 py-2 rounded-r-lg hover:bg-orange-950/10 transition-all';
                      else highlightClass = 'border-l-4 border-amber-500 bg-amber-950/5 pl-4 py-2 rounded-r-lg hover:bg-amber-950/10 transition-all';
                    }

                    return (
                      <div
                        key={p.id}
                        id={`para-${p.id}`}
                        className={`${highlightClass} relative`}
                      >
                        {p.clauseTitle && (
                          <p className="font-bold text-white text-xs mb-1.5">{p.clauseTitle}</p>
                        )}
                        <p className="text-slate-300 text-xs leading-relaxed font-sans">{p.text}</p>
                        {linkedRisk && (
                          <div className="mt-2.5 flex items-center justify-between bg-slate-950 border border-slate-900 rounded-lg p-2.5">
                            <div className="flex items-center gap-2">
                              <AlertCircle className={`w-3.5 h-3.5 ${linkedRisk.severity === 'Critical' ? 'text-red-500 animate-pulse' : 'text-orange-400'}`} />
                              <span className="text-[10px] font-bold text-slate-200">
                                AI Risk Detected ({linkedRisk.severity}): {linkedRisk.title}
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedContractId(activeContract.id);
                                setScreen('report');
                              }}
                              className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
                            >
                              Open Mitigation Guide →
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Pane: Local AI Q&A Panel (5 cols) */}
              <div className="lg:col-span-5 bg-slate-900/30 border border-slate-900 rounded-xl p-5 flex flex-col min-h-0">
                <div className="flex justify-between items-center border-b border-slate-900 pb-3 mb-4">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-500" /> Private AI Assistant
                  </h3>
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900 text-[10px] text-slate-500 font-bold border border-slate-850">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Local Ollama Agent
                  </span>
                </div>

                {/* Message Log */}
                <div className="flex-1 overflow-y-auto border border-slate-900 rounded-xl p-3 mb-3 bg-slate-950/40 space-y-4 max-h-[350px]">
                  {(chatHistory[activeContract.id] || []).map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-900 border border-slate-800 text-blue-400'}`}>
                        {msg.role === 'user' ? 'U' : 'AI'}
                      </div>
                      <div className={`rounded-xl p-3 text-xs ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-900 border border-slate-850 text-slate-300 rounded-tl-none'}`}>
                        <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                        {msg.citationId && (
                          <div className="mt-2 pt-2 border-t border-slate-800/40 flex justify-end">
                            <button
                              onClick={() => {
                                setHighlightedParagraphId(msg.citationId || null);
                                const element = document.getElementById(`para-${msg.citationId}`);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }
                              }}
                              className="px-2 py-1 bg-slate-950/50 hover:bg-slate-950 border border-slate-800 rounded text-[9px] font-semibold text-blue-400 hover:text-blue-300 transition-all cursor-pointer inline-flex items-center gap-1"
                            >
                              <FileText className="w-3 h-3" /> Jump to {activeContract.paragraphs.find(p => p.id === msg.citationId)?.clauseTitle || 'Clause Citation'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {(!chatHistory[activeContract.id] || chatHistory[activeContract.id].length === 0) && (
                    <div className="text-center py-16 text-slate-600 space-y-2">
                      <HelpCircle className="w-8 h-8 mx-auto text-slate-850" />
                      <p className="text-xs font-semibold text-slate-500">Ask the contract intelligence AI</p>
                      <p className="text-[10px] text-slate-700 max-w-[200px] mx-auto">
                        Inquire about liability, indemnity, covenants, governing law, or general clauses.
                      </p>
                    </div>
                  )}
                </div>

                {/* Preset Prompts */}
                <div className="mb-4 space-y-1.5">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recommended Questions</p>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => onSendChatMessage(activeContract.id, 'What is the liability cap?')}
                      className="text-[10px] bg-slate-900 hover:bg-slate-850 border border-slate-850 text-slate-350 px-2.5 py-1 rounded transition-colors cursor-pointer"
                    >
                      "Analyze liability cap"
                    </button>
                    <button
                      onClick={() => onSendChatMessage(activeContract.id, 'How long do confidentiality obligations survive?')}
                      className="text-[10px] bg-slate-900 hover:bg-slate-850 border border-slate-850 text-slate-350 px-2.5 py-1 rounded transition-colors cursor-pointer"
                    >
                      "Confidentiality duration"
                    </button>
                    <button
                      onClick={() => onSendChatMessage(activeContract.id, 'Are there data privacy rules?')}
                      className="text-[10px] bg-slate-900 hover:bg-slate-850 border border-slate-850 text-slate-350 px-2.5 py-1 rounded transition-colors cursor-pointer"
                    >
                      "Verify GDPR/data privacy"
                    </button>
                  </div>
                </div>

                {/* Chat Input form */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask a question about the clauses..."
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && chatInput.trim()) {
                        onSendChatMessage(activeContract.id, chatInput);
                        setChatInput('');
                      }
                    }}
                    className="flex-1 bg-slate-950 border border-slate-900 rounded-lg px-3 py-2 text-xs text-slate-300 placeholder-slate-650 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => {
                      if (chatInput.trim()) {
                        onSendChatMessage(activeContract.id, chatInput);
                        setChatInput('');
                      }
                    }}
                    className="bg-blue-600 text-white rounded-lg px-3.5 py-2 text-xs font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/10 cursor-pointer"
                  >
                    Ask
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 5: RISK REPORT */}
        {currentScreen === 'report' && (
          <div className="space-y-6">
            {/* Header banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  Compliance Risk Register
                </h1>
                <p className="text-sm text-slate-400">Review, mitigations, and compliance gap assessment for {activeContract.name}.</p>
              </div>
              <button
                onClick={() => {
                  triggerToast(`PDF Report compiled. Downloading...`);
                }}
                className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/15 flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" /> Export Compliance PDF
              </button>
            </div>

            {/* Risk findings cards grid */}
            <div className="space-y-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" /> Active Risk Findings
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {activeContract.risks.map(r => (
                  <div key={r.id} className="bg-slate-900/40 border border-slate-900 rounded-xl p-5 space-y-4 hover:border-slate-850 transition-colors relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600"></div>
                    
                    <div className="flex justify-between items-start gap-2">
                      <div className="space-y-1">
                        <span className={getSeverityBadgeClass(r.severity)}>
                          {r.severity}
                        </span>
                        <h4 className="text-sm font-bold text-white pt-1">{r.title}</h4>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${r.status === 'accepted' ? 'bg-emerald-950/80 border-emerald-900 text-emerald-400' : r.status === 'rejected' ? 'bg-red-950/80 border-red-900 text-red-400' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                        {r.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-slate-350">
                      <p><strong>Rationale:</strong> {r.reason}</p>
                      <p><strong>Legal Exposure:</strong> {r.impact}</p>
                      <p><strong>Evidence Link:</strong> <span className="underline font-semibold text-slate-200">{r.evidenceLocation}</span></p>
                      <p><strong>Suggested Wording:</strong> {r.suggestedAction}</p>
                    </div>

                    {/* Interactive mitigation controls */}
                    <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-900/50">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            onUpdateRiskStatus(activeContract.id, r.id, 'accepted');
                            triggerToast(`Accepted compliance finding: ${r.title}`);
                          }}
                          className={`px-3 py-1.5 rounded text-xs font-semibold border transition-all cursor-pointer ${r.status === 'accepted' ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-950 border-slate-900 hover:bg-slate-900 text-slate-400'}`}
                        >
                          Accept Finding
                        </button>
                        <button
                          onClick={() => {
                            onUpdateRiskStatus(activeContract.id, r.id, 'rejected');
                            triggerToast(`Rejected compliance finding: ${r.title}`);
                          }}
                          className={`px-3 py-1.5 rounded text-xs font-semibold border transition-all cursor-pointer ${r.status === 'rejected' ? 'bg-red-600 border-red-500 text-white' : 'bg-slate-950 border-slate-900 hover:bg-slate-900 text-slate-400'}`}
                        >
                          Reject Finding
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-500">Override Severity:</span>
                        <select
                          value={r.severity}
                          onChange={e => {
                            onUpdateRiskSeverity(activeContract.id, r.id, e.target.value as any);
                            triggerToast(`Severity updated to ${e.target.value}`);
                          }}
                          className="bg-slate-950 border border-slate-900 rounded px-2 py-1 text-[11px] text-slate-350 focus:outline-none cursor-pointer"
                        >
                          <option value="Critical">Critical</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                {activeContract.risks.length === 0 && (
                  <div className="col-span-2 text-center py-16 border border-dashed border-slate-900 rounded-xl bg-slate-900/10">
                    <CheckCircle className="w-10 h-10 text-emerald-500/20 mx-auto mb-2 animate-pulse" />
                    <p className="text-sm font-semibold text-slate-400">Compliance Clean</p>
                    <p className="text-xs text-slate-500 mt-1">No major compliance risks or indemnity exposures found.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Missing Clauses gaps analysis */}
            <div className="bg-slate-900/30 border border-slate-900 rounded-xl p-5 space-y-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-blue-500" /> Critical Missing Clauses (Gaps)
              </h3>
              <p className="text-xs text-slate-500">Clauses missing from this document compared to our organization's standard compliance template.</p>
              
              <div className="space-y-3">
                {activeContract.missingClauses.map(m => (
                  <div key={m.id} className="bg-slate-950/40 border border-slate-900 rounded-xl p-4 space-y-2 hover:border-slate-850 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      <h4 className="text-xs font-bold text-slate-200">{m.title}</h4>
                    </div>
                    <p className="text-xs text-slate-400 pl-3 leading-relaxed">{m.description}</p>
                    <div className="bg-slate-900/60 rounded p-2.5 text-[11px] text-slate-400 mt-2 pl-3">
                      <strong>Mitigation Recommendation:</strong> {m.suggestion}
                    </div>
                  </div>
                ))}
                {activeContract.missingClauses.length === 0 && (
                  <p className="text-slate-500 text-xs text-center py-4">All standard compliance clauses are present in this contract.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 6: ADMIN CONSOLE */}
        {currentScreen === 'admin' && currentUser.role === 'Administrator' && (
          <div className="space-y-6">
            <div className="border-b border-slate-900 pb-4">
              <h1 className="text-2xl font-bold tracking-tight text-white">Administrator Console</h1>
              <p className="text-sm text-slate-400">Control system users, assign access roles, and monitor local audit trails.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              
              {/* User management (7 cols) */}
              <div className="xl:col-span-7 bg-slate-900/30 border border-slate-900 rounded-xl p-6 space-y-6">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Users className="w-4.5 h-4.5 text-blue-500" /> User Profile Administration
                </h3>

                {/* Create user form */}
                <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-4 space-y-3">
                  <p className="text-xs font-bold text-slate-200">Create New Account</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <input
                      type="text"
                      placeholder="Display Name"
                      value={newUserName}
                      onChange={e => setNewUserName(e.target.value)}
                      className="bg-slate-900 border border-slate-850 rounded px-2.5 py-1.5 text-xs text-slate-350 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Corporate Email"
                      value={newUserEmail}
                      onChange={e => setNewUserEmail(e.target.value)}
                      className="bg-slate-900 border border-slate-850 rounded px-2.5 py-1.5 text-xs text-slate-350 focus:outline-none focus:border-blue-500"
                    />
                    <select
                      value={newUserRole}
                      onChange={e => setNewUserRole(e.target.value as any)}
                      className="bg-slate-900 border border-slate-850 text-slate-400 rounded px-2.5 py-1.5 text-xs focus:outline-none cursor-pointer"
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
                        triggerToast(`Created user account for ${newUserName}`);
                      } else {
                        triggerToast("Validation error: Name and Email required.");
                      }
                    }}
                    className="bg-blue-600 text-white rounded px-3 py-1.5 text-xs font-semibold hover:bg-blue-700 transition-colors shadow-lg cursor-pointer"
                  >
                    Register User
                  </button>
                </div>

                {/* User table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-900 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                        <th className="pb-3">User Profile</th>
                        <th className="pb-3">Assigned Role</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900/50 text-xs">
                      {users.map(u => (
                        <tr key={u.id}>
                          <td className="py-3">
                            <div className="font-semibold text-white">{u.name}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">{u.email}</div>
                          </td>
                          <td className="py-3 text-slate-400">{u.role}</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${u.status === 'Active' ? 'bg-emerald-950/80 border-emerald-900 text-emerald-400' : 'bg-red-950/80 border-red-900 text-red-400'}`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => {
                                onToggleUserStatus(u.id);
                                triggerToast(`Status updated for ${u.name}`);
                              }}
                              className={`px-2.5 py-1 rounded text-[10px] font-semibold border transition-all cursor-pointer ${u.status === 'Active' ? 'bg-slate-950 border-slate-900 hover:bg-red-950/20 hover:text-red-400 hover:border-red-900/30 text-slate-400' : 'bg-emerald-900/10 border-emerald-900/30 text-emerald-400 hover:bg-emerald-900/20'}`}
                            >
                              {u.status === 'Active' ? 'Disable' : 'Enable'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Audit logs (5 cols) */}
              <div className="xl:col-span-5 bg-slate-900/30 border border-slate-900 rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Activity className="w-4.5 h-4.5 text-blue-500" /> Security Audit Log
                  </h3>
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Local-First Records</span>
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-650 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search logs by keyword..."
                    value={adminSearch}
                    onChange={e => setAdminSearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-900 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-350 placeholder-slate-650 focus:outline-none focus:border-blue-500 w-full"
                  />
                </div>

                <div className="space-y-3 overflow-y-auto max-h-[350px] pr-2">
                  {auditLogs
                    .filter(log =>
                      log.action.toLowerCase().includes(adminSearch.toLowerCase()) ||
                      log.user.toLowerCase().includes(adminSearch.toLowerCase()) ||
                      log.details.toLowerCase().includes(adminSearch.toLowerCase())
                    )
                    .map(log => (
                      <div key={log.id} className="bg-slate-950/40 border border-slate-900 rounded-lg p-3 space-y-1.5">
                        <div className="flex justify-between text-[9px] text-slate-500">
                          <span className="font-mono">{log.timestamp}</span>
                          <span className="font-mono text-slate-600">IP: {log.ipAddress}</span>
                        </div>
                        <div className="flex justify-between text-xs font-semibold text-slate-200">
                          <span>{log.action}</span>
                          <span className="text-[10px] text-blue-400 font-medium">{log.user} ({log.role})</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed pt-0.5 border-t border-slate-900/30">{log.details}</p>
                      </div>
                    ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}
