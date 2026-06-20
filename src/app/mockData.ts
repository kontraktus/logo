export interface RiskFinding {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  reason: string;
  impact: string;
  evidenceLocation: string; // e.g. "Clause 5" or "Section 3(a)"
  suggestedAction: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface MissingClause {
  id: string;
  title: string;
  description: string;
  suggestion: string;
}

export interface ContractTextParagraph {
  id: string;
  clauseTitle?: string;
  text: string;
  riskId?: string; // Links paragraph to a risk if any
}

export interface Contract {
  id: string;
  name: string;
  type: string;
  uploadedBy: string;
  uploadDate: string;
  status: 'Uploaded' | 'Analysed' | 'Under Review' | 'Approved' | 'Escalated';
  fileType: 'PDF' | 'DOCX' | 'TXT';
  fileSize: string;
  paragraphs: ContractTextParagraph[];
  risks: RiskFinding[];
  missingClauses: MissingClause[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Contract Manager' | 'Compliance Officer' | 'Legal Reviewer' | 'Administrator';
  status: 'Active' | 'Disabled';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  ipAddress: string;
  details: string;
}

// Initial Mock Users
export const initialUsers: User[] = [
  { id: 'usr-1', name: 'Jane Doe', email: 'jane.doe@kontraktus.local', role: 'Administrator', status: 'Active' },
  { id: 'usr-2', name: 'John Smith', email: 'john.smith@kontraktus.local', role: 'Legal Reviewer', status: 'Active' },
  { id: 'usr-3', name: 'Sarah Connor', email: 'sarah.connor@kontraktus.local', role: 'Compliance Officer', status: 'Active' },
  { id: 'usr-4', name: 'Bob Builder', email: 'bob.builder@kontraktus.local', role: 'Contract Manager', status: 'Active' },
  { id: 'usr-5', name: 'Alice Vance', email: 'alice.vance@kontraktus.local', role: 'Contract Manager', status: 'Disabled' }
];

// Initial Audit Logs
export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-06-20 18:30:12',
    user: 'Jane Doe',
    role: 'Administrator',
    action: 'User Management',
    ipAddress: '127.0.0.1',
    details: 'Disabled user account: Alice Vance'
  },
  {
    id: 'log-2',
    timestamp: '2026-06-20 19:15:45',
    user: 'Bob Builder',
    role: 'Contract Manager',
    action: 'Document Upload',
    ipAddress: '127.0.0.1',
    details: 'Uploaded NDA - Acme Corp.pdf (Size: 1.2 MB)'
  },
  {
    id: 'log-3',
    timestamp: '2026-06-20 19:16:32',
    user: 'SYSTEM (Local AI)',
    role: 'AI Engine',
    action: 'Document Analysis',
    ipAddress: '127.0.0.1',
    details: 'Completed extraction, chunking, embedding, indexing, and risk scanning for NDA - Acme Corp.pdf'
  },
  {
    id: 'log-4',
    timestamp: '2026-06-20 20:02:11',
    user: 'John Smith',
    role: 'Legal Reviewer',
    action: 'Risk Assessment',
    ipAddress: '127.0.0.1',
    details: 'Changed severity of Unlimited Liability clause from High to Critical in NDA - Acme Corp'
  },
  {
    id: 'log-5',
    timestamp: '2026-06-20 21:40:05',
    user: 'Sarah Connor',
    role: 'Compliance Officer',
    action: 'Report Export',
    ipAddress: '127.0.0.1',
    details: 'Exported Risk Compliance PDF Report for Vendor Agreement - TechCorp'
  }
];

