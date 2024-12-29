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

const categoryList = ["work", "home", "health", "social", "personal"];

let todoList = [];

let idTask = 0;

let taskElements = {};

const menuOptions = ["Today", "This Week", "All Tasks", "All Active", "All Completed"];

let menuSelect = "All Tasks";

let tasksList = [];

const today = new Date();

const showTodayTasks = () => {
    mainTasksList.innerHTML = '';
    tasksList.forEach(task => {
        const taskDate = parseInt(task.querySelector(".task-date-main").textContent.substring(8, 10),10);
        if (taskDate === today.getDate()) {
            mainTasksList.appendChild(task);
        }
    });
}

const showThisWeekTasks = () => {
    mainTasksList.innerHTML = ``;

    const startOfWeek = new Date(today);
    const endOfWeek = new Date(today);

    const dayOfWeek = today.getDay();
    const offsetMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    const offsetSunday = (dayOfWeek === 0? 0 : 7 - dayOfWeek);

    startOfWeek.setDate(today.getDate() - offsetMonday);
    endOfWeek.setDate(today.getDate() + offsetSunday);

    tasksList.forEach(task => {
        const taskDate = parseInt(task.querySelector(".task-date-main").textContent.substring(8, 10),10);
        if (taskDate >= startOfWeek.getDate() && taskDate <= endOfWeek.getDate()) {
            mainTasksList.appendChild(task);
        }
    });
}

const showAllTasks = () => {
    mainTasksList.innerHTML = '';
    tasksList.forEach(task => {
        mainTasksList.appendChild(task);
    });
}

const showAllActiveTasks = () => {
    mainTasksList.innerHTML = '';
    tasksList.forEach(task => {
        if (!task.querySelector(".task-checkbox-main").classList.contains("checked")){
            mainTasksList.appendChild(task);
        }
    });
}

const showAllCompletedTasks = () => {
    mainTasksList.innerHTML = '';
    tasksList.forEach(task => {
        if (task.querySelector(".task-checkbox-main").classList.contains("checked")){
            mainTasksList.appendChild(task);
        }
    });
}

const syncCheckboxState = (taskId, completed) => {
    const taskRefs = taskElements[taskId];

    if (taskRefs) {
        const mainCheckbox = taskRefs.main;
        const categoryCheckbox = taskRefs.category;

        if (completed === "yes") {
            mainCheckbox.classList.add("checked");
            mainCheckbox.classList.remove("unchecked");

            categoryCheckbox.classList.add("checked");
            categoryCheckbox.classList.remove("unchecked");
        } else {
            mainCheckbox.classList.add("unchecked");
            mainCheckbox.classList.remove("checked");

            categoryCheckbox.classList.add("unchecked");
            categoryCheckbox.classList.remove("checked");
        }
    }
}

const addTaskInMain = todo => {
    const taskToAdd = document.createElement("div");
    taskToAdd.className = "task-entry-main";
    taskToAdd.dataset.id = todo.id;

    const taskTitle = document.createElement("p");
    taskTitle.className = "task-title-main";
    taskTitle.textContent = todo.title;
    taskToAdd.appendChild(taskTitle);

    const taskDate = document.createElement("p");
    taskDate.className = "task-date-main";
    taskDate.innerHTML = `${todo.date} <i class="fas fa-calendar-alt"></i>`;
    taskToAdd.appendChild(taskDate);

    const taskCheckbox = document.createElement("div");
    taskCheckbox.className = "task-checkbox-main unchecked";

    taskCheckbox.addEventListener("click", () => {
        todo.completed = todo.completed === "yes" ? "no" : "yes";
        syncCheckboxState(todo.id, todo.completed);
    });

    taskToAdd.appendChild(taskCheckbox);

    const taskDescription = document.createElement("p");
    taskDescription.className = "task-description-main";
    taskDescription.textContent = todo.description;
    taskToAdd.appendChild(taskDescription);

    mainTasksList.appendChild(taskToAdd);

    taskElements[todo.id].main = taskCheckbox;
    tasksList.push(taskToAdd);
}

