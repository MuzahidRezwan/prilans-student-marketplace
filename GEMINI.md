# Project Security & Production Guidelines

This repository follows strict production-grade security standards.

## Security Controls Implemented
1. **Zero-Secret Architecture**: No credentials, private tokens, or secrets committed.
2. **Comprehensive Gitignore**: Fully ignores `.env`, certificates, and keys.
3. **Enterprise Headers**: All responses (Vercel and Express) enforce HSTS, Clickjacking defense, and MIME sniffing protection.
4. **Server Hardening**: Express hides its signature (`x-powered-by: false`) and limits payload sizes to 100kb to mitigate DoS attacks.
5. **Role-Based Authorization**: Every proposal status change, hire, and review requires verified ownership.
6. **Strong Password Policy**: 5-point password strength checklist enforced at sign-up.
