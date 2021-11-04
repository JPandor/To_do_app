class Task {
    constructor (title, description, due_date, due_time, completed){
        this._title = title;
        this._description = description;
        this._due_date = due_date;
        this._due_time = due_time;
        this._completed = completed;
    };

    defaultCompleted(){
        this._completed = false;
    };
};

function addingToList(){
    let taskName = document.getElementById("task").value;
    let taskDescription = document.getElementById("description").value;
    let taskEndDate = document.getElementById("due_date").value;
    let taskEndTime = document.getElementById("due_time").value;

    let newTask = new Task (taskName, taskDescription, taskEndDate, taskEndTime, false);
    console.log(newTask)

    const newElement = document.createElement("section");
    newElement.id = "taskObj";
    document.getElementById("taskObj").innerHTML = newTask._title

}