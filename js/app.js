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
	const inputCc = document.querySelector("#cc");
	const formulario = document.querySelector("#formulario");
	const btnSubmit = document.querySelector('#formulario button[type="submit"]');
	const btnReset = document.querySelector('#formulario button[type="reset"]');
	const spinner = document.querySelector("#spinner");

	// Asignar eventos
	inputEmail.addEventListener("input", validarCampo);
	inputCc.addEventListener("input", comprobarCC);
	inputAsunto.addEventListener("input", validarCampo);
	inputMensaje.addEventListener("input", validarCampo);
	formulario.addEventListener("submit", enviarEmail);
	btnReset.addEventListener("click", (e) => {
		e.preventDefault();
		resetFormulario();
	});

	function enviarEmail(e) {
		e.preventDefault();

		spinner.classList.add("flex");
		spinner.classList.remove("hidden");

		setTimeout(() => {
			spinner.classList.remove("flex");
			spinner.classList.add("hidden");
			resetFormulario();

			// crear una alerta de exito
			const alertaExito = document.createElement("p");
			alertaExito.classList.add(
				"bg-green-500",
				"text-white",
				"p-2",
				"rounded-lg",
				"text-center",
				"mt-10",
				"font-bold",
				"text-sm",
				"uppercase"
			);

			alertaExito.textContent = "El mensaje se envió correctamente";
			formulario.appendChild(alertaExito);

			setTimeout(() => {
				alertaExito.remove();
			}, 3000);
		}, 3000);
	}

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

	function comprobarCC(e) {
		if (e.target.value === "") {
			delete datos.cc;
			limpiarAlerta(inputCc.parentElement);
			comprobarDatos();
			return;
		}

		if (!validarEmail(e.target.value)) {
			mostrarAlerta("El email no es válido", e.target.parentElement, "error");
			datos.cc = "";
			comprobarDatos();
			return;
		}

		limpiarAlerta(inputCc.parentElement);

		datos[e.target.id] = e.target.value.trim().toLowerCase();

		comprobarDatos();
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

	function resetFormulario() {
		// reiniciar el objeto
		datos.email = "";
		datos.asunto = "";
		datos.mensaje = "";
		formulario.reset();
		comprobarDatos();
	}
});
