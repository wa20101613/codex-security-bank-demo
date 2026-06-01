# Codex Security Bank Demo

This repository is for Codex Security testing only.

It contains intentionally vulnerable fake code and fake data.

Do not deploy this application.
Do not add real customer data.
Do not add real bank data.
Do not add real secrets.
Do not add internal hostnames, credentials, certificates, tokens, screenshots, or production-like account numbers.

## Application Summary

This is a fake internal banking support API.

Employees can:

- Log in
- View fake customer profiles
- Search fake customer notes
- Download fake support files
- Submit fake payment adjustments
- View fake payment history
- Use fake admin exports
- Access fake debug endpoints

## Purpose

The purpose of this repository is to test Codex Security.

The repository intentionally includes vulnerabilities that should produce findings across severity levels.

## Expected Vulnerability Themes

Codex Security may identify issues related to:

- Hardcoded secrets
- Plaintext passwords
- Weak authentication
- Trusting request headers for identity
- Weak admin authorization
- Missing customer-level authorization
- Insecure direct object reference
- Unsafe query construction
- Path traversal
- Unsafe file upload
- Sensitive data exposure
- Excessive debug information
- Risky command execution pattern
- Server-side request forgery pattern
- Weak payment approval workflow
- Insufficient input validation
- Sensitive logging
- Missing rate limiting
- Missing security headers

## Safety

This repo uses fake data only.

Do not deploy it.
Do not connect it to real systems.
Do not add real data.
