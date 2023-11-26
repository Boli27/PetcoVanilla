
const token = localStorage.getItem("token")
if(!token){
    window.location=('../../frontend/HTML/ErrorPage.html')
}


document.addEventListener("DOMContentLoaded", function () {
    // Realiza la peticion a la API
    fetch('http://127.0.0.1:3000/pet/consultar', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + `${token}`, 
        },
    })
    .then(response => response.json())
    .then(data => {
        // Manipular el DOM para agregar filas a la tabla
        const mascotasTable = document.getElementById('mascotasTable').getElementsByTagName('tbody')[0];

        data.mascotas.forEach(mascota => {
            const newRow = mascotasTable.insertRow();
            newRow.insertCell(0).textContent = mascota.nombre; 
            newRow.insertCell(1).textContent = mascota.especie;
            newRow.insertCell(2).textContent = mascota.raza;
            newRow.insertCell(3).textContent = mascota.edad;
            newRow.insertCell(4).textContent = mascota.nombre_plan;    

        });
    })
    .catch(error => console.error('Error al obtener las mascotas:', error));
});




function BacktoMenu(){

    window.location.href = '../HTML/Menu.html';

}