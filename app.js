const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();
function loadEventListeners(){
  document.addEventListener('DOMContentLoaded', getTask);

  form.addEventListener('submit', addTask);

  taskList.addEventListener('click', removeTask);

  clearBtn.addEventListener('click', clearAll);

  filter.addEventListener('keyup', filterTask);
}

function getTask(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){

    const li = document.createElement('li');
    li.className ='collection-item';
    li.appendChild(document.createTextNode(task));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);
  })

}

function addTask(e){
  if(taskInput.value == ''){
    alert("Empty input");
    return null;
  }

  const li = document.createElement('li');
  li.className ='collection-item';
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  taskList.appendChild(li);

  storeInLocalStorage(taskInput.value);

  taskInput.value ='';
  // console.log(li);
  e.preventDefault();
}

function storeInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('are you sure?')){
      e.target.parentElement.parentElement.remove();

      removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1)
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

function clearAll(e){

  // taskList.innerHTML ="";

  document.querySelectorAll('.collection-item').forEach(function(li){
    li.remove();
  });

  // while(taskList.firstChild){
  //   taskList.removeChild(taskList.firstChild);
  // }
  clearFronLocalStorage();

  e.preventDefault();
}

function clearFronLocalStorage(){
  localStorage.clear();
}

function filterTask(e){
  let text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
      const item = task.firstChild.textContent;

      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = "block";
      }else{
        task.style.display = "none";
      }
  })
  




}