// 1. Forgetting return inside arrow functions
// Your mistake:
users.find(user => {
    user.id === id;
});

Correct:
users.find(user => {
    return user.id === id;
});

// Remember: When using {} in an arrow function, explicitly write return.


// 2. Confusing find() and findIndex()
// You initially tried to use find() to get an array index.
// Returns user object
users.find(user => user.id === id);

// Returns user index
users.findIndex(user => user.id === id);

//Remember: find() returns an object; findIndex() returns an index or -1.


// 3. Incorrect use of splice()
// Your mistake:
users.splice(idx);

Correct:
users.splice(idx, 1);

// Remember:
// - splice(idx) removes everything from that index onwards.
// - splice(idx, 1) removes exactly one element.


// 4. Sending multiple responses to one request
// Your mistake:
res.send(users);
res.status(200).json({ message: "Success" });

Correct:
return res.status(200).json(users);

// Remember: One request should receive one response.


// 5. Confusing console.log() with HTTP responses
// Your mistake:
console.log("Welcome");

//Correct:
res.send("Welcome");

// Remember:
// Method	Purpose
console.log()	//Prints in terminal
res.send()	//Sends response to client
res.json()	//Sends JSON response to client


// 6. Incorrect validation and ID handling
// You made mistakes such as:
// - Comparing string IDs with numeric IDs.
// - Checking only whether a field is truthy.
// - Not validating the name's data type.
// - Not checking whether age is an integer.
// Important examples:
String(id);

age !== undefined

Number.isInteger(age)

//Remember: Validate incoming data before modifying your data.


// 7. Confusing PUT and PATCH
// You initially made name and age compulsory in PATCH.

// Correct distinction:
// PUT	PATCH
// Complete update	Partial update
// All required fields	Only supplied fields
// Replace existing object	Modify selected properties

// For PATCH:
if (name !== undefined) user.name = name;
if (age !== undefined) user.age = age;