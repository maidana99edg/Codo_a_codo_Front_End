var selectedRowValues = {};
var currentPage = 1; // Página actual
var recordsPerPage = 10; // Registros por página
var totalRecords = 0; // Total de registros en la tabla

function getPetsList() {
    const URL = "https://bercom01.pythonanywhere.com";
    var url = URL + '/pets';
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        
        // Mostrar los animales encontrados en el contenedor
        displayPetList(data);
      })
      .catch(function(error) {
        console.log('Error al buscar las mascotas.', error);
      });
  }

function displayPetList(pets) {
    var tableBody = $('.table-body');
    tableBody.empty();

    var startIndex = (currentPage - 1) * recordsPerPage;
    var endIndex = startIndex + recordsPerPage;

    var currentPets = pets.slice(startIndex, endIndex);
  
    if (pets.length === 0) {
      tableBody.append('<tr><td colspan="9">No se encontraron mascotas.</td></tr>');
    } else {
      for (var i = 0; i < currentPets.length; i++) {
        var pet = currentPets[i];
        var row = $('<tr>');
        row.append('<td class="column center-column radio-col"><input class="radio-btn" type="radio" name="pet-radio"></td>');
        row.append('<td class="column center-column id-col"><strong>' + pet.id + '</strong></td>');
        row.append('<td class="column">' + pet.name + '</td>');
        row.append('<td class="column">' + pet.type + '</td>');
        row.append('<td class="column">' + pet.breed + '</td>');
        row.append('<td class="column">' + pet.sex + '</td>');
        row.append('<td class="column">' + pet.description + '</td>');
        row.append('<td class="column">' + pet.image + '</td>');
        row.append('<td class="column center-column act-col"><button id="edit-btn" onclick="showEditPetRow()" class="t-btn-inactive" disabled><i class="fa-regular fa-pen-to-square"></i></button><button id="del-btn" onclick="deletePet()" class="t-btn-inactive" disabled><i class="fa-solid fa-trash"></i></button></td>');
  
        tableBody.append(row);
      }
        // Actualizar el total de registros
        totalRecords = pets.length;

        // Mostrar los botones de paginación
        renderPaginationButtons(pets);
    }
  }

  function renderPaginationButtons(pets) {
    var paginationContainer = $('.pag-buttons');
    paginationContainer.empty();
  
    var totalPages = Math.ceil(totalRecords / recordsPerPage);

    // Botón Anterior
    var prevButton = $('<button>').text('Previo ').addClass('pagination-button');
    prevButton.append('<strong><i class="fa-solid fa-angles-left"></i></strong>');
    prevButton.prop('disabled', currentPage === 1);
    prevButton.on('click', function() {
      if (currentPage > 1) {
        currentPage--;
        displayPetList(pets);
      }
    });
    prevButton.css('cursor', 'pointer');
    paginationContainer.append(prevButton);
  
    // Botón Siguiente
    var nextButton = $('<button>').addClass('pagination-button');
    nextButton.append('<strong><i class="fa-solid fa-angles-right"></i></strong>');
    nextButton.append(' Siguiente')
    nextButton.prop('disabled', currentPage === totalPages);
    nextButton.on('click', function() {
      if (currentPage < totalPages) {
        currentPage++;
        displayPetList(pets);
      }
    });
    nextButton.css('cursor', 'pointer');
    paginationContainer.append(nextButton);
  }
  
  // Función auxiliar para asignar el evento de clic a los botones de página
  function goToPage(page) {
    return function() {
      currentPage = page;
      displayPetList(pets);
    };
  }

  function getLastPetCode() {
    const URL = "https://bercom01.pythonanywhere.com";
    var url = URL + '/pets';
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var lastCode = data.length > 0 ? data[data.length - 1].id : 0;
        var newCode = lastCode + 1;
        return newCode;
      })
      .catch(function(error) {
        console.log('Error al obtener el último código de mascota:', error);
        return 0;
      });
  }

  function showAddPetRow() {
    getLastPetCode()
      .then(function(newCode) {
        var addRow = $('<tr class="add-pet-row">');
        addRow.append('<td></td>');
        addRow.append('<td class="column center-column id-col"><input type="text" class="form-input add-code" id="add_id" value="' + newCode + '" readonly></td>');
        addRow.append('<td class="column"><input class="form-input" type="text" id="add-name"></td>');
        addRow.append('<td class="column"><input class="form-input" type="text" id="add-type"></td>');
        addRow.append('<td class="column"><input class="form-input" type="text" id="add-breed"></td>');
        addRow.append('<td class="column"><select class="form-input" id="add-sex-select"></select></td>');
        addRow.append('<td class="column"><input class="form-input" type="text" id="add-description"></td>');
        addRow.append('<td class="column"><input class="form-input" type="text" id="add-image"></td>');
        addRow.append('<td class="column center-column act-col"><button class="t-btn" onclick="savePet()"><i class="fa-solid fa-save"></i></button><button class="t-btn" onclick="cancelAddPet()"><i class="fa-solid fa-times"></i></button></td>');
    
        $('.table-body').prepend(addRow);
        toggleRadioButtons(false);
        disableEditDeleteButtons();
        disableAddButton();
        disablePaginationButton();
  
        const URL = "https://bercom01.pythonanywhere.com";
  
        // Realizar la solicitud HTTP para obtener los tipos de mascota
        fetch(URL + '/pet-sex')
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            var selectSex = $('#add-sex-select');
  
            // Construir las opciones del select de sexos
            var placeholderOption = $('<option>').val('').text('Sexo').prop('disabled', true).prop('selected', true).prop('hidden', true);
            selectSex.append(placeholderOption);
  
            for (var i = 0; i < data.length; i++) {
              var option = $('<option>').val(data[i]).text(data[i]);
              selectSex.append(option);
            }
          });
      })
      .catch(function(error) {
          console.log('Error al obtener el último código de mascota:', error);
      });
  }
  

  function savePet() {
    var id = parseInt($('.add-code').val()); // Convertir el código a entero
    var name = $('#add-name').val();
    var type = $('#add-type').val();
    var breed = $('#add-breed').val();
    var sex = $('#add-sex-select').val();
    var description = $('#add-description').val();
    var image = $('#add-image').val();
  
    // Crear un objeto con los datos de la nueva mascota
    var newPet = {
      id: id,
      name: name,
      type: type,
      breed: breed,
      sex: sex,
      description: description,
      image: image
    };
    // Realizar la petición POST para guardar la nueva mascota
  $.ajax({
    url: 'https://bercom01.pythonanywhere.com/pets',
    type: 'POST',
    data: JSON.stringify(newPet),
    contentType: 'application/json',
    success: function(response) {
      // Éxito: la mascota se guardó correctamente
      console.log('Mascota guardada:', response);
      clearFields();
      cancelAddPet();
      enableAddButton();
      enablePaginationButton();
      showMessage('La mascota se guardó exitosamente', 'success');
      getPetsList(); // Actualizar la tabla de mascotas
    },
    error: function(error) {
      // Error al guardar la mascota
      console.log('Error al guardar la mascota:', error);
      showMessage('Error al guardar la mascota', 'error');
    }
  });
  }

