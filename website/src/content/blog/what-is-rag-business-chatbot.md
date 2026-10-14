---
title: 'What is RAG and how can a business chatbot use its own documents?'
description: 'Retrieval-augmented generation explained in plain terms: how it works, what it is good at, where it fails, and what you need to run it.'
category: ai-automation
pubDate: 2026-10-14
related: ['hosting/ai-vps', 'products/managed-ai-assistant', 'products/ai-agents']
---

A general-purpose AI model knows a lot about the world and nothing about your returns policy. Retrieval-augmented generation (RAG) is the most common way to close that gap without training your own model.

## The idea in one paragraph

When a user asks a question, the system first **retrieves** the most relevant passages from your own documents, then gives those passages to the language model along with the question, and asks it to **generate** an answer based on them. The model does not memorise your documents; it reads the relevant parts each time.

## How it works, step by step

1. **Collect** the source material: help articles, policies, product sheets, past support answers.
2. **Split** each document into chunks of a few hundred words.
3. **Embed** each chunk: convert it into a list of numbers that represents its meaning.
4. **Store** the embeddings in a vector database.
5. At question time, **embed the question**, find the closest chunks, and pass them to the model with instructions such as “Answer only from the context below. If the answer is not there, say so.”

## What RAG is good at

- Answering questions from a known set of documents.
- Keeping answers current: update a document, re-index it, and the next answer uses it.
- Citing sources, so users and staff can check the answer.
- Keeping private information out of model training.

## Where it goes wrong

- **Bad source material.** Outdated or contradictory documents produce confident wrong answers.
- **Poor chunking.** A table split across chunks or a policy cut mid-sentence leads to missing context.
- **Questions outside the documents.** Without a clear “I don’t know” instruction, models tend to guess.
- **Access control.** If internal documents sit in the same index as public ones, a public chatbot can leak them. Separate indexes or filter by permission.

## What you need to run it

| Component | Typical options |
|---|---|
| Document pipeline | A script or workflow tool such as n8n that ingests and re-indexes content |
| Embedding model | Hosted API or a self-hosted open model |
| Vector database | PostgreSQL with pgvector, Qdrant, or similar |
| Language model | Hosted API or self-hosted model |
| Interface | Website chat widget, internal tool, or helpdesk integration |
| Hosting | A VPS with enough RAM for the database and any self-hosted models |

## Starting small

Pick one narrow use case, such as answering the 50 most common support questions, and measure:

- How often the answer is correct.
- How often it correctly says “I don’t know”.
- How many conversations still need a human.

Expand only when those numbers are good.

## How we can help

Hosttiva’s [Managed AI VPS](/hosting/ai-vps) runs vector databases, RAG systems and automation in a managed environment, and Inventomo can build the pipeline and interface as a [RAG Knowledge Base](/marketplace#ai) project.
