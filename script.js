const taskInput = document.querySelector('.task_input');
const addBtn = document.querySelector('.add_btn');
const taskList = document.querySelector('.tasks_list');
const rmvBtn = document.querySelector('.delete_task');
const clearBtn = document.querySelector('.clear_tasks');


document.addEventListener('DOMContentLoaded' , e => {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach( e=>{
    let taskL = `<div class="task">
  <div class="task_name">${e}</div>
  <div class="delete_task">&times;</div>
  </div>`;
  taskList.insertAdjacentHTML('afterbegin', taskL);
  })

})

addBtn.addEventListener('click' , () => {
  addTask();
})

window.addEventListener('keyup', e => {
  if (e.keyCode === 13){
    addTask();
  }
})

window.addEventListener('click', e => {
   if (e.target.classList.contains('delete_task')){
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
}})

clearBtn.addEventListener('click', () => {
  taskList.innerHTML = '';
  let tasks;
  localStorage.clear();
})

function addTask(){
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
