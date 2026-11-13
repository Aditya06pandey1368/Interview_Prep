// TO create a schema we use mongoose.schema()
// To create a model mongoose.model();
// // // // to connect mongoDb mongoose.connect();


// // // //A. CREATE — Insert a document
// // // // const user = await User.create({
// // // //     name: "Aditya",
// // // //     email: "aditya@gmail.com",
// // // //     password: "hashed_password"
// // // // });

// // // //User.create() inserts a new document into MongoDB and returns the created document.

// // // //Another way is:
// // // const user = new User({ name, email, password });
// // // await user.save();


// // // READ — Fetch documents
// // // There are three commonly used methods:
// // // Method	Purpose	Returns
// // // User.find()	Find all matching users	Array
// // // User.findOne({email})	Find one user by email	Document or null
// // // User.findById(id)	Find user by MongoDB ID	Document or null
// // // const users = await User.find();

// // // const user = await User.findOne({
// // //     email: "aditya@gmail.com"
// // // });

// // // const user = await User.findById(id);


// // UPDATE — Modify a document
// // const updatedUser = await User.findByIdAndUpdate(
// //     id,
// //     { name: "Aditya Pandey" },
// //     {
// //         returnDocument: "after",
// //         runValidators: true
// //     }
// // );


// DELETE — Remove a document
// const deletedUser = await User.findByIdAndDelete(id);


//always remove the password from the found user even though that is a hashed password.
//User.find().select('-password')