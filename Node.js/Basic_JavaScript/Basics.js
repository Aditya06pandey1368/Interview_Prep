//1. Variables: let, const, var
//Keyword	Reassign?	Scope
// let	Yes	Block
// const	No	Block
// var	Yes	Function

let ageA = 22;
ageA = 23;

const nameA = "Aditya";
// name = "Rahul"; // Error


// Interview point: Prefer const by default. Use let when reassignment is required. Avoid var in modern JavaScript.

// Remember: const prevents reassignment, not modification of an object's properties.
// 2. Functions
// Two common ways to define functions:
// Regular function
function add(a, b) {
    return a + b;
}

// Arrow function
const addNumbers = (a, b) => {
    return a + b;
};

// A function allows you to reuse logic instead of writing the same code repeatedly.


// 3. Arrays
// Arrays store multiple values in an ordered collection.
const numbers = [10, 20, 30];

numbers.push(40);
numbers.pop();

console.log(numbers[0]);
console.log(numbers.length);


// Important methods:
// Method	Purpose
// push()	Add element at end
// pop()	Remove last element
// map()	Transform elements
// filter()	Select matching elements
// find()	Find first matching element
// forEach()	Execute function for each element
// reduce()	Accumulate into one result

// 4. Objects
// Objects store data as key-value pairs.
const user = {
    name: "Aditya",
    age: 22,
    role: "Developer"
};

console.log(user.name);
console.log(user["age"]);

user.age = 23;
user.city = "Noida";

// Objects are important in backend development because API requests and database records commonly use object-shaped data.


// 5. Destructuring
// Extract values directly from arrays or objects.
const user = {
    name: "Aditya",
    age: 22
};

const { name, age } = user;


//This is commonly used when handling request data, configuration and function arguments.


// 6. Spread operator
// The ... operator can expand arrays and objects.
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4];

const user1 = { name: "Aditya" };
const user2 = { ...user1, age: 22 };


// It helps create copies and combine data without directly modifying the original object or array. Note that these are shallow copies.


// 7. Modules in Node.js
// Modules allow you to divide code into multiple files.

// CommonJS syntax:
// math.js
function add(a, b) {
    return a + b;
}

module.exports = add;


// app.js
const add = require("./math");

console.log(add(5, 10));

// Node.js also supports ES Modules using import and export.


// 8. Synchronous vs asynchronous code
// - Synchronous code executes one operation at a time, waiting for it to finish.
// - Asynchronous code allows other work to continue while an operation is pending.
// Backend applications frequently use asynchronous operations for database calls and API requests.


// 9. Promises and async/await
// A Promise represents a future result of an asynchronous operation.
async function getData() {
    const result = await someAsyncOperation();
    return result;
}

// await waits for the Promise to settle inside an async function, without blocking the entire Node.js event loop.


// 10. Error handling
// Use try/catch to handle errors.
try {
    // Risky operation
} catch (error) {
    console.log(error.message);
}

