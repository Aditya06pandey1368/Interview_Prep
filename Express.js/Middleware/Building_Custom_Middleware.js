// Requirements:
// 1. Create a basic Express server on port 3000.
// 2. Add JSON parsing middleware.
// 3. Create custom logging middleware that prints the HTTP method and URL.
// 4. Create authentication middleware that checks for an authorization header.
// 5. Create a protected route GET /admin that only allows requests with an authorization header.
// 6. Create POST /users and add validation middleware that checks whether name and age are provided and valid.
// 7. Add centralized error-handling middleware.
// 8. Add a 404 handler for unknown routes.

const users = [];
import express from 'express';

const app = express();

app.use(express.json());

function logger(req, res, next){
    console.log(req.method, req.url);
    next();
}
app.use(logger) //We called this becuase its a application level middleware

function errorHandler(err, req, res, next){
    console.log(err);
    return res.status(500).json({
        message : "Interval server error"
    })
}


function authMiddleware(req,res,next){
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            "message" : "Authorization Header Missing"
        })
    }
    next();
}

function validateUser(req, res, next){
    const {name, age} = req.body ?? {};
    if(
        typeof name !== "string" || !name.trim() || !Number.isInteger(age) || age<0
    ){
        return res.status(400).json({
            message : "Invalid user credentials"
        });
    }
    next();
}

app.get('/', (req,res)=>{
    res.send("Welcome");
})

app.get('/about', (req,res)=>{
    res.send("I am Aditya Pandey")
})

app.get('/users', (req,res)=>{
    res.send(users);
})

app.get('/admin', authMiddleware, (req,res)=>{
    res.send("Welcome to Admin Dashboard");
})

app.post('/users', validateUser, (req,res)=>{
    const {name, age} = req.body;
    const user = {name, age};
    users.push(user);
    return res.status(201).json({
        message : "User is created"
    })
})

app.use((req,res)=>{
    return res.status(404).json({
        message : "Route not found"
    })
})

app.use(errorHandler);

app.listen(3000, ()=>{
    console.log("Server is listening at 3000")
});