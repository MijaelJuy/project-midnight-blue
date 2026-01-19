// Referencias a los elementos
const codeArea = document.getElementById("typewriter-area");
const input = document.getElementById("commandInput");
const terminalOutput = document.getElementById("terminal-output");
let hasStarted = false;

console.log("Sistema cargado correctamente.");

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

// --- SISTEMA DE PESTAÑAS (CORREGIDO) ---
window.switchTab = function(tabName) { 
    console.log("Cambiando pestaña a: " + tabName);
    const sidebar = document.getElementById('sidebar-panel');
    
    // Identificar el botón que se presionó
    const btnIdMap = {
        'explorer': 'btn-explorer',
        'search': 'btn-search',
        'git': 'btn-git',
        'extensions': 'btn-extensions'
    };
    
    const currentBtn = document.getElementById(btnIdMap[tabName]);

    // SI YA ESTÁ ACTIVO -> LO CERRAMOS
    if(currentBtn && currentBtn.classList.contains('active')) {
        document.querySelectorAll('.icon-container').forEach(icon => icon.classList.remove('active'));
        document.querySelectorAll('.sidebar-view').forEach(view => view.classList.add('hidden'));
        sidebar.classList.remove('show-sidebar'); // <--- ESTO OCULTA LA CAJA NEGRA
        return;
    }

    // SI NO ESTÁ ACTIVO -> LO ABRIMOS
    document.querySelectorAll('.icon-container').forEach(icon => icon.classList.remove('active'));
    document.querySelectorAll('.sidebar-view').forEach(view => view.classList.add('hidden'));

    const viewMap = {
        'explorer': 'view-explorer',
        'search': 'view-search',
        'git': 'view-git',
        'extensions': 'view-extensions'
    };

    if(currentBtn) {
        currentBtn.classList.add('active');
        document.getElementById(viewMap[tabName]).classList.remove('hidden');
        sidebar.classList.add('show-sidebar'); // <--- ESTO MUESTRA LA CAJA NEGRA
    }
};

const heartAscii = `<pre style="color: #ff69b4; font-weight: bold; line-height: 1; margin:0; font-family: monospace;">
      *********   ***********
     *********** ************* 
    ****************************
   ******************************
   ******************************
    ****************************
     **************************
      ***********************
       *********************
        *******************
         ****************
           *************
            ***********
             *********
              *******
               *****
                ***
                 *
</pre>`;

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const command = input.value.trim();
        if(command === "") return;

        if (!hasStarted) {
            codeArea.innerHTML = ""; 
            typeWriter(); 
            hasStarted = true;
        }

        terminalOutput.innerHTML += `<div><span class="prompt">PS C:\\Users\\Acer Predator></span> ${command}</div>`;
        
        let response = "";
        const cmd = command.toLowerCase();

        if (cmd === "help") { response = "Comandos: status, clear, <3."; } 
        else if (cmd === "hola") { response = "¡Hola! Estoy aquí — dime qué quieres hacer."; }
        else if (cmd === "<3" || cmd === "corazon") {
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
        else if (cmd === "status") { response = "Todo mi corazón operativo para ti al 100%."; }
        else if (cmd === "clear" || cmd === "cls") {
            terminalOutput.innerHTML = ""; 
            input.value = "";
            return;
        } 
        else {
            if(lineIndex < 3) { response = "Inicializando proyecto..."; } 
            else { response = `<span style="color: #f44747;">Comando '${cmd}' no reconocido.</span>`; }
        }

        if (response) {
            terminalOutput.innerHTML += `<div style="margin-bottom: 10px; margin-top: 5px;">${response}</div>`;
        }
        input.value = "";
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

window.onload = function() {
    input.focus();
    
    // CERRAR AUTOMÁTICAMENTE AL TOCAR EL EDITOR (SOLO CELULAR)
    document.querySelector('.main-area').addEventListener('click', () => {
        if(window.innerWidth < 768) {
            document.querySelectorAll('.icon-container').forEach(icon => icon.classList.remove('active'));
            document.querySelectorAll('.sidebar-view').forEach(view => view.classList.add('hidden'));
            document.getElementById('sidebar-panel').classList.remove('show-sidebar'); // <--- OCULTAR CAJA
        }
    });

    document.querySelectorAll('.file-item').forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('disabled-file')) return;
            document.querySelectorAll('.file-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    const suggestions = document.querySelectorAll('.suggestion-item');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    if (suggestions) {
        suggestions.forEach(s => {
            s.addEventListener('click', () => {
                if (searchInput) searchInput.value = s.textContent;
                const info = document.createElement('div');
                info.className = 'file-match';
                info.style.marginTop = '8px';
                info.textContent = `Sugerencia seleccionada: ${s.textContent}`;
                const prev = document.getElementById('suggestion-note');
                if (prev) prev.remove();
                info.id = 'suggestion-note';
                searchResults.appendChild(info);
            });
        });
    }

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

    document.querySelectorAll('.ext-install-btn').forEach(btn => {
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

    const music = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicControl');
    let isPlaying = false;

    if (music && musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (!isPlaying) {
                music.play().then(() => {
                    isPlaying = true;
                    musicBtn.innerHTML = '<i class="fas fa-pause-circle"></i> <span style="margin-left:5px;">Reproduciendo...</span>';
                    musicBtn.style.color = '#4ec9b0'; 
                }).catch(error => {
                    console.log("Error al reproducir: ", error);
                    alert("Para escuchar música, debes tener el archivo 'musica.mp3' en la carpeta.");
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