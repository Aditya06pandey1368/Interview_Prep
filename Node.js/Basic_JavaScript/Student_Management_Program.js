// Requirements:
// 1. Store at least 5 students. Each student must have a name, age and marks.
// 2. Create a function that returns all students who scored at least 60 marks.
// 3. Create a function that calculates the average marks of all students.
// 4. Create a function that finds a student by name.
// 5. Print the filtered students, average marks and search result.

const students = [
    {
        "name" : "Aditya",
        "age" : 21,
        "marks" : 80
    },
    {
        "name" : "Yash",
        "age" : 22,
        "marks" : 50
    },
    {
        "name" : "Nishkarsh",
        "age" : 21,
        "marks" : 86
    },
    {
        "name" : "Himanshu",
        "age" : 21,
        "marks" : 86
    },
    {
        "name" : "Sunny",   
        "age" : 21,
        "marks" : 86
    },
]

function marksAtLeast60(students){
    if(students.length===0) return null;
    return students.filter(student=>student.marks>=60);
}
const result = marksAtLeast60(students);
console.log(result);

function avg(students){
    let sum = 0;
    for(let i=0 ; i<students.length ; i++){
        sum += students[i].marks;
    }
    return sum/students.length;
}
const avgResult = avg(students);
console.log(avgResult);

function studentByName(students, name) {
    return students.find(student => {
        return student.name === name;
    });
}
const nameResult = studentByName(students, "Ysh");
console.log(nameResult);