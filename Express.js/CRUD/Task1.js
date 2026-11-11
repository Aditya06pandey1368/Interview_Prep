// Create a server with these five routes:
// Method	Endpoint	Expected functionality
// GET	/	Return welcome message
// GET	/about	Return your information as JSON
// GET	/users/:id	Return user ID from URL
// GET	/search?name=Aditya	Return the name from query parameters
// POST	/users	Receive name and age from request body and return them

import express from 'express';

const app = express();
app.use(express.json());

const about = "Hello I am Aditya Pandey."

app.get('/' , (req,res) =>{
    res.send("Welcome");
})

app.get('/about', (req,res) =>{
    res.send(about);
})

app.get('/user/:id' , (req, res)=>{
    res.send(req.params.id);
})

app.get('/search', (req,res)=>{
    res.send(req.query.name);
})

app.post('/users', (req,res) =>{
    const {name, age} = req.body;
    res.status(201).json({ name, age });
})

app.listen(3000, ()=>{
    console.log("server sunning on port 3000");
})