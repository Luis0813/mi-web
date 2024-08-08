const contenedor = document.getElementById('contenedor')
const formulario = document.getElementById('formulario')
const input = document.getElementById('input')
const btnRegitrarse = document.getElementById('btn-registrarse')
const contenedorDeTareas = document.getElementById('contenedor-de-tareas')
const template =document.getElementById('template').content
let listaDeTareas = document.getElementById('lista-de-tareas')
const fracmento =document.createDocumentFragment()
let fas = document.getElementById('fas')
let fast = document.getElementById('fast')
let btnY = document.getElementById('btnY')

let tareas = {
}

document.addEventListener('DOMContentLoaded', e => {
    localStorage.getItem('tareasPendientes')
   tareas = JSON.parse(localStorage.getItem('tareasPendientes'))
    pintaTareas(e)
} )
listaDeTareas.addEventListener('click', e => {
    console.log(e)
    btnActive(e)

    
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

        const tarea = {
            id:Date.now(),
            texto:input.value,
            estado:false,
    }

    tareas[tarea.id] =  tarea  
    console.log(tareas)
    formulario.reset()
    formulario.focus()
    pintaTareas()
    
}
function pintaTareas(){

    localStorage.setItem('tareasPendientes', JSON.stringify(tareas))

if (Object.values(tareas).length == 0) {
    listaDeTareas.innerHTML = `<div><p class="null">No tienes tareas pendientes</p></div>`
    return
    }
   
    listaDeTareas.innerHTML = null
  
        Object.values(tareas).forEach(tarea => {
            const clon = template.cloneNode(true)
            if (tarea.estado == true) {
                clon.querySelector('p').style.textDecoration =  'line-through'
                clon.querySelector('.contenedor-de-tareas').style.background = '#F9DBBA'
            }else if (tarea.estado == false){
                clon.querySelector('p').style.textDecoration =  'none'
            }
            clon.querySelector('p').textContent = tarea.texto
            clon.querySelectorAll('.fas')[0].dataset.id= tarea.id
            clon.querySelectorAll('.fast')[0].dataset.id= tarea.id

            fracmento.appendChild(clon)
        });
    listaDeTareas.appendChild(fracmento)
  
}
function btnActive(e) {
    if(e.target.classList.contains('fast') ){
        delete  tareas[e.target.dataset.id]
        pintaTareas()
    }else if (e.target.classList.contains('fas') &&   tareas[e.target.dataset.id].estado == false) {
        tareas[e.target.dataset.id].estado = true
        pintaTareas()
        console.log(tareas);
    }else if (e.target.classList.contains('fas') &&   tareas[e.target.dataset.id].estado == true) {
        tareas[e.target.dataset.id].estado = false
        pintaTareas()
        console.log(tareas);}
    e.stopPropagation()
}
