const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const textarea = document.querySelectorAll('#formulario textarea');

const regExpressions = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	text: /^[a-zA-ZÀ-ÿ0-9\s]{1,60}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telephone: /^(\d{2})(\d{4})(\d{4})$/ ///^[0-9]{10}$/ // 1 a 10 numeros.
}

const fieldMessages = {
  name: "Ingrese su nombre completo.",
  lastName: "Ingrese su apellido completo.",
  email: "Ingrese un email válido.",
  telephone: "Ingrese un número de contacto, incluyendo 11 o 15.",
  subject: "Ingrese el motivo de su consulta.",
  comment: "Ingrese su mensaje."
}

const flag = {
  name: false,
  lastName: false,
  email: false,
  telephone: false,
  subject: false,
  comment: false
}

const validateForm = (e) => {
	switch (e.target.name) {
		case "name":
			validateField(regExpressions.name, e.target, e.target.name);
		break;
		case "lastName":
			validateField(regExpressions.name, e.target, e.target.name);
		break;
		case "email":
			validateEmailField(regExpressions.email, e.target, e.target.name);
		break;
		case "telephone":
			validatePhoneField(regExpressions.telephone, e.target, e.target.name);
		break;
		case "subject":
			validateField(regExpressions.text, e.target, e.target.name);
		break;
    case "comment":
			validateMessageField(e.target, e.target.name);
		break;
	}
}

const validateField = (expression, input, field) => {
	const fieldValue = input.value.trim(); // Obtener el valor del campo y eliminar espacios en blanco

  if (fieldValue.length === 0) {
    handleEmptyField(field);
    return;
  }

  if (field === 'name' || field === 'lastName') {
    if (fieldValue.length > 40) {
      handleInvalidLength(field);
      return;
    }
  }

  if (field === 'subject') {
    if (fieldValue.length > 60) {
      handleInvalidLength(field);
      return;
    }
  }

  if ((expression.test(fieldValue))) {
    removeValidationClasses(field);
  } else {
    addValidationClasses(field);
  }
}

const validateEmailField = (expression, input, field) => {
  const fieldValue = input.value.trim();

  if (fieldValue.length === 0) {
    handleEmptyField(field);
    return;
  }

  if (!expression.test(fieldValue) ) {
    handleInvalidLength(field);
  } else {
    removeValidationClasses(field);
  }
}

const validatePhoneField = (expression, input, field) => {
  const fieldValue = input.value.trim();

  if (fieldValue.length === 0) {
    handleEmptyField(field);
    return;
  }

  if ((fieldValue.length <= 9 || fieldValue.length > 12) && !expression.test(fieldValue)) {
    handleInvalidLength(field);
  } else {
    removeValidationClasses(field);
  }

  const phoneNumber = fieldValue.replace(/\D/g, '');
  const maskedPhoneNumber = phoneNumber.replace(expression, '$1 $2 $3');
  input.value = maskedPhoneNumber;
}

const validateMessageField = (input, field) => {
  const fieldValue = input.value.trim();

  if (fieldValue.length === 0) {
    handleEmptyField(field);
    return;
  }

  if (fieldValue.length > 300) {
    handleInvalidLength(field);
  } else {
    removeValidationClasses(field);
  }
}

const handleEmptyField = (field) => {
  const errorMessage = fieldMessages[field];
  const errorElement = document.querySelector(`#form-${field} .message`);
  const target = document.querySelector(`[name=${field}]`)

  document.getElementById(`form-${field}`).classList.add('invalid');
  target.nextElementSibling.classList.add('fa-x')
  target.nextElementSibling.classList.add('icon-fail')
  target.nextElementSibling.classList.remove('fa-check')
  target.nextElementSibling.classList.remove('icon-success')

  if (errorMessage && errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add('error-message');
  }

  flag[field]=false;
}

const removeValidationClasses = (field) => {
  const errorElement = document.querySelector(`#form-${field} .message`);
  const target = document.querySelector(`[name=${field}]`)

  document.getElementById(`form-${field}`).classList.remove('invalid');
  target.nextElementSibling.classList.remove('fa-x')
  target.nextElementSibling.classList.remove('icon-fail')
  target.nextElementSibling.classList.add('fa-check')
  target.nextElementSibling.classList.add('icon-success')
  
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove('error-message');
  }
  flag[field]=true;
}