const addTaskInCategory = todo => {

    const taskToAdd = document.createElement("div");
    taskToAdd.className = "task-entry-category";
    taskToAdd.dataset.id = todo.id;

    const taskTitle = document.createElement("p");
    taskTitle.className = "task-title-category";
    taskTitle.textContent = todo.title;
    taskToAdd.appendChild(taskTitle);

    const taskDate = document.createElement("p");
    taskDate.className = "task-date-category";
    taskDate.innerHTML = `${todo.date} <i class="fas fa-calendar-alt"></i>`;
    taskToAdd.appendChild(taskDate);

    const taskCheckbox = document.createElement("div");
    taskCheckbox.className = "task-checkbox-category unchecked";

    taskCheckbox.addEventListener("click", () => {
        todo.completed = todo.completed === "yes" ? "no" : "yes";
        syncCheckboxState(todo.id, todo.completed);
    });

    taskToAdd.appendChild(taskCheckbox);

    switch(todo.category) {
        case categoryList[0]:
            workTasksList.appendChild(taskToAdd);
            break;
        case categoryList[1]:
            householdTasksList.appendChild(taskToAdd);
            break;
        case categoryList[2]:
            healthTasksList.appendChild(taskToAdd);
            break;
        case categoryList[3]:
            socialTasksList.appendChild(taskToAdd);
            break;
        case categoryList[4]:
            personalDevelopmentTasksList.appendChild(taskToAdd);
            break;
        default: break;
    }

    taskElements[todo.id].category = taskCheckbox;
}

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
        completed: "no",
        id: idTask
    }

    todoList.push(todo);

    todoTitle.value = "";
    todoDescription.value = "";
    todoCategory.value = "";
    todoDate.value = "";

    taskElements[todo.id] = {};

    addTaskInMain(todo);

    addTaskInCategory(todo);

    console.log(todoList);
    console.log(taskElements);
    idTask++;
});

clearCompletedButton.addEventListener("click", () => {

    todoList = todoList.filter(todo => todo.completed !== "yes");

    const mainTasks = Array.from(mainTasksList.children);
    mainTasks.forEach(task => {
        const checkbox = task.querySelector(".task-checkbox-main");
        if (checkbox && checkbox.classList.contains("checked")) {
            mainTasksList.removeChild(task);
        }
    });

    tasksList = tasksList.filter(task => {
        const checkbox = task.querySelector(".task-checkbox-main");
        return !checkbox.classList.contains("checked");
    });

    const workTasks = Array.from(workTasksList.children);
    workTasks.forEach(task => {
        const checkbox = task.querySelector(".task-checkbox-category");
        if (checkbox && checkbox.classList.contains("checked")) {
            workTasksList.removeChild(task);
        }
    });

    const homeTasks = Array.from(householdTasksList.children);
    homeTasks.forEach(task => {
        const checkbox = task.querySelector(".task-checkbox-category");
        if (checkbox && checkbox.classList.contains("checked")) {
            householdTasksList.removeChild(task);
        }
    });

    const socialTasks = Array.from(socialTasksList.children);
    socialTasks.forEach(task => {
        const checkbox = task.querySelector(".task-checkbox-category");
        if (checkbox && checkbox.classList.contains("checked")) {
            socialTasksList.removeChild(task);
        }
    });

    const healthTasks = Array.from(healthTasksList.children);
    healthTasks.forEach(task => {
        const checkbox = task.querySelector(".task-checkbox-category");
        if (checkbox && checkbox.classList.contains("checked")) {
            healthTasksList.removeChild(task);
        }
    });

    const personalTasks = Array.from(personalDevelopmentTasksList.children);
    personalTasks.forEach(task => {
        const checkbox = task.querySelector(".task-checkbox-category");
        if (checkbox && checkbox.classList.contains("checked")) {
            personalDevelopmentTasksList.removeChild(task);
        }
    });

    const newTaskElements = {};

    for (const key in taskElements) {

        const taskElement = taskElements[key];

        if (!taskElement.main.classList.contains("checked") || !taskElement.category.classList.contains("checked")) {
            newTaskElements[key] = taskElement;
        }
    }

    taskElements = newTaskElements;
});

todayButton.addEventListener("click", () => {
    menuSelect = "Today";
    showTodayTasks();
});

thisWeekButton.addEventListener("click", () => {
    menuSelect = "This Week";
    showThisWeekTasks();
});

allTasksButton.addEventListener("click", () => {
    menuSelect = "All Tasks";
    showAllTasks();
});

allActiveButton.addEventListener("click", () => {
    menuSelect = "All Active";
    showAllActiveTasks();
});

allCompletedButton.addEventListener("click", () => {
    menuSelect = "All Completed";
    showAllCompletedTasks();
});;