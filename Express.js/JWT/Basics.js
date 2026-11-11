// 1. Authentication vs Authorization
// - Authentication: Verifies who the user is.
// - Authorization: Checks what the user is allowed to access.
// Example: Login verifies your identity. Checking whether you can access the admin dashboard is authorization.


// 2. What is JWT?
// JWT stands for JSON Web Token.
// It is a compact, digitally signed token used to transmit claims between parties.

// It is commonly used for stateless authentication.


// 3. Structure of JWT
// A JWT has three parts separated by dots:
// header.payload.signature

// Part	Purpose
// Header	Contains token type and signing algorithm
// Payload	Contains user claims
// Signature	Helps verify token integrity and authenticity

// Important: JWT payload is encoded, not encrypted by default. Never store passwords or secrets in it.