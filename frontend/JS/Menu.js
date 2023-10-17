const infoUser = document.getElementById('profile')
const nombre = document.getElementById('name');
const email = document.getElementById('email');


document.addEventListener('DOMContentLoaded', async (e) => {


    e.preventDefault()
    await fetch('http://127.0.0.1:3000/user/UserInfo', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM4LCJpYXQiOjE2OTc1MDgxMjl9.6njuEmI_NP1EZ_QGSAkBOSZkcVNulOY13-FNk_nkIcA'
        }
    })
    .then(response => response.json())
    .then(data => {
        nombre.innerHTML = `${data.nombre}`;
        email.innerHTML = `${data.email}`;
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });
});




function redirigir() {
    window.location.href = '../HTML/RegisterPet.html';
};