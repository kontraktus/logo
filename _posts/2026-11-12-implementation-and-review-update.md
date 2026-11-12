---
layout: post
title: "Implementation update — local application and review workflow"
date: 2026-11-12
status: "Working MVP"
tags: [Implementation, Local AI, Human Review, Testing]
summary: "The local contract intelligence application now supports upload, cited answers, risk analysis, human review, and PDF reports; 284 automated tests pass."
---

## What is working

The [main Kontraktus repository](https://github.com/haresholmes/kontraktus) now contains a locally hosted Streamlit application. Contract files stay on the machine running the application. The workflow accepts PDF, DOCX, and TXT files, extracts and chunks their text, then indexes them for retrieval. Answers are grounded in checked source passages and carry citations.

The analysis workflow checks for missing clauses and risky provisions using the project knowledge base. Findings remain pending until a contract manager, legal reviewer, or compliance officer reviews them. Reviewers can accept or reject a finding, adjust its severity, add an evidence-backed human finding, and record a final approval or request for changes. Completed decisions and account actions are audited.

PDF exports include accepted findings, supporting evidence, reviewer notes, and the final contract decision. The reviewer dashboard shows contracts awaiting attention. The interface also provides AI readiness checks, analysis progress, retry and cancellation controls, and a source-document review view.

## Recent review and hardening

Recent code review addressed permission and publication gaps in four commits:

- [Report export access](https://github.com/haresholmes/kontraktus/commit/236cf8e): a disabled reviewer cannot publish a PDF report after rendering begins.
- [Upload access](https://github.com/haresholmes/kontraktus/commit/1c2a2c8): only an active contract manager can create an upload record.
- [Analysis claim access](https://github.com/haresholmes/kontraktus/commit/5d1f417): starting an analysis checks current reviewer access in the same database update that claims the run.
- [Export feedback](https://github.com/haresholmes/kontraktus/commit/e58b282): the review page displays permission errors if export access changes during rendering.

Earlier review work also protected human decisions while analysis runs, kept completed results through failed retries, made exports atomic and unique, and preserved human-reviewed evidence across reruns. The [README](https://github.com/haresholmes/kontraktus#readme) and [component documentation](https://github.com/haresholmes/kontraktus/tree/main/docs) describe the implementation and its limits.

## Verification and access

The full automated suite passed **284 tests** on 12 November 2026. The browser prototype is available on this site at [Prototype]({{ '/prototype/' | relative_url }}). The working application requires local Python dependencies and local AI services; setup instructions are in the main repository.

This progress site is now maintained alongside the application in the main repository's `progress-site/` directory and published through the existing `kontraktus-app` GitHub Pages repository.
