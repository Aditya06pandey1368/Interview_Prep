import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import User from './model/user.js'

const app = express();

app.use(express.json());

async function connectMongoDb() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
}

app.post('/users' , async(req,res)=>{
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

app.get('/users', async (req,res)=>{
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

app.get('/users/:id', async (req,res)=>{
    try {
        const _id = req.params.id;
        const user = await User.findById(_id);
        if(!user){
            return res.status(400).json({
                message : "User not found"
            })
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
})

app.patch('/users/:id' , async (req,res)=>{
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

app.delete('/users/:id', async(req,res)=>{
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