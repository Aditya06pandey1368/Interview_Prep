//Create an Express application

const express = require("express");

const app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


//Routing
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Important    HTTP methods
// Method	    Purpose
// GET	        Retrieve data
// POST	        Create data
// PUT	        Replace existing data
// PATCH	    Partially update data
// DELETE	    Delete data


// Request parameters (req.params)
// Used to get values from the URL path.
app.get("/users/:id", (req, res) => {
    console.log(req.params.id);
    res.send("User details");
});


// Query parameters (req.query)
// Used to send optional filtering or search information through the URL.
app.get("/search", (req, res) => {
    console.log(req.query.name);
    res.send("Search completed");
});


// Request body (req.body)
// Used to receive data from the client, especially in POST and PUT requests.
// First, add this middleware:
app.use(express.json());

// Then:
app.post("/users", (req, res) => {
    console.log(req.body);
    res.send("User created");
});


// Important status codes:
// Status	Meaning
// 200	    OK
// 201	    Created
// 400	    Bad Request
// 401	    Unauthorized
// 403	    Forbidden
// 404	    Not Found
// 500	    Internal Server Error



// How a basic Express request works
// Client sends HTTP request  ->
// Express matches the route  -> 
// Route handler processes request  ->
// Server sends HTTP response