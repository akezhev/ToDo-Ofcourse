const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#taskList');


form.addEventListener('submit', function(event) {
    // Отменяем стандартное поведение формы
    event.preventDefault();

    // Проверяем, есть ли текст в input
    if (!taskInput.value) {
        return;
    }


    // Получаем текст задачи из input
    const taskText = taskInput.value;

    console.log(taskText);

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
    taskList.insertAdjacentHTML('beforeend', taskHTML);

    // Очищаем input
    taskInput.value = '';
    
    
});


