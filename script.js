// Gestión de Plantas - My Green Diary

// Tipos de sustrato con colores para el gráfico
const SUBSTRATE_TYPES = [
    { id: 'universal', name: 'Sustrato universal', color: '#8B4513' },
    { id: 'turba_rubia', name: 'Turba rubia', color: '#CD853F' },
    { id: 'fibra_coco', name: 'Fibra de coco', color: '#A0522D' },
    { id: 'mantillo', name: 'Mantillo', color: '#654321' },
    { id: 'perlita', name: 'Perlita', color: '#F5F5F5' },
    { id: 'vermiculita', name: 'Vermiculita', color: '#FFF8DC' },
    { id: 'arcilla_expandida', name: 'Arcilla expandida', color: '#9E7B6D' },
    { id: 'arena_rio', name: 'Arena de río', color: '#DCDCDC' },
    { id: 'grava', name: 'Grava', color: '#708090' },
    { id: 'corteza_pino', name: 'Corteza de pino', color: '#8B6914' },
    { id: 'humus', name: 'Humus de lombriz', color: '#556B2F' },
    { id: 'musgo', name: 'Musgo sphagnum', color: '#9ACD32' }
];

class PlantManager {
    constructor() {
        this.plants = [];
        this.currentEditingId = null;
        this.db = null;
        this.storage = null;
        this.useFirebase = false;
        this.modalPhotoIndex = {}; // Índice del carrusel de fotos en modal
        this.lightboxPhotoIndex = 0; // Índice de la foto en el lightbox
        this.lightboxPlantId = null; // ID de la planta en el lightbox
        // Inicializar event listeners primero para que funcionen inmediatamente
        this.setupEventListeners();
        // Luego cargar datos (async)
        this.initFirebase();
    }

    // Helper: Normalizar datos de planta (migrar estructura antigua)
    normalizePlantData(plant) {
        // Migrar photo a photos
        if (plant.photo && !plant.photos) {
            plant.photos = [plant.photo];
        } else if (!plant.photos) {
            plant.photos = [];
        }
        
        // Migrar lastWatered a wateringDates
        if (plant.lastWatered && !plant.wateringDates) {
            plant.wateringDates = [plant.lastWatered];
        } else if (!plant.wateringDates) {
            plant.wateringDates = [];
        }
        
        return plant;
    }

    // Inicializar selector de sustrato
    initSubstrateSelector(substrateData = null) {
        const substrateList = document.getElementById('substrateList');
        if (!substrateList) return;

        substrateList.innerHTML = '';
        const currentPercentages = substrateData || {};

        SUBSTRATE_TYPES.forEach(substrate => {
            const percentage = currentPercentages[substrate.id] || 0;
            const item = document.createElement('div');
            item.className = 'substrate-item';
            item.innerHTML = `
                <label>${substrate.name}</label>
                <div class="substrate-input-group">
                    <input type="number" 
                           min="0" 
                           max="100" 
                           value="${percentage}" 
                           class="substrate-percentage-input"
                           data-substrate-id="${substrate.id}"
                           data-substrate-color="${substrate.color}"
                           data-substrate-name="${substrate.name}">
                    <span class="substrate-percent">%</span>
                </div>
            `;
            substrateList.appendChild(item);
        });

        // Event listeners para inputs
        substrateList.querySelectorAll('.substrate-percentage-input').forEach(input => {
            input.addEventListener('input', () => this.updateSubstrateChart());
        });

        this.updateSubstrateChart();
    }

    // Actualizar gráfico circular de sustrato
    updateSubstrateChart() {
        const inputs = document.querySelectorAll('.substrate-percentage-input');
        const percentages = {};
        let total = 0;

        inputs.forEach(input => {
            const value = parseFloat(input.value) || 0;
            const substrateId = input.dataset.substrateId;
            percentages[substrateId] = value;
            total += value;
        });

        // Limitar total a 100%
        if (total > 100) {
            const excess = total - 100;
            // Reducir proporcionalmente
            inputs.forEach(input => {
                const value = parseFloat(input.value) || 0;
                if (value > 0 && total > 0) {
                    const newValue = Math.max(0, value - (excess * value / total));
                    input.value = Math.round(newValue * 10) / 10;
                }
            });
            // Recalcular
            total = 0;
            inputs.forEach(input => {
                const value = parseFloat(input.value) || 0;
                const substrateId = input.dataset.substrateId;
                percentages[substrateId] = value;
                total += value;
            });
        }

        // Actualizar visualización
        const remaining = 100 - total;
        const chartSvg = document.getElementById('substrateChart');
        if (chartSvg) {
            this.generateSubstratePieChart(chartSvg, percentages, remaining);
        }

        // Mostrar porcentaje restante
        const chartText = chartSvg?.querySelector('text');
        if (chartText) {
            chartText.textContent = total > 0 ? `${Math.round(total)}%` : '0%';
        }
    }

    // Generar gráfico circular (pie chart) SVG
    generateSubstratePieChart(svgElement, percentages, remaining = 0) {
        const radius = 80;
        const centerX = 100;
        const centerY = 100;
        
        // Limpiar paths existentes
        const existingPaths = svgElement.querySelectorAll('path');
        existingPaths.forEach(path => path.remove());

        let currentAngle = -Math.PI / 2; // Empezar desde arriba

        // Dibujar segmentos para cada sustrato con porcentaje > 0
        Object.entries(percentages).forEach(([substrateId, percentage]) => {
            if (percentage > 0) {
                const substrate = SUBSTRATE_TYPES.find(s => s.id === substrateId);
                if (substrate) {
                    const angle = (percentage / 100) * 2 * Math.PI;
                    const path = this.createPieSlice(centerX, centerY, radius, currentAngle, currentAngle + angle);
                    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    pathElement.setAttribute('d', path);
                    pathElement.setAttribute('fill', substrate.color);
                    pathElement.setAttribute('stroke', 'rgba(10, 31, 10, 0.8)');
                    pathElement.setAttribute('stroke-width', '2');
                    svgElement.insertBefore(pathElement, svgElement.querySelector('text'));
                    currentAngle += angle;
                }
            }
        });

        // Dibujar espacio restante (transparente)
        if (remaining > 0 && currentAngle < Math.PI * 1.5) {
            const angle = (remaining / 100) * 2 * Math.PI;
            const path = this.createPieSlice(centerX, centerY, radius, currentAngle, currentAngle + angle);
            const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathElement.setAttribute('d', path);
            pathElement.setAttribute('fill', 'rgba(10, 31, 10, 0.3)');
            pathElement.setAttribute('stroke', 'rgba(255, 255, 255, 0.2)');
            pathElement.setAttribute('stroke-width', '2');
            svgElement.insertBefore(pathElement, svgElement.querySelector('text'));
        }
    }

    // Crear slice de pie chart
    createPieSlice(centerX, centerY, radius, startAngle, endAngle) {
        const x1 = centerX + radius * Math.cos(startAngle);
        const y1 = centerY + radius * Math.sin(startAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);
        const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

        return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    }

    // Eliminar foto inválida de una planta
    async removeInvalidPhoto(plantId, photoUrl) {
        const plant = this.plants.find(p => p.id === plantId);
        if (!plant) return;

        const normalizedPlant = this.normalizePlantData(plant);
        const photos = normalizedPlant.photos || [];
        
        // Filtrar la foto inválida
        const validPhotos = photos.filter(photo => photo !== photoUrl);
        
        if (validPhotos.length !== photos.length) {
            // Actualizar la planta con las fotos válidas
            plant.photos = validPhotos;
            
            // Guardar en Firebase/LocalStorage
            if (this.useFirebase && this.db) {
                try {
                    await this.db.collection('plants').doc(plantId).update({
                        photos: validPhotos
                    });
                    console.log(`🗑️ Foto inválida eliminada de la planta ${plantId}`);
                } catch (error) {
                    console.error('Error eliminando foto inválida:', error);
                }
            } else {
                this.saveToLocalStorage();
            }
            
            // Si estamos viendo los detalles de esta planta, actualizar la vista
            const modalBody = document.getElementById('modalBody');
            if (modalBody && !modalBody.classList.contains('hidden')) {
                this.showPlantDetails(plant);
            }
            
            // Re-renderizar plantas si es necesario
            if (validPhotos.length === 0 && photos.length > 0) {
                this.renderPlants();
            }
        }
    }

