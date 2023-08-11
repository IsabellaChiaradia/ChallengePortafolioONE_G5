document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".formcontato__form");
    const nombreInput = form.querySelector('input[name="nombre"]');
    const emailInput = form.querySelector('input[name="email"]');
    const asuntoInput = form.querySelector('input[name="asunto"]');
    const mensajeTextarea = form.querySelector('textarea[name="mensaje"]');
    const submitButton = form.querySelector(".formcontato__botao");

    form.addEventListener("submit", function(event) {
        if (!nombreInput.value.trim()) {
            event.preventDefault();
            showErrorMessage(nombreInput, "Campo Nombre no debe estar vacío.");
        } else if (nombreInput.value.length > 50) {
            event.preventDefault();
            showErrorMessage(nombreInput, "El nombre debe tener máximo 50 caracteres.");
        }

        if (!isValidEmail(emailInput.value.trim())) {
            event.preventDefault();
            showErrorMessage(emailInput, "Ingresa un correo electrónico válido.");
        }

        if (!asuntoInput.value.trim()) {
            event.preventDefault();
            showErrorMessage(asuntoInput, "Campo Asunto no debe estar vacío.");
        } else if (asuntoInput.value.length > 50) {
            event.preventDefault();
            showErrorMessage(asuntoInput, "El asunto debe tener máximo 50 caracteres.");
        }

        if (!mensajeTextarea.value.trim()) {
            event.preventDefault();
            showErrorMessage(mensajeTextarea, "Campo Mensaje no debe estar vacío.");
        } else if (mensajeTextarea.value.length > 300) {
            event.preventDefault();
            showErrorMessage(mensajeTextarea, "El mensaje debe tener máximo 300 caracteres.");
        }
    });

    function showErrorMessage(inputElement, errorMessage) {
        const errorElement = document.createElement("span");
        errorElement.classList.add("formcontato__error");
        errorElement.textContent = errorMessage;

        const parent = inputElement.parentElement;
        const existingError = parent.querySelector(".formcontato__error");
        if (existingError) {
            parent.removeChild(existingError);
        }

        parent.appendChild(errorElement);
    }

    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    [nombreInput, emailInput, asuntoInput, mensajeTextarea].forEach(function(input) {
        input.addEventListener("input", function() {
            const parent = input.parentElement;
            const existingError = parent.querySelector(".formcontato__error");
            if (existingError) {
                parent.removeChild(existingError);
            }

            checkFormValidity();
        });
    });

    function checkFormValidity() {
        if (form.checkValidity()) {
            submitButton.removeAttribute("disabled");
        } else {
            submitButton.setAttribute("disabled", "disabled");
        }
    }
});
