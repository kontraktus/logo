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

Kontraktus is not designed as a generic chatbot.

The main approach is contract-grounded reasoning. The system should first retrieve relevant clauses from the uploaded contract, then generate answers using only that retrieved context.

This direction supports:

- explainability,
- privacy,
- citation-based evidence,
- supervisor-verifiable outputs,
- reduced hallucination risk.

## Initial Technical Direction

The proposed MVP is based on a local RAG-oriented workflow:

Upload → Extract → Chunk → Embed → Retrieve → Analyze → Cite

At this stage, this is a planned architecture and feasibility direction, not a completed implementation.

The goal is to determine whether a local AI workflow can realistically support contract Q&A, clause retrieval, and basic risk identification within the project timeline and available hardware.

## Initial Infrastructure Plan

The expected deployment target is a local Proxmox-based environment.

The current available test machine is an i7 12th Gen laptop with 16GB RAM.

Initial planned components include:

- local AI service for LLM, embeddings, and retrieval,
- web interface for contract upload and Q&A,
- document processing layer for extraction/OCR,
- database layer for contracts, risks, users, citations, and audit logs.

These components remain part of the planning and feasibility analysis at this stage.

## Long-Term Vision

Kontraktus should remain a general contract intelligence platform while supporting specialized domain views over time.

Possible future domains include:

- real estate contracts,
- construction contracts,
- legal team review workflows,
- procurement and vendor agreements.

The long-term goal is to build a platform that can identify important clauses, explain contract risks, and support structured legal review.

## Next Steps

The next academic priorities are:

- complete planning and feasibility documentation,
- prepare requirements analysis,
- continue architecture design,
- define a realistic MVP boundary,
- run controlled early prototyping to validate local RAG feasibility.

The implementation-heavy phase is expected to expand significantly in the next trimester.
