// Gestión de Plantas - My Green Diary

class PlantManager {
    constructor() {
        this.plants = [];
        this.currentEditingId = null;
        this.db = null;
        this.useFirebase = false;
        // Inicializar event listeners primero para que funcionen inmediatamente
        this.setupEventListeners();
        // Luego cargar datos (async)
        this.initFirebase();
    }

    async initFirebase() {
        // Verificar si Firebase está inicializado
        if (typeof firebaseInitialized !== 'undefined' && firebaseInitialized && typeof firebase !== 'undefined') {
            try {
                this.db = firebase.firestore();
                this.useFirebase = true;
                console.log('✅ Firebase conectado correctamente');
                await this.loadPlantsFromFirebase();
            } catch (error) {
                console.error('Error inicializando Firebase:', error);
                this.plants = this.loadPlantsFromLocalStorage();
                this.useFirebase = false;
            }
        } else {
            console.log('ℹ️ Firebase no configurado, usando localStorage');
            this.plants = this.loadPlantsFromLocalStorage();
        }
        // Renderizar plantas después de cargar los datos
        this.renderPlants();
    }

    async loadPlantsFromFirebase() {
        try {
            const snapshot = await this.db.collection('plants').get();
            this.plants = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
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
            this.plants = this.loadPlantsFromLocalStorage();
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

            const toggleFormBtn = document.getElementById('toggleFormBtn');
            if (toggleFormBtn) {
                toggleFormBtn.addEventListener('click', () => this.toggleForm());
            }

            const cancelFormBtn = document.getElementById('cancelFormBtn');
            if (cancelFormBtn) {
                cancelFormBtn.addEventListener('click', () => this.toggleForm());
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

            // Photo tabs
            document.querySelectorAll('.photo-tab').forEach(tab => {
                tab.addEventListener('click', (e) => {
                    const tabType = e.target.dataset.tab;
                    if (tabType) this.switchPhotoTab(tabType);
                });
            });

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

            console.log('✅ Event listeners configurados correctamente');
        } catch (error) {
            console.error('Error configurando event listeners:', error);
        }
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
                await this.db.collection('plants').doc(plantId).delete();
            } catch (error) {
                console.error('Error eliminando de Firebase:', error);
                this.saveToLocalStorage();
            }
        }
    }

    // Formulario
    toggleForm() {
        const formSection = document.getElementById('plantFormSection');
        const btnText = document.getElementById('btnText');
        
        if (formSection.classList.contains('hidden')) {
            formSection.classList.remove('hidden');
            btnText.textContent = '➖ Ocultar Formulario';
            this.currentEditingId = null;
            document.getElementById('plantForm').reset();
            this.removePhotoPreview();
            this.switchPhotoTab('upload');
        } else {
            formSection.classList.add('hidden');
            btnText.textContent = '➕ Agregar Nueva Planta';
        }
    }

    switchPhotoTab(tabType) {
        document.querySelectorAll('.photo-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.photo-tab-content').forEach(content => {
            content.classList.remove('active');
            content.classList.add('hidden');
        });

        const activeTab = document.querySelector(`[data-tab="${tabType}"]`);
        const activeContent = document.getElementById(`${tabType}Tab`);

        if (activeTab) activeTab.classList.add('active');
        if (activeContent) {
            activeContent.classList.add('active');
            activeContent.classList.remove('hidden');
        }

        // Si cambiamos a URL tab, mantener la preview si existe una imagen base64
        // Si cambiamos de URL a upload, no hacer nada (la preview se manejará con el file input)
    }

    handleFileSelect(file) {
        if (!file || !file.type.startsWith('image/')) {
            this.showNotification('Por favor, selecciona un archivo de imagen válido', 'error');
            return;
        }

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
        if (fileInput) fileInput.value = '';
    }

    getPhotoData() {
        const previewDiv = document.getElementById('photoPreview');
        const previewImg = document.getElementById('previewImage');
        const urlInput = document.getElementById('plantPhoto');
        
        // Si hay una imagen cargada desde archivo
        if (!previewDiv.classList.contains('hidden') && previewImg.src) {
            // Verificar si es base64 o data URL
            if (previewImg.src.startsWith('data:image')) {
                return previewImg.src; // Devolver base64
            }
        }
        
        // Si hay URL ingresada
        const urlTab = document.getElementById('urlTab');
        if (!urlTab.classList.contains('hidden') && urlInput.value.trim()) {
            return urlInput.value.trim();
        }
        
        // Si no hay nada, retornar null para usar imagen por defecto
        return null;
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const photoData = this.getPhotoData();
        const existingPlant = this.currentEditingId ? this.plants.find(p => p.id === this.currentEditingId) : null;
        
        const formData = {
            id: this.currentEditingId || Date.now().toString(),
            name: document.getElementById('plantName').value.trim(),
            species: document.getElementById('plantSpecies').value.trim(),
            variety: document.getElementById('plantVariety').value.trim(),
            acquisitionDate: document.getElementById('plantAcquisitionDate').value || null,
            photo: photoData || (existingPlant?.photo) || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
            description: document.getElementById('plantDescription').value.trim(),
            light: document.getElementById('plantLight').value,
            temperature: document.getElementById('plantTemperature').value.trim(),
            humidity: document.getElementById('plantHumidity').value,
            substrate: document.getElementById('plantSubstrate').value.trim(),
            wateringSpring: document.getElementById('plantWateringSpring').value.trim(),
            wateringSummer: document.getElementById('plantWateringSummer').value.trim(),
            wateringAutumn: document.getElementById('plantWateringAutumn').value.trim(),
            wateringWinter: document.getElementById('plantWateringWinter').value.trim(),
            lastWatered: existingPlant?.lastWatered || null,
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
        this.toggleForm();
        this.showNotification(this.currentEditingId ? 'Planta actualizada' : 'Planta agregada', 'success');
        this.currentEditingId = null;
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
        const lastWatered = plant.lastWatered ? this.formatDate(plant.lastWatered) : 'Nunca';
        const daysSinceWatering = plant.lastWatered ? this.daysSince(plant.lastWatered) : null;
        const needsWater = daysSinceWatering !== null && daysSinceWatering >= 7;
        
        const wateringStatus = !plant.lastWatered 
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
                <img src="${plant.photo}" alt="${this.escapeHtml(plant.name)}" class="plant-card-image" 
                     onerror="this.src='https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'">
                <div class="plant-card-info">
                    ${plant.acquisitionDate ? `
                        <div class="info-item">
                            <span class="info-label">Adquirida:</span>
                            <span class="info-value">${this.formatAcquisitionDate(plant.acquisitionDate)}</span>
                        </div>
                    ` : ''}
                    ${plant.light ? `
                        <div class="info-item">
                            <span class="info-label">Luz:</span>
                            <span class="info-value">${this.escapeHtml(plant.light)}</span>
                        </div>
                    ` : ''}
                    <div class="info-item">
                        <span class="info-label">Último riego:</span>
                        <span class="info-value">${lastWatered}</span>
                    </div>
                    ${wateringStatus}
                </div>
                <div class="plant-card-actions">
                    <button class="btn-primary btn-small btn-water" data-water-id="${plant.id}">
                        💧 Regar Ahora
                    </button>
                    <button class="btn-secondary btn-small" data-edit-id="${plant.id}">
                        ✏️ Editar
                    </button>
                    <button class="btn-secondary btn-small" data-delete-id="${plant.id}" style="color: #ff6b6b; border-color: #ff6b6b;">
                        🗑️
                    </button>
                </div>
            </div>
        `;
    }

    // Funcionalidades
    async updateWatering(plantId) {
        const plant = this.plants.find(p => p.id === plantId);
        if (plant) {
            plant.lastWatered = new Date().toISOString();
            // Guardar individualmente en Firebase
            const saved = await this.savePlantToFirebase(plant);
            if (!saved) {
                await this.savePlants(); // Fallback
            }
            this.renderPlants();
            this.showNotification('Riego registrado correctamente', 'success');
        }
    }

    editPlant(plant) {
        this.currentEditingId = plant.id;
        document.getElementById('plantName').value = plant.name;
        document.getElementById('plantSpecies').value = plant.species;
        document.getElementById('plantVariety').value = plant.variety || '';
        document.getElementById('plantAcquisitionDate').value = plant.acquisitionDate || '';
        document.getElementById('plantDescription').value = plant.description || '';
        document.getElementById('plantLight').value = plant.light || '';
        document.getElementById('plantTemperature').value = plant.temperature || '';
        document.getElementById('plantHumidity').value = plant.humidity || '';
        document.getElementById('plantSubstrate').value = plant.substrate || '';
        document.getElementById('plantWateringSpring').value = plant.wateringSpring || '';
        document.getElementById('plantWateringSummer').value = plant.wateringSummer || '';
        document.getElementById('plantWateringAutumn').value = plant.wateringAutumn || '';
        document.getElementById('plantWateringWinter').value = plant.wateringWinter || '';
        
        // Manejar la foto según el tipo (base64 o URL)
        if (plant.photo) {
            if (plant.photo.startsWith('data:image')) {
                // Es base64 - mostrar en tab de upload con preview
                this.switchPhotoTab('upload');
                const previewDiv = document.getElementById('photoPreview');
                const previewImg = document.getElementById('previewImage');
                previewImg.src = plant.photo;
                previewDiv.classList.remove('hidden');
                document.getElementById('plantPhotoFile').value = ''; // Limpiar file input
            } else {
                // Es URL - mostrar en tab de URL
                this.switchPhotoTab('url');
                document.getElementById('plantPhoto').value = plant.photo;
                this.removePhotoPreview();
            }
        } else {
            // No hay foto - dejar en tab de upload limpio
            this.switchPhotoTab('upload');
            this.removePhotoPreview();
            document.getElementById('plantPhoto').value = '';
        }
        
        const formSection = document.getElementById('plantFormSection');
        if (formSection.classList.contains('hidden')) {
            this.toggleForm();
        }
        
        formSection.scrollIntoView({ behavior: 'smooth' });
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

    showPlantDetails(plant) {
        const modal = document.getElementById('plantModal');
        const modalBody = document.getElementById('modalBody');
        
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
                                ✏️
                            </button>
                            <button class="comment-btn delete-comment-btn" onclick="plantManager.deleteComment('${plant.id}', '${commentId}')" title="Eliminar">
                                🗑️
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

        modalBody.innerHTML = `
            <div class="modal-body">
                <img src="${plant.photo}" alt="${this.escapeHtml(plant.name)}" class="modal-image"
                     onerror="this.src='https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'">
                
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
                            <span class="info-label">Variación:</span>
                            <span class="info-value">${this.escapeHtml(plant.variety)}</span>
                        </div>
                    ` : ''}
                    ${plant.acquisitionDate ? `
                        <div class="info-item">
                            <span class="info-label">Fecha de Adquisición:</span>
                            <span class="info-value">${this.formatAcquisitionDate(plant.acquisitionDate)}</span>
                        </div>
                    ` : ''}
                    ${plant.light ? `
                        <div class="info-item">
                            <span class="info-label">Luz Requerida:</span>
                            <span class="info-value">${this.escapeHtml(plant.light)}</span>
                        </div>
                    ` : ''}
                    ${plant.temperature ? `
                        <div class="info-item">
                            <span class="info-label">Temperatura:</span>
                            <span class="info-value">${this.escapeHtml(plant.temperature)}</span>
                        </div>
                    ` : ''}
                    ${plant.humidity ? `
                        <div class="info-item">
                            <span class="info-label">Humedad:</span>
                            <span class="info-value">${this.escapeHtml(plant.humidity)}</span>
                        </div>
                    ` : ''}
                    ${plant.substrate ? `
                        <div class="info-item">
                            <span class="info-label">Sustrato:</span>
                            <span class="info-value">${this.escapeHtml(plant.substrate)}</span>
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
                        <span class="info-label">Último Riego:</span>
                        <span class="info-value">${plant.lastWatered ? this.formatDate(plant.lastWatered) : 'Nunca'}</span>
                    </div>
                </div>

                <div class="modal-section comments-section">
                    <h3>Comentarios</h3>
                    <div id="commentsList">
                        ${commentsHtml}
                    </div>
                    <div class="comment-form">
                        <textarea id="newComment" rows="3" placeholder="Agregar un comentario sobre esta planta..."></textarea>
                        <button class="btn-primary" onclick="plantManager.addComment('${plant.id}')">
                            Agregar Comentario
                        </button>
                    </div>
                </div>

                <div style="margin-top: 25px; display: flex; gap: 10px;">
                    <button class="btn-primary" onclick="(async () => { await plantManager.updateWatering('${plant.id}'); plantManager.closeModal(); })();">
                        💧 Registrar Riego
                    </button>
                    <button class="btn-secondary" onclick="plantManager.editPlant(plantManager.plants.find(p => p.id === '${plant.id}')); plantManager.closeModal();">
                        ✏️ Editar
                    </button>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
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
        
        if (panel.classList.contains('hidden')) {
            panel.classList.remove('hidden');
            btn.textContent = '🔼 Ocultar Filtros';
        } else {
            panel.classList.add('hidden');
            btn.textContent = '🔽 Filtros Avanzados';
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
