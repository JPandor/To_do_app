


class Task {
    constructor (title, description, due_date, due_time, completed, id){
        this.title = title;
        this.description = description;
        this.due_date = due_date;
        this.due_time = due_time;
        this.completed = completed;
        this.id = id;
    };

};

let todoList = [];

function createTodo (){
    // getting input fields
    let taskName = document.getElementById("task").value;
    let taskDescription = document.getElementById("description").value;
    let taskEndDate = document.getElementById("due_date").value;
    let taskEndTime = document.getElementById("due_time").value;

    // instantiating new object 
    let newTask = new Task (taskName, taskDescription, taskEndDate, taskEndTime, false, Date.now());
    todoList.push(newTask);

    addToLocalStorage(todoList);
    console.log(todoList)
    
};


function writeToDisplay(){

    // creating a container div for each task 
    let newDiv = document.createElement("div");

    //creating a new list item and setting it to the task title
    let newList = document.createElement("li");
    let listInside = document.createTextNode();
    newList.appendChild(listInside);

    // creating the check button 
    let checkBtn = document.createElement("button");
    checkBtn.innerHTML = "Complete"

    //creating the delete button 
    let delBtn = document.createElement("button");
    delBtn.innerHTML = "Delete";

    //creating hidden div with details of task 
    let hideDiv = document.createElement("div");
    hideDiv.innerHTML = `Description ${taskDescription} <br> Due Date ${taskEndDate} <br> Due Time ${taskEndTime}`;


    // appending all new elements 
    document.getElementById("taskList").appendChild(newDiv)
    newDiv.appendChild(newList);
    newDiv.appendChild(checkBtn);
    newDiv.appendChild(delBtn);
    newDiv.appendChild(hideDiv);


}

function addToLocalStorage(){
    let jd = JSON.stringify(todoList);
    localStorage.setItem("tasks", jd);
}




