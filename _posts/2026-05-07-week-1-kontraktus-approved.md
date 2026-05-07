---
layout: post
title: "Meeting 1 — Idea Approved & Initial Planning"
date: 2026-05-07
week: 1
status: "Approved"
tags: [Capstone, AI, Contracts, RAG, Local AI]
summary: "Kontraktus was approved as our capstone direction. This week focused on concept validation, architecture brainstorming, feasibility planning, and defining a realistic MVP path."
---

## Overview

Kontraktus has been approved as our CSIT321 capstone project direction.
It is a private AI-powered contract intelligence concept focused on local processing, citation-grounded answers, and risk-aware contract review.

## What Happened This Week

This week we completed concept validation and aligned on early planning priorities with supervisor guidance.
The team focused on project scope clarity, feasibility thinking, and architecture brainstorming rather than full implementation.

<div class="callout">
<strong>Meeting 1 topic:</strong> approved direction + planning baseline for next-stage requirements and design work.
</div>

## Project Direction

Kontraktus is not designed as a generic chatbot.
The core approach is contract-grounded reasoning:
retrieve relevant clauses first, then generate answers using only retrieved context.

This direction supports explainability, privacy, and supervisor-verifiable evidence.

## Technical Approach

The proposed MVP workflow is local RAG-oriented:

1. Upload contract files (PDF, DOCX, TXT)
2. Extract text
3. Chunk document content into meaningful sections
4. Generate embeddings
5. Store chunks in vector search
6. Retrieve relevant clauses for each question
7. Generate answer with local LLM using retrieved context only
8. Return answer with citations

<div class="diagram">
Upload → Extract → Chunk → Embed → Retrieve → Analyze → Cite
</div>

At this stage, this remains a planned architecture with early prototyping activity.

## Infrastructure Plan

Deployment target is a local Proxmox environment.
Current available test machine: <strong>i7 12th Gen laptop with 16GB RAM</strong>.

Planned container/services:

- <strong>kontraktus-ai</strong> — local AI services (Ollama, Python, LangChain/LlamaIndex, ChromaDB)
- <strong>kontraktus-web</strong> — upload and Q/A interface with citations/risk display
- <strong>kontraktus-docs</strong> — optional Paperless-ngx for OCR/document organization
- <strong>database layer</strong> — contracts, risks, users, audit logs, and future workflows

## Long-Term Vision

Kontraktus should remain a general contract intelligence platform while supporting specialized domain views over time.

Examples:

- Real estate: lease renewals, maintenance contracts, tenant obligations
- Construction: payment terms, EOT notices, retention, subcontractor risk
- Legal teams: liability, governing law, dispute resolution, termination clauses
- Procurement: vendor contracts, SLA obligations, renewal risks

## Next Steps

Near-term academic focus:

- complete planning and feasibility documentation,
- prepare requirements analysis,
- continue architecture design,
- run controlled early prototyping to validate local RAG feasibility.

The implementation-heavy phase is expected to expand significantly in the next trimester.
