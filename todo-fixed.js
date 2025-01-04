const taskFixed = document.getElementById("show-task-fixed");
const taskTitleFixed = document.querySelector(".task-title-fixed");
const taskDescriptionFixed = document.querySelector(".task-description-fixed");
const taskDateFixed = document.querySelector(".task-date-fixed");
const deleteTaskButton = document.querySelector(".delete-task-button");
const body = document.querySelector("body");

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

deleteTaskButton.addEventListener("click", () => {
    taskFixed.remove();
});

