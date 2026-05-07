---
layout: post
title: "Week 1 Update — Kontraktus Has Been Approved"
date: 2026-05-07
week: 1
status: "Approved"
tags: [Capstone, AI, Contracts, RAG, Local AI]
summary: "The Kontraktus idea was approved as our capstone project. This update explains the MVP direction, technical approach, infrastructure plan, and long-term vision."
---

# Week 1 Update — Kontraktus Has Been Approved

This week, our capstone project direction was officially confirmed. Out of the ideas we presented, the approved project is **Kontraktus**, a private AI-powered contract intelligence platform.

The goal of Kontraktus is not to build a simple “chat with PDF” tool. Our vision is to create a system that helps organizations understand contracts faster, identify important clauses, detect risks, and retrieve answers with clear source citations.

## What Kontraktus Will Do

Kontraktus will allow users to upload contracts such as PDF, DOCX, or TXT files. The system will extract the text, divide the contract into meaningful sections, store those sections in a searchable knowledge base, and use a local AI model to answer questions based only on the uploaded document.

The key principle is privacy. Contract data should remain inside the local environment instead of being uploaded to external cloud AI services.

## Initial Technical Approach

Our first MVP will focus on the core AI pipeline:

1. Upload contract documents
2. Extract text from PDF, DOCX, or TXT files
3. Split the contract into smaller chunks
4. Generate embeddings for semantic search
5. Store the chunks in a vector database
6. Retrieve relevant clauses when a user asks a question
7. Use a local LLM to generate an answer
8. Show citations from the original contract

This approach is known as RAG, or Retrieval-Augmented Generation. Instead of allowing the AI to guess, the system retrieves the relevant contract clauses first, then asks the AI to answer using only that context.

## Planned Infrastructure

We plan to deploy the prototype on a local Proxmox machine. The current hardware available to us is an i7 12th generation laptop with 16GB RAM.

The proposed setup is:

- **kontraktus-ai** — local AI engine using Ollama, Python, LangChain/LlamaIndex, and ChromaDB
- **kontraktus-web** — web interface for uploads, questions, answers, citations, and risk results
- **kontraktus-docs** — optional document management/OCR layer using Paperless-ngx
- **database layer** — for storing contracts, risks, users, audit logs, and future workflows

## Product Vision

The long-term vision is to make Kontraktus a modular contract intelligence platform. The core system will remain general, but different industries can later have specialized dashboards and rule sets.

For example:

- Real estate companies may need lease renewal tracking and maintenance contract monitoring.
- Construction companies may need payment terms, delay notices, retention, and subcontractor risk tracking.
- Legal teams may need clause review, liability checks, and dispute resolution analysis.
- Procurement teams may need vendor contract comparison and obligation tracking.

This allows Kontraktus to start as a capstone MVP while still having a realistic path toward becoming a startup product.

## Why This Matters

Contracts often contain important obligations, deadlines, and risks that are difficult to track manually. Kontraktus aims to reduce this problem by combining private AI, document search, source citations, and structured risk detection.

Our next step is to build the first working prototype: upload a contract, extract its text, ask a question, and receive an answer with citations.
