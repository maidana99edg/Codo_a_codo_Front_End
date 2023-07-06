//Agregar el codigo para armar la parte de busqueda
// Paso 1: Obtener referencias a los elementos del formulario y de la lista
const lista = document.getElementById('inputSelect');

// Paso 2: Crear un array de datos
const datos = ['Tipo', 'Raza', 'Sexo'];

// Paso 3: Crear una opción de placeholder
const placeholderOption = document.createElement('option');
placeholderOption.value = '';
placeholderOption.disabled = true;
placeholderOption.selected = true;
placeholderOption.hidden = true;
placeholderOption.textContent = 'Seleccione una opción';

lista.appendChild(placeholderOption);

// Paso 4: Recorrer los datos y crear opciones
datos.forEach((opcion) => {
  // Paso 5: Crear un elemento de opción
  const opcionElemento = document.createElement('option');

  // Paso 6: Establecer el valor y texto de la opción
  opcionElemento.value = opcion;
  opcionElemento.textContent = opcion;

  // Agregar la opción a la lista
  lista.appendChild(opcionElemento);
});

$(document).ready(function() {
    // Obtener referencias a los elementos relevantes
    var formType = $('#form-type');
    var formSex = $('#form-sex');
    var formBreed = $('#form-breed');
    var inputSelect = $('#inputSelect');
    var formButton = $('#form-btn')
    var formresetButton = $('#resetBtn')
  
    // Establecer el evento de cambio para el selector inputSelect
    inputSelect.on('change', toggleInputs);

    // Ocultar todos los elementos
    formType.hide();
    formSex.hide();
    formBreed.hide();
    formButton.hide();
    formresetButton.hide();

    // Función para mostrar u ocultar los elementos según la opción seleccionada
    function toggleInputs() {
      var selectedOption = inputSelect.val();

        // Ocultar todos los elementos
        formType.hide();
        formSex.hide();
        formBreed.hide();
        formButton.hide();
        formresetButton.hide();
  
      // Mostrar el elemento correspondiente según la opción seleccionada
      if (selectedOption === 'Tipo') {
        formType.show();
        formButton.show();
        formresetButton.show()
        formSex.hide();
        formBreed.hide();
      } else if (selectedOption === 'Sexo') {
        formSex.show();
        formButton.show();
        formresetButton.show()
        formType.hide();
        formBreed.hide();
      } else if (selectedOption === 'Raza') {
        formBreed.show();
        formButton.show();
        formresetButton.show()
        formSex.hide();
        formType.hide();
      }
    }
  });

  $(document).ready(function() {
    var inputType = $('#inputType');
    var inputBreed = $('#inputBreed');
    var inputSex = $('#inputSex');

    const URL = "https://bercom01.pythonanywhere.com"

    // Realizar la solicitud HTTP para obtener los tipos de mascota
    fetch(URL + '/pet-types')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Construir las opciones del select de tipos
        var placeholderOption = $('<option>').val('').text('Seleccione un tipo de mascota').prop('disabled', true).prop('selected', true).prop('hidden', true);
        inputType.append(placeholderOption);
        
        for (var i = 0; i < data.length; i++) {
          var option = $('<option>').val(data[i]).text(data[i]);
          inputType.append(option);
        }
      });

    // Realizar la solicitud HTTP para obtener los tipos de mascota
    fetch(URL + '/pet-sex')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Construir las opciones del select de tipos
      var placeholderOption = $('<option>').val('').text('Seleccione el sexo').prop('disabled', true).prop('selected', true).prop('hidden', true);
      inputSex.append(placeholderOption);
      
      for (var i = 0; i < data.length; i++) {
        var option = $('<option>').val(data[i]).text(data[i]);
        inputSex.append(option);
      }
    });
  
    // Realizar la solicitud HTTP para obtener las razas de mascota
    fetch(URL + '/pet-breeds')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Construir las opciones del select de razas
        var placeholderOption = $('<option>').val('').text('Seleccione una raza').prop('disabled', true).prop('selected', true).prop('hidden', true);
        inputBreed.append(placeholderOption);
        
        for (var i = 0; i < data.length; i++) {
          var option = $('<option>').val(data[i]).text(data[i]);
          inputBreed.append(option);
        }
      });
  });

