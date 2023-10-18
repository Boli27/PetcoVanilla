const infoUser = document.getElementById('profile')
const nombre = document.getElementById('name');
const email = document.getElementById('email');


document.addEventListener('DOMContentLoaded', async (e) => {
    
    const token = localStorage.getItem("token")

    e.preventDefault()
    await fetch('http://127.0.0.1:3000/user/UserInfo', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + `${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        nombre.innerHTML = `${data.nombre}`;
        email.innerHTML = `${data.email}`;
    })
    .catch(error => {
        console.log('Error al obtener la información del usuario:', error);
    });
});


function redirigir() {
    localStorage.removeItem("token")
    window.location.href = '../HTML/RegisterPet.html';
};