const addValidationClasses = (field) => {
  const fieldFormatMessages = {
    name: "El campo no admite números ni caracteres especiales.",
    lastName: "El campo no admite numeros ni caracteres especiales.",
    email: "El correo electronico debe seguir el siguiente formato: 'correo@correo.com'",
    telephone: "El campo admite solo números. No escriba guiones ni otro tipo de caracteres",
    subject: "El campo no admite caracteres especiales.",
    comment: "Este campo tiene una longitud maxima de 300 caracteres"
  }
  
  const errorMessage = fieldFormatMessages[field];
  const errorElement = document.querySelector(`#form-${field} .message`);
  const target = document.querySelector(`[name=${field}]`)
  
  document.getElementById(`form-${field}`).classList.add('invalid');
  target.nextElementSibling.classList.add('fa-x')
  target.nextElementSibling.classList.add('icon-fail')
  target.nextElementSibling.classList.remove('fa-check')
  target.nextElementSibling.classList.remove('icon-success')

  if (errorMessage && errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add('error-message');
  }
  flag[field]=false;
}

const handleInvalidLength = (field) => {
  const fieldLengthMessages = {
    name: "El campo debe tener un maximo de 40 caracteres.",
    lastName: "El campo debe tener un maximo de 40 caracteres.",
    email: "El correo electronico debe seguir el siguiente formato: 'correo@correo.com'",
    telephone: `El campo teléfono debe tener una longitud máxima de 10 caracteres numéricos.`,
    subject: "Este campo tiene una longitud maxima de 60 caracteres",
    comment: "Este campo tiene una longitud maxima de 300 caracteres"
  }
  
  const errorMessage = fieldLengthMessages[field];
  const errorElement = document.querySelector(`#form-${field} .message`);
  const target = document.querySelector(`[name=${field}]`)

  document.getElementById(`form-${field}`).classList.add('invalid');
  target.nextElementSibling.classList.add('fa-x')
  target.nextElementSibling.classList.add('icon-fail')
  target.nextElementSibling.classList.remove('fa-check')
  target.nextElementSibling.classList.remove('icon-success')

  if (errorElement  && errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add('error-message');
  }
  flag[field]=false;
}

inputs.forEach((input) => {
	input.addEventListener('input', validateForm);
	input.addEventListener('blur', validateForm);
});

textarea.forEach((input) => {
	input.addEventListener('input', validateForm);
	input.addEventListener('blur', validateForm);
});

const getSpanElement = () => {
  return document.querySelector('.form-button span');
};

const getIconElements = () => {
  return document.querySelectorAll('.icon');
};

const toggleClass = (elements, className, action) => {
  elements.forEach(element => {
    element.classList[action](className);
  });
};

const sendSuccess = () => {
  const span = getSpanElement();
  const icons = getIconElements();

  span.textContent = "Formulario enviado satisfactoriamente.";
  span.classList.add('submit-success');
  toggleClass(icons, 'icon-success', 'add');
  toggleClass(icons, 'fa-check', 'add');

  setTimeout(() => {
    span.classList.remove('submit-success');
    span.textContent = "";
    toggleClass(icons, 'icon-success', 'remove');
    toggleClass(icons, 'fa-check', 'remove');
  }, 5000);
};

const sendFail = () => {
  const span = getSpanElement();
  const icons = getIconElements();

  span.textContent = "Por favor complete correctamente todos los campos del formulario.";
  span.classList.add('submit-fail');
  toggleClass(icons, 'submit-fail', 'add');

  setTimeout(() => {
    span.classList.remove('submit-fail');
    span.textContent = "";
  }, 5000);
};

async function handleSubmit(e) {
  e.preventDefault();

  if ((flag.name && flag.lastName && flag.email && flag.telephone && flag.subject && flag.comment)) {
    const form = new FormData(this);
    try {
      const response = await fetch(this.action, {
        method: this.method,
        body: form,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        this.reset();
        sendSuccess();
      } else {
        throw new Error('Error de red');
      }
    } catch (error) {
      sendFail();
      console.error(error);
    }
  } else {
    sendFail();
  }
}

formulario.addEventListener('submit', (handleSubmit))