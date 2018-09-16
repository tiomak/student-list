"use strict";
console.log("frontend is running");
console.table(students);

window.addEventListener("DOMContentLoaded", initFrontEnd);

function initFrontEnd() {

    //register buttons for sort
    document.querySelector("button#sort_first").addEventListener("click", clickedSortFirstname);
    document.querySelector("button#sort_last").addEventListener("click", clickedSortLastname);

    //REGISTER TABLECLICKS
    document.querySelector("table#studentlist").addEventListener("click", clikedTable);
}

function clikedTable() {
    console.log("clicked table");
    console.log(event.target);

    const clicked = event.target;

    //WHEN WE HAVE MORE BUTTONS, CHECK WHICH KIND WAS CLICKED
    if (clicked.textContent === "Delete") {
        clickedDelete(clicked);
    } else if (clicked.textContent === "Info") {
        showDetails(clicked);
    }
}

// FUNCTION that shows information that is hidden
function showDetails(detailsButton) {
    let studentDetails = detailsButton.parentElement.parentElement.lastElementChild;

    if (studentDetails.style.display === "block") {
        studentDetails.style.display = "none";
    } else {
        studentDetails.style.display = "block";
    }
}

function clickedDelete(deleteButton) {
    console.log(deleteButton);
    // find the parent <tr> that has this deleteButton inside it
    let tr = deleteButton.parentElement;
    while (tr.tagName !== "TR") {
        tr = tr.parentElement;
    }

    // find the studentId
    const studentId = tr.dataset.studentId;
    console.log(studentId);

    deleteStudent(studentId);

    // animate the <tr> out
    animateDelete(tr);
}

function animateDelete(tr) {
    tr.style.transform = "translateX(-205%)";
    tr.style.transition = "transform 1s";

    // tr.classList.add("fly-out");
    const rect = tr.getBoundingClientRect();

    tr.addEventListener("transitionend", function () {

        // find the nextSibling (the tr below this)
        let nextSibling = tr.nextElementSibling;

        if (nextSibling !== null) {
            nextSibling.addEventListener("transitionend", function () {
                console.log("transition end");

                // reset all the translateY!
                let nextTr = tr.nextElementSibling;
                while (nextTr !== null) {
                    nextTr.style.transform = "translateY(0)";
                    nextTr.style.transition = "transform 0s";
                    nextTr = nextTr.nextElementSibling;
                }
                // remove that <tr>
                tr.remove();
            });

            while (nextSibling !== null) {
                nextSibling.style.transform = "translateY(-" + rect.height + "px)";
                nextSibling.style.transition = "transform 0.5s";
                nextSibling = nextSibling.nextElementSibling;
            }
        } else {
            // no next sibling - just remove!
            tr.remove();
        }
    });
}

function clickedSortFirstname() {
    console.log("clickedSortFirstname")
    sortByFirstName();
    displayList(currentStudents);
}

function clickedSortLastname() {
    console.log("clickedSortLastname")
    sortByLastName();
    displayList(currentStudents);
}

function displayList(listOfStudents) {
    //console.log("display list ?")

    // clear the table
    document.querySelector("table#studentlist tbody").innerHTML = "";

    //forEach students in listOfStudents
    listOfStudents.forEach(function (student) {
        //clone a table-row for student
        const clone = document.querySelector("#student_template").content.cloneNode(true);

        //fill in the clone with data
        clone.querySelector("[data-firstname]").textContent = student.firstName;
        clone.querySelector("[data-lastname]").textContent = student.lastName;

        //add the studentId to the <tr>
        clone.querySelector("tr").dataset.studentId = student.id;

        //append clone to table
        document.querySelector("table#studentlist tbody").appendChild(clone);
    })
}