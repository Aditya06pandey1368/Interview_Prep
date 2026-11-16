import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import User from './model/user.js'
import jwt from 'jsonwebtoken'
import validator from 'validator'

const app = express();

app.use(express.json());

async function connectMongoDb() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
}

function authMiddleware(req, res, next){
    const header = req.headers.authorization;
    if(!header){
        return res.status(401).json({
            message : "Header not found"
        })
    }
    const parts = header.trim().split(/\s+/);
    if(parts.length!==2 || parts[0].toLowerCase()!=="bearer"){
        return res.status(401).json({
            message : "Invalid Token format"
        })
    }
    try {
        const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

app.post('/users' ,authMiddleware, async(req,res)=>{
    const {name, email, password} = req.body;
    const found = await User.findOne({email});
    if(found){
        return res.status(409).json({
            message : "Email already exists"
        })
    }
    if(password.length<6){
        return res.status(400).json({
            message : "Invalid input format"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({name, email, password:hashedPassword});
    await user.save();
    return res.status(201).json({
        message : "User is created"
    })
})

app.get('/users', authMiddleware, async (req,res)=>{
    try {
        const user = await User.find().select('-password');
        if(!user){
            return res.status(400).json({
                message : "User not found"
            })
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(err);
    }
})

app.get('/profile',authMiddleware, async (req,res)=>{
    try {
        const user = await User.findById(req.user.userId).select('-password');

        if(!user){
            return res.status(404).json({
                message : "User not found"
            })
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
})

app.patch('/users/:id' ,authMiddleware, async (req,res)=>{
    try {
        const _id = req.params.id;
        const {name, email} = req.body;
        const updatedData = {};
        if(name){
            updatedData.name = name;
        }
        if(email){
            updatedData.email = email;
        }
        
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            updatedData
            ,
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        return res.status(200).json({
            message : "Info is updated",
            updatedUser
        });
    } catch (error) {
        res.status(400).json({
            message : error.message
        });
    } 
})

app.delete('/users/:id',authMiddleware, async(req,res)=>{
    try {
        const _id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(_id);
        if(!deletedUser){
            return res.status(400).json({
                message : "UserId not found"
            })
        }
        return res.status(200).json({
            message : "User is deleted"
        })
    } catch (error) {
        res.status(400).json({
            message : error.message
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
                userId: found._id.toString()
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

app.use((req,res)=>{
    return res.status(404).json({
        message : "Not a valid route"
    })
})

async function startServer() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing from .env");
        }

        await connectMongoDb();

        app.listen(3000, () => {
            console.log("Server is running at 3000");
        });

    } catch (error) {
        console.log("Database connection failed:", error.message);
        process.exit(1);
    }
}

startServer();