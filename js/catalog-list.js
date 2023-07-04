function getPets() {
    const URL = "http://127.0.0.1:5000/"
    //const URL = "https://arielcodo.pythonanywhere.com/"

    // Realizar una solicitud a la API
    fetch(URL + 'pets', {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        // Procesar la respuesta de la API
        showPets(data);
      })
      .catch(error => {
        console.error('Error al obtener las Mascotas:', error);
      });
  }

// Mostrar los perros en la página web
function showPets(data) {
  const petContainer = document.getElementById('catalog');

  //Iterar sobre los perros y mostrar su imagen e información
  data.forEach(pet => {
    const imagen = document.createElement('img');
    imagen.src = pet.image;

    const nombre = document.createElement('h4');
    nombre.textContent = pet.name;

    const descripcion = document.createElement('p');
    descripcion.textContent = "Descripción: " + pet.description;

    const tipo = document.createElement('p');
    tipo.textContent = "Tipo: " + pet.type;
    
    const raza = document.createElement('p');
    raza.textContent = "Raza: " + pet.breed;

    const sexo = document.createElement('p');
    sexo.textContent = "Sexo: " + pet.sex;

    // Agregar la imagen, nombre y temperamentos al contenedor de perros
    const cardContainer =  document.createElement('div');
    petContainer.appendChild(cardContainer)
    cardContainer.classList.add('cards')
    cardContainer.appendChild(imagen);
    cardContainer.appendChild(nombre);
    cardContainer.appendChild(descripcion);
    cardContainer.appendChild(tipo);
    cardContainer.appendChild(raza);
    cardContainer.appendChild(sexo);
  });
}

  getPets()