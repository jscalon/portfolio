---
lang: en
title: "ServiFrescos — Centralized Product & Price Management"
description: "Web application that centralizes the management (CRUD) of products, prices, users and stores for Protinal Proagro, eliminating the discrepancies between each store's local database and headquarters."
stack: ["React", "TypeScript", "Django REST Framework", "SQL Server", "CSS", "Figma"]
cover: /covers/servifrescos.webp
repoUrl: https://github.com/jscalon/servifrescos
featured: true
order: 2
date: 2026-02-01
---

ServiFrescos is a web application built as an internship and thesis project for
**Protinal Proagro, C.A.**, designed to centralize the management of products and their
prices across the company's retail stores.

## The problem

Each retail store operated with its **own local database** to manage products and prices.
This decentralized approach led to **frequent discrepancies** between the stores' data and
headquarters, along with slow, manual and error-prone update processes.

## The solution

A **web application** that centralizes all the information into a **single database** and
lets users manage it through **CRUD** operations from a friendly interface. Main modules:
**products, prices, users, categories** (brands, types, departments, groups and subgroups)
**and stores**.

Key features:

- **Scheduled prices:** when creating a price, you set the **date and time** from which it
  takes effect.
- **Role-based permissions:** each user has roles that determine which modules they can
  access and which CRUD operations they can perform (e.g. read-only, or read and create
  without delete).

## My role

I was the **full stack** developer of the project from start to finish: I designed the
interface and built the frontend, the backend and the centralized database.

- **Design (UI):** interface prototyping in Figma.
- **Frontend:** React, TypeScript and CSS.
- **Backend:** REST API with Django REST Framework.
- **Database:** centralized SQL Server.

## Project status

Development reached an advanced, functional state, covering the application's full cycle.
Deployment and rollout to the stores fell outside the internship period, so the project was
not deployed to a real environment.
