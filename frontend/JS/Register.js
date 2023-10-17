const nombre = document.getElementById("idnombre");
const email = document.getElementById("idemail");
const telefono = document.getElementById("idtelefono");
const pass = document.getElementById("idpass");
const passconf = document.getElementById("idpassconf");
const form = document.getElementById("form");
const listInput = document.querySelectorAll(".inputs");
const listSection = document.querySelectorAll(".section");


form.addEventListener("submit", async(e) => {
    e.preventDefault();
    let message = ''
    
    const nombre = e.target.nombre.value
    const email = e.target.email.value
    const telefono = e.target.telefono.value
    const pass = e.target.pass.value
    let condicionvalidacion = ValidarFormulario();
    if (condicionvalidacion) {
        await validateEmail(nombre,email,telefono,pass);
    }
});

function ValidarFormulario() {
    form.lastElementChild.innerHTML = "";
    let condicion = true;
    listSection.forEach((element) => {
        element.lastElementChild.innerHTML = "";
    });
    if (nombre.value.length < 1 || nombre.value.trim() == "") {
        MostrarMensajeError("nombre", "Nombre invalido")
        condicion = false;
    }
    if (email.value.length < 1 || email.value.trim() == "") {
        MostrarMensajeError("email", "Email invalido")
        condicion = false;
    }
    if (telefono.value.length < 10 || telefono.value.trim() == "" || isNaN(telefono.value)) {
        MostrarMensajeError("telefono", "Telefono invalido")
        condicion = false;
    }
    if (pass.value.length < 6) {
        MostrarMensajeError("pass", "Contraseña incorrecta");
        condicion = false;
    }
    if (pass.value != passconf.value) {
        MostrarMensajeError("passconf", "Contraseña incorrecta");
        condicion = false;
    }
    return condicion;
}

function MostrarMensajeError(claseinput, mensaje) {
    let salida = document.querySelector(`.${claseinput}`);
    salida.lastElementChild.innerHTML = mensaje;
}

function validateEmail(nombre,email,telefono,pass) {  
    return fetch('http://127.0.0.1:3000/user/validarEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Correo electronico ya registrado');
        }
        return response.json();
    })
    .then(data => {
        // Si el correo está disponible, procede al registro
        if (data.message === 'El correo está disponible') {
            // Llama a la API de registro
            return EnviarFormulario(nombre, email, telefono, pass);
        } else {
            // El correo ya está registrado, muestra un mensaje de error
            document.getElementById('mensajeerror').innerHTML=error.message;
            // Puedes mostrar un mensaje al usuario aquí
        }
    })
    .catch(error => {
        console.error(error);
        // Muestra un mensaje de error al usuario
    });
}

function EnviarFormulario(nombre,email,telefono,pass) {
    let message =""
    fetch('http://127.0.0.1:3000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: nombre, email: email, telefono: telefono, pass: pass }),
        })
    form.reset();
    document.getElementById('mensajeexito').innerHTML="Usuario Registrado";
}

