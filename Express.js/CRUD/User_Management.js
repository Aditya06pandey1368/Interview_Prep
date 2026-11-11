// Requirements:
// 1. Create an array containing at least three users. Each user must have an ID, name and age.
// 2. Create GET /users to return all users.
// 3. Create GET /users/:id to return one particular user.
// 4. Create POST /users to add a new user.
// 5. Create PUT /users/:id to update the complete user.
// 6. Create PATCH /users/:id to update only the provided fields.
// 7. Create DELETE /users/:id to delete a user.
// 8. Handle missing users with status 404.
// 9. Validate incoming data and return status 400 for invalid inputs.
// 10. Return appropriate HTTP status codes for successful operations.


const users = [
    {
        "id" : "101",
        "name" : "Aditya",
        "age" : 22
    },
    {
        "id" : "102",
        "name" : "Nishu",
        "age" : 21
    },
    {
        "id" : "103",
        "name" : "Yash",
        "age" : 22
    },
    {
        "id" : "104",
        "name" : "Kishan",
        "age" : 22
    }
]

import express from 'express';

const app = express();
app.use(express.json());

app.get('/users', (req,res)=>{
    res.send(users);
})

app.get('/users/:id', (req,res)=>{
    const id = req.params.id;
    let found = users.find(user=>{
        return user.id===id
    });
    if(!found) return res.status(404).json({
        "message" : "User not present"
    })
    return res.status(200).json(found);
})

app.post('/users', (req,res) => {
    const {id, name, age} = req.body;
    let found = users.find(user=>{
        return user.id===id
    });
    if(found) return res.status(409).json({
        "message" : "User already present"
    })
    if(id===undefined || name===undefined || age===undefined || age<0){
        return res.status(400).json({
            "message" : "Give correct Details"
        })
    };
    const newUser = {
        id: String(id),
        name: name.trim(),
        age
    };
    users.push(newUser);
    return res.status(201).json({
        "message" : "User is created."
    })
})

app.put('/users/:id' , (req,res) =>{
    const id = req.params.id;
    let found = users.find(user=>{
        return user.id===id
    });
    if(!found) return res.status(404).json({
        "message" : "User not present"
    })
    const {name, age} = req.body;
    if(id===undefined || name===undefined || age===undefined || age<0){
        return res.status(400).json({
            "message" : "Give correct Details"
        })
    };
    const idx = users.findIndex(user => user.id === id);
    users.splice(idx,1);
    const user = {id, name, age};
    users[idx] = user;
    return res.status(200).json({
        "message" : "Details are updated."
    })
})

app.patch('/users/:id', (req,res)=>{
    const id = req.params.id;
    let found = users.find(user=>{
        return user.id===id
    });
    if(!found) return res.status(404).json({
        "message" : "User not present"
    })
    const {name,age} = req.body;
    if(id===undefined || name===undefined || age===undefined || age<0){
        return res.status(400).json({
            "message" : "Give correct Details"
        })
    };

    users.find(user=>{
        if(user.id===id){
            if(name) user.name = name;
            if(age) user.age = age;
            return res.status(200).json({
                "message" : "User details updated."
            })
        }
    })
})

app.delete('/users/:id', (req,res)=>{
    const id = req.params.id;
    let found = users.find(user=>{
        return user.id===id
    });
    if(!found) return res.status(404).json({
        "message" : "User not present"
    })
    const idx = users.findIndex(user => user.id === id);

    if (idx === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    users.splice(idx,1);
    return res.status(200).json({
        "message" : "User is deleted"
    })
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});