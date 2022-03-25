
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
if(localStorage) {
  tasks = JSON.parse(localStorage.getItem('keys'))  ;
} else{
  tasks = []
} 



//запись в хранилище//
const storage = () => {
  localStorage.setItem('keys', JSON.stringify(tasks))
};
const storageCompleted = () => {
  localStorage.setItem('comp', JSON.stringify(complTask))
}
const storageDel = () => {
  localStorage.setItem('del', JSON.stringify(delTask))
}


btnText.addEventListener('click', () => {
  tasks.push(new Task(input.value));
  storage()
  createBlock()
  input.value = '';
})




//кнопки навигации//
const navBtn = document.getElementById('btnTwo')
const navBtnActiv = document.getElementById('btnOne')
const navBtnDel = document.getElementById('btnThree')

let complTask = [];

//функция отвечает за перевод задания во вкладку завершенные//
const complete = () => {
  for(let i = 0; i < btnCmp.length; i++) {
    btnCmp[i].addEventListener('click', function(){
      complTask.push(tasks.splice(i, 1))
      storage()
      storageCompleted()
      createBlock()
    })
  }
}
complete()

delTask = [];

//Функция отвечает за перевод задания во вкладку удаленные//
const del = () => {
  for(let i = 0; i < btnDel.length; i++) {
    btnDel[i].addEventListener('click', function(){
      delTask.push(tasks.splice(i, 1))
      storage()
      storageDel()
      createBlock()
    })
  }
}
del()
//конструкторы шаблонов//
const createBlockDel = () => {
  toDo.innerHTML = ''
  delTask = JSON.parse(localStorage.getItem('del'))
  delTask.map((el) => { el.map((e) => {
    const div = document.createElement('div')
    toDo.appendChild(div)
    div.classList.add('todoOne')

    const h2 = document.createElement('h2')
    div.appendChild(h2)
    h2.classList.add('text-task')
    h2.innerHTML = e.text

    const divBtn = document.createElement('div')
    div.appendChild(divBtn)
    /*
    const btnComplete = document.createElement('button')
    divBtn.appendChild(btnComplete)
    btnComplete.classList.add('btn-task')
    btnComplete.innerHTML = 'return'

    const btnDel = document.createElement('button')
    divBtn.appendChild(btnDel)
    btnDel.classList.add('btn-task-del')
    btnDel.innerHTML = 'del'
    */
    })
    complete()
  })
}

const createBlockComp = () => {
  toDo.innerHTML = ''
  complTask = JSON.parse(localStorage.getItem('comp'))
  complTask.map((el) => { el.map((e) => {
    const div = document.createElement('div')
    toDo.appendChild(div)
    div.classList.add('todoOne')

    const h2 = document.createElement('h2')
    div.appendChild(h2)
    h2.classList.add('text-task')
    h2.innerHTML = e.text

    const divBtn = document.createElement('div')
    div.appendChild(divBtn)
    /*
    const btnComplete = document.createElement('button')
    divBtn.appendChild(btnComplete)
    btnComplete.classList.add('btn-task')
    btnComplete.innerHTML = 'return'

    const btnDel = document.createElement('button')
    divBtn.appendChild(btnDel)
    btnDel.classList.add('btn-task-del')
    btnDel.innerHTML = 'del'
    */
    })
    complete()
    del()  
  })
}


const createBlock = () => {
  toDo.innerHTML = ''
  tasks.map((el) => {
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
  complete()
      del()
}
createBlock();


//вызов событий на кнопках навигации//

navBtn.addEventListener('click', () => {
  createBlockComp()
})

navBtnActiv.addEventListener('click', () =>{
  createBlock ()
}) 

navBtnDel.addEventListener('click', createBlockDel)

















