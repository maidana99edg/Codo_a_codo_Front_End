const NameField = document.querySelector('#inputName');
const lastNameField = document.querySelector('#inputLastName');
const emailField = document.querySelector('#inputEmail');
const telephoneField = document.querySelector('#inputTelephone');
const subjectField = document.querySelector('#inputSubject');
const messageField = document.querySelector('#inputComments');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    texto: /^[a-zA-ZÀ-ÿ\s]{1,300}$/, // Letras y espacios, pueden llevar acentos.(texto largo)
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const setErrors = (message, field, isError = true) => {
    if (isError) {
      field.classList.add("invalid");
      field.nextElementSibling.classList.add("error-message");
      field.nextElementSibling.innerText = message;
    } else {
      field.classList.remove("invalid");
      field.nextElementSibling.classList.remove("error-message");
      field.nextElementSibling.innerText = "";
    }
  }

const validateEmptyField = (message, e) => {
    const field = e.target;
    const fieldValue = e.target.value;
    if (fieldValue.trim().length === 0) {
      setErrors(message, field);
    } else {
      setErrors("", field, false);
    }
  }

NameField.addEventListener("blur", (e) => validateEmptyField("El campo solo admite: letras mayusculas, minusculas y espacios.", e));
lastNameField.addEventListener("blur", (e) => validateEmptyField("El campo solo admite: letras mayusculas, minusculas y espacios.", e));
emailField.addEventListener("blur", (e) => validateEmptyField("Ingrese una cuenta de correo electronico válida.", e));
telephoneField.addEventListener("blur", (e) => validateEmptyField("El campo solo admite: numeros sin espacios en blanco.", e));
subjectField.addEventListener("blur", (e) => validateEmptyField("Ingrese el motivo de su consulta.", e));
messageField.addEventListener("blur", (e) => validateEmptyField("El campo no puede estar vacío.", e));


