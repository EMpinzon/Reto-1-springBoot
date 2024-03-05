

// este codigo funciona de manera que tienes un formulario y un 'boton actualizar' por cada plato..... si el boto
// actualizar esta verde, puede modificar el plato en el formulario, pero si todos los botones estan en rojo, el formulario 
// creara un nuevo plato,   puedes activar y desactivar el boton actualizar haciendo click sobre el 

let contenedorPlatos = document.querySelector(".contenedor-platos");
let formulario1 = document.querySelector(".formulario");
let botonActivo = null;


formulario1.addEventListener('submit',   async (e) =>{
    guardarPlato(e)

}  );



async function cargarPagina(res){
    let formulario = document.querySelector(".formulario");
    while(contenedorPlatos.firstChild){
        contenedorPlatos.removeChild(contenedorPlatos.firstChild);
    }

    let campos = formulario.querySelectorAll(`input[type='text']`);
    campos.forEach(element => {element.value=""});

    res.forEach(element => {
        
        contenedorPlatos.insertAdjacentHTML("beforeend",`
        <div class= "plato-info">

            <span  >  ${element.id}  </span>
            <span  >  ${element.nombre}   </span>
            <span>    ${element.descripcion}  </span>
            <span>    ${element.precio}   </span>

            <button class="boton-actualizar boton-actualizar-${element.id}"> actualizar </button>
            <button  class="boton-eliminar   boton-eliminar-${element.id}" > eliminar </button>
        </div>
        
        `)

    });

    let botonesEliminar = document.querySelectorAll(".boton-eliminar");
    let botonesActualizar = document.querySelectorAll(".boton-actualizar");
    

    botonesActualizar.forEach(boton => {
        boton.addEventListener("click", async(e)=>{
            activarActualizar(e.target);
    
        }  );
    
    })
    botonesEliminar.forEach(boton=>{ 
    
        boton.addEventListener("click", async(e)=>{
            eliminarPlato(e.target);
    
        } );
    } )
}






async function eliminarPlato(boton){

    const datos = boton.parentNode;
    let idEliminar  = datos.firstElementChild;
    console.log(idEliminar);
    config = {};
    config.method = 'DELETE'
    await fetch(`http://localhost:8080/api/platos/${idEliminar.textContent}`,config);
    cargarPagina (await((await fetch("http://localhost:8080/api/platos")).json()));



}







async function actualizarPlato( id,e ){
    e.preventDefault(); 
    
    const formulario = e.target;
    const valoresFormulario =  Object.fromEntries(new FormData(formulario));

    const datosGuardar = {  "nombre": valoresFormulario.nombre , "descripcion": valoresFormulario.descripcion , "precio" : valoresFormulario.precio  };
    config = {};
    config.method = 'PUT'
    config.body = JSON.stringify(datosGuardar);
    config.headers = {
        "Content-Type": "application/json" 
    }

    await fetch(`http://localhost:8080/api/platos/${id.textContent}`,config);

    cargarPagina (await((await fetch("http://localhost:8080/api/platos")).json()));

}



async function guardarPlato(e){
    e.preventDefault(); 
    const formulario = e.target;
    const valoresFormulario =  Object.fromEntries(new FormData(formulario));

    const datosGuardar = {  "nombre": valoresFormulario.nombre , "descripcion": valoresFormulario.descripcion , "precio" : parseFloat(valoresFormulario.precio)  };
    config = {};
    config.method = 'POST'
    config.body = JSON.stringify(datosGuardar);
    console.log(config.body);
    config.headers = {
        "Content-Type": "application/json" 
    }

    await fetch(`http://localhost:8080/api/platos`,config);
    cargarPagina (await((await fetch("http://localhost:8080/api/platos")).json())); 

}

function desactivarBotones(){
    let formulario = document.querySelector(".formulario");
    let botonesActualizar = document.querySelectorAll(".boton-actualizar");
    console.log(botonesActualizar);
    botonesActualizar.forEach(boton=>{
        boton.style.backgroundColor  = 'red';

    });
    botonActivo = null;
    formulario.addEventListener("submit", (e)=>{ guardarPlato(e)} );
}

function activarBoton(boton){
    formulario = document.querySelector(".formulario");
    if(botonActivo !== null){

        botonActivo.style.backgroundColor = 'red';
    }
    boton.style.backgroundColor = 'green';
    botonActivo = boton;
    const datos = boton.parentNode;
    formulario.addEventListener("submit", (e)=>{
        actualizarPlato( datos.firstElementChild , e ) 
    }   );

}

async function activarActualizar (boton){

    formulario = document.querySelector(".formulario");
    
    if(boton === botonActivo){
       
        

        let formularioCLon = formulario.cloneNode(true);
        formulario.parentNode.replaceChild(formularioCLon,formulario);
        
        desactivarBotones();

    }else{
        let formularioCLon = formulario.cloneNode(true);
        formulario.parentNode.replaceChild(formularioCLon,formulario);
        activarBoton(boton);

    }

}

document.addEventListener('DOMContentLoaded',async ( ) =>{
    cargarPagina (await((await fetch("http://localhost:8080/api/platos")).json()));  
    


} );





