document.addEventListener("DOMContentLoaded", function () {
	const datos = {
		email: "",
		asunto: "",
		mensaje: "",
	};

	// Seleccionar los elementos de la interfaz
	const inputEmail = document.querySelector("#email");
	const inputAsunto = document.querySelector("#asunto");
	const inputMensaje = document.querySelector("#mensaje");
	const btnSubmit = document.querySelector('#formulario button[type="submit"]');

	// Asignar eventos
	inputEmail.addEventListener("input", validarCampo);
	inputAsunto.addEventListener("input", validarCampo);
	inputMensaje.addEventListener("input", validarCampo);

	function validarCampo(e) {
		const elementoPadre = e.target.parentElement;
		if (e.target.value.trim() === "") {
			mostrarAlerta(`El campo ${e.target.id} es obligatorio`, elementoPadre);
			datos[e.target.id] = "";
			comprobarDatos();
			return;
		}

		if (e.target.id === "email" && !validarEmail(e.target.value)) {
			mostrarAlerta("El Email no es válido", elementoPadre);
			datos[e.target.id] = "";
			comprobarDatos();
			return;
		}

		limpiarAlerta(elementoPadre);

		// Asignar los valores
		datos[e.target.id] = e.target.value.trim().toLowerCase();

		// Comprobar el objeto de email
		comprobarDatos();
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

	function comprobarDatos() {
		if (Object.values(datos).includes("")) {
			btnSubmit.classList.add("opacity-50");
			btnSubmit.disabled = true;
			return;
		}

		btnSubmit.classList.remove("opacity-50");
		btnSubmit.disabled = false;
	}
});
