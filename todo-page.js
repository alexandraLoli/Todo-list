const todoTitle = document.getElementById("title");
const todoDescription = document.getElementById("description");
const todoCategory = document.getElementById("category");
const todoDate = document.getElementById("date");
const todoSubmit = document.getElementById("submit");
const todayButton = document.getElementById("today");
const thisWeekButton = document.getElementById("this-week");
const allTasksButton = document.getElementById("all-tasks");
const allActiveButton = document.getElementById("all-active");
const allCompletedButton = document.getElementById("all-completed");
const clearCompletedButton = document.getElementById("clear-completed");
const mainTasksList = document.getElementById("main-tasks-flex");
const workTasksList = document.getElementById("work-tasks");
const householdTasksList = document.getElementById("household-tasks");
const healthTasksList = document.getElementById("health-tasks");
const socialTasksList = document.getElementById("social-tasks");
const personalDevelopmentTasksList = document.getElementById("personal-tasks");
const todoForm = document.getElementById("entry-form");

const categoryList = ["work", "home", "health", "social", "perosnal"];

let todoList = [];

todoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = todoTitle.value;
    const description = todoDescription.value;
    const category = todoCategory.value;
    const date = todoDate.value;

    const todo = {
        title: title,
        description: description,
        category: category,
        date: date,
        completed: "no"
    }

    todoList.push(todo);

    todoTitle.value = "";
    todoDescription.value = "";
    todoCategory.value = "";
    todoDate.value = "";

    const taskToAdd = 
    `<div class="task-entry-main">
        <p class="task-title-main">${todo.title}</p>
        <p class="task-date-main">${todo.date} <i class="fas fa-calendar-alt"></i></p>
        <div class="task-checkbox-main unchecked"></div>
        <p class="task-description-main">${todo.description}</p>
    </div>`

    mainTasksList.innerHTML += taskToAdd;

    console.log(todoList);
});