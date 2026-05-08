---
layout: post
title: "Meeting 1 — Idea Approval, Scope Alignment & Planning Baseline"
date: 2026-05-07
week: 1
status: "Approved"
tags: [Capstone, AI, Contracts, RAG, Local AI]
summary: "Kontraktus was approved as our CSIT321 capstone project direction, with scope, feasibility, and planning priorities aligned for requirements and design work."
---

## Meeting 1 — Idea Approval, Scope Alignment & Planning Baseline

Kontraktus was approved as our CSIT321 capstone project direction. This meeting focused on validating the concept, clarifying the project scope, discussing feasibility, and setting a realistic planning baseline for the upcoming requirements and design work.

## Overview

Kontraktus is a private AI-powered contract intelligence platform concept. The project focuses on local document processing, citation-grounded answers, and risk-aware contract review.

The core idea is to help users analyze contracts by retrieving relevant clauses first, then generating answers based only on the retrieved contract context.

## What Happened This Week

This week, the team completed initial concept validation and aligned on early planning priorities with supervisor guidance.

The focus was not full implementation. Instead, the team concentrated on:

- confirming the problem area,
- defining a realistic MVP direction,
- identifying feasibility concerns,
- discussing early architecture options,
- preparing for the next planning and requirements deliverables.

Meeting 1 topic: approved project direction and planning baseline for the next-stage requirements and design work.

## Academic Alignment

This meeting confirmed that the current trimester should remain focused on proposal validation, feasibility analysis, requirements preparation, and design planning.

Full implementation is intentionally limited at this stage to controlled early prototyping only. This allows the team to first define a realistic MVP, evaluate feasibility, and prepare the required academic documentation before expanding the technical build in the next trimester.

## Project Direction

Kontraktus is not intended to be a generic chatbot or a simple document Q&A tool.

The broader direction is to build a private AI contract intelligence platform that can help organizations understand, monitor, and act on the contents of their contracts.

The first MVP layer focuses on contract-grounded reasoning: retrieving relevant clauses first, then generating answers using only the retrieved contract context. This supports explainability, privacy, and citation-based evidence.

However, the long-term product vision goes beyond asking questions manually. Kontraktus should eventually become a proactive contract intelligence system that studies uploaded contracts, extracts obligations, identifies deadlines, detects risk events, and alerts the organization when a contract term may soon affect the business.

Examples include:

- renewal deadlines,
- termination notice periods,
- payment due dates,
- penalty clauses,
- expiry dates,
- maintenance obligations,
- service-level obligations,
- liability exposure,
- dispute resolution triggers,
- compliance-related obligations.

This means Kontraktus should support both:
1. reactive intelligence — answering user questions with citations, and
2. proactive intelligence — monitoring contract obligations and notifying users before risks or deadlines become urgent.

## Initial Technical Approach

The proposed MVP begins with a local RAG-oriented workflow:

Upload → Extract → Chunk → Embed → Retrieve → Analyze → Cite

This workflow is the foundation for citation-grounded Q&A.

Beyond Q&A, the same extracted and structured contract data can later support proactive features such as:

- obligation extraction,
- deadline detection,
- renewal and expiry tracking,
- risk registers,
- automated reminders,
- contract impact alerts.

At this stage, these proactive features are part of the planned product direction and may be partially prototyped depending on feasibility and available time. The main academic objective is to prove that private, explainable contract intelligence can be built using local AI workflows.

## Initial Infrastructure Plan

The expected deployment target is a local Proxmox-based environment.

The current available test machine is an i7 12th Gen laptop with 16GB RAM.

Initial planned components include:

- local AI service for LLM, embeddings, and retrieval,
- web interface for contract upload and Q&A,
- document processing layer for extraction/OCR,
- database layer for contracts, risks, users, citations, and audit logs.

These components remain part of the planning and feasibility analysis at this stage.

## Target MVP by End of Trimester 2

By the end of the second trimester, the target is to demonstrate a working Kontraktus MVP rather than only a conceptual design.

The expected MVP should allow a user to:

- upload a contract document,
- extract readable contract text,
- ask questions about the contract,
- retrieve relevant clauses from the document,
- generate answers grounded in the retrieved clauses,
- display citations showing where the answer came from,
- identify basic contract risks such as renewal terms, termination clauses, liability, payment obligations, and dispute resolution clauses,
- extract key contract dates such as expiry dates, renewal dates, and notice periods where possible,
- present important obligations or risks in a simple contract summary,
- show a basic risk/obligation register inside the dashboard,
- present the results in a simple web dashboard.

The MVP does not need to be a complete commercial product at this stage. It should prove the core technical and academic concept: that a local AI-assisted workflow can support private, explainable, citation-based and risk-aware contract review.

Advanced proactive automation, full notification workflows, multi-user enterprise dashboards, legal playbooks, authentication, production deployment, and industry-specific modules can remain part of the long-term roadmap.

## Reactive vs Proactive Intelligence

A basic contract chatbot only responds when the user asks a question.

Kontraktus is planned to move beyond that model.

The system should support reactive intelligence by answering contract questions with evidence, but it should also support proactive intelligence by identifying contract obligations before the user asks.

For example, instead of waiting for a user to ask "When does this agreement renew?", Kontraktus should eventually detect the renewal clause, extract the notice deadline, and notify the company before the renewal window closes.

This proactive direction is important because many contract risks are not caused by misunderstanding the contract after reading it. They are caused by missed dates, unnoticed obligations, unclear responsibilities, and terms that become important only later.

This is why the long-term vision of Kontraktus is not only contract Q&A. It is contract intelligence, obligation awareness, and risk prevention.

## Long-Term Vision

Kontraktus should remain a general contract intelligence platform while supporting specialized domain views over time.

Possible future domains include:

- real estate contracts,
- construction contracts,
- legal team review workflows,
- procurement and vendor agreements.

The long-term goal is to build a platform that can identify important clauses, explain contract risks, and support structured legal review.

## Related Documents

<div class="grid">
  <article class="panel soft">
    <div class="meta-row">
      <span class="chip chip-status">Available</span>
      <span class="chip chip-muted">PDF + PPTX</span>
    </div>
    <h3>Project Proposal</h3>
    <p>Initial proposal materials reviewed during the project approval and scope discussion.</p>
    <p class="summary">Files: Project Proposal Document · Project Proposal Supporting File / Presentation</p>
    <div class="meta-row">
      <a class="btn" href="{{ '/assets/docs/Contract_Intelligence_Platform.pdf' | relative_url }}" download>Download Proposal File 1</a>
      <a class="btn" href="{{ '/assets/docs/contract_review_final%20-%20Repaired.pptx' | relative_url }}" download>Download Proposal File 2</a>
    </div>
  </article>
</div>

## Next Steps

Near-term academic focus for Trimester 1:

- complete planning and feasibility documentation,
- prepare requirements analysis,
- define the exact MVP boundary for Trimester 2,
- continue architecture design,
- run controlled early prototyping to validate local RAG feasibility.

The implementation-heavy phase is expected to expand significantly in the second trimester, where the main objective will be building and demonstrating the working MVP.
