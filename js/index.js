const datosDiagnostico = [
	{
		"id": 0,
		"problema": "No enciende",
		"soluciones": [
			"Verificar que el cable de corriente esté enchufado correctamente.",
			"Probar con otro enchufe o con otro cable de corriente.",
			"Comprobar que el botón de encendido del monitor también esté activado."
		]
	},
	{
		"id": 1,
		"problema": "No hay internet",
		"soluciones": [
			"Confirmar si el Wi-Fi está activado en la PC.",
			"Reiniciar el router/modem y la PC.",
			"Probar conectar otro dispositivo para verificar si la red funciona."
		]
	},
	{
		"id": 2,
		"problema": "Va muy lento",
		"soluciones": [
			"Cerrar aplicaciones pesadas y reiniciar la PC.",
			"Verificar uso de CPU/ram en el administrador de tareas.",
			"Eliminar archivos temporales y reiniciar nuevamente."
		]
	},
	{
		"id": 3,
		"problema": "Se congela / no responde",
		"soluciones": [
			"Esperar 1-2 minutos por si recupera respuesta.",
			"Intentar cerrar la aplicación problemática desde el administrador de tareas.",
			"Reiniciar la PC en modo normal; si persiste, probar en modo seguro."
		]
	},
	{
		"id": 4,
		"problema": "Aparece pantalla azul",
		"soluciones": [
			"Anotar el código de error si aparece y buscarlo en la web.",
			"Desconectar dispositivos externos recién conectados.",
			"Revisar actualizaciones pendientes del sistema operativo."
		]
	}
];

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

function obtenerHistorialStorage() {
	const historialJSON = localStorage.getItem("diagnosticoHistorial");
	return historialJSON ? JSON.parse(historialJSON) : [];
}

function guardarEnHistorial(problema) {
	const historial = obtenerHistorialStorage();
	historial.unshift(problema);
	localStorage.setItem("diagnosticoHistorial", JSON.stringify(historial));
	const historialLista = document.getElementById("historial-lista");
	cargarHistorial(historial, historialLista);
}

function cargarHistorial(historial, elementoLista) {
	if (!elementoLista) return;

	elementoLista.innerHTML = "";

	if (historial.length === 0) {
		elementoLista.innerHTML = "<li>No se realizaron búsquedas.</li>";
		return;
	}

	// Creo y agrego un li por cada item del historial
	historial.forEach(item => {
		const li = document.createElement("li");
		li.textContent = item;
		elementoLista.appendChild(li);
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

document.addEventListener("DOMContentLoaded", () => {
	iniciarApp();
});