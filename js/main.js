const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');
// Добавление задачи
form.addEventListener('submit', function(event) {
    // Отменяем стандартное поведение формы
    event.preventDefault();

    // Получаем текст задачи из input
    const taskText = taskInput.value.trim();

    // Проверяем, что поле не пустое
    if (!taskText) {
        alert('Пожалуйста, введите текст задачи!');
        return;
    }

    // Создаем HTML для новой задачи
    const taskHTML = `
        <li class="list-group-item d-flex justify-content-between task-item">
            <span class="task-title">${taskText}</span>
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

    if(tasksList.children.length > 1) {
        emptyList.classList.add('none')
    }
});


