const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

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
// Удаление задачи
tasksList.addEventListener('click', deleteTask);
// Отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask);

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
    saveToLocalStorage()

    // Рендерим задачу
    renderTasks(newTask);

    // Очищаем поле ввода
    taskInput.value = '';
    taskInput.focus();

    checkEmptyList();
}

function deleteTask(event) {
    // Проверяем если клик был НЕ по кнопке "Удалить задачу"
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('.list-group-item');

    // Получаем id задачи
    const id = Number(parentNode.id);
    
    // 
    tasks = tasks.filter((task) => task.id !== id)

    // Сохраняем задачу в localStorage
    saveToLocalStorage()

    // Удаляем задачу из массива
    parentNode.remove();

    checkEmptyList();
}

function doneTask(event) {
    // Проверяем если клик был НЕ по кнопке "задача выполнена"
    if (event.target.dataset.action !== 'done') return;

    // Проверяем что клик был по кнопке "задача выполнена"
    const parentNode = event.target.closest('.list-group-item');

    // Получаем id задачи
    const id = Number(parentNode.id);
    // Находим задачу в массиве  
    const task = tasks.find((task) => task.id === id);
    // Меняем класс задачи
    task.done = !task.done;

    // Сохраняем задачу в localStorage
    saveToLocalStorage();

    // Получаем задачу из списка
    const taskTitle = parentNode.querySelector('.task-title');
    // Меняем класс задачи
    taskTitle.classList.toggle('task-title--done');
}

// Проверяем, есть ли задачи в списке
function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `
            <li id="emptyList" class="list-group-item empty-list">
                <img src="./img/leaf.svg" alt="Empty" width="128" class="mt-3 mb-3">
                <div class="empty-list__title">Список дел пуст</div>
            </li>
        `;

        // Добавляем блок "Список дел пуст" в список
        tasksList.insertAdjacentHTML('beforeend', emptyListHTML);
    }

    // Если задачи есть, удаляем блок "Список дел пуст"
    if (tasks.length > 0) {
        const emptyListElement = document.querySelector('#emptyList');
        // Удаляем блок "Список дел пуст" из списка
        emptyListElement ? emptyListElement.remove() : null;
    }
}

checkEmptyList();

// Сохраняем задачу в localStorage
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Рендерим задачу
function renderTasks(task) {
    // Определяем CSS класс для задачи
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

    // Создаем HTML для новой задачи
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

    // Добавляем задачу в список    
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}
