const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');

let tasks = [];

// Получаем задачу из localStorage
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    // Рендерим задачи
    tasks.forEach(task => renderTasks(task));
}

checkEmptyList();

// Добавление задачи
form.addEventListener('submit', addTask);
// Делегирование кликов по списку задач (выполнено/удалить)
tasksList.addEventListener('click', onListClick);

// Функции
function addTask(event) { 
    // Отменяем стандартное поведение формы
    event.preventDefault();

    // Получаем текст задачи из input
    const taskText = taskInput.value.trim();

    // Проверяем, что поле не пустое
    if (!taskText) {
        alert('Пожалуйста, введите текст задачи!');
        return;
    }

    // Создаем новый объект задачи
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    // Добавляем задачу в массив
    tasks.push(newTask);

    // Сохраняем задачу в localStorage
    saveToLocalStorage();

    // Рендерим задачу
    renderTasks(newTask);

    // Очищаем поле ввода
    taskInput.value = '';
    taskInput.focus();

    checkEmptyList();
}

function onListClick(event) {
    const actionButton = event.target.closest('button[data-action]');
    if (!actionButton) return;

    const action = actionButton.dataset.action;
    const parentNode = actionButton.closest('.list-group-item');
    if (!parentNode) return;

    const id = Number(parentNode.id);

    if (action === 'delete') {
        tasks = tasks.filter((task) => task.id !== id);
        parentNode.remove();
        checkEmptyList();
        saveToLocalStorage();
        return;
    }

    if (action === 'done') {
        const task = tasks.find((task) => task.id === id);
        if (!task) return;
        task.done = !task.done;
        saveToLocalStorage();
        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle && taskTitle.classList.toggle('task-title--done');
        return;
    }
}

// Проверяем, есть ли задачи в списке
function checkEmptyList() {
    const emptyListElement = document.querySelector('#emptyList');

    if (tasks.length === 0) {
        if (!emptyListElement) {
            const emptyListHTML = `
            <li id="emptyList" class="list-group-item empty-list">
                <img src="./img/leaf.svg" alt="Empty" width="128" class="mt-3 mb-3">
                <div class="empty-list__title">Список дел пуст</div>
            </li>
        `;
            tasksList.insertAdjacentHTML('beforeend', emptyListHTML);
        }
        return;
    }

    if (emptyListElement) {
        emptyListElement.remove();
    }
}

// Сохраняем задачу в localStorage
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Рендерим задачу
function renderTasks(task) {
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

    const taskHTML = `
        <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${task.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/done.svg" alt="Done" width="28" height="28">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/delete.svg" alt="Delete" width="28" height="28">
                </button>
            </div>
        </li>
    `;

    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}
