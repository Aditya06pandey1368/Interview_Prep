// // 1. Authentication vs Authorization
// // - Authentication: Verifies who the user is.
// // - Authorization: Checks what the user is allowed to access.
// // Example: Login verifies your identity. Checking whether you can access the admin dashboard is authorization.


// // 2. What is JWT?
// // JWT stands for JSON Web Token.
// // It is a compact, digitally signed token used to transmit claims between parties.

// // It is commonly used for stateless authentication.\



// //JWT code for token creation
// const token = jwt.sign(
//         {
//             name : found.name,
//             email : found.email
//         },
//         process.env.JWT_SECRET,
//         {expiresIn : "1h"}
//     )

// //JWT code for verifying 
// const authHeader = req.headers.authorization;
//     if (!authHeader) {
//         return res.status(401).json({
//             message: "Authorization header missing"
//         });
//     }
//     const parts = authHeader.trim().split(/\s+/);
//     if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
//         return res.status(401).json({
//             message: "Invalid token format"
//         });
//     }
//     try {
//         const decoded = jwt.verify(
//             parts[1],
//             process.env.JWT_SECRET
//         );

//         req.user = decoded;

//         return next();
// }


// //Bcrypt code

// //Password creation
// // const hashedPassword = await bcrypt.hash(password,10);

// //Password Matching
// //const isValid = await bcrypt.compare(
// //     password,
// //     found.password
// // );


// // 3. Structure of JWT
// // A JWT has three parts separated by dots:
// // header.payload.signature

// // Part	Purpose
// // Header	Contains token type and signing algorithm
// // Payload	Contains user claims
// // Signature	Helps verify token integrity and authenticity

// // Important: JWT payload is encoded, not encrypted by default. Never store passwords or secrets in it.