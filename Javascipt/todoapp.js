class Task {
    constructor(title, description, due_date, due_time, completed, id) {
        this.title = title;
        this.description = description;
        this.due_date = due_date;
        this.due_time = due_time;
        this.completed = completed;
        this.id = id;
    };

    defaultId() {
        this.id = Date.now()
    }

    defaultCompleted() {
        this.completed = false;
    };
};


function addingToList() {
    //Getting all input fields
    let taskName = document.getElementById("task").value;
    let taskDescription = document.getElementById("description").value;
    let taskEndDate = document.getElementById("due_date").value;
    let taskEndTime = document.getElementById("due_time").value;

    //Instantiating a new object from the Task class
    let newTask = new Task(taskName, taskDescription, taskEndDate, taskEndTime, false, Date.now());
    // getting the key for local storage using the Date.now function
    let taskId = newTask.id

    // Turning task into JSON format 
    newTask = JSON.stringify(newTask);

    // Writing it to local storage 
    localStorage.setItem(taskId, newTask);

    //Writing our object title to the DOM
    let text = localStorage.getItem(taskId);
    let section = document.createElement("section");
    section.innerHTML = text;
    section.setAttribute("class", "taskStyle")
    document.getElementById("taskList").appendChild(section);

    //Showing the task description etc. on hover 

    let btn = document.createElement("button");
    btn.setAttribute("class", "arrow-down");
    document.getElementById("taskList").appendChild(btn);
    

}