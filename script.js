const taskInput = document.querySelector('.task_input');
const addBtn = document.querySelector('.add_btn');
const taskList = document.querySelector('.tasks_list');
const rmvBtn = document.querySelector('.delete_task');
const clearBtn = document.querySelector('.clear_tasks');
const taskTitle = document.querySelector('.task_title');
const searchInput = document.querySelector('.search_input');

searchInput.addEventListener('input', (e) => {
  const txt = e.target.value.toLowerCase();
  document.querySelectorAll('.task').forEach(function (t) {
    const item = t.firstElementChild.textContent;
    if (item.toLowerCase().indexOf(txt) != -1) {
      t.style.display = 'flex';
    } else {
      t.style.display = 'none';
    }
  });
});
document.addEventListener('DOMContentLoaded', (e) => {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach((e) => {
    let taskL = `<div class="task">
<div class="task_name">${e}</div>
<div class="delete_task">&times;</div>
</div>`;
    taskList.insertAdjacentHTML('afterbegin', taskL);
  });
  checkList();
});
addBtn.addEventListener('click', () => {
  addTask();
  checkList();
});
window.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    addTask();
    checkList();
  }
});
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete_task')) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    const index = tasks.indexOf(e.target.previousElementSibling.textContent);
    if (index > -1) {
      tasks.splice(index, 1);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    e.target.parentElement.remove();
    checkList();
  }
});
clearBtn.addEventListener('click', () => {
  taskList.innerHTML = '';
  let tasks;
  localStorage.clear();
  checkList();
});
function addTask() {
  const text = taskInput.value;
  const task = `<div class="task">
<div class="task_name">${text}</div>
<div class="delete_task">&times;</div>
</div>`;
  taskList.insertAdjacentHTML('afterbegin', task);
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(text);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  taskInput.value = '';
}
function checkList() {
  if (taskList.innerHTML === '') {
    taskTitle.style.display = 'none';
    clearBtn.style.display = 'none';
    searchInput.style.display = 'none';
  } else {
    taskTitle.style.display = 'block';
    clearBtn.style.display = 'block';
    searchInput.style.display = 'block';
  }
}