    // Obtener datos de sustrato del formulario
    getSubstrateData() {
        const inputs = document.querySelectorAll('.substrate-percentage-input');
        const substrateData = {};
        
        inputs.forEach(input => {
            const value = parseFloat(input.value) || 0;
            if (value > 0) {
                substrateData[input.dataset.substrateId] = value;
            }
        });

        return Object.keys(substrateData).length > 0 ? substrateData : null;
    }

    // Generar HTML del gráfico circular para vista de detalles
    generateSubstrateChartHtml(substrateData) {
        if (!substrateData || typeof substrateData !== 'object') {
            return '';
        }

        // Crear SVG único con ID temporal
        const chartId = `substrateChart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        let total = 0;
        Object.values(substrateData).forEach(val => total += (parseFloat(val) || 0));

        const html = `
            <div class="substrate-display-container">
                <svg id="${chartId}" class="substrate-display-chart" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="80" fill="#1a3a1a" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
                    <text x="100" y="100" text-anchor="middle" dominant-baseline="middle" fill="rgba(255,255,255,0.7)" font-size="14" font-weight="600">${Math.round(total)}%</text>
                </svg>
                <button class="substrate-legend-btn" onclick="plantManager.showSubstrateLegend()" title="Ver leyenda">
                    <img src="img/icons/info.svg" alt="Info" class="substrate-legend-icon">
                </button>
            </div>
        `;

        // Generar el gráfico después de añadir al DOM
        setTimeout(() => {
            const svgElement = document.getElementById(chartId);
            if (svgElement && substrateData) {
                const remaining = 100 - total;
                this.generateSubstratePieChart(svgElement, substrateData, remaining);
            }
        }, 50);

        return html;
    }

    // Mostrar modal de leyenda de sustratos
    showSubstrateLegend() {
        const modal = document.getElementById('substrateLegendModal');
        const legendList = document.getElementById('substrateLegendList');
        
        if (!modal || !legendList) return;

        let html = '<div class="substrate-legend-grid">';
        SUBSTRATE_TYPES.forEach(substrate => {
            html += `
                <div class="substrate-legend-item">
                    <div class="substrate-legend-color" style="background-color: ${substrate.color};"></div>
                    <span class="substrate-legend-name">${substrate.name}</span>
                </div>
            `;
        });
        html += '</div>';
        
        legendList.innerHTML = html;
        modal.classList.remove('hidden');

        // Cerrar al hacer clic fuera
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'substrateLegendModal') {
                modal.classList.add('hidden');
            }
        }, { once: true });
    }

    async initFirebase() {
        // Verificar si Firebase está inicializado
        if (typeof firebaseInitialized !== 'undefined' && firebaseInitialized && typeof firebase !== 'undefined') {
            try {
                this.db = firebase.firestore();
                this.storage = firebase.storage();
                this.useFirebase = true;
                console.log('✅ Firebase conectado correctamente (Firestore + Storage)');
                await this.loadPlantsFromFirebase();
            } catch (error) {
                console.error('Error inicializando Firebase:', error);
                const localPlants = this.loadPlantsFromLocalStorage();
                this.plants = localPlants.map(plant => this.normalizePlantData(plant));
                this.useFirebase = false;
            }
        } else {
            console.log('ℹ️ Firebase no configurado, usando localStorage');
            const localPlants = this.loadPlantsFromLocalStorage();
            this.plants = localPlants.map(plant => this.normalizePlantData(plant));
        }
        // Renderizar plantas después de cargar los datos
        this.renderPlants();
    }

    async loadPlantsFromFirebase() {
        try {
            const snapshot = await this.db.collection('plants').get();
            this.plants = snapshot.docs.map(doc => {
                const plant = { id: doc.id, ...doc.data() };
                return this.normalizePlantData(plant);
            });
            console.log(`📦 ${this.plants.length} plantas cargadas desde Firebase`);
            
            // Si hay plantas en localStorage pero no en Firebase, migrar
            const localPlants = this.loadPlantsFromLocalStorage();
            if (localPlants.length > 0 && this.plants.length === 0) {
                const migrate = confirm(`¿Migrar ${localPlants.length} planta(s) de localStorage a Firebase?`);
                if (migrate) {
                    await this.migrateToFirebase(localPlants);
                }
            }
        } catch (error) {
            console.error('Error cargando desde Firebase:', error);
            this.showNotification('Error conectando con Firebase. Usando datos locales.', 'error');
            const localPlants = this.loadPlantsFromLocalStorage();
            this.plants = localPlants.map(plant => this.normalizePlantData(plant));
            this.useFirebase = false;
        }
    }

    async migrateToFirebase(localPlants) {
        try {
            const batch = this.db.batch();
            localPlants.forEach(plant => {
                const plantRef = this.db.collection('plants').doc(plant.id);
                batch.set(plantRef, plant);
            });
            await batch.commit();
            this.plants = localPlants;
            this.showNotification(`${localPlants.length} planta(s) migrada(s) a Firebase`, 'success');
            
            // Opcional: limpiar localStorage después de migrar
            // localStorage.removeItem('myGreenDiaryPlants');
        } catch (error) {
            console.error('Error en migración:', error);
            this.showNotification('Error en migración. Los datos se mantienen en localStorage.', 'error');
        }
    }

    loadPlantsFromLocalStorage() {
        const stored = localStorage.getItem('myGreenDiaryPlants');
        return stored ? JSON.parse(stored) : [];
    }

    setupEventListeners() {
        try {
            // Formulario
            const plantForm = document.getElementById('plantForm');
            if (plantForm) {
                plantForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
            }

            // Botón para abrir modal de nueva planta
            const openPlantModalBtn = document.getElementById('openPlantModalBtn');
            if (openPlantModalBtn) {
                openPlantModalBtn.addEventListener('click', () => this.openPlantFormModal());
            }

            // Botones para cerrar modal de formulario
            const closePlantFormModal = document.getElementById('closePlantFormModal');
            if (closePlantFormModal) {
                closePlantFormModal.addEventListener('click', () => this.closePlantFormModal());
            }

            const cancelFormBtn = document.getElementById('cancelFormBtn');
            if (cancelFormBtn) {
                cancelFormBtn.addEventListener('click', () => this.closePlantFormModal());
            }

            // Cerrar modal al hacer clic fuera
            const plantFormModal = document.getElementById('plantFormModal');
            if (plantFormModal) {
                plantFormModal.addEventListener('click', (e) => {
                    if (e.target.id === 'plantFormModal') {
                        this.closePlantFormModal();
                    }
                });
            }

            // Búsqueda
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => this.filterPlants(e.target.value));
            }

            // Filtros
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.applyFilter(e.target.dataset.filter);
                });
            });

            // Modal
            const closeModal = document.querySelector('.close-modal');
            if (closeModal) {
                closeModal.addEventListener('click', () => this.closeModal());
            }

            const plantModal = document.getElementById('plantModal');
            if (plantModal) {
                plantModal.addEventListener('click', (e) => {
                    if (e.target.id === 'plantModal') this.closeModal();
                });
            }


            // File upload preview
            const plantPhotoFile = document.getElementById('plantPhotoFile');
            if (plantPhotoFile) {
                plantPhotoFile.addEventListener('change', (e) => {
                    this.handleFileSelect(e.target.files[0]);
                });
            }

            // Remove preview button
            const removePreview = document.getElementById('removePreview');
            if (removePreview) {
                removePreview.addEventListener('click', () => {
                    this.removePhotoPreview();
                });
            }

            // Advanced filters
            const toggleFiltersBtn = document.getElementById('toggleFiltersBtn');
            if (toggleFiltersBtn) {
                toggleFiltersBtn.addEventListener('click', () => {
                    this.toggleAdvancedFilters();
                });
            }

            const applyFiltersBtn = document.getElementById('applyFiltersBtn');
            if (applyFiltersBtn) {
                applyFiltersBtn.addEventListener('click', () => {
                    this.applyAdvancedFilters();
                });
            }

            const clearFiltersBtn = document.getElementById('clearFiltersBtn');
            if (clearFiltersBtn) {
                clearFiltersBtn.addEventListener('click', () => {
                    this.clearAdvancedFilters();
                });
            }

            // Background changer
            const changeBgBtn = document.getElementById('changeBgBtn');
            if (changeBgBtn) {
                changeBgBtn.addEventListener('click', () => {
                    this.showBgModal();
                });
            }

            const bgModal = document.getElementById('bgModal');
            if (bgModal) {
                bgModal.addEventListener('click', (e) => {
                    if (e.target.id === 'bgModal' || e.target.classList.contains('close-bg-modal')) {
                        this.closeBgModal();
                    }
                });
            }

            console.log('✅ Event listeners configurados correctamente');
        } catch (error) {
            console.error('Error configurando event listeners:', error);
        }

        // Initialize background
        this.initBackground();
    }

    initBackground() {
        const savedBg = localStorage.getItem('plantDiaryBackground') || 'palm-tree-leaves';
        this.changeBackground(savedBg, false);
    }

    showBgModal() {
        const modal = document.getElementById('bgModal');
        const savedBg = localStorage.getItem('plantDiaryBackground') || 'palm-tree-leaves';
        
        // Marcar el fondo activo
        document.querySelectorAll('.bg-option').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.bg === savedBg) {
                option.classList.add('active');
            }
        });

        // Event listeners para las opciones
        document.querySelectorAll('.bg-option').forEach(option => {
            option.onclick = () => {
                const bgName = option.dataset.bg;
                this.changeBackground(bgName);
                this.closeBgModal();
            };
        });

        if (modal) modal.classList.remove('hidden');
    }

    closeBgModal() {
        const modal = document.getElementById('bgModal');
        if (modal) modal.classList.add('hidden');
    }

    changeBackground(bgName, save = true) {
        if (save) {
            localStorage.setItem('plantDiaryBackground', bgName);
        }
        
        const bgUrl = `img/bgs/${bgName}.jpg`;
        document.body.style.backgroundImage = `url('${bgUrl}')`;
        
        // Marcar opción activa en el modal si está abierto
        document.querySelectorAll('.bg-option').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.bg === bgName) {
                option.classList.add('active');
            }
        });
    }

    // Guardar una planta específica en Firebase
    async savePlantToFirebase(plant) {
        if (this.useFirebase && this.db) {
            try {
                await this.db.collection('plants').doc(plant.id).set(plant, { merge: true });
                return true;
            } catch (error) {
                console.error('Error guardando planta en Firebase:', error);
                return false;
            }
        }
        return false;
    }

    // Guardar todas las plantas (sincronización completa)
    async savePlants() {
        if (this.useFirebase && this.db) {
            try {
                // Si hay muchas plantas, usar batch para eficiencia
                if (this.plants.length > 10) {
                    const batch = this.db.batch();
                    this.plants.forEach(plant => {
                        const plantRef = this.db.collection('plants').doc(plant.id);
                        batch.set(plantRef, plant, { merge: true });
                    });
                    await batch.commit();
                } else {
                    // Guardar individualmente para mejor control de errores
                    const promises = this.plants.map(plant => 
                        this.db.collection('plants').doc(plant.id).set(plant, { merge: true })
                    );
                    await Promise.all(promises);
                }
            } catch (error) {
                console.error('Error guardando en Firebase:', error);
                this.showNotification('Error guardando en Firebase. Guardando localmente.', 'error');
                this.saveToLocalStorage();
            }
        } else {
            this.saveToLocalStorage();
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('myGreenDiaryPlants', JSON.stringify(this.plants));
    }

    // Eliminar planta de Firebase o localStorage
    async deletePlantFromStorage(plantId) {
        if (this.useFirebase && this.db) {
            try {
                // Buscar la planta para obtener la URL de la imagen
                const plant = this.plants.find(p => p.id === plantId);
                
                // Eliminar imagen de Storage si existe y es de Firebase Storage
                if (plant && plant.photo && plant.photo.includes('firebasestorage.googleapis.com') && this.storage) {
                    try {
                        const imageRef = this.storage.refFromURL(plant.photo);
                        await imageRef.delete();
                        console.log('✅ Imagen eliminada de Storage');
                    } catch (storageError) {
                        console.warn('No se pudo eliminar la imagen de Storage:', storageError);
                        // Continuar aunque falle la eliminación de la imagen
                    }
                }
                
                // Eliminar documento de Firestore
                await this.db.collection('plants').doc(plantId).delete();
            } catch (error) {
                console.error('Error eliminando de Firebase:', error);
                this.saveToLocalStorage();
            }
        }
    }

    // Modal de formulario
    openPlantFormModal(plant = null) {
        const modal = document.getElementById('plantFormModal');
        const modalTitle = document.getElementById('plantFormModalTitle');
        
        if (plant) {
            // Editar planta - cargar datos
            this.currentEditingId = plant.id;
            modalTitle.textContent = 'Editar Planta';
            this.loadPlantDataIntoForm(plant);
        } else {
            // Nueva planta - resetear formulario
            this.currentEditingId = null;
            modalTitle.textContent = 'Nueva Planta';
            document.getElementById('plantForm').reset();
            this.removePhotoPreview();
            this.initSubstrateSelector(); // Inicializar selector vacío
        }
        
        modal.classList.remove('hidden');
    }

    closePlantFormModal() {
        const modal = document.getElementById('plantFormModal');
        modal.classList.add('hidden');
        this.currentEditingId = null;
        document.getElementById('plantForm').reset();
        this.removePhotoPreview();
    }

    loadPlantDataIntoForm(plant) {
        document.getElementById('plantName').value = plant.name || '';
        document.getElementById('plantSpecies').value = plant.species || '';
        document.getElementById('plantVariety').value = plant.variety || '';
        document.getElementById('plantAcquisitionDate').value = plant.acquisitionDate || '';
        document.getElementById('plantDescription').value = plant.description || '';
        document.getElementById('plantLight').value = plant.light || '';
        document.getElementById('plantTemperature').value = plant.temperature || '';
        document.getElementById('plantHumidity').value = plant.humidity || '';
        document.getElementById('plantWateringSpring').value = plant.wateringSpring || '';
        document.getElementById('plantWateringSummer').value = plant.wateringSummer || '';
        document.getElementById('plantWateringAutumn').value = plant.wateringAutumn || '';
        document.getElementById('plantWateringWinter').value = plant.wateringWinter || '';
        
        // Cargar datos de sustrato (puede ser objeto o string antiguo)
        let substrateData = null;
        if (plant.substrate) {
            if (typeof plant.substrate === 'object') {
                substrateData = plant.substrate;
            } else {
                // Formato antiguo (string) - intentar parsear o dejar vacío
                substrateData = null;
            }
        }
        this.initSubstrateSelector(substrateData);
        
        // Mostrar última foto si existe
        const photos = plant.photos || (plant.photo ? [plant.photo] : []);
        if (photos.length > 0) {
            const lastPhoto = photos[photos.length - 1];
            const previewDiv = document.getElementById('photoPreview');
            const previewImg = document.getElementById('previewImage');
            previewImg.src = lastPhoto;
            previewDiv.classList.remove('hidden');
        } else {
            this.removePhotoPreview();
        }
    }


    handleFileSelect(file) {
        if (!file || !file.type.startsWith('image/')) {
            this.showNotification('Por favor, selecciona un archivo de imagen válido', 'error');
            return;
        }

        // Guardar el archivo para subirlo después
        const fileInput = document.getElementById('plantPhotoFile');
        if (fileInput) {
            fileInput.dataset.selectedFile = 'true';
        }

        // Mostrar preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageDataUrl = e.target.result;
            const previewDiv = document.getElementById('photoPreview');
            const previewImg = document.getElementById('previewImage');
            
            previewImg.src = imageDataUrl;
            previewDiv.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }

    removePhotoPreview() {
        const previewDiv = document.getElementById('photoPreview');
        const previewImg = document.getElementById('previewImage');
        const fileInput = document.getElementById('plantPhotoFile');
        
        previewDiv.classList.add('hidden');
        previewImg.src = '';
        if (fileInput) {
            fileInput.value = '';
            fileInput.dataset.selectedFile = 'false';
        }
    }

    async getPhotoData() {
        const previewDiv = document.getElementById('photoPreview');
        const previewImg = document.getElementById('previewImage');
        const urlInput = document.getElementById('plantPhoto');
        const fileInput = document.getElementById('plantPhotoFile');
        
        // Si hay un archivo seleccionado, subirlo a Firebase Storage
        if (fileInput && fileInput.files && fileInput.files.length > 0 && fileInput.dataset.selectedFile === 'true') {
            const file = fileInput.files[0];
            if (this.useFirebase && this.storage) {
                try {
                    const imageUrl = await this.uploadImageToStorage(file);
                    return imageUrl;
                } catch (error) {
                    console.error('Error subiendo imagen a Storage:', error);
                    this.showNotification('Error subiendo imagen. Usando base64 como respaldo.', 'error');
                    // Fallback a base64
                    return previewImg.src.startsWith('data:image') ? previewImg.src : null;
                }
            } else {
                // Si no hay Firebase, usar base64
                if (previewImg.src.startsWith('data:image')) {
                    return previewImg.src;
                }
            }
        }
        
        // Si hay una imagen base64 ya cargada (de edición)
        if (!previewDiv.classList.contains('hidden') && previewImg.src) {
            if (previewImg.src.startsWith('data:image')) {
                return previewImg.src; // Devolver base64
            }
            // Si es una URL de Firebase Storage, devolverla
            if (previewImg.src.startsWith('http')) {
                return previewImg.src;
            }
        }
        
        
        // Si no hay nada, retornar null para usar imagen por defecto
        return null;
    }

    async uploadImageToStorage(file) {
        if (!this.storage) {
            throw new Error('Storage no inicializado');
        }

        // Crear nombre único para la imagen
        const timestamp = Date.now();
        const fileName = `plants/${timestamp}_${file.name}`;
        const storageRef = this.storage.ref().child(fileName);

        // Subir el archivo
        const snapshot = await storageRef.put(file);
        
        // Obtener la URL de descarga
        const downloadURL = await snapshot.ref.getDownloadURL();
        
        console.log('✅ Imagen subida a Firebase Storage:', downloadURL);
        return downloadURL;
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const photoData = await this.getPhotoData();
        const existingPlant = this.currentEditingId ? this.plants.find(p => p.id === this.currentEditingId) : null;
        
        const formData = {
            id: this.currentEditingId || Date.now().toString(),
            name: document.getElementById('plantName').value.trim(),
            species: document.getElementById('plantSpecies').value.trim(),
            variety: document.getElementById('plantVariety').value.trim(),
            acquisitionDate: document.getElementById('plantAcquisitionDate').value || null,
            photos: photoData ? [...(this.normalizePlantData(existingPlant || {}).photos || []), photoData] : (existingPlant ? this.normalizePlantData(existingPlant).photos : []) || ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'],
            description: document.getElementById('plantDescription').value.trim(),
            light: document.getElementById('plantLight').value,
            temperature: document.getElementById('plantTemperature').value.trim(),
            humidity: document.getElementById('plantHumidity').value,
            substrate: this.getSubstrateData(),
            wateringSpring: document.getElementById('plantWateringSpring').value.trim(),
            wateringSummer: document.getElementById('plantWateringSummer').value.trim(),
            wateringAutumn: document.getElementById('plantWateringAutumn').value.trim(),
            wateringWinter: document.getElementById('plantWateringWinter').value.trim(),
            wateringDates: existingPlant ? (this.normalizePlantData(existingPlant).wateringDates || []) : [],
            comments: existingPlant?.comments || [],
            createdAt: existingPlant?.createdAt || new Date().toISOString()
        };

        if (this.currentEditingId) {
            // Editar planta existente
            const index = this.plants.findIndex(p => p.id === this.currentEditingId);
            if (index !== -1) {
                this.plants[index] = formData;
            }
            // Guardar individualmente en Firebase
            const saved = await this.savePlantToFirebase(formData);
            if (!saved) {
                await this.savePlants(); // Fallback: guardar todas
            }
        } else {
            // Nueva planta
            this.plants.push(formData);
            // Guardar individualmente en Firebase
            const saved = await this.savePlantToFirebase(formData);
            if (!saved) {
                await this.savePlants(); // Fallback: guardar todas
            }
        }

        this.renderPlants();
        this.closePlantFormModal();
        this.showNotification(this.currentEditingId ? 'Planta actualizada' : 'Planta agregada', 'success');
    }

    // Renderizado
    renderPlants(plantsToRender = null) {
        const container = document.getElementById('plantsContainer');
        const plants = plantsToRender || this.plants;

        if (plants.length === 0) {
            container.innerHTML = `
                <div class="glass-panel" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <p style="font-size: 1.2rem; color: var(--text-muted);">
                        🌱 No hay plantas registradas aún. ¡Agrega tu primera planta!
                    </p>
                </div>
            `;
            return;
        }

        container.innerHTML = plants.map(plant => this.createPlantCard(plant)).join('');
        
        // Agregar event listeners a las tarjetas
        plants.forEach(plant => {
            const card = document.querySelector(`[data-plant-id="${plant.id}"]`);
            if (card) {
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('.plant-card-actions')) {
                        this.showPlantDetails(plant);
                    }
                });
            }

            // Botón de riego
            const waterBtn = document.querySelector(`[data-water-id="${plant.id}"]`);
            if (waterBtn) {
                waterBtn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    await this.updateWatering(plant.id);
                });
            }

            // Botón de editar
            const editBtn = document.querySelector(`[data-edit-id="${plant.id}"]`);
            if (editBtn) {
                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.editPlant(plant);
                });
            }

            // Botón de eliminar
            const deleteBtn = document.querySelector(`[data-delete-id="${plant.id}"]`);
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.deletePlant(plant.id);
                });
            }
        });
    }

    createPlantCard(plant) {
        const normalizedPlant = this.normalizePlantData(plant);
        const photos = normalizedPlant.photos || [];
        const lastPhoto = photos.length > 0 ? photos[photos.length - 1] : 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400';
        
        // Obtener última fecha de riego
        const wateringDates = normalizedPlant.wateringDates || [];
        const lastWateringDate = wateringDates.length > 0 ? wateringDates[0] : null;
        const lastWatered = lastWateringDate ? this.formatDate(lastWateringDate) : 'Nunca';
        const daysSinceWatering = lastWateringDate ? this.daysSince(lastWateringDate) : null;
        const needsWater = daysSinceWatering !== null && daysSinceWatering >= 7;
        
        const wateringStatus = !lastWateringDate 
            ? '<span class="watering-status needs-water">Sin registrar</span>'
            : needsWater 
                ? `<span class="watering-status needs-water">Hace ${daysSinceWatering} días</span>`
                : `<span class="watering-status recent">Hace ${daysSinceWatering} días</span>`;

        return `
            <div class="plant-card" data-plant-id="${plant.id}">
                <div class="plant-card-header">
                    <div>
                        <h3 class="plant-card-title">${this.escapeHtml(plant.name)}</h3>
                        <p class="plant-card-species">${this.escapeHtml(plant.species)}${plant.variety ? ' - ' + this.escapeHtml(plant.variety) : ''}</p>
                    </div>
                </div>
                <img src="${lastPhoto}" alt="${this.escapeHtml(plant.name)}" class="plant-card-image" 
                     onerror="if(this.src !== 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400') { plantManager.removeInvalidPhoto('${plant.id}', this.src).then(() => { this.src='https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'; }); } else { this.src='https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'; }">
                <div class="plant-card-info">
                    ${plant.acquisitionDate ? `
                        <div class="info-item">
                            <span class="info-label"><img src="img/icons/date.svg" alt="Fecha" class="info-icon"> Adquirida:</span>
                            <span class="info-value">${this.formatAcquisitionDate(plant.acquisitionDate)}</span>
                        </div>
                    ` : ''}
                    ${plant.light ? `
                        <div class="info-item">
                            <span class="info-label"><img src="img/icons/sun.svg" alt="Luz" class="info-icon"> Luz:</span>
                            <span class="info-value">${this.escapeHtml(plant.light)}</span>
                        </div>
                    ` : ''}
                    <div class="info-item">
                        <span class="info-label"><img src="img/icons/water-drop.svg" alt="Riego" class="info-icon"> Último riego:</span>
                        <span class="info-value">${lastWatered}</span>
                    </div>
                    ${wateringStatus}
                </div>
                <div class="plant-card-actions">
                    <button class="btn-action btn-water-action" data-water-id="${plant.id}" title="Regar">
                        <img src="img/icons/water-drop.svg" alt="Regar" class="btn-action-icon">
                    </button>
                    <button class="btn-action btn-edit-action" data-edit-id="${plant.id}" title="Editar">
                        <img src="img/icons/edit.svg" alt="Editar" class="btn-action-icon">
                    </button>
                    <button class="btn-action btn-delete-action" data-delete-id="${plant.id}" title="Eliminar">
                        <img src="img/icons/delete.svg" alt="Eliminar" class="btn-action-icon">
                    </button>
                </div>
            </div>
        `;
    }

    // Funcionalidades
    async updateWatering(plantId) {
        const plant = this.plants.find(p => p.id === plantId);
        if (plant) {
            const normalizedPlant = this.normalizePlantData(plant);
            const today = new Date().toISOString().split('T')[0]; // Solo fecha YYYY-MM-DD
            
            // Agregar fecha si no existe ya
            if (!normalizedPlant.wateringDates.includes(today)) {
                normalizedPlant.wateringDates.push(today);
                normalizedPlant.wateringDates.sort().reverse(); // Ordenar descendente
            }
            
            // Actualizar planta normalizada
            const index = this.plants.findIndex(p => p.id === plantId);
            if (index !== -1) {
                this.plants[index] = normalizedPlant;
            }
            
            // Guardar individualmente en Firebase
            const saved = await this.savePlantToFirebase(normalizedPlant);
            if (!saved) {
                await this.savePlants(); // Fallback
            }
            this.renderPlants();
            this.showNotification('Riego registrado correctamente', 'success');
        }
    }

    editPlant(plant) {
        this.closeModal(); // Cerrar modal de detalles si está abierto
        this.openPlantFormModal(plant);
    }

    async deletePlant(plantId) {
        if (confirm('¿Estás seguro de que quieres eliminar esta planta?')) {
            this.plants = this.plants.filter(p => p.id !== plantId);
            await this.deletePlantFromStorage(plantId);
            await this.savePlants();
            this.renderPlants();
            this.showNotification('Planta eliminada', 'success');
        }
    }

    generateWateringCalendar(wateringDates, plantId) {
        if (!wateringDates || wateringDates.length === 0) {
            return '<p style="color: var(--text-muted);">No hay riegos registrados aún.</p>';
        }

        const now = new Date();
        const wateringDatesSet = new Set(wateringDates.map(date => {
            const d = new Date(date);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        }));

        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const dayNames = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

        let calendarHtml = '<div class="watering-calendar-multi-month">';

        // Generar calendarios para los últimos 6 meses
        for (let monthOffset = 5; monthOffset >= 0; monthOffset--) {
            const targetDate = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1);
            const month = targetDate.getMonth();
            const year = targetDate.getFullYear();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();
            // Convertir domingo (0) a 6, lunes (1) a 0, etc. para que empiece en lunes
            let startDayOfWeek = firstDay.getDay();
            startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

            calendarHtml += `
                <div class="calendar-month-container">
                    <div class="calendar-header-small">
                        <h5>${monthNames[month]} ${year}</h5>
                    </div>
                    <div class="calendar-grid-small">
                        ${dayNames.map(day => `<div class="calendar-day-name-small">${day}</div>`).join('')}
            `;

            for (let i = 0; i < startDayOfWeek; i++) {
                calendarHtml += '<div class="calendar-day-small empty"></div>';
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const isWatered = wateringDatesSet.has(dateStr);
                const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
                
                calendarHtml += `
                    <div class="calendar-day-small ${isWatered ? 'watered' : ''} ${isToday ? 'today' : ''}" title="${dateStr}">
                        ${isWatered ? '<img src="img/icons/water-drop.svg" alt="Riego" class="watering-icon-small">' : ''}
                        <span class="day-number-small">${day}</span>
                    </div>
                `;
            }

            calendarHtml += `
                    </div>
                </div>
            `;
        }

        calendarHtml += '</div>';

        return calendarHtml;
    }

    showWateringCalendarModal(plantId) {
        const plant = this.plants.find(p => p.id === plantId);
        if (!plant) return;
        
        const normalizedPlant = this.normalizePlantData(plant);
        const wateringDates = normalizedPlant.wateringDates || [];
        
        const modal = document.getElementById('wateringCalendarModal');
        const modalBody = document.getElementById('wateringCalendarModalBody');
        
        if (!modal || !modalBody) {
            // Crear modal si no existe
            const modalHtml = `
                <div id="wateringCalendarModal" class="modal hidden">
                    <div class="modal-content glass-panel watering-calendar-modal-content" style="max-height: 90vh; overflow-y: auto;">
                        <span class="close-modal" onclick="document.getElementById('wateringCalendarModal').classList.add('hidden')">&times;</span>
                        <h2 style="color: var(--light-green); margin-bottom: 20px;">
                            <img src="img/icons/water-drop.svg" alt="Calendario" class="label-icon" style="width: 24px; height: 24px;"> Calendario de Riegos
                        </h2>
                        <div id="wateringCalendarModalBody"></div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        }
        
