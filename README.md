# Taboola Recommendation Widget

A lightweight, production-oriented recommendation widget built with **Vanilla TypeScript**, using browser-native ES modules and no frameworks.

The project focuses on clean architecture, resilient data handling, and practical frontend engineering decisions.

---

## Overview

The widget fetches and displays recommendation items in a responsive layout.  
When the real API is unavailable, it gracefully falls back to mock data while preserving the same API contract.

---

## Project Structure
src/ # TypeScript source code
public/ # Static files and compiled output
tests/ # Unit tests


---

## Running the Project

1. Install dependencies:
```bash
npm install



2. Compile TypeScript:
npx tsc

3. Serve over HTTP (required for ES modules):

Recommended:
Right-click public/index.html → Open with Live Server

Alternative:
Serve the public folder using any static HTTP server

Testing

Run unit tests with:
npx vitest