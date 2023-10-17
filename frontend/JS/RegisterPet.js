const form = document.getElementById('form');
const nombre = document.getElementById('idnombre');
const especie = document.getElementById('idespecie');
const raza = document.getElementById('idraza');
const edad = document.getElementById('idedad');
const listSection = document.querySelectorAll('.section');

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value
    const especie = e.target.especie.value
    const raza = e.target.raza.value
    const edad = e.target.edad.value

    let condicionvalidacion = ValidarFormulario();
    if (condicionvalidacion) {
        await EnviarFormulario(nombre,especie,raza,edad);
    }

})

function MostrarMensajeError(claseinput, mensaje) {
    let salida = document.querySelector(`.${claseinput}`);
    salida.lastElementChild.innerHTML = mensaje;
}

function ValidarFormulario() {
    form.lastElementChild.innerHTML = "";
    let condicion = true;
    listSection.forEach((element) => {
        element.lastElementChild.innerHTML = "";
    });
    if (nombre.value.length < 1 || nombre.value.trim() == "") {
        MostrarMensajeError("nombre", "El campo no puede estar vacio")
        condicion = false;
    }
    if (especie.value.length < 1 || especie.value.trim() == "") {
        MostrarMensajeError("especie", "El campo no puede estar vacio")
        condicion = false;
    }
    if (raza.value.length < 1 || raza.value.trim() == "") {
        MostrarMensajeError("raza", "El campo no puede estar vacio")
        condicion = false;
    }
    if (edad.value.length < 1 || isNaN(edad.value || isNaN(edad.value))) {
        MostrarMensajeError("edad", "El campo no puede estar vacio y solo numeros");
        condicion = false;
    }
    return condicion;
}

function EnviarFormulario(nombre, especie, raza, edad) {
    fetch('http://127.0.0.1:3000/pet/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre: nombre, especie: especie, raza: raza, edad: edad }),
    })
    form.reset();
    document.getElementById('mensajeexito').innerHTML = "Mascota Registrado";
};