// Middleware
// Middleware is a function that runs between receiving a request and sending a response.
//Basic middleware syntax
function myMiddleware(req, res, next) {
    console.log("Middleware executed");
    next();
}

//How to register middleware
app.use(myMiddleware);


// Built-in middleware
// Express provides some built-in middleware.
app.use(express.json());


// This parses incoming JSON request bodies.

// Other examples:
// - express.urlencoded() – Parses URL-encoded form data.
// - express.static() – Serves static files such as images and CSS.


// Custom logging middleware
// We can create our own middleware to log incoming requests.
function logger(req, res, next) {
    console.log(req.method, req.url);
    next();
}

app.use(logger);


// Middleware execution order
// Express executes middleware in the order in which you register it.
// For example:
app.use(express.json());
app.use(logger);
app.use(authMiddleware);