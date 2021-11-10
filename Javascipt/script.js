class Task {
    constructor(title, description, due_date, due_time, completed, id) {
        this.title = title;
        this.description = description;
        this.due_date = due_date;
        this.due_time = due_time;
        this.completed = completed;
        this.id = id;
    };

};



function addTodo() {
    // getting input fields
    let taskName = document.getElementById("task").value;
    let taskDescription = document.getElementById("description").value;
    let taskEndDate = document.getElementById("due_date").value;
    let taskEndTime = document.getElementById("due_time").value;

    //Instantiate a new class
    let newTask = new Task(taskName, taskDescription, taskEndDate, taskEndTime, false, Date.now());

    writeToDisplay(newTask);

    addLocalStorage(newTask, newTask.id); // running the local storage function
    sortArr.push(newTask);

}

function writeToDisplay(taskObj) {
    // creating a container div for each task 
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "task-title-style");
    newDiv.setAttribute("id", taskObj.id);

    //creating a new list item and setting it to the task title
    let newList = document.createElement("li");
    let listInside = document.createTextNode(taskObj.title);
    newList.setAttribute("class", "listItem")
    newList.appendChild(listInside);

    // creating the check button 
    let checkBtn = document.createElement("button");
    checkBtn.innerHTML = "Complete";
    checkBtn.setAttribute("class", "chckBtn");
    checkBtn.setAttribute("onclick", "checked(this.parentNode.id)")

    //creating the edit button 
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.setAttribute("class", "editBtn")
    editBtn.setAttribute("onclick", "editTitle(this.parentNode, this.parentNode.id)")

    //creating the delete button 
    let delBtn = document.createElement("button");
    delBtn.innerHTML = "Delete";
    delBtn.setAttribute("class", "delBtn");
    delBtn.setAttribute("onclick", "removeParent(this.parentNode, this.parentNode.id)");

    //creating hidden div with details of task 
    let hideDiv = document.createElement("div");
    hideDiv.innerHTML = `Description ${taskObj.description} <br> Due Date ${taskObj.due_date} <br> Due Time ${taskObj.due_time}`;


    // appending all new elements 
    document.getElementById("taskList").appendChild(newDiv)
    newDiv.appendChild(newList);
    newDiv.appendChild(editBtn);
    newDiv.appendChild(checkBtn);
    newDiv.appendChild(delBtn);
    newDiv.appendChild(hideDiv);
}

function addLocalStorage(taskObj, ObjId) {
    // convert to JSON
    const jd = JSON.stringify(taskObj);

    //Sending object to local storage 
    localStorage.setItem(ObjId, jd);
}



function removeParent(parent, taskId) {
    parent.remove();
    localStorage.removeItem(taskId);
};

function editTitle(parent, parentId) {

    let oldData = localStorage.getItem(parentId);
    oldData = JSON.parse(oldData);



    // create title input 
    let titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.value = oldData.title;
    parent.appendChild(titleInput);

    // create description input
    let descriptionInput = document.createElement("input");
    descriptionInput.setAttribute("type", "text");
    descriptionInput.value = oldData.description;
    parent.appendChild(descriptionInput);

    //create date input 
    let dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");
    dateInput.value = oldData.due_date;
    parent.appendChild(dateInput);

    // create time input 
    let timeInput = document.createElement("input");
    timeInput.setAttribute("type", "time");
    timeInput.value = oldData.due_time;
    parent.appendChild(timeInput);

    //create save button 
    let saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Save";
    parent.appendChild(saveBtn);
    //save button function
    saveBtn.onclick = () => {
        removeParent(saveBtn.parentNode, saveBtn.parentNode.id);
        let newTask = new Task(titleInput.value, descriptionInput.value, dateInput.value, timeInput.value, false, Date.now());
        writeToDisplay(newTask);
        addLocalStorage(newTask, newTask.id);

    }

}

function checked(taskId) {
    let taskObj = localStorage.getItem(taskId);
    taskObj = JSON.parse(taskObj);
    taskObj.completed = true;
    addLocalStorage(taskObj, taskId);
}

document.querySelector("body").onload = function findLocalS() {
    let localArr = []
    for (let key in localStorage) {
        localArr.push(key);
    }
    localArr.pop();
    localArr.pop();
    localArr.pop();
    localArr.pop();
    localArr.pop();
    localArr.pop();


    for (i = 0; i <= localArr.length; i++) {
        let jd = localStorage.getItem(localArr[i]);
        let parseDat = JSON.parse(jd);
        writeToDisplay(parseDat);
    }

}


