// Referencias a los elementos
const codeArea = document.getElementById("typewriter-area");
const input = document.getElementById("commandInput");
const terminalOutput = document.getElementById("terminal-output");
let hasStarted = false;

// Configuración inicial
console.log("Sistema cargado correctamente.");

// Código que se escribirá solo
const codeToType = [
    `<br>`,
    `<span class="com">&lt;!-- Conexión establecida --&gt;</span>`,
    `<span class="tag">&lt;html&gt;</span>`,
    `  <span class="tag">&lt;body&gt;</span>`,
    `    <span class="tag">&lt;h1&gt;</span>Hola, Anna<span class="tag">&lt;/h1&gt;</span>`,
    `    <span class="tag">&lt;p&gt;</span>`,
    `      Llevamos poco tiempo, pero...<br>`,
    `      la paso muy bien hablando contigo.`,
    `    <span class="tag">&lt;/p&gt;</span>`,
    `    <span class="com">&lt;!-- Gracias por las noches --&gt;</span>`,
    `  <span class="tag">&lt;/body&gt;</span>`,
    `<span class="tag">&lt;/html&gt;</span>`
];

    // Código especial que aparece al ejecutar el comando <3
    const heartCode = [
        `<span class="com">&lt;!-- Para Anna --&gt;</span>`,
        `<span class="tag">&lt;section&gt;</span>`,
        `  <span class="tag">&lt;h2&gt;</span>Pequeños mensajes<span class="tag">&lt;/h2&gt;</span>`,
        `  <span class="tag">&lt;p&gt;</span>Gracias por las risas y las charlas.<span class="tag">&lt;/p&gt;</span>`,
        `  <span class="com">&lt;!-- Un detalle especial abajo --&gt;</span>`,
        `<span class="tag">&lt;/section&gt;</span>`
    ];

let lineIndex = 0;
function typeWriter() {
    if (lineIndex < codeToType.length) {
        codeArea.innerHTML += codeToType[lineIndex] + "<br>";
        lineIndex++;
        codeArea.scrollTop = codeArea.scrollHeight;
        setTimeout(typeWriter, 150); 
    }
}

// --- SISTEMA DE PESTAÑAS (Global) ---
// Usamos window.switchTab para asegurar que el HTML lo encuentre
window.switchTab = function(tabName) { 
    console.log("Cambiando pestaña a: " + tabName);
    
    // 1. Quitar clase active de todos los iconos
    document.querySelectorAll('.icon-container').forEach(icon => icon.classList.remove('active'));
    
    // 2. Ocultar todos los paneles
    document.querySelectorAll('.sidebar-view').forEach(view => view.classList.add('hidden'));

    // 3. Activar el correcto
    const btnMap = {
        'explorer': 'btn-explorer',
        'search': 'btn-search',
        'git': 'btn-git',
        'extensions': 'btn-extensions'
    };
    
    const viewMap = {
        'explorer': 'view-explorer',
        'search': 'view-search',
        'git': 'view-git',
        'extensions': 'view-extensions'
    };

    if(btnMap[tabName]) {
        document.getElementById(btnMap[tabName]).classList.add('active');
        document.getElementById(viewMap[tabName]).classList.remove('hidden');
    }
};

// --- TERMINAL ---
const heartAscii = `<pre style="color: #ff69b4; font-weight: bold; line-height: 1; margin:0; font-family: monospace;">
           ****** ******
       ********** **********
    ****************************
   ******************************
   ******************************
    ****************************
     **************************
      ***********************
       *********************
        *******************
         ***************
           *************
            ***********
             *********
              *******
               *****
                ***
                 *
</pre>`;

// Escuchar la tecla ENTER
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const command = input.value.trim();
        if(command === "") return;

        // Si es la primera vez que escribe, activamos el código de arriba
        if (!hasStarted) {
            codeArea.innerHTML = ""; 
            typeWriter(); 
            hasStarted = true;
        }

        // Mostrar comando en pantalla
        terminalOutput.innerHTML += `<div><span class="prompt">PS C:\\Users\\Acer Predator></span> ${command}</div>`;
        
        // Lógica de respuesta
        let response = "";
        const cmd = command.toLowerCase();

        if (cmd === "help") {
            response = "Comandos: status, clear, <3.";
        } 
        else if (cmd === "hola") {
            response = "¡Hola! Estoy aquí — dime qué quieres hacer.";
        }
        else if (cmd === "<3" || cmd === "corazon") {
            // Limpiar la terminal y el editor, luego escribir un bloque especial antes de mostrar el corazón
            terminalOutput.innerHTML = "";
            codeArea.innerHTML = "";
            hasStarted = true;
            let hcIndex = 0;
            function typeHeart() {
                if (hcIndex < heartCode.length) {
                    codeArea.innerHTML += heartCode[hcIndex] + "<br>";
                    hcIndex++;
                    codeArea.scrollTop = codeArea.scrollHeight;
                    setTimeout(typeHeart, 180);
                }
            }
            typeHeart();
            const totalDelay = heartCode.length * 180 + 200;
            setTimeout(() => {
                terminalOutput.innerHTML += `<div style="margin-bottom: 10px; margin-top: 5px;">${heartAscii}<br><span style="color: #ff69b4;">Un detalle para ti.</span></div>`;
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }, totalDelay);
            response = "";
        }
        else if (cmd === "status") {
            response = "Todo mi corazón operativo para ti al 100%.";
        }
        else if (cmd === "clear" || cmd === "cls") {
            terminalOutput.innerHTML = ""; 
            input.value = "";
            return;
        } 
        else {
            if(lineIndex < 3) { 
                response = "Inicializando proyecto..."; 
            } else {
                response = `<span style="color: #f44747;">Comando '${cmd}' no reconocido.</span>`;
            }
        }

        if (response) {
            terminalOutput.innerHTML += `<div style="margin-bottom: 10px; margin-top: 5px;">${response}</div>`;
        }

        input.value = "";
        // Scroll automático hacia abajo
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