        const newModal = document.getElementById('wateringCalendarModal');
        const newModalBody = document.getElementById('wateringCalendarModalBody');
        
        if (wateringDates.length === 0) {
            newModalBody.innerHTML = '<p style="color: var(--text-muted);">No hay riegos registrados aún.</p>';
        } else {
            newModalBody.innerHTML = this.generateWateringCalendar(wateringDates, plantId);
        }
        
        newModal.classList.remove('hidden');
        
        // Cerrar al hacer clic fuera
        newModal.addEventListener('click', (e) => {
            if (e.target.id === 'wateringCalendarModal') {
                newModal.classList.add('hidden');
            }
        });
    }

    openPhotoLightbox(plantId, photoIndex) {
        const plant = this.plants.find(p => p.id === plantId);
        if (!plant) return;
        
        const normalizedPlant = this.normalizePlantData(plant);
        const photos = normalizedPlant.photos || [];
        if (photos.length === 0) return;
        
        // Asegurar que el índice está en rango
        if (photoIndex < 0 || photoIndex >= photos.length) {
            photoIndex = 0;
        }
        
        // Crear modal lightbox si no existe
        let lightbox = document.getElementById('photoLightboxModal');
        if (!lightbox) {
            const lightboxHtml = `
                <div id="photoLightboxModal" class="modal hidden">
                    <div class="lightbox-container">
                        <span class="close-modal" onclick="document.getElementById('photoLightboxModal').classList.add('hidden')" style="color: white; font-size: 3rem; z-index: 1001;">&times;</span>
                        <button class="lightbox-nav prev" onclick="event.stopPropagation(); plantManager.changeLightboxPhoto(null, 'prev')">‹</button>
                        <button class="lightbox-nav next" onclick="event.stopPropagation(); plantManager.changeLightboxPhoto(null, 'next')">›</button>
                        <img id="lightboxImage" src="" alt="Foto" class="lightbox-image">
                        <div class="lightbox-info">
                            <span id="lightboxPhotoCount"></span>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', lightboxHtml);
            lightbox = document.getElementById('photoLightboxModal');
            
            // Cerrar al hacer clic fuera o con ESC
            lightbox.addEventListener('click', (e) => {
                if (e.target.id === 'photoLightboxModal' || e.target.classList.contains('lightbox-image')) {
                    lightbox.classList.add('hidden');
                }
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
                    lightbox.classList.add('hidden');
                }
            });
        }
        
        this.lightboxPhotoIndex = photoIndex;
        this.lightboxPlantId = plantId;
        this.updateLightboxImage(plantId, photoIndex);
        lightbox.classList.remove('hidden');
    }

    updateLightboxImage(plantId, photoIndex) {
        const plant = this.plants.find(p => p.id === plantId);
        if (!plant) return;
        
        const normalizedPlant = this.normalizePlantData(plant);
        const photos = normalizedPlant.photos || [];
        if (photos.length === 0) return;
        
        if (photoIndex < 0 || photoIndex >= photos.length) {
            photoIndex = 0;
        }
        
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxPhotoCount = document.getElementById('lightboxPhotoCount');
        
        if (lightboxImage) {
            lightboxImage.src = photos[photoIndex];
            // Añadir handler de error si no existe
            if (!lightboxImage.hasAttribute('data-error-handler')) {
                lightboxImage.setAttribute('data-error-handler', 'true');
                lightboxImage.onerror = async function() {
                    const currentSrc = this.src;
                    const fallbackSrc = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800';
                    if (currentSrc !== fallbackSrc && this.lightboxPlantId) {
                        await plantManager.removeInvalidPhoto(this.lightboxPlantId, currentSrc);
                        this.src = fallbackSrc;
                    } else {
                        this.src = fallbackSrc;
                    }
                };
                lightboxImage.lightboxPlantId = plantId;
            } else {
                // Actualizar plantId en el handler
                lightboxImage.lightboxPlantId = plantId;
            }
        }
        
        if (lightboxPhotoCount) {
            lightboxPhotoCount.textContent = `${photoIndex + 1} / ${photos.length}`;
        }
    }

    changeLightboxPhoto(plantId, direction) {
        // Si no se pasa plantId, usar el guardado
        const targetPlantId = plantId || this.lightboxPlantId;
        const plant = this.plants.find(p => p.id === targetPlantId);
        if (!plant) return;
        
        const normalizedPlant = this.normalizePlantData(plant);
        const photos = normalizedPlant.photos || [];
        if (photos.length <= 1) return;
        
        if (this.lightboxPhotoIndex === undefined || this.lightboxPhotoIndex === null) {
            this.lightboxPhotoIndex = 0;
        }
        
        let currentIndex = this.lightboxPhotoIndex;
        let newIndex;
        
        if (direction === 'prev') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
        } else {
            newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
        }
        
        this.lightboxPhotoIndex = newIndex;
        this.lightboxPlantId = targetPlantId;
        this.updateLightboxImage(targetPlantId, newIndex);
    }

    showPlantDetails(plant) {
        const modal = document.getElementById('plantModal');
        const modalBody = document.getElementById('modalBody');
        const normalizedPlant = this.normalizePlantData(plant);
        const photos = normalizedPlant.photos || [];
        const lastPhoto = photos.length > 0 ? photos[photos.length - 1] : 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800';
        const wateringDates = normalizedPlant.wateringDates || [];
        const lastWateringDate = wateringDates.length > 0 ? wateringDates[0] : null;
        
        // Inicializar índice del carrusel con la última foto
        if (photos.length > 0) {
            this.modalPhotoIndex[plant.id] = photos.length - 1;
        }
        
        const commentsHtml = plant.comments && plant.comments.length > 0
            ? plant.comments.map((comment, index) => {
                const commentId = comment.id || `${plant.id}-comment-${index}`;
                if (!comment.id) comment.id = commentId;
                const editedBadge = comment.editedAt ? '<span style="color: var(--text-muted); font-size: 0.75rem; margin-left: 8px;">(editado)</span>' : '';
                return `
                <div class="comment" data-comment-id="${commentId}">
                    <div class="comment-header">
                        <div class="comment-date">
                            📅 ${this.formatCommentDate(comment.date)}
                            ${editedBadge}
                        </div>
                        <div class="comment-actions">
                            <button class="comment-btn edit-comment-btn" onclick="plantManager.editComment('${plant.id}', '${commentId}')" title="Editar">
                                Editar
                            </button>
                            <button class="comment-btn delete-comment-btn" onclick="plantManager.deleteComment('${plant.id}', '${commentId}')" title="Eliminar">
                                Eliminar
                            </button>
                        </div>
                    </div>
                    <div class="comment-text" id="comment-text-${commentId}">${this.escapeHtml(comment.text)}</div>
                    <div class="comment-edit-form hidden" id="comment-edit-${commentId}">
                        <textarea class="comment-edit-textarea" id="comment-edit-text-${commentId}">${this.escapeHtml(comment.text)}</textarea>
                        <div class="comment-edit-actions">
                            <button class="btn-primary btn-small" onclick="plantManager.saveComment('${plant.id}', '${commentId}')">Guardar</button>
                            <button class="btn-secondary btn-small" onclick="plantManager.cancelEditComment('${commentId}')">Cancelar</button>
                        </div>
                    </div>
                </div>
            `;
            }).join('')
            : '<p style="color: var(--text-muted);">No hay comentarios aún.</p>';

        const photoCarouselHtml = photos.length > 1 ? `
            <div class="photo-carousel-modal">
                <div class="carousel-main-photo">
                    <img src="${lastPhoto}" alt="${this.escapeHtml(plant.name)}" class="modal-image carousel-main-img" id="modalMainPhoto-${plant.id}" onclick="plantManager.openPhotoLightbox('${plant.id}', ${photos.length - 1})" style="cursor: pointer;"
                         onerror="if(this.src !== 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800') { plantManager.removeInvalidPhoto('${plant.id}', this.src).then(() => { this.src='https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'; }); } else { this.src='https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'; }">
                    ${photos.length > 1 ? `
                        <button class="carousel-nav prev" onclick="event.stopPropagation(); plantManager.changeModalPhoto('${plant.id}', 'prev')">‹</button>
                        <button class="carousel-nav next" onclick="event.stopPropagation(); plantManager.changeModalPhoto('${plant.id}', 'next')">›</button>
                    ` : ''}
                </div>
                <div class="carousel-thumbnails">
                    ${photos.map((photo, index) => `
                        <img src="${photo}" alt="Foto ${index + 1}" class="carousel-thumb ${index === photos.length - 1 ? 'active' : ''}" 
                             onclick="plantManager.selectModalPhoto('${plant.id}', ${index})" data-index="${index}"
                             onerror="if(this.src !== 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800') { plantManager.removeInvalidPhoto('${plant.id}', this.src); this.style.display='none'; }">
                    `).join('')}
                </div>
            </div>
        ` : `
            <img src="${lastPhoto}" alt="${this.escapeHtml(plant.name)}" class="modal-image carousel-main-img" onclick="plantManager.openPhotoLightbox('${plant.id}', 0)" style="cursor: pointer;"
                 onerror="if(this.src !== 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800') { plantManager.removeInvalidPhoto('${plant.id}', this.src).then(() => { this.src='https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'; }); } else { this.src='https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'; }">
        `;

        modalBody.innerHTML = `
            <div class="modal-body">
                ${photoCarouselHtml}
                <div style="margin-top: 15px;">
                    <button class="btn-secondary btn-small" onclick="plantManager.addPhotoToPlant('${plant.id}')">
                        <img src="img/icons/photo.svg" alt="Foto" class="btn-icon"> Añadir Foto Nueva
                    </button>
                </div>
                
                <div class="modal-section">
                    <h2 style="color: var(--light-green); margin-bottom: 10px; font-size: 2rem;">
                        ${this.escapeHtml(plant.name)}
                    </h2>
                    <p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">
                        ${this.escapeHtml(plant.species)}${plant.variety ? ' - ' + this.escapeHtml(plant.variety) : ''}
                    </p>
                </div>

                ${plant.description ? `
                    <div class="modal-section">
                        <h3>Descripción</h3>
                        <p>${this.escapeHtml(plant.description)}</p>
                    </div>
                ` : ''}

                <div class="modal-section">
                    <h3>Información de Cuidados</h3>
                    ${plant.variety ? `
                        <div class="info-item">
                            <span class="info-label"><img src="img/icons/monstera.svg" alt="Variación" class="info-icon"> Variación:</span>
                            <span class="info-value">${this.escapeHtml(plant.variety)}</span>
                        </div>
                    ` : ''}
                    ${plant.acquisitionDate ? `
                        <div class="info-item">
                            <span class="info-label"><img src="img/icons/date.svg" alt="Fecha" class="info-icon"> Fecha de Adquisición:</span>
                            <span class="info-value">${this.formatAcquisitionDate(plant.acquisitionDate)}</span>
                        </div>
                    ` : ''}
                    ${plant.light ? `
                        <div class="info-item">
                            <span class="info-label"><img src="img/icons/sun.svg" alt="Luz" class="info-icon"> Luz Requerida:</span>
                            <span class="info-value">${this.escapeHtml(plant.light)}</span>
                        </div>
                    ` : ''}
                    ${plant.temperature ? `
                        <div class="info-item">
                            <span class="info-label"><img src="img/icons/temperature.svg" alt="Temperatura" class="info-icon"> Temperatura:</span>
                            <span class="info-value">${this.escapeHtml(plant.temperature)}</span>
                        </div>
                    ` : ''}
                    ${plant.humidity ? `
                        <div class="info-item">
                            <span class="info-label"><img src="img/icons/humidity.svg" alt="Humedad" class="info-icon"> Humedad:</span>
                            <span class="info-value">${this.escapeHtml(plant.humidity)}</span>
                        </div>
                    ` : ''}
                    ${plant.substrate && typeof plant.substrate === 'object' ? `
                        <div class="info-item substrate-info-item">
                            <span class="info-label"><img src="img/icons/plant.svg" alt="Sustrato" class="info-icon"> Sustrato:</span>
                            <div class="substrate-display-wrapper">
                                ${this.generateSubstrateChartHtml(plant.substrate)}
                            </div>
                        </div>
                    ` : ''}
                    ${(plant.wateringSpring || plant.wateringSummer || plant.wateringAutumn || plant.wateringWinter) ? `
                        <div style="margin-top: 15px;">
                            <strong style="color: var(--light-green); display: block; margin-bottom: 10px;">Frecuencia de Riego por Estación:</strong>
                            ${plant.wateringSpring ? `
                                <div class="info-item">
                                    <span class="info-label">🌱 Primavera:</span>
                                    <span class="info-value">${this.escapeHtml(plant.wateringSpring)}</span>
                                </div>
                            ` : ''}
                            ${plant.wateringSummer ? `
                                <div class="info-item">
                                    <span class="info-label">☀️ Verano:</span>
                                    <span class="info-value">${this.escapeHtml(plant.wateringSummer)}</span>
                                </div>
                            ` : ''}
                            ${plant.wateringAutumn ? `
                                <div class="info-item">
                                    <span class="info-label">🍂 Otoño:</span>
                                    <span class="info-value">${this.escapeHtml(plant.wateringAutumn)}</span>
                                </div>
                            ` : ''}
                            ${plant.wateringWinter ? `
                                <div class="info-item">
                                    <span class="info-label">❄️ Invierno:</span>
                                    <span class="info-value">${this.escapeHtml(plant.wateringWinter)}</span>
                                </div>
                            ` : ''}
                        </div>
                    ` : ''}
                    <div class="info-item">
                        <span class="info-label"><img src="img/icons/water-drop.svg" alt="Riego" class="info-icon"> Último Riego:</span>
                        <span class="info-value">${lastWateringDate ? this.formatDate(lastWateringDate) : 'Nunca'}</span>
                    </div>
                </div>


                <div class="modal-section comments-section">
                    <h3>Comentarios</h3>
                    <div id="commentsList">
                        ${commentsHtml}
                    </div>
                    <div class="comment-form">
                        <textarea id="newComment" rows="3" placeholder="Agregar un comentario sobre esta planta..."></textarea>
                        <div class="plant-card-actions" style="margin-top: 10px;">
                            <button class="btn-action" onclick="plantManager.addComment('${plant.id}')" title="Agregar Comentario">
                                <img src="img/icons/comment.svg" alt="Comentario" class="btn-action-icon"> Agregar Comentario
                            </button>
                            ${wateringDates.length > 0 ? `
                                <button class="btn-action btn-water-action" onclick="plantManager.showWateringCalendarModal('${plant.id}')" title="Ver Calendario de Riegos">
                                    <img src="img/icons/water-drop.svg" alt="Calendario" class="btn-action-icon"> Ver Calendario de Riegos
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
                </div>

                <div class="plant-card-actions" style="margin-top: 25px; justify-content: center;">
                    <button class="btn-action btn-water-action" onclick="(async () => { await plantManager.updateWatering('${plant.id}'); plantManager.closeModal(); })();" title="Registrar Riego">
                        <img src="img/icons/water-drop.svg" alt="Regar" class="btn-action-icon">
                    </button>
                    <button class="btn-action btn-edit-action" onclick="plantManager.editPlant(plantManager.plants.find(p => p.id === '${plant.id}')); plantManager.closeModal();" title="Editar">
                        <img src="img/icons/edit.svg" alt="Editar" class="btn-action-icon">
                    </button>
                    <button class="btn-action btn-delete-action" onclick="plantManager.deletePlant('${plant.id}'); plantManager.closeModal();" title="Eliminar">
                        <img src="img/icons/delete.svg" alt="Eliminar" class="btn-action-icon">
                    </button>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
    }

    changeModalPhoto(plantId, direction) {
        const plant = this.plants.find(p => p.id === plantId);
        if (!plant) return;
        
        const normalizedPlant = this.normalizePlantData(plant);
        const photos = normalizedPlant.photos || [];
        if (photos.length <= 1) return;
        
        // Asegurar que el índice existe
        if (this.modalPhotoIndex[plantId] === undefined || this.modalPhotoIndex[plantId] === null) {
            this.modalPhotoIndex[plantId] = photos.length > 0 ? photos.length - 1 : 0;
        }
        
        let currentIndex = this.modalPhotoIndex[plantId];
        
        // Validar que el índice esté en rango
        if (currentIndex < 0 || currentIndex >= photos.length) {
            currentIndex = photos.length - 1;
        }
        
        let newIndex;
        
        if (direction === 'prev') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
        } else {
            newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
        }
        
        this.selectModalPhoto(plantId, newIndex);
    }

    selectModalPhoto(plantId, index) {
        const plant = this.plants.find(p => p.id === plantId);
        if (!plant) return;
        
        const normalizedPlant = this.normalizePlantData(plant);
        const photos = normalizedPlant.photos || [];
        if (index < 0 || index >= photos.length) return;
        
        this.modalPhotoIndex[plantId] = index;
        
        const mainPhoto = document.getElementById(`modalMainPhoto-${plantId}`);
        if (mainPhoto) {
            mainPhoto.src = photos[index];
        }
        
        document.querySelectorAll('.carousel-thumb').forEach((thumb, i) => {
            if (parseInt(thumb.dataset.index) === index) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    async addPhotoToPlant(plantId) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            try {
                let photoUrl;
                if (this.useFirebase && this.storage) {
                    photoUrl = await this.uploadImageToStorage(file);
                } else {
                    photoUrl = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => resolve(e.target.result);
                        reader.readAsDataURL(file);
                    });
                }
                
                const plant = this.plants.find(p => p.id === plantId);
                if (plant) {
                    const normalizedPlant = this.normalizePlantData(plant);
                    normalizedPlant.photos.push(photoUrl);
                    
                    const index = this.plants.findIndex(p => p.id === plantId);
                    if (index !== -1) {
                        this.plants[index] = normalizedPlant;
                    }
                    
                    await this.savePlantToFirebase(normalizedPlant);
                    this.showPlantDetails(normalizedPlant);
                    this.showNotification('Foto agregada correctamente', 'success');
                }
            } catch (error) {
                console.error('Error agregando foto:', error);
                this.showNotification('Error agregando foto', 'error');
            }
        };
        input.click();
    }

    async addComment(plantId) {
        const commentText = document.getElementById('newComment').value.trim();
        if (!commentText) {
            this.showNotification('Por favor, escribe un comentario', 'error');
            return;
        }

        const plant = this.plants.find(p => p.id === plantId);
        if (plant) {
            if (!plant.comments) {
                plant.comments = [];
            }
            plant.comments.push({
                id: `${plantId}-comment-${Date.now()}`,
                date: new Date().toISOString(),
                text: commentText
            });
            await this.savePlants();
            this.showPlantDetails(plant);
            document.getElementById('newComment').value = '';
            this.showNotification('Comentario agregado', 'success');
        }
    }

    editComment(plantId, commentId) {
        const commentTextDiv = document.getElementById(`comment-text-${commentId}`);
        const commentEditForm = document.getElementById(`comment-edit-${commentId}`);
        
        if (commentTextDiv && commentEditForm) {
            commentTextDiv.style.display = 'none';
            commentEditForm.classList.remove('hidden');
        }
    }

    async saveComment(plantId, commentId) {
        const plant = this.plants.find(p => p.id === plantId);
        if (!plant || !plant.comments) return;

        const editTextarea = document.getElementById(`comment-edit-text-${commentId}`);
        const newText = editTextarea.value.trim();
        
        if (!newText) {
            this.showNotification('El comentario no puede estar vacío', 'error');
            return;
        }

        const comment = plant.comments.find(c => c.id === commentId);
        if (comment) {
            comment.text = newText;
            comment.editedAt = new Date().toISOString();
            // Guardar individualmente en Firebase
            const saved = await this.savePlantToFirebase(plant);
            if (!saved) {
                await this.savePlants(); // Fallback
            }
            this.showPlantDetails(plant);
            this.showNotification('Comentario actualizado', 'success');
        }
    }

    cancelEditComment(commentId) {
        const commentTextDiv = document.getElementById(`comment-text-${commentId}`);
        const commentEditForm = document.getElementById(`comment-edit-${commentId}`);
        
        if (commentTextDiv && commentEditForm) {
            commentTextDiv.style.display = 'block';
            commentEditForm.classList.add('hidden');
        }
    }

    async deleteComment(plantId, commentId) {
        if (!confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
            return;
        }

        const plant = this.plants.find(p => p.id === plantId);
        if (plant && plant.comments) {
            plant.comments = plant.comments.filter(c => c.id !== commentId);
            // Guardar individualmente en Firebase
            const saved = await this.savePlantToFirebase(plant);
            if (!saved) {
                await this.savePlants(); // Fallback
            }
            this.showPlantDetails(plant);
            this.showNotification('Comentario eliminado', 'success');
        }
    }

    formatCommentDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        const timeString = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        const fullDate = date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        if (diffDays === 0) {
            return `Hoy a las ${timeString}`;
        }
        if (diffDays === 1) {
            return `Ayer a las ${timeString}`;
        }
        if (diffDays < 7) {
            return `${fullDate} a las ${timeString}`;
        }
        
        return `${fullDate} a las ${timeString}`;
    }

    closeModal() {
        document.getElementById('plantModal').classList.add('hidden');
    }

    // Filtros y búsqueda
    filterPlants(searchTerm) {
        const filtered = this.plants.filter(plant => {
            const searchLower = searchTerm.toLowerCase();
            return plant.name.toLowerCase().includes(searchLower) ||
                   plant.species.toLowerCase().includes(searchLower) ||
                   (plant.description && plant.description.toLowerCase().includes(searchLower));
        });
        this.renderPlants(filtered);
    }

    applyFilter(filterType) {
        let filtered = [];
        
        switch(filterType) {
            case 'needs-water':
                filtered = this.plants.filter(plant => {
                    if (!plant.lastWatered) return true;
                    return this.daysSince(plant.lastWatered) >= 7;
                });
                break;
            case 'recent':
                filtered = this.plants.filter(plant => {
                    if (!plant.createdAt) return false;
                    return this.daysSince(plant.createdAt) <= 7;
                });
                break;
            default:
                filtered = this.plants;
        }
        
        this.renderPlants(filtered);
    }

    toggleAdvancedFilters() {
        const panel = document.getElementById('advancedFiltersPanel');
        const btn = document.getElementById('toggleFiltersBtn');
        const icon = document.getElementById('toggleFilterIcon');
        
        if (panel.classList.contains('hidden')) {
            panel.classList.remove('hidden');
            btn.innerHTML = '<img src="img/icons/filter.svg" alt="Filtros" class="btn-icon" id="toggleFilterIcon"> Ocultar Filtros';
        } else {
            panel.classList.add('hidden');
            btn.innerHTML = '<img src="img/icons/filter.svg" alt="Filtros" class="btn-icon" id="toggleFilterIcon"> Filtros Avanzados';
        }
    }

    applyAdvancedFilters() {
        const speciesFilter = document.getElementById('filterSpecies').value.trim().toLowerCase();
        const lightFilter = document.getElementById('filterLight').value;
        const humidityFilter = document.getElementById('filterHumidity').value;
        const varietyFilter = document.getElementById('filterVariety').value.trim().toLowerCase();
        const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();

        let filtered = this.plants.filter(plant => {
            // Búsqueda de texto
            if (searchTerm) {
                const matchesSearch = plant.name.toLowerCase().includes(searchTerm) ||
                                    plant.species.toLowerCase().includes(searchTerm) ||
                                    (plant.description && plant.description.toLowerCase().includes(searchTerm));
                if (!matchesSearch) return false;
            }

            // Filtro por especie
            if (speciesFilter && !plant.species.toLowerCase().includes(speciesFilter)) {
                return false;
            }

            // Filtro por luz
            if (lightFilter && plant.light !== lightFilter) {
                return false;
            }

            // Filtro por humedad
            if (humidityFilter && plant.humidity !== humidityFilter) {
                return false;
            }

            // Filtro por variación
            if (varietyFilter && (!plant.variety || !plant.variety.toLowerCase().includes(varietyFilter))) {
                return false;
            }

            return true;
        });

        this.renderPlants(filtered);
        this.showNotification(`${filtered.length} planta(s) encontrada(s)`, 'success');
    }

    clearAdvancedFilters() {
        document.getElementById('filterSpecies').value = '';
        document.getElementById('filterLight').value = '';
        document.getElementById('filterHumidity').value = '';
        document.getElementById('filterVariety').value = '';
        document.getElementById('searchInput').value = '';
        this.renderPlants();
        this.showNotification('Filtros limpiados', 'success');
    }

    // Utilidades
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Hoy';
        if (diffDays === 1) return 'Ayer';
        if (diffDays < 7) return `Hace ${diffDays} días`;
        
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatAcquisitionDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    daysSince(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type = 'success') {
        // Crear notificación temporal
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--accent-green)' : '#ff6b6b'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 2000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Inicializar la aplicación
let plantManager;

// Esperar a que el DOM esté listo Y que Firebase esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Pequeño delay para asegurar que Firebase esté cargado
    setTimeout(() => {
        try {
            plantManager = new PlantManager();
        } catch (error) {
            console.error('Error inicializando PlantManager:', error);
            // Crear instancia sin Firebase si hay error
            plantManager = new PlantManager();
        }
    }, 100);
});

// Agregar estilos de animación para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
