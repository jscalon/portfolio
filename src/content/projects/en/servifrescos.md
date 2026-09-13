---
lang: en
title: "ServiFrescos — Centralized Product & Price Management"
description: "Web application that centralizes the management (CRUD) of products, prices, users and stores for Protinal Proagro, eliminating the discrepancies between each store's local database and headquarters."
stack: ["React", "TypeScript", "Django REST Framework", "Docker", "SQL Server", "CSS", "Figma"]
cover: ../../../assets/covers/servifrescos.webp
repoUrl: https://github.com/jscalon/servifrescos
featured: true
order: 2
date: 2026-02-01
---

ServiFrescos is a web application built as an internship and thesis project for
**Protinal Proagro, C.A.**, designed to centralize the management of products and their
prices across the company's retail stores.

## The problem

Each of the **eleven retail stores** operated with its **own local database** to manage
products and prices.
This decentralized approach led to **frequent discrepancies** between the stores' data and
headquarters, along with slow, manual and error-prone update processes.

## The solution

A **web application** that centralizes management into a **central database**, administered
through **CRUD** operations from a friendly interface. There are **five modules**: products,
prices, categories (brands, types, departments, groups and subgroups), stores and users.

The central database does not replace each store's local one: it connects to them and
replicates the changes made from the application, so the stores stop diverging from
headquarters without having to tear out what already worked.

Key features:

- **Scheduled prices:** when creating a price, you set the **date and time** from which it
  takes effect.
- **Granular role-based permissions:** access is granted not per module but per module
  *and* operation — read, create, update and delete — and each combination is independent
  of the rest. A role can create in one module and only read in another, so it can be
  tuned to whatever a given position actually needs.

## My role

I was the project's **only developer** from start to finish, working alone and full stack:
I designed the interface and built the frontend, the backend and the centralized database.

- **Design (UI):** interface prototyping in Figma.
- **Frontend:** React, TypeScript and CSS.
- **Backend:** REST API with Django REST Framework.
- **Database:** centralized SQL Server.
- **Environment:** the whole application — frontend, backend and database —
  containerized with Docker Compose, so `docker compose up -d` brings the entire
  system up.

## Project status

Development reached an advanced, functional state, covering the application's full cycle.
Deployment and rollout to the stores fell outside the internship period, so the project was
not deployed to a real environment.
