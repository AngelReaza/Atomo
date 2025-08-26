

            document.addEventListener('DOMContentLoaded', () => {
            const atomContainer = document.getElementById('atomContainer');
            const nucleus = document.getElementById('nucleus');

            // --- Configuración del Átomo ---
            const numProtons = 6; // Ejemplo: Carbono
            const numNeutrons = 6;
            // Electrones por órbita (ej. 2 en la 1ra, 8 en la 2da, 8 en la 3ra, 4 en la 4ta)
            const numElectronsPerOrbit = [2, 8, 8, 4];
            const numOrbits = 4;

            // --- Crear partículas del núcleo (Protones y Neutrones) ---
            function createNucleusParticles() {
                const particleCount = numProtons + numNeutrons;
                const radius = nucleus.offsetWidth / 3; // Radio para distribuir partículas dentro del núcleo

                for (let i = 0; i < numProtons; i++) {
                    const proton = document.createElement('div');
                    proton.classList.add('proton');
                    // Posicionamiento aleatorio dentro del núcleo
                    const angle = Math.random() * 2 * Math.PI;
                    const r = Math.random() * radius;
                    proton.style.left = `calc(50% + ${r * Math.cos(angle)}px - var(--proton-neutron-size) / 2)`;
                    proton.style.top = `calc(50% + ${r * Math.sin(angle)}px - var(--proton-neutron-size) / 2)`;
                    nucleus.appendChild(proton);
                }

                for (let i = 0; i < numNeutrons; i++) {
                    const neutron = document.createElement('div');
                    neutron.classList.add('neutron');
                    // Posicionamiento aleatorio dentro del núcleo
                    const angle = Math.random() * 2 * Math.PI;
                    const r = Math.random() * radius;
                    neutron.style.left = `calc(50% + ${r * Math.cos(angle)}px - var(--proton-neutron-size) / 2)`;
                    neutron.style.top = `calc(50% + ${r * Math.sin(angle)}px - var(--proton-neutron-size) / 2)`;
                    nucleus.appendChild(neutron);
                }
            }

            // --- Crear Órbitas y Electrones ---
            function createOrbitsAndElectrons() {
                for (let i = 0; i < numOrbits; i++) {
                    const orbit = document.createElement('div');
                    orbit.classList.add('orbit', `orbit-${i + 1}`);
                    
                    // Almacenar las rotaciones iniciales como propiedades CSS personalizadas
                    // Esto es para que el hover pueda escalar sin perder la rotación original
                    const initialTransform = getOrbitRotation(i + 1);
                    const matchX = initialTransform.match(/rotateX\(([^)]+)\)/);
                    const matchY = initialTransform.match(/rotateY\(([^)]+)\)/);
                    const matchZ = initialTransform.match(/rotateZ\(([^)]+)\)/);

                    orbit.style.setProperty('--current-rotateX', matchX ? matchX[1] : '0deg');
                    orbit.style.setProperty('--current-rotateY', matchY ? matchY[1] : '0deg');
                    orbit.style.setProperty('--current-rotateZ', matchZ ? matchZ[1] : '0deg');

                    // Aplicar la transformación inicial
                    orbit.style.transform = `scale(${1 + (i * 0.25)}) ${initialTransform}`; 
                    atomContainer.appendChild(orbit);

                    // Crear electrones para esta órbita
                    const numElectrons = numElectronsPerOrbit[i] || 0;
                    for (let j = 0; j < numElectrons; j++) {
                        const electron = document.createElement('div');
                        electron.classList.add('electron');
                        // Posicionar electrones a lo largo de la órbita
                        const angle = (j / numElectrons) * 2 * Math.PI;
                        // Posicionar en el borde de la órbita
                        electron.style.left = `calc(50% + ${Math.cos(angle) * 50}% - var(--electron-size) / 2)`;
                        electron.style.top = `calc(50% + ${Math.sin(angle) * 50}% - var(--electron-size) / 2)`;
                        orbit.appendChild(electron);
                    }
                }
            }

            // Función para obtener la rotación inicial de cada órbita
            function getOrbitRotation(orbitNumber) {
                switch (orbitNumber) {
                    case 1: return 'rotateX(90deg)'; // Vertical
                    case 2: return 'rotateX(60deg) rotateY(30deg)'; // Diagonal 1 (forma de X)
                    case 3: return 'rotateX(60deg) rotateY(-30deg)'; // Diagonal 2 (forma de X)
                    case 4: return 'rotateX(90deg) rotateZ(45deg)'; // Nueva órbita vertical, ligeramente rotada
                    default: return 'rotateX(0deg)'; // Por defecto, plano
                }
            }

            // Inicializar el átomo
            createNucleusParticles();
            createOrbitsAndElectrons();
        });


        