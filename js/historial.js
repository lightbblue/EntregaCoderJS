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