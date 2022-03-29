//Смена бэкграунда активных кнопок навигации//
const buttons = document.getElementsByClassName('button');

for(let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function(){
    const current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

const input = document.querySelector('.text-input');
const btnText = document.querySelector('.add-text');
const toDo = document.querySelector('.to-do');


let tasks = JSON.parse(localStorage.getItem('key'))|| []
let currentStatus = 'active'


//запись в хранилище//
const storage = () => {
  localStorage.setItem('key', JSON.stringify(tasks))
};

function delTrash () {
  tasks.forEach((el, index) => {
    if(el.status === 'trash') {
       tasks.splice(index, 1)
    }
  })
  storage()
}
delTrash()


btnText.addEventListener('click', () => {
if(input.value.trim() === ''){
  alert('добавь задачу!')
}else{
  tasks.unshift({text: input.value, id: Date.now(), status: 'active'});
  storage()
  createBlock(tasks)
  input.value = '';
}
})

//кнопки навигации//
const navBtn = document.getElementById('btnTwo')
const navBtnActive = document.getElementById('btnOne')
const navBtnDel = document.getElementById('btnThree')


//функция отвечает за перевод задания во вкладки//
const changeStatus = (idNum, status) => {
  tasks.forEach(el => {
    if(el.id === idNum) {
      el.status = status
    }
  });
      storage()
      createBlock(tasks)
}

function createButton (arg1, arg2, arg3, arg4, arg5) {
  const btnDel = document.createElement('button')
  arg1.appendChild(btnDel)
  btnDel.classList.add(arg2)
  btnDel.innerHTML = arg3
  btnDel.addEventListener('click', () => {

    let idNum = arg4.id
    changeStatus(idNum, arg5)
  })
}
//конструкторы шаблонов//
function createBlock (task) {
  toDo.innerHTML = ''
  task.map((el) => {
    if(el.status === currentStatus) {
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
      createButton(divBtn, 'btn-task', 'завершить', el, 'completed' )
      createButton(divBtn, 'btn-task-del', 'удалить', el, 'deleted' )
    }else if(el.status === 'completed'){
      createButton(divBtn, 'btn-task', 'восстановить', el, 'active' )
      createButton(divBtn, 'btn-task-del', 'удалить', el, 'deleted' )
    }else{
      createButton(divBtn, 'btn-task', 'восстановить', el, 'active' )
      createButton(divBtn, 'btn-task-del', 'удалить совсем', el, 'trash' )
    }
    }
    })
  }
  createBlock(tasks)

//вызов событий на кнопках навигации//

navBtn.addEventListener('click', () => {
  let arrComp = tasks.filter((el) => el.status === "completed")
  currentStatus = 'completed'
  createBlock(arrComp)
})

navBtnActive.addEventListener('click', () =>{
  let arrActive = tasks.filter((el) => el.status === "active")
  currentStatus = 'active'
  createBlock(arrActive)
})

navBtnDel.addEventListener('click', () => {
  let arrDel = tasks.filter((el) => el.status === "deleted")
  currentStatus = 'deleted'
  createBlock(arrDel)
})

















