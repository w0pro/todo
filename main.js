
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



let tasks = JSON.parse(localStorage.getItem('key'))|| []


//Инициализация хранилища//



//запись в хранилище//
const storage = (key, arr) => {
  localStorage.setItem(`${key}`, JSON.stringify(arr))
};


btnText.addEventListener('click', () => {
if(input.value === ''){
  alert('добавь задачу!')
}else{
  tasks.push({text: input.value, id: Date.now(), status: 'active'});
  storage('key', tasks)
  createBlock(tasks, 'active')
  input.value = '';
}
  
})

//кнопки навигации//
const navBtn = document.getElementById('btnTwo')
const navBtnActiv = document.getElementById('btnOne')
const navBtnDel = document.getElementById('btnThree')


//функция отвечает за перевод задания во вкладку завершенные//
const complete = (idNum, sts) => {
  tasks.forEach(el => {
    if(el.id === idNum) {
      el.status = 'completed'
    }
  });
      storage('key', tasks)
      createBlock(tasks, `${sts}`)
}

//Функция отвечает за перевод задания во вкладку удаленные//
const del = (idNum, sts) => {
  tasks.forEach(el => {
    if(el.id === idNum) {
      el.status = 'deleted'
    }
  });
      storage('key', tasks)
      createBlock(tasks, `${sts}`)
}

const restore = (idNum, sts) => {
  tasks.forEach(el => {
    if(el.id === idNum) {
      el.status = 'active'
    }
  });
      storage('key', tasks)
      createBlock(tasks, `${sts}`)
}

//конструкторы шаблонов//
function createBlock (task, sts) {

  toDo.innerHTML = ''
  task.map((el) => {
    if(el.status === sts) {
    const div = document.createElement('div')
    toDo.appendChild(div)
    div.classList.add('todoOne')

    const h2 = document.createElement('h2')
    div.appendChild(h2)
    h2.classList.add('text-task')
    h2.innerHTML = el.text

    const divBtn = document.createElement('div')
    div.appendChild(divBtn)

    if(el.status === 'active') {
      const btnComplete = document.createElement('button')
    divBtn.appendChild(btnComplete)
    btnComplete.classList.add('btn-task')
    btnComplete.innerHTML = 'complete'
    btnComplete.addEventListener('click', (event) =>{
      event.currentTarget
      let idNum = el.id
      let sts = el.status
      complete(idNum, sts)
    })

    const btnDel = document.createElement('button')
    divBtn.appendChild(btnDel)
    btnDel.classList.add('btn-task-del')
    btnDel.innerHTML = 'del'
    btnDel.addEventListener('click', (event) =>{
      event.currentTarget
      let idNum = el.id
      let sts = el.status
      del(idNum, sts)
    })
    }else {
      const btnComplete = document.createElement('button')
    divBtn.appendChild(btnComplete)
    btnComplete.classList.add('btn-task')
    btnComplete.innerHTML = 'restore'
    btnComplete.addEventListener('click', (event) =>{
      event.currentTarget
      let idNum = el.id
      let sts = el.status
      restore(idNum, sts)
    })

    const btnDel = document.createElement('button')
    divBtn.appendChild(btnDel)
    btnDel.classList.add('btn-task-del')
    btnDel.innerHTML = 'del'
    btnDel.addEventListener('click', (event) =>{
      event.currentTarget
      let idNum = el.id
      let sts = el.status
      del(idNum, sts)
    })
    }
    
    }
  })

}
createBlock(tasks, 'active')



//вызов событий на кнопках навигации//

navBtn.addEventListener('click', () => {
  let arrComp = tasks.filter((el) => el.status === "completed")
  createBlock(arrComp, 'completed')
})

navBtnActiv.addEventListener('click', () =>{
  let arrActive = tasks.filter((el) => el.status === "active")
  createBlock(arrActive, 'active')
}) 

navBtnDel.addEventListener('click', () => {
  let arrDel = tasks.filter((el) => el.status === "deleted")
  createBlock(arrDel, 'deleted') 
})

