function showEditPetRow() {
  var addRow = $('<tr class="add-pet-row">');
  addRow.append('<td></td>');
  addRow.append('<td class="column center-column id-col"><input type="text" class="form-input add-code" id="add_id" readonly></td>');
  addRow.append('<td class="column"><input class="form-input" type="text" id="add-name"></td>');
  addRow.append('<td class="column"><input class="form-input" type="text" id="add-type"></td>');
  addRow.append('<td class="column"><input class="form-input" type="text" id="add-breed"></td>');
  addRow.append('<td class="column"><select class="form-input" id="add-sex-select"></select></td>');
  addRow.append('<td class="column"><input class="form-input" type="text" id="add-description"></td>');
  addRow.append('<td class="column"><input class="form-input" type="text" id="add-image"></td>');
  addRow.append('<td class="column center-column act-col"><button class="t-btn" onclick="updatePet()"><i class="fa-solid fa-save"></i></button><button class="t-btn" onclick="cancelAddPet()"><i class="fa-solid fa-times"></i></button></td>');

  $('.table-body').prepend(addRow);
  toggleRadioButtons(false);
  disableEditDeleteButtons();
  disableAddButton();
  disablePaginationButton();

  const URL = "https://bercom01.pythonanywhere.com";

  // Realizar la solicitud HTTP para obtener los sexos de mascota
  fetch(URL + '/pet-sex')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var selectSex = $('#add-sex-select');

      // Construir las opciones del select de sexos
      var placeholderOption = $('<option>').val('').text('Seleccione el sexo').prop('disabled', true).prop('selected', true).prop('hidden', true);
      selectSex.append(placeholderOption);

      for (var i = 0; i < data.length; i++) {
        var option = $('<option>').val(data[i]).text(data[i]);
        selectSex.append(option);
      }

      // Asignar los valores a los campos de edición
      var id = selectedRowValues.id;
      var name = selectedRowValues.name;
      var type = selectedRowValues.type;
      var breed = selectedRowValues.breed;
      var sex = selectedRowValues.sex;
      var description = selectedRowValues.description;
      var image = selectedRowValues.image;

      addRow.find('#add_id').val(id);
      addRow.find('#add-name').val(name);
      addRow.find('#add-type').val(type);
      addRow.find('#add-breed').val(breed);
      addRow.find('#add-sex-select').val(sex);
      addRow.find('#add-description').val(description);
      addRow.find('#add-image').val(image);
    })
    .catch(function(error) {
      console.log('Error al obtener los sexos de mascota:', error);
    });
}
  function selectPetRow() {
    var selectedRadio = $(this);
    var row = selectedRadio.closest('tr');

    // Obtener los valores de los campos de la fila seleccionada
    var id = row.find('.id-col strong').text();
    var name = row.find('.column:eq(2)').text();
    var type = row.find('.column:eq(3)').text();
    var breed = row.find('.column:eq(4)').text();
    var sex = row.find('.column:eq(5)').text();
    var description = row.find('.column:eq(6)').text();
    var image = row.find('.column:eq(7)').text();

    // Almacenar los valores en la variable global
    selectedRowValues = {
      id: id,
      name: name,
      type: type,
      breed: breed,
      sex: sex,
      description: description,
      image: image
    };
  
    // Habilitar los iconos de la columna de acciones en la fila seleccionada
    var editButton = row.find('#edit-btn');
    var deleteButton = row.find('#del-btn');
    editButton.prop('disabled', false);
    deleteButton.prop('disabled', false);
    editButton.removeClass('t-btn-inactive');
    deleteButton.removeClass('t-btn-inactive');
    editButton.addClass('t-btn');
    deleteButton.addClass('t-btn');

    // Restablecer opciones cuando cambie el boton seleccionado
    var otherRows = $('.table-body tr').not(row);
    otherRows.find('#edit-btn').prop('disabled', true);
    otherRows.find('#del-btn').prop('disabled', true);
    otherRows.find('#edit-btn').addClass('t-btn-inactive');
    otherRows.find('#del-btn').addClass('t-btn-inactive');
    otherRows.find('#edit-btn').removeClass('t-btn');
    otherRows.find('#del-btn').removeClass('t-btn');
  }

  function updatePet() {
    var id = selectedRowValues.id;

    var updName = $('#add-name').val();
    var updType = $('#add-type').val();
    var updBreed = $('#add-breed').val();
    var updSex = $('#add-sex-select').val();
    var updDescription = $('#add-description').val();
    var updImage = $('#add-image').val();
    
    // Crear un objeto con los datos de la nueva mascota
    var updatePet = {
      name: updName,
      type: updType,
      breed: updBreed,
      sex: updSex,
      description: updDescription,
      image: updImage
    };

    // Realizar la petición PUT para actualizar la mascota seleccionada
  $.ajax({
    url: 'https://bercom01.pythonanywhere.com/pets/' + id,
    type: 'PUT',
    data: JSON.stringify(updatePet),
    contentType: 'application/json',
    success: function(response) {
      // Éxito: la mascota se guardó correctamente
      console.log('Mascota actualizada:', response);
      clearFields();
      cancelAddPet();
      enableAddButton();
      disablePaginationButton();
      showMessage('La mascota se actualizó exitosamente', 'success');
      getPetsList();
    },
    error: function(error) {
      // Error al guardar la mascota
      console.log('Error al actualizar la mascota:', error);
      showMessage('Error al actualizar la mascota', 'error');
    }
  });
  }

  function deletePet() {
    var id = selectedRowValues.id;
  
    // Mostrar notificación para confirmar la eliminación
    var confirmation = confirm('¿Estás seguro de que deseas eliminar esta mascota?');
    if (confirmation) {
      // Realizar la petición DELETE para eliminar la mascota
      $.ajax({
        url: 'https://bercom01.pythonanywhere.com/pets/' + id,
        type: 'DELETE',
        success: function(response) {
          // Éxito: la mascota se eliminó correctamente
          console.log('Mascota eliminada:', response);
          showMessage('La mascota se eliminó exitosamente', 'success');
          getPetsList(); // Actualizar la tabla de mascotas
        },
        error: function(error) {
          // Error al eliminar la mascota
          console.log('Error al eliminar la mascota:', error);
          showMessage('Error al eliminar la mascota', 'error');
        }
      });
    }
  }
 //------ FUNCIONES COMPLEMENTARIAS ----------//
  function cancelAddPet() {
    clearFields();
    getPetsList();
    $('.table-body tr:first-child').remove();
    toggleRadioButtons(true);
    enableAddButton();
    disablePaginationButton();
    var selectedRow = $('.table-body tr.add-pet-row').prev();
    var editButton = selectedRow.find('.edit-action-btn');
    var deleteButton = selectedRow.find('.delete-action-btn');
    editButton.prop('disabled', false);
    deleteButton.prop('disabled', false);
    editButton.removeClass('t-btn-inactive');
    deleteButton.removeClass('t-btn-inactive');
  }
  
  function clearFields() {
    $('#add-name').val('');
    $('#add-type').val('');
    $('#add-breed').val('');
    $('#add-sex').val('');
    $('#add-description').val('');
    $('#add-image').val('');
  }

  function showMessage(message, type) {
    var messageContainer = $('.message-container');
    messageContainer.text(message);
    messageContainer.addClass(type);
    messageContainer.show();
    setTimeout(function() {
      messageContainer.hide();
      messageContainer.removeClass(type);
    }, 3000);
  }

  function toggleRadioButtons(enabled) {
    $('input[name="pet-radio"]').prop('disabled', !enabled);
  }

  function disableEditDeleteButtons() {
    $('.table-body #edit-btn').prop('disabled', true);
    $('.table-body #del-btn').prop('disabled', true);
    $('.table-body #edit-btn').addClass('t-btn-inactive');
    $('.table-body #del-btn').addClass('t-btn-inactive');
  }

  function disableAddButton() {
    $('.add-button').prop('disabled', true);
    $('.add-button').removeClass('t-btn');
    $('.add-button').addClass('t-btn-inactive');
  }

  function enableAddButton() {
    $('.add-button').prop('disabled', false);
    $('.add-button').removeClass('t-btn-inactive');
    $('.add-button').addClass('t-btn');
  }

  function enablePaginationButton(){
    $('.pagination-button').prop('disabled', false);
    $('.pagination-button').css('cursor', 'pointer');
  }

  function disablePaginationButton(){
    $('.pagination-button').prop('disabled', true);
    $('.pagination-button').css('cursor', 'none');
  }

  $(document).ready(function() {
    // Obtener el listado de mascotas al cargar la página
    getPetsList();

    // Agregar el controlador de eventos a los botones de radio
    $('.table-body').on('click', 'input[name="pet-radio"]', selectPetRow);
  });
