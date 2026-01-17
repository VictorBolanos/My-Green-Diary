// Gestión de Plantas - My Green Diary

class PlantManager {
    constructor() {
        this.plants = this.loadPlants();
        this.currentEditingId = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderPlants();
    }

    setupEventListeners() {
        // Formulario
        document.getElementById('plantForm').addEventListener('submit', (e) => this.handleFormSubmit(e));
        document.getElementById('toggleFormBtn').addEventListener('click', () => this.toggleForm());
        document.getElementById('cancelFormBtn').addEventListener('click', () => this.toggleForm());

        // Búsqueda
        document.getElementById('searchInput').addEventListener('input', (e) => this.filterPlants(e.target.value));

        // Filtros
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.applyFilter(e.target.dataset.filter);
            });
        });

        // Modal
        document.querySelector('.close-modal').addEventListener('click', () => this.closeModal());
        document.getElementById('plantModal').addEventListener('click', (e) => {
            if (e.target.id === 'plantModal') this.closeModal();
        });
    }

    // LocalStorage
    loadPlants() {
        const stored = localStorage.getItem('myGreenDiaryPlants');
        return stored ? JSON.parse(stored) : [];
    }

    savePlants() {
        localStorage.setItem('myGreenDiaryPlants', JSON.stringify(this.plants));
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
        } else {
            formSection.classList.add('hidden');
            btnText.textContent = '➕ Agregar Nueva Planta';
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = {
            id: this.currentEditingId || Date.now().toString(),
            name: document.getElementById('plantName').value.trim(),
            species: document.getElementById('plantSpecies').value.trim(),
            age: document.getElementById('plantAge').value.trim(),
            photo: document.getElementById('plantPhoto').value.trim() || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
            description: document.getElementById('plantDescription').value.trim(),
            light: document.getElementById('plantLight').value,
            temperature: document.getElementById('plantTemperature').value.trim(),
            humidity: document.getElementById('plantHumidity').value,
            substrate: document.getElementById('plantSubstrate').value.trim(),
            wateringFrequency: document.getElementById('plantWateringFrequency').value.trim(),
            lastWatered: this.currentEditingId ? this.plants.find(p => p.id === this.currentEditingId)?.lastWatered || null : null,
            comments: this.currentEditingId ? this.plants.find(p => p.id === this.currentEditingId)?.comments || [] : [],
            createdAt: this.currentEditingId ? this.plants.find(p => p.id === this.currentEditingId)?.createdAt || new Date().toISOString() : new Date().toISOString()
        };

        if (this.currentEditingId) {
            const index = this.plants.findIndex(p => p.id === this.currentEditingId);
            if (index !== -1) {
                this.plants[index] = formData;
            }
        } else {
            this.plants.push(formData);
        }

        this.savePlants();
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
                waterBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.updateWatering(plant.id);
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
                        <p class="plant-card-species">${this.escapeHtml(plant.species)}</p>
                    </div>
                </div>
                <img src="${plant.photo}" alt="${this.escapeHtml(plant.name)}" class="plant-card-image" 
                     onerror="this.src='https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'">
                <div class="plant-card-info">
                    ${plant.age ? `
                        <div class="info-item">
                            <span class="info-label">Edad:</span>
                            <span class="info-value">${this.escapeHtml(plant.age)}</span>
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
    updateWatering(plantId) {
        const plant = this.plants.find(p => p.id === plantId);
        if (plant) {
            plant.lastWatered = new Date().toISOString();
            this.savePlants();
            this.renderPlants();
            this.showNotification('Riego registrado correctamente', 'success');
        }
    }

    editPlant(plant) {
        this.currentEditingId = plant.id;
        document.getElementById('plantName').value = plant.name;
        document.getElementById('plantSpecies').value = plant.species;
        document.getElementById('plantAge').value = plant.age || '';
        document.getElementById('plantPhoto').value = plant.photo || '';
        document.getElementById('plantDescription').value = plant.description || '';
        document.getElementById('plantLight').value = plant.light || '';
        document.getElementById('plantTemperature').value = plant.temperature || '';
        document.getElementById('plantHumidity').value = plant.humidity || '';
        document.getElementById('plantSubstrate').value = plant.substrate || '';
        document.getElementById('plantWateringFrequency').value = plant.wateringFrequency || '';
        
        const formSection = document.getElementById('plantFormSection');
        if (formSection.classList.contains('hidden')) {
            this.toggleForm();
        }
        
        formSection.scrollIntoView({ behavior: 'smooth' });
    }

    deletePlant(plantId) {
        if (confirm('¿Estás seguro de que quieres eliminar esta planta?')) {
            this.plants = this.plants.filter(p => p.id !== plantId);
            this.savePlants();
            this.renderPlants();
            this.showNotification('Planta eliminada', 'success');
        }
    }

    showPlantDetails(plant) {
        const modal = document.getElementById('plantModal');
        const modalBody = document.getElementById('modalBody');
        
        const commentsHtml = plant.comments && plant.comments.length > 0
            ? plant.comments.map(comment => `
                <div class="comment">
                    <div class="comment-date">${this.formatDate(comment.date)}</div>
                    <div class="comment-text">${this.escapeHtml(comment.text)}</div>
                </div>
            `).join('')
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
                        ${this.escapeHtml(plant.species)}
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
                    <div class="info-item">
                        <span class="info-label">Edad:</span>
                        <span class="info-value">${plant.age || 'No especificada'}</span>
                    </div>
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
                    ${plant.wateringFrequency ? `
                        <div class="info-item">
                            <span class="info-label">Frecuencia de Riego:</span>
                            <span class="info-value">${this.escapeHtml(plant.wateringFrequency)}</span>
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
                    <button class="btn-primary" onclick="plantManager.updateWatering('${plant.id}'); plantManager.closeModal();">
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

    addComment(plantId) {
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
                date: new Date().toISOString(),
                text: commentText
            });
            this.savePlants();
            this.showPlantDetails(plant);
            this.showNotification('Comentario agregado', 'success');
        }
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
document.addEventListener('DOMContentLoaded', () => {
    plantManager = new PlantManager();
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