$(document).ready(function() {
    // Obtener el catálogo de mascotas al cargar la página
    getCatalog();

    // Manejar la búsqueda de mascotas cuando se envía el formulario
    $('#buscador-form').on('submit', function(e) {
      e.preventDefault();
      searchPets();
    });

    // Restaurar el catálogo original cuando se hace clic en el botón Limpiar
    $('#resetBtn').on('click', function() {
      resetCatalog();
    });
  });

  // Función para obtener el catálogo de mascotas
  function getCatalog() {
    var petContainer = $('#catalog')[0];
    const URL = "https://bercom01.pythonanywhere.com"

    $(petContainer).empty();

    $.ajax({
      url: URL + '/pets', // Endpoint para obtener el catálogo desde el backend
      method: 'GET',
      success: function(data) {
        displayPets(data);
      },
      error: function(error) {
        console.log('Error al obtener el catálogo de mascotas:', error);
      }
    });
  }

  // Función para mostrar las mascotas en el catálogo
  function displayPets(pets) {
    var catalogDiv = $('#catalog');
    catalogDiv.empty();

    if (pets.length === 0) {
      catalogDiv.append('<p>No se encontraron mascotas.</p>');
    } else {
      for (var i = 0; i < pets.length; i++) {
        var pet = pets[i];
        var petCard = '<div class="cards">' +
                        '<img src="' + pet.image + '" alt="' + pet.name + '">' +
                        '<h4>' + pet.name + '</h4>' +
                        '<p><strong>Tipo: </strong>' + pet.type + '</p>' +
                        '<p><strong>Raza: </strong>' + pet.breed + '</p>' +
                        '<p><strong>Sexo: </strong>' + pet.sex + '</p>' +
                        '<p><strong>Descripción: </strong>' + pet.description + '</p>' +
                      '</div>';

        catalogDiv.append(petCard);
      }
    }
  }

// Función para realizar la búsqueda de mascotas
function searchPets() {
    var petType = $('#inputType').val();
    var petSex = $('#inputSex').val();
    var petBreed = $('#inputBreed').val();
  
    const URL = "https://bercom01.pythonanywhere.com";
  
    // Realizar la solicitud HTTP para buscar mascotas por tipo solo si se seleccionó un tipo
    if (petType) {
      var urlType = URL + '/pets/find_type/' + encodeURIComponent(petType);
      fetch(urlType)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          // Mostrar los animales encontrados en el contenedor
          displayPets(data);
        })
        .catch(function(error) {
          console.log('Error al realizar la búsqueda de mascotas por tipo:', error);
        });
    }
  
    // Realizar la solicitud HTTP para buscar mascotas por sexo solo si se seleccionó un sexo
    if (petSex) {
      var urlSex = URL + '/pets/find_sex/' + encodeURIComponent(petSex);
      fetch(urlSex)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          // Mostrar los animales encontrados en el contenedor
          displayPets(data);
        })
        .catch(function(error) {
          console.log('Error al realizar la búsqueda de mascotas por sexo:', error);
        });
    }
  
    // Realizar la solicitud HTTP para buscar mascotas por raza solo si se seleccionó una raza
    if (petBreed) {
      var urlBreed = URL + '/pets/find_breed/' + encodeURIComponent(petBreed);
      fetch(urlBreed)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          // Mostrar los animales encontrados en el contenedor
          displayPets(data);
        })
        .catch(function(error) {
          console.log('Error al realizar la búsqueda de mascotas por raza:', error);
        });
    }
  }
  

  // Función para restaurar el catálogo original de mascotas
  function resetCatalog() {
    getCatalog();
    // Restablecer la selección del campo de selección
    $(inputSelect).val('').trigger('change');
    $(inputType).val('').trigger('change');
    $(inputSex).val('').trigger('change');
    $(inputBreed).val('').trigger('change'); // Resetear el valor y disparar el evento de cambio
  }