function generarDiagnosticoHTML(indiceProblema) {
	const item = datosDiagnostico.find(d => d.id == indiceProblema);

	if (!item) {
		return "<p>Error: No se encontró el problema seleccionado.</p>";
	}

	const problemaNombre = item.problema;
	const pasosSolucion = item.soluciones;
	let htmlResultado = `<h3>Diagnóstico sugerido para: ${problemaNombre}</h3>`;
	htmlResultado += "<p>Pasos recomendados:</p>";
	htmlResultado += "<ul>";

	for (const paso of pasosSolucion) {
		htmlResultado += `<li>${paso}</li>`;
	}
	htmlResultado += "</ul>";

	// Tips para los casos de No enciende y Va muy lento
	if (item.id === 0) {
		htmlResultado += "<p><strong>Tip:</strong> si después de probar cables y enchufes sigue sin encender, acudir a servicio técnico.</p>";
	} else if (item.id === 2) {
		htmlResultado += "<p><strong>Tip:</strong> cerrar programas al iniciar sesión o aumentar memoria puede mejorar el rendimiento.</p>";
	}

	return htmlResultado;
}

function cargarSelectProblemas(elemento) {
	if (!elemento) return;
	// Creo los options dentro del select
	datosDiagnostico.forEach(item => {
		const opcion = document.createElement("option");
		opcion.value = item.id;
		opcion.textContent = item.problema;
		elemento.appendChild(opcion);
	});
}

function iniciarApp() {
	const problemaSelect = document.getElementById("problema-select");
	const diagnosticoBtn = document.getElementById("diagnostico-btn");
	const resultadoContainer = document.getElementById("resultado-container");
	const historialLista = document.getElementById("historial-lista");
	const limpiarHistorialBtn = document.getElementById("limpiar-historial-btn");

	cargarSelectProblemas(problemaSelect);

	// Muestro el historial guardado en el localStorage
	const historialInicial = obtenerHistorialStorage();
	cargarHistorial(historialInicial, historialLista);

	// Evento click para el boton de Diagnosticar
	diagnosticoBtn.addEventListener("click", () => {
		const indiceSeleccionado = problemaSelect.value;

		if (indiceSeleccionado === "") {
			resultadoContainer.innerHTML = "<p>Por favor, elegí un problema de la lista.</p>";
			return;
		}

		const diagnosticoHTML = generarDiagnosticoHTML(indiceSeleccionado);
		resultadoContainer.innerHTML = diagnosticoHTML;

		const item = datosDiagnostico.find(d => d.id == indiceSeleccionado);
		guardarEnHistorial(item.problema);
	});

	// Evento click para el boton de Limpiar Historial
	limpiarHistorialBtn.addEventListener("click", () => {
		localStorage.removeItem("diagnosticoHistorial");
		cargarHistorial([], historialLista);
	});
}

fetch('data/data.json')
	.then(response => {
		return response.json();
	})
	.then(data => {
		datosDiagnostico = data;
		iniciarApp();
	})
	.catch(err => {
		const resultadoContainer = document.getElementById("resultado-container");
		if (resultadoContainer) {
			resultadoContainer.innerHTML = `<p style='color: red;'>Error ${err}: No se pudieron cargar los datos de diagnóstico.</p>`;
		}
	});