// Mock Contracts with embedded Paragraphs, Risks and Missing Clauses
export const initialContracts: Contract[] = [
  {
    id: 'con-1',
    name: 'NDA - Acme Corp',
    type: 'Non-Disclosure Agreement',
    uploadedBy: 'Bob Builder',
    uploadDate: '2026-06-20 19:15',
    status: 'Analysed',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    paragraphs: [
      { id: 'con-1-p1', clauseTitle: 'MUTUAL NON-DISCLOSURE AGREEMENT', text: 'This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of June 20, 2026 ("Effective Date"), by and between Acme Corporation, a Delaware corporation ("Acme"), and Kontraktus Inc., a local AI technologies firm ("Kontraktus").' },
      { id: 'con-1-p2', clauseTitle: '1. Purpose', text: 'The parties wish to evaluate a potential business relationship in connection with local AI document processing systems (the "Purpose"). In connection with the Purpose, either party may disclose to the other party certain proprietary, technical, financial, or business information.' },
      { id: 'con-1-p3', clauseTitle: '2. Confidential Information', text: '"Confidential Information" means any proprietary information disclosed by one party ("Disclosing Party") to the other ("Receiving Party") that is marked as confidential or should reasonably be understood to be confidential. It excludes information that is public, already known, or independently developed.' },
      { id: 'con-1-p4', clauseTitle: '3. Protection and Standard of Care', text: 'The Receiving Party shall hold the Confidential Information in strict confidence and protect it using at least the same degree of care it uses to protect its own confidential information, but in no event less than a reasonable degree of care. It shall limit access to employees who need to know it.' },
      { id: 'con-1-p5', clauseTitle: '4. Term and Termination', text: 'This Agreement and the Receiving Party\'s obligation to protect Confidential Information shall remain in effect for a period of five (5) years from the Effective Date, after which Receiving Party\'s obligation under this Agreement shall terminate, except for trade secrets which survive indefinitely.', riskId: 'con-1-risk-2' },
      { id: 'con-1-p6', clauseTitle: '5. Limitation of Liability', text: 'IN NO EVENT SHALL EITHER PARTY BE LIABLE TO THE OTHER FOR ANY INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES. EACH PARTY\'S TOTAL LIABILITY UNDER THIS AGREEMENT SHALL BE UNLIMITED AND SHALL NOT BE CAPPED IN ANY WAY.', riskId: 'con-1-risk-1' },
      { id: 'con-1-p7', clauseTitle: '6. Miscellaneous', text: 'This Agreement constitutes the entire agreement between the parties. It is governed by local laws without regard to conflict of law principles. Any dispute arising hereunder shall be resolved in local courts.' }
    ],
    risks: [
      {
        id: 'con-1-risk-1',
        title: 'Unlimited Liability Clause',
        severity: 'Critical',
        reason: 'The agreement explicitly states that each party\'s total liability under the NDA is unlimited and shall not be capped.',
        impact: 'If a confidential data breach occurs, the organization faces uncapped financial liability and unlimited damages.',
        evidenceLocation: 'Clause 5 (Limitation of Liability)',
        suggestedAction: 'Negotiate a mutual cap on liability under the NDA, typically limited to a specific dollar amount (e.g. $1,000,000) or direct fees paid.',
        status: 'pending'
      },
      {
        id: 'con-1-risk-2',
        title: 'Long Confidentiality Obligations (5 Years)',
        severity: 'Medium',
        reason: 'The confidentiality obligations remain in effect for 5 years post-termination, which is longer than the industry standard.',
        impact: 'Increases the organization\'s compliance overhead and long-term legal exposure to maintain secrets.',
        evidenceLocation: 'Clause 4 (Term and Termination)',
        suggestedAction: 'Request to reduce the obligations period to 2 or 3 years post-termination.',
        status: 'pending'
      }
    ],
    missingClauses: [
      {
        id: 'con-1-miss-1',
        title: 'Data Privacy Clause (GDPR/CCPA compliant)',
        description: 'The NDA does not contain standard terms detailing the processing of personal data or regulatory data security compliance.',
        suggestion: 'Insert a standard clause stating that any personal data processing will follow applicable regulations and be governed by a separate Data Processing Addendum (DPA).'
      },
      {
        id: 'con-1-miss-2',
        title: 'Force Majeure Provisions',
        description: 'There is no Force Majeure clause protecting either party from failures due to unexpected events (natural disasters, network grid failure).',
        suggestion: 'Insert a standard Force Majeure clause providing excusable delays for acts of God, strikes, pandemics, and infrastructure failures.'
      }
    ]
  },
  {
    id: 'con-2',
    name: 'Vendor Agreement - TechCorp',
    type: 'Software License Agreement',
    uploadedBy: 'John Smith',
    uploadDate: '2026-06-20 12:10',
    status: 'Under Review',
    fileType: 'DOCX',
    fileSize: '2.4 MB',
    paragraphs: [
      { id: 'con-2-p1', clauseTitle: 'TECHCORP END USER LICENSE AGREEMENT', text: 'This Software Vendor License Agreement ("Agreement") is made between TechCorp Solutions Inc., a software provider ("Licensor"), and Kontraktus Corp ("Licensee").' },
      { id: 'con-2-p2', clauseTitle: '1. License Grant', text: 'Licensor grants Licensee a non-exclusive, non-transferable, revocable license to install and use the Kontraktus AI Assistant plugin on client workstations for internal business purposes only.' },
      { id: 'con-2-p3', clauseTitle: '2. Intellectual Property Rights', text: 'Licensor owns all title, patent rights, copyright, and trade secrets in the Software. Licensee agrees that any feedback, feature requests, or improvements suggested by Licensee shall become the exclusive property of TechCorp and are hereby assigned without compensation.', riskId: 'con-2-risk-1' },
      { id: 'con-2-p4', clauseTitle: '3. Fees, Invoicing and Payments', text: 'Licensee shall pay TechCorp a licensing fee of $5,000 per month. Invoices will be issued monthly and Licensee must pay within fifteen (15) calendar days. Overdue payments shall accrue interest at a rate of 2.5% per month (30% APR) compounded daily.', riskId: 'con-2-risk-2' },
      { id: 'con-2-p5', clauseTitle: '4. Dispute Resolution and Governing Law', text: 'This Agreement is governed by the laws of the Republic of Singapore, without regard to conflict of laws principles. The parties agree that the courts of Singapore shall have exclusive jurisdiction and venue to settle any dispute hereunder.', riskId: 'con-2-risk-3' },
      { id: 'con-2-p6', clauseTitle: '5. Term and Audits', text: 'This Agreement is effective for 1 year. TechCorp reserves the right, upon 48 hours notice, to audit Licensee\'s computers and servers to verify license compliance.' }
    ],
    risks: [
      {
        id: 'con-2-risk-1',
        title: 'Unilateral Feedback IP Assignment',
        severity: 'High',
        reason: 'The clause assigns all rights to software feedback, suggestions, or modifications suggested by the Licensee directly to TechCorp.',
        impact: 'If the organization develops custom workflows or custom modules and gives feedback, they waive all intellectual property rights to those ideas.',
        evidenceLocation: 'Clause 2 (Intellectual Property Rights)',
        suggestedAction: 'Negotiate mutual terms where suggestions are provided on a non-exclusive basis, granting TechCorp a free license to use them while Licensee retains any background IP.',
        status: 'pending'
      },
      {
        id: 'con-2-risk-2',
        title: 'Extremely High Interest Rate on Late Payments',
        severity: 'Medium',
        reason: 'Payment term is short (15 days) and the penalty rate is 2.5% per month (equivalent to 30% per annum, compounding daily).',
        impact: 'Minor administrative billing delays can result in heavy financial interest fees.',
        evidenceLocation: 'Clause 3 (Fees, Invoicing and Payments)',
        suggestedAction: 'Request standard payment terms of Net 30 or Net 45. Cap late payment interest rate at 1% per month or the maximum rate allowed by local law.',
        status: 'pending'
      },
      {
        id: 'con-2-risk-3',
        title: 'Singapore Governing Law & Exclusive Jurisdiction',
        severity: 'Medium',
        reason: 'The agreement requires Singapore law and exclusive dispute resolution in Singapore courts.',
        impact: 'Highly expensive to arbitrate or litigate any contract dispute, requiring international legal representation and travel.',
        evidenceLocation: 'Clause 4 (Dispute Resolution and Governing Law)',
        suggestedAction: 'Request governing law and jurisdiction to match the Licensee\'s local region or default to neutral state courts (e.g. Delaware).',
        status: 'pending'
      }
    ],
    missingClauses: [
      {
        id: 'con-2-miss-1',
        title: 'Service Level Agreement (SLA) & Uptime Commitments',
        description: 'The vendor agreement does not guarantee software uptime, availability of updates, or customer support response times.',
        suggestion: 'Request a standard SLA clause committing to 99.9% uptime with credits for downtime, and 24-hour response times for critical bugs.'
      }
    ]
  },
  {
    id: 'con-3',
    name: 'Logistics Service Agreement - Global Shipping',
    type: 'Service Level Agreement',
    uploadedBy: 'Jane Doe',
    uploadDate: '2026-06-18 10:00',
    status: 'Approved',
    fileType: 'TXT',
    fileSize: '450 KB',
    paragraphs: [
      { id: 'con-3-p1', clauseTitle: 'LOGISTICS SERVICE AGREEMENT', text: 'This Logistics Service Agreement is dated June 1, 2026, by and between Global Shipping Inc. and Kontraktus Corp.' },
      { id: 'con-3-p2', clauseTitle: 'Clause 1: Scope of Services', text: 'Global Shipping will provide freight forwarding and warehousing services in accordance with Schedule A.' },
      { id: 'con-3-p3', clauseTitle: 'Clause 2: Standard Compliance', text: 'Both parties agree to comply with all applicable import/export control laws, trade sanctions, and safety standards.' }
    ],
    risks: [],
    missingClauses: []
  },
  {
    id: 'con-4',
    name: 'Employment Agreement - John Doe Draft',
    type: 'Employment Contract',
    uploadedBy: 'Bob Builder',
    uploadDate: '2026-06-20 21:00',
    status: 'Uploaded',
    fileType: 'PDF',
    fileSize: '890 KB',
    paragraphs: [
      { id: 'con-4-p1', clauseTitle: 'EMPLOYMENT AGREEMENT', text: 'This Employment Agreement is made on June 20, 2026, between Kontraktus Corp ("Employer") and John Doe ("Employee").' },
      { id: 'con-4-p2', clauseTitle: '1. Position and Duties', text: 'Employee will serve as Senior Systems Engineer, reporting to the CTO. Duties include local AI model optimization, dataset curation, and coding.' },
      { id: 'con-4-p3', clauseTitle: '2. Restrictive Covenant (Non-Compete)', text: 'During employment and for twenty-four (24) months post-termination, Employee shall not work for or advise any competitive business operating in the field of contract intelligence or RAG within a 100-mile radius.', riskId: 'con-4-risk-1' }
    ],
    risks: [
      {
        id: 'con-4-risk-1',
        title: 'Excessive Non-Compete Period (24 Months)',
        severity: 'High',
        reason: 'A 24-month post-employment restriction is excessively long and faces high risk of being declared unenforceable under local state law.',
        impact: 'Creates difficulty in hiring skilled engineers and exposes the company to legal challenges from employees.',
        evidenceLocation: 'Clause 2 (Restrictive Covenant)',
        suggestedAction: 'Reduce the non-compete covenant duration to a more standard 6 to 12 months, and clarify scope definitions.',
        status: 'pending'
      }
    ],
    missingClauses: []
  }
];

