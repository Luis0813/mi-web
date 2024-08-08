const contenedor = document.getElementById('container')
const formulario = document.getElementById('formulario')
const template  = document.getElementById('template-alert').content
let  listaTarea = document.getElementById('lista-Tareas')
const input =  document.getElementById('input')
const fragments = document.createDocumentFragment()

let tareas  =  {

}
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tareasPendientes')) {
        tareas = JSON.parse(localStorage.getItem('tareasPendientes'))
    }
    pintarTareas()
})
listaTarea.addEventListener('click', e => {
    btnAction(e)
})
formulario.addEventListener('submit', e => {
    e.preventDefault()

    setTarea()
})
function setTarea(e) {
    if (input.value === '') {
        alert('campo vacio')
        console.log('campo vacio');
       return
    }
    console.log('diste click');
 
    const tarea = {
        id: Date.now(),
        texto:input.value,
        estado:false
        }

        tareas[tarea.id] =  tarea  
       /*  console.log(tareas) */

    formulario.reset()
    input.focus()
    pintarTareas()
}

const pintarTareas = () => {

    localStorage.setItem('tareasPendientes', JSON.stringify(tareas))

    if (Object.values(tareas).length == 0) {
        listaTarea.innerHTML=`    
        <div class="text-center  alert  alert-dark">
            No hay tareas🥳
        </div>`
        return
    }
    listaTarea.innerHTML = null
    Object.values(tareas).forEach(tarea => {
        const clone = template.cloneNode(true)
        if (tarea.estado ==true) {
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelector('.fas').classList.replace('fa-check-circle', 'fa-undo-alt')
            clone.querySelector('p').style.textDecoration =  'line-through'
        }
            clone.querySelector('p').textContent = tarea.texto
            clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
            clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
        fragments.appendChild(clone)
    })
    listaTarea.appendChild(fragments)
}
const btnAction = (e) => {
    if(e.target.classList.contains('fa-check-circle')){
            tareas[e.target.dataset.id].estado = true
            pintarTareas()  
            console.log(tareas) 
            
    }else if (e.target.classList.contains('fa-minus-circle')) {
     delete tareas[e.target.dataset.id]
     pintarTareas()
     console.log(tareas)
    }
    else if(e.target.classList.contains('fa-undo-alt')){
        tareas[e.target.dataset.id].estado = false
        pintarTareas()
    }
    e.stopPropagation()
}



