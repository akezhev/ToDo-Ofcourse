
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const tasksList = document.querySelector('#tasksList');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = input.value;
    if (task) {
        addTask(task);
        input.value = '';
    }
});

function addTask(task) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = task;
    tasksList.appendChild(taskItem);
}

