import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
 
const app = express();

app.use(express.json());

const users = [];

function validateUser(req, res, next){
    //Missing Fields
    const {name, email,password} = req.body ?? {};
    if(!name || !email || !password || typeof name !== "string" || typeof email !== "string" || typeof password !== "string"){
        return res.status(400).json({
            messsage : "All fields are necessary"
        })
    }
    if(!name.trim() || !email.trim() || !password.trim() || name.length<3 || password.length<6){
        return res.status(400).json({
            message : "Invalid credentials"
        })
    }
    const found = users.find(user=>{
        return user.email===email
    })
    if(found){
        return res.status(409).json({
            message : "User already exist"
        })
    }
    next();
}

function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization header missing"
        });
    }
    const parts = authHeader.trim().split(/\s+/);
    if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
        return res.status(401).json({
            message: "Invalid token format"
        });
    }
    try {
        const decoded = jwt.verify(
            parts[1],
            process.env.JWT_SECRET
        );

        req.user = decoded;

        return next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

app.post('/signup', validateUser , async (req,res)=>{
    const {name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const user = {name, email, password : hashedPassword};
    users.push(user);
    return res.status(201).json({
        message : "User is created."
    })
})

app.post('/login', async(req,res)=>{
    const {email,password} = req.body ?? {};
    if(!email || !password || typeof email !== "string" || typeof password !== "string"){
        return res.status(400).json({
            messsage : "All fields are necessary"
        })
    }
    if(!email.trim() || !password.trim() || password.length<6){
        return res.status(400).json({
            message : "Invalid credentials"
        })
    }
    const found = users.find(user=>{
        return user.email===email
    })
    if(!found){
        return res.status(400).json({
            message : "User not exist"
        })
    }
    
    const isValid = await bcrypt.compare(password, found.password);
    if (!isValid) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }
    const token = jwt.sign(
        {
            name : found.name,
            email : found.email
        },
        process.env.JWT_SECRET,
        {expiresIn : "1h"}
    )
    return res.status(200).json({
        message: "Login successful",
        token
    });
})

app.get('/profile', authMiddleware, (req,res)=>{
    return res.status(200).json({
        name: req.user.name,
        email: req.user.email
    });
})

app.use((req,res)=>{
    return res.status(404).json({
        message : "Route not present"
    })
})

function errorHandler(err, req, res, next){
    console.log(err);
    return res.status(500).json({
        message : "Internal server error."
    })
}
app.use(errorHandler);

app.listen(3000, ()=>{
    console.log("Server is running at 3000")
})