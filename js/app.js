document.addEventListener("DOMContentLoaded", function () {
	// Seleccionar los elementos de la interfaz
	const inputEmail = document.querySelector("#email");
	const inputAsunto = document.querySelector("#asunto");
	const inputMensaje = document.querySelector("#mensaje");

	// Asignar eventos
	inputEmail.addEventListener("blur", validarCampo);
	inputAsunto.addEventListener("blur", validarCampo);
	inputMensaje.addEventListener("blur", validarCampo);

	function validarCampo(e) {
		if (e.target.value.trim() === "") {
			mostrarAlerta();
		} else {
			console.log("si hay algo...");
		}
	}

	function mostrarAlerta() {
		// generar el mensaje de error
		const error = document.createElement("p");
		error.textContent = "Todos los campos son obligatorios";
		console.log(error);
	}
});