// Prescripted AI responses for Q&A on contracts
export const aiPrescriptedQAs: Record<string, { query: string; answer: string; citationId: string }[]> = {
  'con-1': [
    {
      query: 'What is the liability cap?',
      answer: 'According to **Clause 5 (Limitation of Liability)**, there is no liability cap. The agreement explicitly states that each party\'s total liability under the agreement shall be **unlimited** and shall not be capped in any way. This presents a critical risk for the company.',
      citationId: 'con-1-p6'
    },
    {
      query: 'How long do confidentiality obligations survive?',
      answer: 'Under **Clause 4 (Term and Termination)**, the obligations to protect Confidential Information survive for a period of **five (5) years** from the Effective Date. The exception is trade secrets, which are protected indefinitely.',
      citationId: 'con-1-p5'
    },
    {
      query: 'Are there data privacy rules?',
      answer: 'The contract **does not** contain any specific data privacy clauses or references to GDPR/CCPA compliance. This represents a missing clause gap that should be corrected if personal data is shared.',
      citationId: 'con-1-p1'
    }
  ],
  'con-2': [
    {
      query: 'Who owns the feedback intellectual property?',
      answer: 'As stated in **Clause 2 (Intellectual Property Rights)**, TechCorp owns all intellectual property. Furthermore, the clause specifies that any feedback, feature requests, or improvements suggested by the Licensee are **automatically assigned** to TechCorp without compensation.',
      citationId: 'con-2-p3'
    },
    {
      query: 'What is the interest rate on late payments?',
      answer: 'Under **Clause 3 (Fees, Invoicing and Payments)**, overdue payments accrue interest at a rate of **2.5% per month**, which is equivalent to a **30% Annual Percentage Rate (APR)** compounding daily. Payments are due within 15 days.',
      citationId: 'con-2-p4'
    },
    {
      query: 'Where are disputes resolved?',
      answer: 'According to **Clause 4 (Dispute Resolution and Governing Law)**, the agreement is governed by the laws of **Singapore** and disputes must be resolved exclusively in **Singapore courts**.',
      citationId: 'con-2-p5'
    }
  ],
  'con-4': [
    {
      query: 'What are the restrictions in the non-compete?',
      answer: 'In **Clause 2 (Restrictive Covenant)**, the non-compete restricts the employee from working for any competitor in the field of contract intelligence or RAG for **twenty-four (24) months** post-termination within a **100-mile radius**.',
      citationId: 'con-4-p3'
    }
  ]
};

