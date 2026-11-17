import express from 'express';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import User from './user.js';
import mongoose from 'mongoose'
import jwt from "jsonwebtoken"

const app = express();
app.use(express.json());

async function connectDb(){
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully");
}

startServer();

function authMiddleware(req,res,next){
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            message : "Token not found"
        })
    }
    const parts = token.trim().split(/\s+/);
    if(parts.length!=2 || parts[0].toLowerCase()!="bearer"){
        return res.status(401).json({
            message : "Token is not in correct format"
        })
    }
    try {
        const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message : "Invalid or expired token"
        })
    }
}

function authorizedRoute(req,res,next){
    try {
        const role = req.user.role;
        if(role!="admin"){
            return res.status(403).json({
                message : "Not accessible"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

app.post('/login', async (req,res)=>{
    try {
        const {email, password} = req.body;
        if(typeof(password)!=="string" || typeof(email)!=="string"){
            return res.status(400).json({
                message : "Input type is not valid"
            })
        }
        const actualEmail = email.trim().toLowerCase();
        if(!actualEmail || password.trim().length<6){
            return res.status(400).json({
                message : "Not valid input"
            })
        }
        const found = await User.findOne({email : actualEmail});
        if(!found){
            return res.status(400).json({
                message : "User not found"
            })
        }
        const isValid = await bcrypt.compare(password, found.password);
        if(!isValid){
            return res.status(400).json({
                message : "Email or password is incorrect"
            })
        }
        const token = jwt.sign(
            {
                userId: found._id.toString(),
                role : found.role
            },
            process.env.JWT_SECRET,
            {expiresIn : "1h"}
        )
        return res.status(200).json({
            message : "Login successfully",
            token
        })
    } catch (error) {
        console.log("error = " + error);
        return res.status(500).json({
            message : "Internal server error"
        })
    }
})

app.post('/signup', async (req,res)=>{
    try {
        const {name, email, password} = req.body;
        if(typeof name!=="string" || typeof password !=="string" || typeof email !=="string"){
            return res.status(400).json({
                message : "Input type is not valid"
            })
        }
        const actualName = name.trim();
        const actualEmail = email.trim().toLowerCase();
        if (!validator.isEmail(actualEmail)) {
            return res.status(400).json({
                message: "Please enter a valid email address"
            });
        }
        if(!actualEmail || password.trim().length<6 || actualName.length<3){
            return res.status(400).json({
                message : "Not valid input"
            })
        }
        const found = await User.findOne({email : actualEmail});
        if(found){
            return res.status(400).json({
                message : "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name : actualName, email:actualEmail, password:hashedPassword});
        await user.save();
        return res.status(201).json({
            message : "User is created"
        })
    } catch (error) {
        res.send(error);
    }
})

app.get('/admin/users', authMiddleware, authorizedRoute, async (req,res)=>{
    try {
        const users = await User.find().select('-password');
        return res.status(200).json({
            users
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal server error"
        })
    }
})


async function startServer(){
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing from .env");
        }
        await connectDb();
        app.listen(3000, ()=>{
            console.log("Server started");
        })
    } catch (error) {
        console.log(error);
    }
}
