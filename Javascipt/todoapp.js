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



function writeToDisplay(){
    // getting input fields
    let taskName = document.getElementById("task").value;
    let taskDescription = document.getElementById("description").value;
    let taskEndDate = document.getElementById("due_date").value;
    let taskEndTime = document.getElementById("due_time").value;

    //Instantiate a new class
    let newTask = new Task (taskName, taskDescription, taskEndDate, taskEndTime, false, Date.now());

    // creating a container div for each task 
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", newTask.id);

    //creating a new list item and setting it to the task title
    let newList = document.createElement("li");
    let listInside = document.createTextNode(newTask.title);
    newList.appendChild(listInside);

    // creating the check button 
    let checkBtn = document.createElement("button");
    checkBtn.innerHTML = "Complete"
    checkBtn.setAttribute("id", "chckBtn");
    

    //creating the delete button 
    let delBtn = document.createElement("button");
    delBtn.innerHTML = "Delete";
    delBtn.setAttribute("id", "delBtn");
    delBtn.setAttribute("id", newTask.id);

    //creating hidden div with details of task 
    let hideDiv = document.createElement("div");
    hideDiv.innerHTML = `Description ${newTask.description} <br> Due Date ${newTask.due_date} <br> Due Time ${newTask.due_time}`;


    // appending all new elements 
    document.getElementById("taskList").appendChild(newDiv)
    newDiv.appendChild(newList);
    newDiv.appendChild(checkBtn);
    newDiv.appendChild(delBtn);
    newDiv.appendChild(hideDiv);

    //changing our object to json data
    let jd = JSON.stringify(newTask);
    
    //adding to local storage 
    localStorage.setItem("task", jd);
}


document.querySelector("body").onload = function findLocalS () {
    const oldLocalStorage = localStorage.getItem("task")
    console.log(localStorage.getItem("task"));

    if (oldLocalStorage){
        let newParseData = JSON.parse(oldLocalStorage);
        console.log(newParseData)
        document.getElementById("taskList").innerText = newParseData.title;
    }else {
        console.log("No tasks")
    }
}

document.getElementById("chckBtn").onclick = () => {

}


document.getElementById("delBtn").onclick = () => {
    
    let delBtnId = this.id;
    console.log(delBtnId);
}