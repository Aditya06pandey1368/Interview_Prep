// 1. Node.js: JavaScript runtime that allows us to run JavaScript outside the browser. It uses Google's V8 engine.

// 2. Single-threaded: JavaScript runs on the main thread, while Node.js handles asynchronous I/O using the event loop and underlying system facilities.

// 3. Non-blocking I/O: Allows Node.js to handle other work while waiting for operations like file reading or API calls.

// 4. Modules: Divide code into reusable files.

// 5. CommonJS:
//    module.exports = { add, sub };
//    const { add, sub } = require("./functions");

// 6. ES Modules:
//    export function add(a, b) {}
//    import { add } from "./functions.js";

// 7. NPM: Package manager used to install external libraries.
//    npm init -y
//    npm install express

// 8. Important built-in modules:
//    - fs – File operations
//    - path – File paths
//    - http – HTTP server
//    - os – Operating system information

// 9. Environment variables:
//    process.env.PORT
//    Used for configuration and secrets.

// 10. Asynchronous programming: Promises and async/await help handle operations that take time.

// 11. Error handling:
// try {
//     // Code
// } catch (error) {
//     console.log(error.message);
// }

// 12. Run JavaScript using Node.js:
// node app.js