// Forzar el foco al cargar la página
window.onload = function() {
    input.focus();
    // Evitar que archivos deshabilitados reaccionen al click y permitir activar archivos disponibles
    document.querySelectorAll('.file-item').forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('disabled-file')) return;
            document.querySelectorAll('.file-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Manejar sugerencias de búsqueda
    const suggestions = document.querySelectorAll('.suggestion-item');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    if (suggestions) {
        suggestions.forEach(s => {
            s.addEventListener('click', () => {
                if (searchInput) searchInput.value = s.textContent;
                // mostrar detalle rápido
                const info = document.createElement('div');
                info.className = 'file-match';
                info.style.marginTop = '8px';
                info.textContent = `Sugerencia seleccionada: ${s.textContent}`;
                // remover mensajes anteriores temporales
                const prev = document.getElementById('suggestion-note');
                if (prev) prev.remove();
                info.id = 'suggestion-note';
                searchResults.appendChild(info);
            });
        });
    }

    // Simular subida en la vista Git
    const btnUpload = document.getElementById('btn-upload');
    const uploadStatus = document.getElementById('upload-status');
    if (btnUpload && uploadStatus) {
        let uploadDone = false;
        btnUpload.addEventListener('click', () => {
            if (uploadDone) return;
            uploadDone = true;
            btnUpload.disabled = true;
            btnUpload.style.opacity = '0.7';

            const steps = [
                { text: 'Conectando contigo.......', delay: 800 },
                { text: 'Conectado contigo.', delay: 800 },
                { text: 'Compartiendo sonrisas...', delay: 900 },
                { text: 'Preparando el detalle...', delay: 900 },
                { text: 'Subiendo a tu corazón', delay: 1600, final: true }
            ];

            let i = 0;
            function nextStep() {
                const step = steps[i++];
                uploadStatus.style.color = '#fff';
                uploadStatus.textContent = step.text;

                if (step.final) {
                    let dots = 0;
                    const dotInterval = setInterval(() => {
                        dots = (dots + 1) % 4;
                        uploadStatus.textContent = step.text + '.'.repeat(dots);
                    }, 400);

                    setTimeout(() => {
                        clearInterval(dotInterval);
                        uploadStatus.style.color = '#4ec9b0';
                        uploadStatus.textContent = 'Subida completada ✔️';
                        // Marcar botón como subido
                        btnUpload.textContent = 'Subido';
                        btnUpload.disabled = true;
                        btnUpload.style.opacity = '0.7';
                    }, step.delay);
                } else {
                    setTimeout(() => {
                        if (i < steps.length) nextStep();
                    }, step.delay);
                }
            }

            nextStep();
        });
    }

    // Instalar/extensiones: botones en la vista Extensions
    document.querySelectorAll('.ext-install-btn').forEach(btn => {
        // si el botón ya dice 'Installed' al inicio, marcar como instalado
        if (btn.textContent.toLowerCase().includes('installed')) {
            btn.disabled = true;
            btn.dataset.installed = 'true';
            btn.style.background = '#4ec9b0';
        }

        btn.addEventListener('click', () => {
            if (btn.dataset.installed === 'true') return;
            btn.dataset.installed = 'true';
            btn.textContent = 'Installed';
            btn.disabled = true;
            btn.style.background = '#4ec9b0';
            btn.style.color = '#fff';
            btn.style.opacity = '0.95';
            // mostrar pequeña confirmación en la vista (opcional)
            const details = btn.closest('.ext-details');
            if (details) {
                const note = document.createElement('div');
                note.style.fontSize = '12px';
                note.style.color = '#4ec9b0';
                note.style.marginTop = '6px';
                note.textContent = `Instalado: ${btn.dataset.name} ${btn.dataset.version}`;
                details.appendChild(note);
            }
        });
    });

    // --- CONTROL DE MÚSICA (NUEVO) ---
    const music = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicControl');
    let isPlaying = false;

    if (music && musicBtn) {
        // Asegurar ruta y propiedades básicas
        if (!music.getAttribute('src') && music.querySelector('source')) {
            music.src = music.querySelector('source').getAttribute('src') || 'musica.mp3';
        }
        music.preload = 'auto';
        music.volume = 0.8; // volumen por defecto
        music.muted = false;

        musicBtn.addEventListener('click', () => {
            if (!isPlaying) {
                music.play().then(() => {
                    isPlaying = true;
                    musicBtn.innerHTML = '<i class="fas fa-pause-circle"></i> <span style="margin-left:5px;">Reproduciendo...</span>';
                    musicBtn.style.color = '#4ec9b0';
                }).catch(error => {
                    console.warn("Error al reproducir audio:", error);
                    // Mostrar mensaje visible en la terminal si falla
                    if (terminalOutput) {
                        const note = document.createElement('div');
                        note.style.color = '#ffcc00';
                        note.style.marginTop = '6px';
                        note.textContent = 'No se pudo reproducir el archivo de audio. Pulsa el botón y confirma permisos en el navegador.';
                        terminalOutput.appendChild(note);
                        terminalOutput.scrollTop = terminalOutput.scrollHeight;
                    }
                });
            } else {
                music.pause();
                isPlaying = false;
                musicBtn.innerHTML = '<i class="fas fa-play-circle"></i> <span style="margin-left:5px;">Play Music</span>';
                musicBtn.style.color = 'rgba(255, 255, 255, 0.6)';
            }
        });
    }
};