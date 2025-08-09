const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

// Добавление задачи
form.addEventListener('submit', addTask);

// Удаление задачи
tasksList.addEventListener('click', deleteTask);

// Отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask);

// if (localStorage.getItem('tasksHTML')) {
//     tasksList.innerHTML = localStorage.getItem('tasksHTML');
// }

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

    // Определяем CSS класс для задачи
    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';

    // Создаем HTML для новой задачи
    const taskHTML = `
        <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${newTask.text}</span>
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

    // Очищаем поле ввода
    taskInput.value = '';
    taskInput.focus();

    // Проверка. Если в списке более 1-го элемента, скрываем блок
    if(tasksList.children.length > 1) {
        emptyList.classList.add('none')
    }

    // saveHTMLtoLS();
}

function deleteTask(event) {
    // Проверяем если клик был НЕ по кнопке "Удалить задачу"
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('.list-group-item');

    // Получаем id задачи
    const id = parentNode.id;

    // Удаляем задачу из массива
    tasks = tasks.filter(task => task.id !== id);

    // Удаляем задачу из массива
    parentNode.remove();

        // Проверка. Если в списке задач один элемент, показываем блок "Список дел пуст"
    if (tasksList.children.length === 1) {
        emptyList.classList.remove('none');
    }
    
    // saveHTMLtoLS();


}

function doneTask(event) {
    // Проверяем если клик был НЕ по кнопке "задача выполнена"
    if (event.target.dataset.action !== 'done') return;

    // Проверяем что клик был по кнопке "задача выполнена"
    const parentNode = event.target.closest('.list-group-item');
    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');

    // saveHTMLtoLS();

}

// Сохранение данных
// function saveHTMLtoLS() {
//     localStorage.setItem('tasksHTML', tasksList.innerHTML);
// }

