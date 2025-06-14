# Security Policy for Hirly

## 1. Overview
Hirly is an AI-based hiring platform with a strong focus on security. We implement multiple layers of protection to safeguard user data, prevent abuse, and ensure the integrity of our platform. This document outlines the current security practices and features in place.

## 2. Rate Limiting
We use the [`express-rate-limit`](https://www.npmjs.com/package/express-rate-limit) middleware to protect our API endpoints from abuse and denial-of-service (DoS) attacks. The current policy allows a maximum of **5 requests per minute per IP** on sensitive endpoints (e.g., `/api/analyze`). If the limit is exceeded, the server responds with HTTP 429 and a clear error message. This helps prevent flooding and brute-force attempts.

## 3. Input Validation
All incoming JSON request bodies are validated using [Zod](https://zod.dev/). Each route defines a strict schema for expected input. Requests that do not conform to the schema are rejected with a 400 error and a descriptive message. This prevents malformed or malicious data from entering the system and helps mitigate injection attacks.

## 4. Audit Logging
Key actions and API requests are logged to `logs/ai_logs.json`. Each log entry includes:
- The route accessed
- The input data (resume, job, etc.)
- The result returned by the AI
- A timestamp

This audit trail supports monitoring, debugging, and incident response.

## 5. Common Attack Protection
- **NoSQL Injection:** Prevented by strict input validation with Zod, ensuring only expected data types and formats are processed.
- **Flooding/DoS:** Mitigated by express-rate-limit, which restricts request rates per IP.
- **Bad Input:** All routes use Zod schemas to reject invalid or unexpected input, reducing the risk of application errors and exploits.

## 6. Testing Security Features
- **Rate Limiting:** Use Postman or curl to send more than 5 requests per minute to `/api/analyze`. The 6th request should receive a 429 error with a JSON message.
- **Input Validation:** Send requests with missing or malformed fields to any API endpoint. The server should respond with a 400 error and a clear validation message.

## 7. Future Improvements
- Implement authentication and authorization for all sensitive endpoints
- Add HTTPS enforcement and secure cookie handling
- Integrate automated security scanning and dependency monitoring
- Enhance logging with user/session identifiers (while respecting privacy) 