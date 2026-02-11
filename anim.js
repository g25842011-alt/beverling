// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos con los tiempos EXACTOS (convertidos a segundos)
var lyricsData = [
  { text: "¿Cómo diablos vo' a olvidarte?", time: 9.41 },
  { text: "Si ya te vi sin ropa", time: 12.10 },
  { text: "¡Wow! Qué obra de arte", time: 14.84 },
  { text: "Sé que prometí que iba a alejarme", time: 16.51 },
  { text: "Pero ¿cómo quieres que me vaya bien?", time: 19.11 },
  { text: "Si tú no me sacas de los KLOuFRENS", time: 21.74 },
  { text: "Me paso stalkeándote pa' ver qué haces", time: 24.04 },
  { text: "Enchulao, puede que se me pase", time: 26.96 },
  { text: "Pero ¿cómo quieres que me vaya bien?", time: 29.57 },
  { text: "Si tú no me sacas de los KLOuFRENS", time: 32.16 },
  { text: "Me paso stalkeándote pa' ver qué haces", time: 34.42 },
  { text: "Enchulao, puede que se me pase", time: 37.36 },
  { text: "¿Cómo diablos vo' a olvidarte?", time: 40.69 },
  { text: "Si cuando estoy solo y prendo, lo que hago es pensarte", time: 43.84 },
  { text: "Eh-eh", time: 49.13 },
  { text: "Mami, me dejaste hipnotizao, colonizao", time: 50.75 },
  { text: "Otra galla como tú todavía no he pisao", time: 53.75 },
  { text: "Ese totito era bello, precioso, cute", time: 56.86 },
  { text: "Me dejaste enviciao, ey", time: 60.18 },
  { text: "Pelinegra o blondie", time: 62.51 },
  { text: "Ma, tú eres la baby", time: 63.83 },
  { text: "Dando vuelta' por la San Se' escuchando a Dei V y a Ousi", time: 65.08 },
  { text: "To' lo mío es tuyo, si quieres, te doy la OC", time: 68.37 },
  { text: "Quiero comerte esos labios glossy, oh, sí", time: 70.97 },
  { text: "Hmm, esto no tiene que pasar, no", time: 73.94 },
  { text: "Pero, veo el circulito verde", time: 79.91 },
  { text: "Y me vuelvo a ilusionar", time: 82.40 },
  { text: "Tú eres mala, tú lo hace' intencional", time: 84.37 },
  { text: "Una player profesional", time: 87.47 },
  { text: "Total, esto no iba a funcionar", time: 89.71 },
  { text: "Pero te veo y me vuelvo a ilusionar", time: 92.01 },
  { text: "Tú eres mala, tú lo hace' intencional", time: 94.78 },
  { text: "A tu nombre me lo voy a lesionar", time: 97.48 },
  { text: "Está cabrón que pa' ti es normal", time: 99.95 },
  { text: "Pero ¿cómo quieres que me vaya bien?", time: 102.60 },
  { text: "Si tú no me sacas de los KLOuFRENS", time: 105.27 },
  { text: "", time: 113.55 },
  { text: "Dime qué pasó, mi amor", time: 124.44 },
  { text: "Que ya no me envías los buenos días por la mañana", time: 127.07 },
  { text: "Y en las noches, antes de acostarte, ya no me llamas", time: 132.61 },
  { text: "¿Será que ya encontraste a alguien más y me cambiaste?", time: 137.54 },
  { text: "Está cabrón cómo de tu vida ya desaparecí", time: 147.91 },
  { text: "Qué triste que terminó así, que terminó así", time: 152.31 },
  { text: "Eh", time: 156.05 },
  { text: "¿Será que a otro ahora le cuentas tu día", time: 159.80 },
  { text: "Y lo haces reír con los chistes que tú me hacías?", time: 164.96 },
  { text: "No tengo stickers nuevos, mami, porque ya tú no me los envías", time: 168.54 },
  { text: "Te fuiste cuando más yo te quería, eh", time: 173.22 },
  { text: "Y ya nadie sabrá lo que tú y yo pudo ser", time: 176.73 },
  { text: "Qué triste, no conocerás", time: 181.67 },
  { text: "Esa parte de mí que yo sé que te iba a gustar", time: 184.22 },
  { text: "Y nadie sabrá lo que tú y yo pudo ser", time: 187.47 },
  { text: "Qué triste, no conocerás", time: 192.12 },
  { text: "Esa parte de mí que yo a nadie le suelo mostrar", time: 194.61 }
];

// Variable para llevar seguimiento de la línea actual
var currentLineIndex = -1;
// Tiempo final de la canción (última línea + 5 segundos para que se vea)
var songEndTime = 199.61; // 194.61 + 5 segundos

// Función optimizada para actualizar letras
function updateLyrics() {
  var currentTime = audio.currentTime;
  
  // Limpiar letras si la canción ha terminado
  if (currentTime >= songEndTime || audio.ended) {
    if (lyrics.style.opacity !== "0") {
      lyrics.style.opacity = "0";
      lyrics.innerHTML = "";
      currentLineIndex = -1;
    }
    return;
  }
  
  // Encontrar la línea actual basada en el tiempo
  for (var i = 0; i < lyricsData.length; i++) {
    var line = lyricsData[i];
    var nextLine = lyricsData[i + 1];
    
    // Si hay una siguiente línea, mostrar la actual hasta que llegue la siguiente
    if (nextLine) {
      if (currentTime >= line.time && currentTime < nextLine.time) {
        if (currentLineIndex !== i) {
          currentLineIndex = i;
          lyrics.innerHTML = line.text;
          lyrics.style.opacity = "1";
        }
        return;
      }
    } else {
      // Última línea - mostrar si estamos en el tiempo correcto
      if (currentTime >= line.time && currentTime < songEndTime) {
        if (currentLineIndex !== i) {
          currentLineIndex = i;
          lyrics.innerHTML = line.text;
          lyrics.style.opacity = "1";
        }
        return;
      }
    }
  }
  
  // Si no hay línea para mostrar (antes de la primera o en pausas largas)
  if (currentLineIndex !== -1) {
    currentLineIndex = -1;
    lyrics.style.opacity = "0";
    lyrics.innerHTML = "";
  }
}

// Actualizar más frecuentemente para mejor precisión (cada 100ms)
setInterval(updateLyrics, 100);

// También actualizar cuando el audio cambie de tiempo
audio.addEventListener("timeupdate", updateLyrics);

// Escuchar cuando la canción termine para limpiar definitivamente
audio.addEventListener("ended", function() {
  setTimeout(function() {
    lyrics.style.opacity = "0";
    lyrics.innerHTML = "";
    currentLineIndex = -1;
  }, 3000); // Esperar 3 segundos después del final para limpiar
});

// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation = "fadeOut 3s ease-in-out forwards";
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000);
}

// Llama a la función después de 216 segundos
setTimeout(ocultarTitulo, 216000);