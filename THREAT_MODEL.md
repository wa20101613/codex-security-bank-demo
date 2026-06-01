# Threat Model

## Purpose

This is an intentionally vulnerable training repository for Codex Security.

The application is fake and uses fake data only.

## Application

A fake internal banking support API used by employees to assist fake customers.

Employees can view fake customer records, search fake notes, download fake files, request fake payment adjustments, and use fake admin exports.

## Users

- Unauthenticated users
- Employee users
- Support manager users
- Admin users
- External attackers who can send HTTP requests

## Sensitive Fake Data

The following fake data should be treated as sensitive:

- Customer names
- Customer emails
- Customer IDs
- Fake account IDs
- Fake account balances
- Fake payment history
- Fake customer notes
- Fake support documents
- Fake internal audit logs
- Fake admin exports

## Trust Boundaries

- HTTP requests are untrusted.
- Request headers must not be trusted as proof of identity or role.
- Authentication must be verified server-side.
- Authorization must be checked before returning customer data.
- Employees should only access assigned customers.
- Admin-only routes must require verified admin role.
- File reads must stay inside the uploads directory.
- Uploaded files must be validated.
- Payment adjustments must require authorization, validation, limits, and approval.
- Debug endpoints must not expose sensitive internals.
- External URLs supplied by users must not be fetched without validation.
- User input must not be passed to system commands.

## High Priority Areas

- Authentication and session handling
- Customer authorization
- Admin export
- Payment adjustment workflow
- File download and upload
- Search functionality
- Debug tooling
- Audit logging
- External URL fetching
- Report generation

## Security Expectations

- Users should not be able to access another customer's data by changing a URL parameter.
- Users should not be able to become admins by setting request headers.
- Users should not be able to download files outside the intended upload directory.
- Users should not be able to upload dangerous file types.
- Users should not be able to approve high-risk payment adjustments without manager approval.
- Users should not be able to submit negative, unlimited, or malformed payment amounts.
- SQL-style queries should not be built by concatenating user input.
- Secrets should not be stored in source code.
- Debug endpoints should not expose environment variables or internal configuration.
- Sensitive data should not be written to logs.

## Out of Scope

- This is not production code.
- This should not be deployed.
- This should not contain real customer data.
- This should not contain real secrets.