// Simple search analyzer to generate smart local AI responses for generic questions
export function generateGenericAIResponse(query: string, contract: Contract): { answer: string; citationId: string } {
  const q = query.toLowerCase();
  
  if (q.includes('liability') || q.includes('cap') || q.includes('limit')) {
    const paragraph = contract.paragraphs.find(p => p.clauseTitle?.toLowerCase().includes('liability') || p.text.toLowerCase().includes('liability'));
    if (paragraph) {
      return {
        answer: `Based on local analysis, the liability clauses are defined in **${paragraph.clauseTitle || 'the contract'}**. The text states: "${paragraph.text}". This was flagged because of its impact on legal indemnity limits.`,
        citationId: paragraph.id
      };
    }
  }
  
  if (q.includes('terminate') || q.includes('term') || q.includes('duration') || q.includes('survive')) {
    const paragraph = contract.paragraphs.find(p => p.clauseTitle?.toLowerCase().includes('term') || p.text.toLowerCase().includes('terminat') || p.text.toLowerCase().includes('survival'));
    if (paragraph) {
      return {
        answer: `Our local AI index retrieved the Term/Termination clause in **${paragraph.clauseTitle || 'the contract'}**. It states: "${paragraph.text}". Obligations for confidentiality and contract duration are governed under these guidelines.`,
        citationId: paragraph.id
      };
    }
  }

  if (q.includes('intellectual') || q.includes('property') || q.includes('ip') || q.includes('own') || q.includes('feedback')) {
    const paragraph = contract.paragraphs.find(p => p.clauseTitle?.toLowerCase().includes('intellect') || p.clauseTitle?.toLowerCase().includes('property') || p.text.toLowerCase().includes('intellectual') || p.text.toLowerCase().includes('ip '));
    if (paragraph) {
      return {
        answer: `Local AI analysis of intellectual property rights points to **${paragraph.clauseTitle || 'the contract'}**. The text states: "${paragraph.text}". IP ownership, licensing scope, and feedback terms reside here.`,
        citationId: paragraph.id
      };
    }
  }

  if (q.includes('govern') || q.includes('law') || q.includes('dispute') || q.includes('jurisdiction')) {
    const paragraph = contract.paragraphs.find(p => p.clauseTitle?.toLowerCase().includes('govern') || p.clauseTitle?.toLowerCase().includes('law') || p.text.toLowerCase().includes('governed') || p.text.toLowerCase().includes('jurisdiction'));
    if (paragraph) {
      return {
        answer: `The local RAG engine found governing law and dispute venue terms in **${paragraph.clauseTitle || 'the contract'}**. It states: "${paragraph.text}".`,
        citationId: paragraph.id
      };
    }
  }

  // Fallback default response
  const firstParagraph = contract.paragraphs[0] || { id: 'con-1-p1', text: 'the document' };
  return {
    answer: `Local RAG Query: "${query}".\n\nI processed your request using the local embedding index for **${contract.name}**. I found relevant citations starting near **${firstParagraph.clauseTitle || 'the beginning of the document'}** which states: "${firstParagraph.text.slice(0, 150)}...". All processing is done offline on your device for confidentiality.`,
    citationId: firstParagraph.id
  };
}
