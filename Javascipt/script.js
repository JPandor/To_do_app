class Task {
    constructor(title, description, due_date, due_time, completed, id, hideId) {
        this.title = title;
        this.description = description;
        this.due_date = due_date;
        this.due_time = due_time;
        this.completed = completed;
        this.id = id;
        this.hideId = hideId;
    };

};

let taskArray = [];
function addTodo() {
    // getting input fields
    let taskName = document.getElementById("task").value;
    let taskDescription = document.getElementById("description").value;
    let taskEndDate = document.getElementById("due_date").value;
    let taskEndTime = document.getElementById("due_time").value;

    //Instantiate a new class
    let newTask = new Task(taskName, taskDescription, taskEndDate, taskEndTime, false, Date.now(), Date.now() + 10);

    // adding task to array and then sorting alphabetically
    taskArray.push(newTask);
    sortTask();
    
    // adding task to local storage
    addLocalStorage(newTask, newTask.id);
    
    document.getElementById("form").reset();
};


function writeToDisplay() {
    //empty out the ul 
    document.getElementById("task-list").innerHTML = "";

    
    // creating elements and buttons for each object in the array
    taskArray.forEach((e) => {
        // getting a unique id for the collapsible
        let collId = "a" + e.hideId;

        //creating a container div for each list element
        const newDiv = document.createElement("div");
        newDiv.setAttribute("id", e.id);

        //creating a new list item and setting it to the task title and setting all the attributes
        const newList = document.createElement("li");
        const listInside = document.createTextNode(e.title);
        newList.setAttribute("class", "listItem");
        newList.appendChild(listInside);

        // creating the collapsible button and setting all the attributes 
        const collapsible = document.createElement("button");
        collapsible.insertAdjacentHTML('beforeend', '<i class="fas fa-arrow-down"></i>');
        collapsible.setAttribute("class", "collapsible");
        collapsible.setAttribute("data-bs-toggle", "collapse");
        collapsible.setAttribute("data-bs-target", `#${collId}` );

        // creating the check button and setting all the attributes 
        const checkBtn = document.createElement("button");
        checkBtn.insertAdjacentHTML('beforeend', '<i class="fas fa-check-square"></i>');
        checkBtn.setAttribute("class", "chckBtn");
        checkBtn.setAttribute("onclick", "checked(this.parentNode.id, this.parentNode)");

        //creating the edit button and setting all the attributes
        const editBtn = document.createElement("button");
        editBtn.insertAdjacentHTML('beforeend', '<i class="fas fa-edit"></i>');
        editBtn.setAttribute("class", "editBtn");
        editBtn.setAttribute("onclick", "editTitle(this.parentNode, this.parentNode.id)");

        //creating the delete button and setting all the attributes
        const delBtn = document.createElement("button");
        delBtn.insertAdjacentHTML('beforeend', '<i class="fas fa-trash-alt"></i>');
        delBtn.setAttribute("class", "delBtn");
        delBtn.setAttribute("onclick", "removeParent(this.parentNode, this.parentNode.id)");

        //creating hidden div with details of task and setting the attributes
        const hideDiv = document.createElement("div");
        hideDiv.setAttribute("class", "hideDiv");
        hideDiv.setAttribute("class", "collapse");
        hideDiv.setAttribute("id", collId);
        hideDiv.innerHTML = `Description: ${e.description} <br> Due Date: ${e.due_date} <br> Due Time: ${e.due_time}`;


        // appending all new elements 
        document.getElementById("task-list").appendChild(newDiv);
        newDiv.appendChild(newList);
        newDiv.appendChild(checkBtn);
        newDiv.appendChild(editBtn);
        newDiv.appendChild(delBtn);
        newDiv.appendChild(collapsible);
        newDiv.appendChild(hideDiv);
    });

};

function addLocalStorage(taskObj, ObjId) {
    // convert to JSON
    const jd = JSON.stringify(taskObj);

    //Sending object to local storage 
    localStorage.setItem(ObjId, jd);
};



function removeParent(parent, taskId) {
    //remove the whole parent div
    parent.remove();
    //remove task from local storage
    localStorage.removeItem(taskId);
    //remove the task from the array if the items id matches
    taskArray = taskArray.filter(function (item) {
        return item.id != taskId;
    });
};

function editTitle(parent, parentId) {
    // getting unedited task from local storage
    let previousData = localStorage.getItem(parentId);
    previousData = JSON.parse(previousData);

    // create title input 
    let titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.value = previousData.title;
    parent.appendChild(titleInput);

    // create description input
    let descriptionInput = document.createElement("input");
    descriptionInput.setAttribute("type", "text");
    descriptionInput.value = previousData.description;
    parent.appendChild(descriptionInput);

    //create date input 
    let dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");
    dateInput.value = previousData.due_date;
    parent.appendChild(dateInput);

    // create time input 
    let timeInput = document.createElement("input");
    timeInput.setAttribute("type", "time");
    timeInput.value = previousData.due_time;
    parent.appendChild(timeInput);

    //create save button 
    let saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Save";
    parent.appendChild(saveBtn);

    //save button function
    saveBtn.onclick = () => {
        // remove the unedited task
        removeParent(saveBtn.parentNode, saveBtn.parentNode.id);
        //instantiate a new task with the updated value
        let newTask = new Task(titleInput.value, descriptionInput.value, dateInput.value, timeInput.value, false, Date.now());
        taskArray.push(newTask);
        sortTask();
        addLocalStorage(newTask, newTask.id);

    }

};

function checked(taskId, parent) {
    //get the task from local storage
    let taskObj = localStorage.getItem(taskId);
    taskObj = JSON.parse(taskObj);

    //change the value to true 
    taskObj.completed = true;

    parent.style.textDecoration = "line-through";

    addLocalStorage(taskObj, taskId);
};

// Getting all tasks from local storage on loading the page
document.querySelector("body").onload = () => {
    // create an array of the local storage key
    let localArr = [];
    for (let key in localStorage) {
        localArr.push(key);
    };
    //remove the local storage methods that return 
    localArr.splice(-6, 6);

    // get the tasks and write it to the display
    for (i = 0; i < localArr.length; i++) {
        let jd = localStorage.getItem(localArr[i]);
        let parseData = JSON.parse(jd);
        taskArray.push(parseData);
        sortTask();
    };

};


function sortTask() {
    // sort the task array in alphabetical order case insensitively
    taskArray.sort((a, b) => {
        let fa = a.title.toLowerCase(),
            fb = b.title.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });

    writeToDisplay();
};

