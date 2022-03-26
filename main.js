
//Смена бэкграунда активных кнопок навигации//
const button = document.getElementsByClassName('button');

for(let i = 0; i < button.length; i++) {
  button[i].addEventListener('click', function(){
    const current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

const input = document.querySelector('.text-input')
const btnText = document.querySelector('.add-text')
const toDo = document.querySelector('.to-do')

//кнопки взаимодействия//
const btnCmp = document.getElementsByClassName('btn-task')
const btnDel = document.getElementsByClassName('btn-task-del')



let tasks;

//Функция конструктор//
function Task (text) {
  this.text = text;
  this.completed = false;
}
//Инициализация хранилища//
if(!localStorage.tasks) {
  tasks = []
} else{
  tasks = JSON.parse(localStorage.getItem('key'));
} 


//запись в хранилище//
const storage = (key, arr) => {
  localStorage.setItem(`${key}`, JSON.stringify(arr.flat(Infinity)))
};

//кнопки навигации//
const navBtn = document.getElementById('btnTwo')
const navBtnActiv = document.getElementById('btnOne')
const navBtnDel = document.getElementById('btnThree')

let complTask = [];
/*
//функция отвечает за перевод задания во вкладку завершенные//
const complete = () => {
  for(let i = 0; i < btnCmp.length; i++) {
    btnCmp[i].addEventListener('click', function(){
      complTask.push(tasks.splice(i, 1))
      storage('key', tasks)
      storage('comp', complTask)
      createBlock(tasks, 'key')
      
      
    })
  }
}
complete()
*/

delTask = [];
/*
//Функция отвечает за перевод задания во вкладку удаленные//
const del = () => {
  for(let i = 0; i < btnDel.length; i++) {
    btnDel[i].addEventListener('click', function(){
      delTask.push(tasks.splice(i, 1))
      storage('key', tasks)
      storage('del', delTask)
      createBlock(tasks, 'key')
    })
  }
}
del()
*/


const complete = (i, task, key) => {
 
      complTask.push(task.splice(i, 1))
      storage(key, task)
      storage('comp', complTask)
      createBlock(task, key)
    })
  }
}

const del = (j, task, key) => {
 
      delTask.push(task.splice(j, 1))
      storage(key, task)
      storage('del', delTask)
      createBlock(task, key)
    })
  }
}


btnText.addEventListener('click', () => {
  tasks.push(new Task(input.value));
  storage('key', tasks)
  createBlock(tasks, 'key')


  input.value = '';
})


//конструкторы шаблонов//
function createBlock (task, key) {
 
  task = JSON.parse(localStorage.getItem(`${key}`))
  toDo.innerHTML = ''
  task.map((el) => {
    const div = document.createElement('div')
    toDo.appendChild(div)
    div.classList.add('todoOne')

    const h2 = document.createElement('h2')
    div.appendChild(h2)
    h2.classList.add('text-task')
    h2.innerHTML = el.text

    const divBtn = document.createElement('div')
    div.appendChild(divBtn)
    
    const btnComplete = document.createElement('button')
    divBtn.appendChild(btnComplete)
    btnComplete.classList.add('btn-task')
    btnComplete.innerHTML = 'complete'

    const btnDel = document.createElement('button')
    divBtn.appendChild(btnDel)
    btnDel.classList.add('btn-task-del')
    btnDel.innerHTML = 'del'
  })
 for(let i = 0; i < btnCmp.length; i++) {
    btnCmp[i].addEventListener('click', function(){
complete(btnCmp[i], task, key)
})
}



for(let j = 0; j < btnDel.length; j++) {
    btnDel[j].addEventListener('click', function(){
del(btnDel[j], task, key)

})
}

}
createBlock(tasks, 'key')



//вызов событий на кнопках навигации//

navBtn.addEventListener('click', () => {
  createBlock(complTask, 'comp')


})

navBtnActiv.addEventListener('click', () =>{
  createBlock (tasks, 'key')


}) 

navBtnDel.addEventListener('click', () => {
  createBlock(delTask, 'del')


})

















