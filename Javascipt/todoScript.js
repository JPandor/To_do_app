// Getting input fields
let taskName = document.getElementById("task").value;
let taskDescription = document.getElementById("description").value;
let taskEndDate = document.getElementById("due_date").value;
let taskEndTime = document.getElementById("due_time").value;

class Task {
    constructor (title, description, due_date, due_time, completed){
        this.title = title;
        this.description = description;
        this.due_date = due_date;
        this.due_time = due_time;
        this.completed = completed;
    };

    defaultCompleted(){
        this._completed = false;
    };
};




function addingToList(){
    let newTask = new Task (taskName, taskDescription, taskEndDate, taskEndTime, false);
    return newTask;
}

let string = addingToList();
string = JSON.stringify(string);
console.log(string)

function writeToDisplay () {
    let section = document.createElement("section");
    section.innerHTML = string;
    document.getElementById("taskList").appendChild(section);
}

// function writeToHtml () {
//     let section = document.createElement("section");
//     section.innerHTML = newTask.title;
//     // section.setAttribute("id", "bigDiv")
//     
//     // let collapse = document.createElement("div");
//     // document.getElementById("bigDiv").appendChild(collapse);
//     // collapse.setAttribute("class", "collapse");
//     // collapse.setAttribute("id", "bigshot")
//     // let card = document.createElement("div");
//     // card.setAttribute("class", "card");
//     // document.getElementById("bigshot").appendChild(card);
//     // card.innerHTML = `${newTask._description} <br> ${newTask._due_date} <br> ${newTask._due_time}`;
// }
