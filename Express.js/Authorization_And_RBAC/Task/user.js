import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    name : {
        required : true,
        type : String,
        enum : ["user", "admin"],
        default : "user"
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const User = mongoose.model('User', UserSchema);

export default User;