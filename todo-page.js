// TODO: Fa in asa fel incat sa se vada ce buton e selectat din meniu

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
const numberOfTasksSpan = document.getElementById("number-of-tasks");
const markCompletedButton = document.getElementById("mark-completed");
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");

const categoryList = ["work", "home", "health", "social", "personal"];

let todoList = [];

let taskFixedOnScreen = undefined;

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
    console.log(startOfWeek);
    endOfWeek.setDate(today.getDate() + offsetSunday);
    console.log(endOfWeek);

    tasksList.forEach(task => {
        const taskDateStr = task.querySelector(".task-date-main").textContent;
        const taskDate = new Date(taskDateStr);
        if (taskDate >= startOfWeek && taskDate <= endOfWeek) {
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


const createFixed = todo => {
    const taskFixed = document.createElement("div");
    taskFixed.className = "show-task-fixed";

    // Add title to fixed task
    const taskTitleFixed = document.createElement("p");
    taskTitleFixed.className = "task-title-fixed";
    taskTitleFixed.textContent = todo.title;

    taskTitleFixed.addEventListener("dblclick", () => {
        var input = document.createElement("input");
        input.type = "text";
        input.maxLength = 10;
        input.minLength = 1;
        input.classList.add("input-title-task-fixed");
        input.value = taskTitleFixed.textContent;
        const val = taskTitleFixed.textContent;
        input.required = true;
    
        taskTitleFixed.textContent = ``;
        taskTitleFixed.appendChild(input);
    
        input.focus();
    
        input.addEventListener("blur", () => {
            if (input.value === "") {
                taskTitleFixed.innerHTML = val;
            } else {
                taskTitleFixed.innerHTML = input.value;
            }
            
        });
    });

    taskFixed.appendChild(taskTitleFixed);

    // Add date to task fixed
    const taskDateFixed = document.createElement("p");
    taskDateFixed.className = "task-date-fixed";
    taskDateFixed.innerHTML = `${todo.date} <i class="fas fa-calendar-alt"></i>`;

    taskDateFixed.addEventListener("dblclick", () => {
        var input = document.createElement("input");
        input.type = "date";
        input.classList.add("input-date-task-fixed");
        input.value = taskDateFixed.textContent;
        let val = taskDateFixed.textContent;
        input.required = true;
    
        taskDateFixed.textContent = ``;
        taskDateFixed.appendChild(input);
    
        input.focus();
    
        input.addEventListener("blur", () => {
            if (input.value === "") {
                taskDateFixed.innerHTML = `${val} <i class="fas fa-calendar-alt"></i>`;
            } else {
                taskDateFixed.innerHTML = `${input.value} <i class="fas fa-calendar-alt"></i>`;
            }
        });
    });

    taskFixed.appendChild(taskDateFixed);

    // Add checkbox to task fixed 
    const taskCheckboxFixed = document.createElement("div");
    taskCheckboxFixed.className = "task-checkbox-fixed";
    if (todo.completed === "yes") {
        taskCheckboxFixed.classList.add("checked");
    } else {
        taskCheckboxFixed.classList.add("unchecked");
    }

    taskCheckboxFixed.addEventListener("click", () => {
        todo.completed = todo.completed === "yes" ? "no" : "yes";
        syncCheckboxState(todo.id, todo.completed);
        updateActiveTasksNumber();

        if (taskCheckboxFixed.classList.contains("unchecked")) {
            taskCheckboxFixed.classList.remove("unchecked");
            taskCheckboxFixed.classList.add("checked");
        } else {
            taskCheckboxFixed.classList.remove("checked");
            taskCheckboxFixed.classList.add("unchecked");
        }
    });

    taskFixed.appendChild(taskCheckboxFixed);

    // Add description to task fixed
    const taskDescriptionFixed = document.createElement("div");
    taskDescriptionFixed.className = "task-description-fixed";
    taskDescriptionFixed.textContent = todo.description;


    taskDescriptionFixed.addEventListener("dblclick", () => {
        console.log("hellooo")
        var input = document.createElement("textarea");
        input.maxLength = 100;
        input.minLength = 1;
        input.classList.add("textarea-description-task-fixed");
        input.value = taskDescriptionFixed.textContent;
        const val = taskDescriptionFixed.textContent;
        input.required = true;
    
        taskDescriptionFixed.textContent = ``;
        taskDescriptionFixed.appendChild(input);
    
        input.focus();
    
        input.addEventListener("blur", () => {
            if (input.value === "") {
                taskDescriptionFixed.innerHTML = val;
            } else {
                taskDescriptionFixed.innerHTML = input.value;
            }
        });
    });

    taskFixed.appendChild(taskDescriptionFixed);

    // Add delete button to task fixed
    const taskDeleteButton = document.createElement("div");
    taskDeleteButton.className = "delete-task-button";
    taskDeleteButton.textContent = "Delete Task";

    taskDeleteButton.addEventListener("click", () => {

        // Delete from todoList
        let index = todoList.indexOf(todo);
        if (index !== -1) {
            todoList.splice(index, 1);
        }

        // Delete from taskElements
        //TODO

        // Delete form tasksList
        tasksList = tasksList.filter(task => {
            const taskId = task.dataset.id;
            return !(taskId === todo.id);
        });

        // Delete from category
        switch(todo.category) {
            case categoryList[0]:{
                const workTasks = Array.from(workTasksList.children);
                workTasks.forEach(task => {
                    const taskId = task.dataset.id;
                    if (taskId === todo.id) {
                        workTasksList.removeChild(task);
                    }
                });
                break;}
            case categoryList[1]:{
                const householdTasks = Array.from(householdTasksList.children);
                householdTasks.forEach(task => {
                    const taskId = task.dataset.id;
                    if (taskId === todo.id) {
                        householdTasksList.removeChild(task);
                    }
                });
                break;}
            case categoryList[2]:{
                const healthTasks = Array.from(healthTasksList.children);
                healthTasks.forEach(task => {
                    const taskId = task.dataset.id;
                    if (taskId === todo.id) {
                        healthTasksList.removeChild(task);
                    }
                });
                break;}
            case categoryList[3]:{
                const socialTasks = Array.from(socialTasksList.children);
                socialTasks.forEach(task => {
                    const taskId = task.dataset.id;
                    if (taskId === todo.id) {
                        socialTasksList.removeChild(task);
                    }
                });
                break;}
            case categoryList[4]:{
                const personalTasks = Array.from(personalDevelopmentTasksList.children);
                personalTasks.forEach(task => {
                    const taskId = task.dataset.id;
                    if (taskId === todo.id) {
                        personalDevelopmentTasksList.removeChild(task);
                    }
                });
                break;}
            default: break;
        }

        taskFixed.remove();
        overlay.style.display = "none";
    });

    taskFixed.appendChild(taskDeleteButton);

    // Add close button to task fixed
    const taskCloseButton = document.createElement("div");
    taskCloseButton.className = "close-button";
    taskCloseButton.textContent = "Close";

    taskCloseButton.addEventListener("click", () => {
        taskFixed.remove();
        overlay.style.display = "none";
    });

    taskFixed.appendChild(taskCloseButton);
    taskFixedOnScreen = taskFixed;

    // Add task fixed to body
    body.appendChild(taskFixed);
}

const addTaskInMain = todo => {
    const taskToAdd = document.createElement("div");
    taskToAdd.className = "task-entry-main";
    taskToAdd.dataset.id = todo.id;

    taskToAdd.addEventListener("click", () => {
        overlay.style.display = "block";
        createFixed(todo);
    });

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
        updateActiveTasksNumber();
    });

    taskToAdd.appendChild(taskCheckbox);

    const taskDescription = document.createElement("p");
    taskDescription.className = "task-description-main";
    taskDescription.textContent = todo.description;
    taskToAdd.appendChild(taskDescription);

    taskElements[todo.id].main = taskCheckbox;
    tasksList.push(taskToAdd);

    switch(menuSelect) {
        case menuOptions[0]:
            showTodayTasks();
            break;
        case menuOptions[1]:
            showThisWeekTasks();
            break;
        case menuOptions[2]:
            showAllTasks();
            break;
        case menuOptions[3]:
            showAllActiveTasks();
            break;
        case menuOptions[4]:
            showAllCompletedTasks();
            break;
        default:
            break;
    }
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
        updateActiveTasksNumber();
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

const updateActiveTasksNumber = () => {
    let tasksLeft = 0;
    todoList.forEach(todo => {
        if (todo.completed === "no") {
            tasksLeft++;
        }
    });
    numberOfTasksSpan.textContent = tasksLeft;
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
    updateActiveTasksNumber();
});

clearCompletedButton.addEventListener("click", () => {

    // Delete tasks from todoList
    todoList = todoList.filter(todo => todo.completed !== "yes");

    // Delete tasks from main list
    const mainTasks = Array.from(mainTasksList.children);
    mainTasks.forEach(task => {
        const checkbox = task.querySelector(".task-checkbox-main");
        if (checkbox && checkbox.classList.contains("checked")) {
            mainTasksList.removeChild(task);
        }
    });

    // Delete tasks from taskList
    tasksList = tasksList.filter(task => {
        const checkbox = task.querySelector(".task-checkbox-main");
        return !checkbox.classList.contains("checked");
    });

    // Delete tasks from work todos
    const workTasks = Array.from(workTasksList.children);
    workTasks.forEach(task => {
        const checkbox = task.querySelector(".task-checkbox-category");
        if (checkbox && checkbox.classList.contains("checked")) {
            workTasksList.removeChild(task);
        }
    });

    // Delete tasks from household todos
    const homeTasks = Array.from(householdTasksList.children);
    homeTasks.forEach(task => {
        const checkbox = task.querySelector(".task-checkbox-category");
        if (checkbox && checkbox.classList.contains("checked")) {
            householdTasksList.removeChild(task);
        }
    });

    // Delete tasks from social todos
    const socialTasks = Array.from(socialTasksList.children);
    socialTasks.forEach(task => {
        const checkbox = task.querySelector(".task-checkbox-category");
        if (checkbox && checkbox.classList.contains("checked")) {
            socialTasksList.removeChild(task);
        }
    });

    // Delete tasks from health todos
    const healthTasks = Array.from(healthTasksList.children);
    healthTasks.forEach(task => {
        const checkbox = task.querySelector(".task-checkbox-category");
        if (checkbox && checkbox.classList.contains("checked")) {
            healthTasksList.removeChild(task);
        }
    });

    // Delete tasks from personal development todos
    const personalTasks = Array.from(personalDevelopmentTasksList.children);
    personalTasks.forEach(task => {
        const checkbox = task.querySelector(".task-checkbox-category");
        if (checkbox && checkbox.classList.contains("checked")) {
            personalDevelopmentTasksList.removeChild(task);
        }
    });

    // Delete completed entries from taskElements object
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

markCompletedButton.addEventListener("click", () => {
    todoList.forEach(todo => {
        todo.completed = "yes";
        syncCheckboxState(todo.id, "yes");
    });
    updateActiveTasksNumber();
});

overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    if (taskFixedOnScreen !== undefined ) {
        taskFixedOnScreen.remove();
        taskFixedOnScreen = undefined;
    }
});

