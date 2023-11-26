    
    const email = document.getElementById("email")
    const pass = document.getElementById("pass")
    const form=document.getElementById("form")
    
    form.addEventListener("submit", function(e) {
    e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    const email = e.target.email.value 
    const pass = e.target.pass.value
    
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email:email, pass: pass }), 
    };
    // Realiza la solicitud a la API de inicio de sesión
    fetch('http://127.0.0.1:3000/user/login', requestOptions)
        
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al iniciar sesión");
            }
            return response.json();
        })
        .then(data => {
            // Maneja la respuesta del servidor aquí
            console.log(data);
            window.localStorage.setItem("token",data.token)
            window.location.href = '../HTML/Menu.html';
            // Redirige al menu puesto que si se inicio sesion 
        })
        .catch(error => {
            console.error(error.message);
            form.lastElementChild.innerHTML="Credenciales de iniciar sesion incorrectas"
            // Muestra un mensaje de error al usuario en caso de no poder iniciar sesion
        });
});