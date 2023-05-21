// Obtener el token de acceso
function getPets() {
    const apiKey = 'live_QAx4A2Z4N8cYKgZvrAPkGGrNfnrTp7CohoacnfA9KwFhKhlzauSxxYJ1qLTZfnI3';
  
    // Realizar una solicitud a la API
    fetch('https://api.thedogapi.com/v1/breeds', {
      headers: {
        "Content-Type": "application/json",
        'x-api-key': apiKey
      }
    })
      .then(response => response.json())
      .then(data => {
        // Procesar la respuesta de la API
        showPets(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error al obtener los perros:', error);
      });
  }

// Mostrar los perros en la página web
function showPets(data) {
    const petContainer = document.getElementById('catalog');
    

    //Iterar sobre los perros y mostrar su imagen e información
    data.forEach(pet => {
      const imagen = document.createElement('img');
      imagen.src = pet.image.url;

      const nombre = document.createElement('h4');
      nombre.textContent = pet.name;

      const conducta = document.createElement('p');
      conducta.textContent = pet.temperament;

      // Agregar la imagen, nombre y temperamentos al contenedor de perros
      const cardContainer =  document.createElement('div');
      petContainer.appendChild(cardContainer)
      cardContainer.classList.add('cards')
      cardContainer.appendChild(imagen);
      cardContainer.appendChild(nombre);
      cardContainer.appendChild(conducta);
    });
  }

getPets()