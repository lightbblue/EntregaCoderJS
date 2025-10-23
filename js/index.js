const problemas = [
  "No enciende",
  "No hay internet",
  "Va muy lento",
  "Se congela / no responde",
  "Aparece pantalla azul"
];

const soluciones = [
  //problemas[0] No Enciende
  [
    "Verificar que el cable de corriente esté enchufado correctamente.",
    "Probar con otro enchufe o con otro cable de corriente.",
    "Comprobar que el botón de encendido del monitor también esté activado."
  ],
  //problemas[1] No hay internet
  [
    "Confirmar si el Wi-Fi está activado en la PC.",
    "Reiniciar el router/modem y la PC.",
    "Probar conectar otro dispositivo para verificar si la red funciona."
  ],
  //problemas[2] Va muy lento
  [
    "Cerrar aplicaciones pesadas y reiniciar la PC.",
    "Verificar uso de CPU/ram en el administrador de tareas.",
    "Eliminar archivos temporales y reiniciar nuevamente."
  ],
  //problemas[3] Se congela / no responde
  [
    "Esperar 1-2 minutos por si recupera respuesta.",
    "Intentar cerrar la aplicación problemática desde el administrador de tareas.",
    "Reiniciar la PC en modo normal; si persiste, probar en modo seguro."
  ],
  //problemas[4] Aparece pantalla azul
  [
    "Anotar el código de error si aparece y buscarlo en la web.",
    "Desconectar dispositivos externos recién conectados.",
    "Revisar actualizaciones pendientes del sistema operativo."
  ]
];

function pedirProblema() {
  let textoMenu = "=== SIMULADOR DE DIAGNÓSTICO DE PC ===\n\nElegí el número del problema que presenta la PC:\n\n";

  let contador = 1;
  for (let p of problemas) {
    textoMenu += contador + ". " + p + "\n";
    contador++;
  }

  textoMenu += "\nIngresá el número (por ejemplo 1):";

  const entrada = prompt(textoMenu);
  if (entrada === null) {
    return null;
  }

  const opcion = parseInt(entrada);
  if (Number.isNaN(opcion) || opcion < 1 || opcion > problemas.length) {
    alert("Opción inválida. Se cancelará este diagnóstico.");
    return null;
  }

  // Posición
  return opcion - 1;
}

function generarDiagnostico(indiceProblema) {
  const resultado = [];
  resultado.push("Diagnóstico sugerido para: " + problemas[indiceProblema]);
  resultado.push("");

  resultado.push("Pasos recomendados:");
  for (let paso of soluciones[indiceProblema]) {
    resultado.push("- " + paso);
  }
  resultado.push("");

  if (indiceProblema === 0) { 
    resultado.push("Recomendación: si después de probar cables y enchufes sigue sin encender, acudir a servicio técnico.");
    resultado.push("");
  } else if (indiceProblema === 2) {
    resultado.push("Tip: cerrar programas al iniciar sesión o aumentar memoria puede mejorar el rendimiento.");
    resultado.push("");
  }

  return resultado;
}

function mostrarResultadosYConfirmar(lineas) { 
  for (let linea of lineas) { 
    console.log(linea); 
  } 
  alert("Se han mostrado los pasos recomendados en la consola.\n"); 
}

function iniciarSimulador() {
  alert("Bienvenido al Simulador de Diagnóstico de PC\nVamos a ayudarte a identificar y solucionar problemas comunes.");

  let seguir = true;

  while (seguir) {
    const indice = pedirProblema();
    if (indice === null) {
      const confirmaSalir = confirm("No seleccionaste un problema válido. ¿Querés salir del simulador?");
      if (confirmaSalir) {
        break;
      } else {
        continue;
      }
    }

    const resultado = generarDiagnostico(indice);

    mostrarResultadosYConfirmar(resultado);

    seguir = confirm("¿Deseás realizar otro diagnóstico?");
  }

  alert("Gracias por usar el Simulador de Diagnóstico de PC. ¡Hasta luego!");
}

iniciarSimulador();
