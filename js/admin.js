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
  
    if (pets.length === 0) {
      tableBody.append('<tr><td colspan="8">No se encontraron mascotas.</td></tr>');
    } else {
      for (var i = 0; i < pets.length; i++) {
        var pet = pets[i];
        var row = $('<tr>');
        row.append('<td class="column center-column id-col"><strong>' + pet.id + '</strong></td>');
        row.append('<td class="column">' + pet.name + '</td>');
        row.append('<td class="column">' + pet.type + '</td>');
        row.append('<td class="column">' + pet.breed + '</td>');
        row.append('<td class="column">' + pet.sex + '</td>');
        row.append('<td class="column">' + pet.description + '</td>');
        row.append('<td class="column">' + pet.image + '</td>');
        row.append('<td class="column center-column act-col"><button id="edit-btn" class="t-btn"><i class="fa-regular fa-pen-to-square"></i></button><button id="del-btn" class="t-btn"><i class="fa-solid fa-trash"></i></button></td>');
  
        tableBody.append(row);
      }
    }
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
            addRow.append('<td class="column center-column id-col"><input type="text" class="form-input add-code" value="' + newCode + '" readonly></td>');
            addRow.append('<td class="column"><input class="form-input" type="text" id="add-name"></td>');
            addRow.append('<td class="column"><input class="form-input" type="text" id="add-type"></td>');
            addRow.append('<td class="column"><input class="form-input" type="text" id="add-breed"></td>');
            addRow.append('<td class="column"><input class="form-input" type="text" id="add-sex"></td>');
            addRow.append('<td class="column"><input class="form-input" type="text" id="add-description"></td>');
            addRow.append('<td class="column"><input class="form-input" type="text" id="add-image"></td>');
            addRow.append('<td class="column center-column act-col"><button class="t-btn" onclick="savePet()"><i class="fa-solid fa-save"></i></button><button class="t-btn" onclick="cancelAddPet()"><i class="fa-solid fa-times"></i></button></td>');
        
            $('.table-body').prepend(addRow);
            disableTable();
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
    var sex = $('#add-sex').val();
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
      enableTable();
      clearFields();
      cancelAddPet();
      showMessage('La mascota se guardó exitosamente', 'success');
      getPetsList(); // Actualizar la tabla de mascotas
    },
    error: function(error) {
      // Error al guardar la mascota
      console.log('Error al guardar la mascota:', error);
      enableTable();
      showMessage('Error al guardar la mascota', 'error');
    }
  });
  }
  
  function cancelAddPet() {
    clearFields();
    $('.table-body tr:first-child').remove();
    enableTable();
  }
  
  function disableTable() {
    $('.table-body #edit-btn').prop('disabled', true);
    $('.table-body #del-btn').prop('disabled', true);
    $('.table-body #edit-btn').addClass('t-btn-inactive');
    $('.table-body #del-btn').addClass('t-btn-inactive');
  }
  
  function enableTable() {
    $('.table-body #edit-btn').prop('disabled', false);
    $('.table-body #del-btn').prop('disabled', false);
    $('.table-body #edit-btn').removeClass('t-btn-inactive');
    $('.table-body #del-btn').removeClass('t-btn-inactive');
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
    }, 3000); // Ocultar el mensaje después de 3 segundos
  }


  $(document).ready(function() {
    // Obtener el listado de mascotas al cargar la página
    getPetsList();
  });