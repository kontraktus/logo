---
layout: post
title: "Week 1 Update — Kontraktus Approved"
date: 2026-05-07
week: 1
status: "Approved"
tags: [Capstone, AI, Contracts, RAG, Local AI]
summary: "Kontraktus was approved as our CSIT321 capstone. This week we finalized project direction, local RAG architecture, infrastructure plan, and immediate MVP milestones."
---

## Overview

Kontraktus has been approved as our CSIT321 capstone project.
The project is a private AI-powered contract intelligence platform focused on local processing, citation-grounded answers, and risk-aware contract review.

## What Happened This Week

This week we finalized the project selection, confirmed the MVP boundaries, and aligned on an architecture-first execution plan.

<div class="callout">
<strong>Week 1 result:</strong> Approved project direction + technical baseline for implementation.
</div>

## Project Direction

Kontraktus is not intended to behave like a normal chatbot.
The system is designed to retrieve relevant contract clauses first, then produce an answer using only those retrieved clauses.

The objective is reliable, auditable contract intelligence rather than generic conversational responses.

## Technical Approach

The first MVP follows a local RAG workflow:

1. Upload contract documents (PDF, DOCX, TXT)
2. Extract text
3. Chunk by meaningful sections
4. Generate embeddings
5. Store chunks in a vector database
6. Retrieve relevant clauses
7. Analyze using a local LLM
8. Return answers with citations

<div class="diagram">
Upload → Extract → Chunk → Embed → Retrieve → Analyze → Cite
</div>

## Infrastructure Plan

Deployment target is a local Proxmox machine.
Current test hardware: <strong>i7 12th Gen laptop, 16GB RAM</strong>.

Planned service containers:

- <strong>kontraktus-ai</strong> — Ollama, Python, LangChain/LlamaIndex, ChromaDB, RAG orchestration
- <strong>kontraktus-web</strong> — dashboard for uploads, Q&amp;A, citations, and risk register
- <strong>kontraktus-docs</strong> — optional Paperless-ngx layer for OCR/document organization
- <strong>database layer</strong> — contracts, risks, users, audit logs, and future workflow records

## Long-Term Vision

Kontraktus should remain a general contract intelligence platform, while allowing domain-specific interfaces and risk libraries over time.

Examples:

- Real estate: lease renewals, maintenance contracts, tenant obligations
- Construction: payment terms, EOT notices, retention, subcontractor risk
- Legal teams: liability, governing law, dispute resolution, termination clauses
- Procurement: vendor contracts, SLA obligations, renewal risks

## Next Steps

Immediate milestone for Week 2:

- Set up Proxmox environment
- Run first local AI pipeline test
- Build vertical slice: upload contract → ask question → receive citation-grounded answer
