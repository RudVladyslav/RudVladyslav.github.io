const addTaskBtn = document.querySelector('#add-task-btn'),
    deskTaskInput = document.querySelector('#description-task'),
    todoWrapper = document.querySelector('.todo-wrapper');

let tasks = [];

localStorage.tasks ? tasks = JSON.parse(localStorage.getItem('tasks')) : tasks = []
let toDoItemsElements = undefined;

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return (
        `
		<div class="to-do-item ${task.completed ? 'checked' : ' '} " >
                <div class="description"><p>${task.description}</p></div>
                <div class="buttons">
                    <input onclick = "completeTask(${index})" class="complete" type="checkbox" ${task.completed ? 'checked' : ' '}>
                    <button onclick = "deleteTask(${index})" class="delete">Delete</button>
                    <button onclick = "editTask(${index})" class="edit">Edit</button>
                </div>
            <div>
        </div>
		`
    )
}

const editTask = (index) =>{
    deskTaskInput.value = tasks[index].description;
    deleteTask(index);

}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false)
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true)
    tasks = [...activeTasks,...completedTasks];
    console.log(tasks);
}

const completeTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        toDoItemsElements[index].classList.add('checked');
    } else {
        toDoItemsElements[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
}

const fillHtmlList = () => {
    todoWrapper.innerHTML = '';
    if (tasks.length>0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todoWrapper.innerHTML += createTemplate(item, index);
            toDoItemsElements = document.querySelectorAll('.to-do-item');
        });
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


addTaskBtn.addEventListener('click', () => {
    if (deskTaskInput.value.length>0){
        let myTask = new Task(deskTaskInput.value);
        tasks.push(myTask);
        updateLocal();
        fillHtmlList();
        deskTaskInput.value = "";
    }

})
