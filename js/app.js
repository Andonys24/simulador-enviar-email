document.addEventListener("DOMContentLoaded", function () {
	// Seleccionar los elementos de la interfaz
	const inputEmail = document.querySelector("#email");
	const inputAsunto = document.querySelector("#asunto");
	const inputMensaje = document.querySelector("#mensaje");
	const formulario = document.querySelector("#formulario");

	// Asignar eventos
	inputEmail.addEventListener("blur", validarCampo);
	inputAsunto.addEventListener("blur", validarCampo);
	inputMensaje.addEventListener("blur", validarCampo);

	function validarCampo(e) {
		const elementoPadre = e.target.parentElement;
		if (e.target.value.trim() === "") {
			mostrarAlerta(`El campo ${e.target.id} es obligatorio`, elementoPadre);
			return;
		}

		if (e.target.id === "email" && !validarEmail(e.target.value)) {
			mostrarAlerta("El Email no es válido", elementoPadre);
			return;
		}

		limpiarAlerta(elementoPadre);
	}

	function mostrarAlerta(mensaje, referencia) {
		// comprobar si ya existe una alerta
		limpiarAlerta(referencia);

		// generar el mensaje de error
		const error = document.createElement("p");
		error.textContent = mensaje;
		error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

		// inyectar el error al formulario
		referencia.appendChild(error);
	}

	function limpiarAlerta(referencia) {
		// comprobar si ya existe una alerta
		const alerta = referencia.querySelector(".bg-red-600");
		if (alerta) {
			alerta.remove();
		}
	}

	// validar email
	function validarEmail(email) {
		const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
		const resultado = regex.test(email);
		return resultado;
	}
});
