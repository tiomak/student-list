"use strict";
console.log("Exercise FRONTENDERS 18 is working");

window.addEventListener("DOMContentLoaded", init);


const students = []; //Variable that students are pushed into when they are split into first and last name
let currentStudents = [];
let studentsJson;

//create Student TEMPLATE with firstname, lastname, toString, splitName
const StudentTemplate = {
    firstName: "",
    lastName: "",
    toString() {
        return this.firstName + " " + this.lastName;
    },
    splitName(fullName) { // split names into first and last name
        const firstSpace = fullName.indexOf(" ");
        this.firstName = fullName.substring(0, firstSpace);
        this.lastName = fullName.substring(firstSpace + 1);
    }
}

// Function init
function init() {
    // clear the students array - just in case
    students.splice(0, students.length); // from https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
    getJson();
}

//async FUNCTION get json
async function getJson() {
    let jsonData = await fetch("frontenders2018.json");
    studentsJson = await jsonData.json();
    createStudents();
    currentStudents = students;
    displayList(currentStudents);
}

//FUNCTION that creates students from json to template
function createStudents() {
    studentsJson.forEach(createASingleStudent);
}

function createASingleStudent(name) {
    const newStudent = Object.create(StudentTemplate);
    newStudent.splitName(name);

    //assign this student a unique id
    newStudent.id = generateUUID();
    students.push(newStudent);
}

//from: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/8809472#8809472
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function deleteStudent(studentId) {
    // find the index of the student with studentId

    const index = students.findIndex(findStudent);
    console.log("found index: " + index);

    students.splice(index, 1);

    // function that returns true when student.id == studentId
    function findStudent(student) {
        if (student.id === studentId) {
            return true;
        } else {
            return false;
        }
    }
}

function sortByFirstName() {
    currentStudents.sort(byFirstName);

    function byFirstName(a, b) {
        if (a.firstName < b.firstName) {
            return -1;
        } else if (a.firstName > b.firstName) {
            return 1;
        } else {
            return 0;
        }
    }
}

function sortByLastName() {
    currentStudents.sort(byLastName);

    function byLastName(a, b) {
        if (a.lastName < b.lastName) {
            return -1;
        } else {
            return 1;
        }
    }
}


// function listOfStudents() {
//     let str = "";

//     allStudents.forEach(student => str += student + "\n");

//     return str;
// }