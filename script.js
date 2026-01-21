// Gestión de Plantas - My Green Diary

// Base de datos de soluciones para enfermedades/plagas y estados/síntomas
const PLANT_SOLUTIONS = {
    // Enfermedades/Plagas
    'Cochinilla algodonosa': 'Aplicar alcohol isopropílico 70% con algodón directamente sobre las cochinillas. Alternativa: jabón potásico diluido (1 cucharada/litro) pulverizado semanalmente. Para casos persistentes usar aceite de Neem.',
    'Pulgón': 'Pulverizar con jabón insecticida (1 cucharada jabón líquido/litro agua) cada 3-5 días, especialmente en el envés de hojas. Alternativa: aceite de Neem o spray de ajo/cebolla. Aumentar humedad y atraer mariquitas.',
    'Araña roja': 'Aumentar humedad ambiental rociando agua frecuentemente. Aplicar jabón potásico (5-10ml/litro) cada 3-5 días. Usar aceite de Neem o acaricidas específicos si la infestación es grave.',
    'Trips': 'Aplicar jabón potásico o aceite de Neem pulverizado cada 5-7 días. Colocar trampas azules adhesivas. Aumentar humedad ambiental. En casos graves usar spinosad.',
    'Mosca del sustrato (sciáridos)': 'Dejar secar el sustrato entre riegos. Aplicar nematodos beneficiosos (Steinernema) o BTI. Colocar trampas amarillas adhesivas cerca del sustrato. Mejorar drenaje.',
    'Mosca blanca': 'Pulverizar con jabón potásico (1-4 cucharadas/galón) o aceite de Neem cada 7 días. Colocar trampas amarillas adhesivas. Introducir depredadores como Encarsia formosa.',
    'Hormigas': 'Localizar y eliminar el hormiguero. Aplicar cebo específico para hormigas cerca de los senderos. Proteger la base de la planta con barreras físicas o tierra de diatomeas.',
    'Caracoles/babosas (exterior)': 'Recoger manualmente al atardecer. Crear barreras con ceniza, cáscaras de huevo o cobre. Usar cebos específicos ecológicos o trampas con cerveza.',
    'Orugas (exterior)': 'Recoger manualmente las orugas visibles. Aplicar Bacillus thuringiensis (Bt) que es específico y ecológico. Atraer aves insectívoras al jardín.',
    'Nematodos': 'Solarizar el sustrato con plástico transparente en verano. Usar sustrato nuevo y plantas resistentes. Aplicar extractos de neem o ajo. Rotar cultivos.',
    'Oídio': 'Aplicar azufre en polvo o bicarbonato de sodio (1 cucharada + ½ cucharadita jabón/litro). Pulverizar con leche diluida (1 parte leche/9 partes agua) semanalmente. Mejorar ventilación.',
    'Mildiu': 'Eliminar hojas afectadas inmediatamente. Aplicar cobre (caldo bordelés) o extracto de cola de caballo. Mejorar ventilación, evitar mojar hojas al regar. Regar en la base.',
    'Negrilla/fumagina': 'Eliminar la melaza que la causa (tratar pulgones/cochinillas primero). Limpiar hojas con agua jabonosa suave. Aplicar aceite de Neem para prevenir reinfección.',
    'Podredumbre radicular': 'Sacar planta, eliminar raíces podridas con tijeras esterilizadas. Sumergir raíces sanas en peróxido de hidrógeno diluido. Replantar en sustrato nuevo y bien drenado. Reducir riegos.',
    'Roya': 'Eliminar hojas muy afectadas. Aplicar azufre, cobre o fungicidas sistémicos (triazoles). Mejorar ventilación y evitar mojar hojas. Reducir humedad ambiental. Rotar fungicidas.',
    
    // Estados/Síntomas
    'Hojas amarillas': 'Verificar riego: puede ser exceso o falta de agua. Revisar drenaje del sustrato. Comprobar si necesita abono o si hay carencia de nutrientes (nitrógeno, hierro).',
    'Mustia': 'Aumentar riego si el sustrato está seco. Si está húmedo, puede ser exceso de agua o podredumbre radicular. Revisar raíces y mejorar drenaje.',
    'Pérdida de hojas': 'Normal en algunas plantas en otoño. Si es anormal: revisar riego, temperatura, luz y humedad. Verificar plagas o enfermedades en hojas y tallos.',
    'Hojas secas': 'Aumentar humedad ambiental y frecuencia de riego. Proteger de corrientes de aire y calefacción. Verificar que no esté expuesta a sol directo excesivo.',
    'Hojas marrones': 'Puntas marrones: falta de humedad ambiental. Manchas marrones: puede ser exceso de sol, quemaduras o hongos. Ajustar ubicación y condiciones ambientales.',
    'Hojas caídas': 'Verificar riego (exceso o falta). Revisar temperatura (demasiado frío o calor). Comprobar si necesita más luz o si está en corrientes de aire.',
    'Tallo débil': 'Aumentar exposición a luz (falta de luz estira el tallo). Rotar la planta regularmente. Considerar tutor o soporte. Revisar si necesita más nutrientes.',
    'Crecimiento lento': 'Verificar que tenga suficiente luz, nutrientes y espacio. Revisar si necesita trasplante. Comprobar temperatura y condiciones ambientales adecuadas.',
    'Sin crecimiento': 'Revisar condiciones básicas: luz, temperatura, riego y nutrientes. Verificar si necesita trasplante o cambio de sustrato. Puede estar en periodo de reposo.',
    'Hojas pequeñas': 'Aumentar luz y nutrientes. Verificar si necesita más espacio (trasplante). Revisar que no tenga carencias nutricionales o estrés hídrico.',
    'Hojas deformadas': 'Puede ser por plagas (ácaros, trips), virus o carencias nutricionales. Revisar hojas y tallos. Aplicar tratamiento según la causa identificada.',
    'Manchas en hojas': 'Manchas marrones/negras: hongos (aplicar fungicida). Manchas amarillas: virus o carencias. Eliminar hojas muy afectadas y tratar la causa.',
    'Raíces visibles': 'Necesita trasplante urgente a maceta más grande. Las raíces salen por agujeros de drenaje o superficie. Usar sustrato nuevo y maceta 2-3cm más grande.',
    'Sustrato muy seco': 'Aumentar frecuencia de riego. Verificar que el sustrato retenga humedad adecuadamente. Considerar cambiar a sustrato con más retención de agua.',
    'Sustrato muy húmedo': 'Reducir riegos inmediatamente. Mejorar drenaje de la maceta. Verificar que no haya podredumbre radicular. Considerar cambiar sustrato por uno más drenante.'
};

// Tipos de sustrato con colores para el gráfico
const SUBSTRATE_TYPES = [
    { id: 'universal', name: 'Sustrato universal', color: '#8B4513' }, // Marrón oscuro
    { id: 'turba_rubia', name: 'Turba rubia', color: '#FF6B35' }, // Naranja vibrante
    { id: 'fibra_coco', name: 'Fibra de coco', color: '#D4A574' }, // Beige dorado
    { id: 'mantillo', name: 'Mantillo', color: '#3E2723' }, // Marrón muy oscuro
    { id: 'perlita', name: 'Perlita', color: '#FFFFFF' }, // Blanco puro
    { id: 'vermiculita', name: 'Vermiculita', color: '#FFC107' }, // Amarillo brillante
    { id: 'arcilla_expandida', name: 'Arcilla expandida', color: '#E91E63' }, // Rosa/Magenta
    { id: 'arena_rio', name: 'Arena de río', color: '#00BCD4' }, // Cyan claro
    { id: 'grava', name: 'Grava', color: '#607D8B' }, // Gris azulado medio
    { id: 'corteza_pino', name: 'Corteza de pino', color: '#795548' }, // Marrón medio
    { id: 'humus', name: 'Humus de lombriz', color: '#2E7D32' }, // Verde oscuro
    { id: 'musgo', name: 'Musgo sphagnum', color: '#4CAF50' }, // Verde claro
    { id: 'carbon_vegetal', name: 'Carbón vegetal', color: '#212121' } // Negro/gris muy oscuro
];

class PlantManager {
    constructor() {
        this.plants = [];
        this.currentEditingId = null;
        this.isSubmittingForm = false; // Flag para indicar si se está guardando el formulario
        this.db = null;
        this.storage = null;
        this.useFirebase = false;
        this.modalPhotoIndex = {}; // Índice del carrusel de fotos en modal
        this.lightboxPhotoIndex = 0; // Índice de la foto en el lightbox
        this.lightboxPlantId = null; // ID de la planta en el lightbox
        this.lightboxCommentPhotos = null; // Fotos del comentario en el lightbox (si es un comentario)
        this.plantBeforeEdit = null; // Planta que estaba abierta antes de editar
        this.initialFormData = null; // Datos iniciales del formulario para detectar cambios
        this.modalHistoryState = null; // Estado para manejar el botón atrás del navegador
        this.solutionModalListenersAdded = false; // Flag para evitar añadir listeners múltiples veces
        this.activeFilters = {}; // Objeto para almacenar filtros activos {type: 'value', light: 'value', etc.}
        this.viewMode = 'kanban'; // 'kanban' o 'compact'
        // Inicializar event listeners primero para que funcionen inmediatamente
        this.setupEventListeners();
        // Configurar manejo del botón atrás en móvil
        this.setupBackButtonHandler();
        // Luego cargar datos (async)
        this.initFirebase();
    }

    // Helper: Detectar estación actual
    getCurrentSeason() {
        const now = new Date();
        const month = now.getMonth() + 1; // 1-12
        const day = now.getDate();
        
        // Primavera: 21 marzo - 20 junio
        if ((month === 3 && day >= 21) || (month === 4) || (month === 5) || (month === 6 && day <= 20)) {
            return 'spring';
        }
        // Verano: 21 junio - 22 septiembre
        if ((month === 6 && day >= 21) || (month === 7) || (month === 8) || (month === 9 && day <= 22)) {
            return 'summer';
        }
        // Otoño: 23 septiembre - 20 diciembre
        if ((month === 9 && day >= 23) || (month === 10) || (month === 11) || (month === 12 && day <= 20)) {
            return 'autumn';
        }
        // Invierno: 21 diciembre - 20 marzo
        return 'winter';
    }
    
    // Helper: Calcular frecuencia promedio de texto (ej: "5-7 días" -> 6)
    calculateWateringFrequency(text) {
        if (!text || typeof text !== 'string') return null;
        
        // Buscar patrones como "5-7", "5 a 7", "cada 5 días", etc.
        const patterns = [
            /(\d+)\s*[-–—]\s*(\d+)/,  // "5-7", "5 - 7"
            /(\d+)\s+a\s+(\d+)/i,      // "5 a 7"
            /cada\s+(\d+)/i,           // "cada 5"
            /(\d+)\s*d[ií]a/i          // "5 días", "5 día"
        ];
        
        for (const pattern of patterns) {
            const match = text.match(pattern);
            if (match) {
                if (match[2]) {
                    // Rango: calcular promedio
                    const min = parseInt(match[1]);
                    const max = parseInt(match[2]);
                    return Math.round((min + max) / 2);
                } else {
                    // Número único
                    return parseInt(match[1]);
                }
            }
        }
        
        // Si no encuentra patrón, intentar extraer cualquier número
        const numbers = text.match(/\d+/g);
        if (numbers && numbers.length > 0) {
            return parseInt(numbers[0]);
        }
        
        return null;
    }
    
    // Helper: Obtener frecuencia de riego según estación actual
    getCurrentWateringFrequency(plant) {
        const season = this.getCurrentSeason();
        let frequencyText = '';
        
        switch(season) {
            case 'spring':
                frequencyText = plant.wateringSpring || '';
                break;
            case 'summer':
                frequencyText = plant.wateringSummer || '';
                break;
            case 'autumn':
                frequencyText = plant.wateringAutumn || '';
                break;
            case 'winter':
                frequencyText = plant.wateringWinter || '';
                break;
        }
        
        return this.calculateWateringFrequency(frequencyText);
    }
    
    // Helper: Calcular días de riego futuros basados en frecuencia
    calculateWateringDays(plant, maxDays = 90) {
        const normalizedPlant = this.normalizePlantData(plant);
        const wateringDates = normalizedPlant.wateringDates || [];
        const frequency = this.getCurrentWateringFrequency(plant);
        
        if (!frequency || frequency <= 0) return [];
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Obtener último riego
        let lastWateringDate = null;
        if (wateringDates.length > 0) {
            lastWateringDate = new Date(wateringDates[0] + 'T00:00:00');
        }
        
        // Si no hay riegos previos, empezar desde hoy
        if (!lastWateringDate) {
            lastWateringDate = new Date(today);
        }
        
        const wateringDays = [];
        let currentDate = new Date(lastWateringDate);
        
        // Calcular próximos días de riego
        while (wateringDays.length < maxDays / frequency) {
            currentDate.setDate(currentDate.getDate() + frequency);
            
            // No incluir días pasados
            if (currentDate < today) continue;
            
            // No incluir más de maxDays días en el futuro
            const daysDiff = Math.floor((currentDate - today) / (1000 * 60 * 60 * 24));
            if (daysDiff > maxDays) break;
            
            const dateStr = currentDate.toISOString().split('T')[0];
            
            // No incluir si ya está regado ese día
            if (!wateringDates.includes(dateStr)) {
                wateringDays.push(dateStr);
            }
        }
        
        return wateringDays;
    }
    
    // Helper: Verificar si una planta necesita riego hoy
    needsWateringToday(plant) {
        const normalizedPlant = this.normalizePlantData(plant);
        const wateringDates = normalizedPlant.wateringDates || [];
        const frequency = this.getCurrentWateringFrequency(plant);
        
        if (!frequency || frequency <= 0) return false;
        
        const today = new Date().toISOString().split('T')[0];
        
        // Si ya se regó hoy, no necesita riego
        if (wateringDates.includes(today)) return false;
        
        // Obtener último riego
        if (wateringDates.length === 0) return true; // Nunca regada
        
        const lastWateringDate = new Date(wateringDates[0] + 'T00:00:00');
        const todayDate = new Date(today + 'T00:00:00');
        const daysSince = Math.floor((todayDate - lastWateringDate) / (1000 * 60 * 60 * 24));
        
        // Necesita riego si han pasado los días de frecuencia
        return daysSince >= frequency;
    }
    
    // Helper: Verificar si una planta tiene recordatorios personalizados que vencen hoy o están vencidos
    hasCustomRemindersDueToday(plant) {
        if (!plant.customReminders || !Array.isArray(plant.customReminders)) return false;
        
        const today = new Date().toISOString().split('T')[0];
        const todayDate = new Date(today + 'T00:00:00');
        
        return plant.customReminders.some(reminder => {
            if (!reminder.nextDue) return false;
            const nextDueDate = new Date(reminder.nextDue + 'T00:00:00');
            // Incluir si vence hoy o está vencido
            return nextDueDate <= todayDate;
        });
    }

    // Helper: Normalizar datos de planta (migrar estructura antigua)
    normalizePlantData(plant) {
        // Migrar photo a photos (pero no si ya existe photos)
        if (plant.photo && !plant.photos) {
            // Si hay photo pero no photos, crear array con photo
            plant.photos = [plant.photo];
            // Eliminar photo para evitar confusión
            delete plant.photo;
        } else if (!plant.photos) {
            // Si no hay ni photo ni photos, crear array vacío
            plant.photos = [];
        } else {
            // Si ya existe photos, eliminar photo si existe para evitar duplicados
            if (plant.photo) {
                delete plant.photo;
            }
            // Asegurar que photos es un array y eliminar duplicados
            if (!Array.isArray(plant.photos)) {
                plant.photos = [plant.photos];
            }
            // Eliminar duplicados del array
            plant.photos = [...new Set(plant.photos)];
        }
        
        // Migrar lastWatered a wateringDates
        if (plant.lastWatered && !plant.wateringDates) {
            plant.wateringDates = [plant.lastWatered];
            delete plant.lastWatered;
        } else if (!plant.wateringDates) {
            plant.wateringDates = [];
        } else {
            // Si ya existe wateringDates, eliminar lastWatered si existe
            if (plant.lastWatered) {
                delete plant.lastWatered;
            }
            // Asegurar que wateringDates es un array
            if (!Array.isArray(plant.wateringDates)) {
                plant.wateringDates = [plant.wateringDates];
            }
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
            input.addEventListener('input', () => {
                this.updateSubstrateChart();
                this.updateSubstrateInputStyle(input);
            });
            // Actualizar estilo inicial
            this.updateSubstrateInputStyle(input);
        });

        this.updateSubstrateChart();
    }

    // Actualizar estilo del input según su valor
    updateSubstrateInputStyle(input) {
        const value = parseFloat(input.value) || 0;
        if (value > 0) {
            input.style.borderColor = 'var(--accent-green)';
            input.style.borderWidth = '3px';
            input.style.boxShadow = '0 0 0 2px rgba(74, 154, 74, 0.4), 0 2px 8px rgba(74, 154, 74, 0.3)';
            input.style.background = 'rgba(74, 154, 74, 0.15)';
            input.style.fontWeight = '700';
            input.style.transform = 'scale(1.05)';
            input.style.transition = 'all 0.3s ease';
        } else {
            input.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            input.style.borderWidth = '1px';
            input.style.boxShadow = 'none';
            input.style.background = 'rgba(10, 31, 10, 0.8)';
            input.style.fontWeight = '600';
            input.style.transform = 'scale(1)';
        }
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
                    this.updateSubstrateInputStyle(input);
                }
            });
            // Recalcular
            total = 0;
            inputs.forEach(input => {
                const value = parseFloat(input.value) || 0;
                const substrateId = input.dataset.substrateId;
                percentages[substrateId] = value;
                total += value;
                this.updateSubstrateInputStyle(input);
            });
        }

        // Actualizar visualización
        const remaining = 100 - total;
        const chartSvg = document.getElementById('substrateChart');
        if (chartSvg) {
            this.generateSubstratePieChart(chartSvg, percentages, remaining);
        }

        // Ocultar el texto del centro del donut (siempre será 100% cuando hay valores, no tiene sentido mostrarlo)
        const chartText = chartSvg?.querySelector('text');
        if (chartText) {
            const totalRounded = Math.round(total);
            if (totalRounded > 0) {
                // Si hay valores, ocultar el texto (siempre será 100%)
                chartText.style.display = 'none';
            } else {
                // Si no hay valores, mostrar "0%"
                chartText.style.display = 'block';
                chartText.textContent = '0%';
                chartText.setAttribute('fill', 'var(--text-muted)');
                chartText.setAttribute('font-size', '24');
            }
        }
    }

    // Generar gráfico donut (rosco) SVG
    generateSubstratePieChart(svgElement, percentages, remaining = 0) {
        const outerRadius = 85;
        const innerRadius = 50; // Radio interior para crear el hueco del donut
        const centerX = 100;
        const centerY = 100;
        
        // Limpiar paths existentes
        const existingPaths = svgElement.querySelectorAll('path');
        existingPaths.forEach(path => path.remove());

        let currentAngle = -Math.PI / 2; // Empezar desde arriba

        // Calcular total para mostrar porcentaje
        let total = 0;
        Object.values(percentages).forEach(p => total += p);

        // Dibujar segmentos donut para cada sustrato con porcentaje > 0
        Object.entries(percentages).forEach(([substrateId, percentage]) => {
            if (percentage > 0) {
                const substrate = SUBSTRATE_TYPES.find(s => s.id === substrateId);
                if (substrate) {
                    const angle = (percentage / 100) * 2 * Math.PI;
                    const path = this.createDonutSlice(centerX, centerY, innerRadius, outerRadius, currentAngle, currentAngle + angle);
                    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    pathElement.setAttribute('d', path);
                    pathElement.setAttribute('fill', substrate.color);
                    pathElement.setAttribute('stroke', 'rgba(10, 31, 10, 0.9)');
                    pathElement.setAttribute('stroke-width', '3');
                    pathElement.setAttribute('stroke-linejoin', 'round');
                    // Almacenar información para tooltip
                    pathElement.setAttribute('data-substrate-name', substrate.name);
                    pathElement.setAttribute('data-substrate-percentage', percentage);
                    pathElement.style.cursor = 'pointer';
                    
                    // Añadir event listeners para tooltip personalizado
                    pathElement.addEventListener('mouseenter', (e) => {
                        this.showSubstrateTooltip(e, substrate.name, percentage);
                    });
                    pathElement.addEventListener('mouseleave', () => {
                        this.hideSubstrateTooltip();
                    });
                    pathElement.addEventListener('mousemove', (e) => {
                        this.updateSubstrateTooltipPosition(e);
                    });
                    
                    svgElement.insertBefore(pathElement, svgElement.querySelector('text'));
                    currentAngle += angle;
                }
            }
        });

        // Dibujar espacio restante (transparente) como donut también
        if (remaining > 0 && currentAngle < Math.PI * 1.5) {
            const angle = (remaining / 100) * 2 * Math.PI;
            const path = this.createDonutSlice(centerX, centerY, innerRadius, outerRadius, currentAngle, currentAngle + angle);
            const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathElement.setAttribute('d', path);
            pathElement.setAttribute('fill', 'rgba(10, 31, 10, 0.25)');
            pathElement.setAttribute('stroke', 'rgba(255, 255, 255, 0.15)');
            pathElement.setAttribute('stroke-width', '2');
            pathElement.setAttribute('stroke-linejoin', 'round');
            svgElement.insertBefore(pathElement, svgElement.querySelector('text'));
        }
    }

    // Mostrar tooltip personalizado para sustratos
    showSubstrateTooltip(event, substrateName, percentage) {
        // Eliminar tooltip anterior si existe
        const existingTooltip = document.getElementById('substrateTooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        // Crear tooltip
        const tooltip = document.createElement('div');
        tooltip.id = 'substrateTooltip';
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(10, 31, 10, 0.95);
            backdrop-filter: blur(10px);
            border: 2px solid var(--accent-green);
            border-radius: 8px;
            padding: 10px 15px;
            color: var(--text-light);
            font-size: 0.9rem;
            font-weight: 600;
            z-index: 10000;
            pointer-events: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
            opacity: 0;
            transition: opacity 0.2s ease;
            line-height: 1.4;
        `;
        tooltip.innerHTML = `<div style="font-weight: 700; margin-bottom: 4px;">${substrateName}</div><div style="color: var(--accent-green); font-size: 1.1rem;">${Math.round(percentage)}%</div>`;
        document.body.appendChild(tooltip);
        
        // Posicionar tooltip
        this.updateSubstrateTooltipPosition(event);
        
        // Mostrar con animación
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 10);
    }

    // Actualizar posición del tooltip
    updateSubstrateTooltipPosition(event) {
        const tooltip = document.getElementById('substrateTooltip');
        if (tooltip && event) {
            const x = event.clientX + 15;
            const y = event.clientY - 15;
            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;
        }
    }

    // Ocultar tooltip
    hideSubstrateTooltip() {
        const tooltip = document.getElementById('substrateTooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                if (tooltip && tooltip.parentNode) {
                    tooltip.remove();
                }
            }, 200);
        }
    }

    // Mostrar tooltip genérico para donuts del dashboard
    showDashboardTooltip(event, text) {
        // Eliminar tooltip anterior si existe
        const existingTooltip = document.getElementById('dashboardTooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        // Crear tooltip
        const tooltip = document.createElement('div');
        tooltip.id = 'dashboardTooltip';
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(10, 31, 10, 0.95);
            backdrop-filter: blur(10px);
            border: 2px solid var(--accent-green);
            border-radius: 8px;
            padding: 10px 15px;
            color: var(--text-light);
            font-size: 0.9rem;
            font-weight: 600;
            z-index: 10000;
            pointer-events: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
            opacity: 0;
            transition: opacity 0.2s ease;
            line-height: 1.4;
            white-space: nowrap;
        `;
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        
        // Posicionar tooltip
        this.updateDashboardTooltipPosition(event);
        
        // Mostrar con animación
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 10);
    }

    // Actualizar posición del tooltip del dashboard
    updateDashboardTooltipPosition(event) {
        const tooltip = document.getElementById('dashboardTooltip');
        if (tooltip && event) {
            const x = event.clientX + 15;
            const y = event.clientY - 15;
            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;
        }
    }

    // Ocultar tooltip del dashboard
    hideDashboardTooltip() {
        const tooltip = document.getElementById('dashboardTooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                if (tooltip && tooltip.parentNode) {
                    tooltip.remove();
                }
            }, 200);
        }
    }

    // Crear slice de donut (arco con radio interior y exterior)
    createDonutSlice(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle) {
        // Puntos exteriores
        const x1Outer = centerX + outerRadius * Math.cos(startAngle);
        const y1Outer = centerY + outerRadius * Math.sin(startAngle);
        const x2Outer = centerX + outerRadius * Math.cos(endAngle);
        const y2Outer = centerY + outerRadius * Math.sin(endAngle);
        
        // Puntos interiores
        const x1Inner = centerX + innerRadius * Math.cos(startAngle);
        const y1Inner = centerY + innerRadius * Math.sin(startAngle);
        const x2Inner = centerX + innerRadius * Math.cos(endAngle);
        const y2Inner = centerY + innerRadius * Math.sin(endAngle);
        
        const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
        
        // Crear el path del donut slice
        // Comenzar en el punto exterior del inicio del ángulo
        const path = `M ${x1Outer} ${y1Outer} 
                     A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2Outer} ${y2Outer} 
                     L ${x2Inner} ${y2Inner} 
                     A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1Inner} ${y1Inner} 
                     Z`;
        
        return path;
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
                    <defs>
                        <filter id="shadow-display">
                            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
                        </filter>
                    </defs>
                    <text x="100" y="105" text-anchor="middle" dominant-baseline="middle" 
                          fill="${total > 0 ? 'var(--accent-green)' : 'var(--text-muted)'}" 
                          font-size="${total > 0 ? '26' : '24'}" font-weight="700" 
                          style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); ${total > 0 ? 'display: none;' : ''}">0%</text>
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

    // Mostrar/ocultar modal de leyenda de sustratos (toggle)
    showSubstrateLegend() {
        const modal = document.getElementById('substrateLegendModal');
        const legendList = document.getElementById('substrateLegendList');
        const plantModal = document.getElementById('plantModal');
        
        if (!modal || !legendList) return;

        // Si el modal está visible, ocultarlo (toggle)
        if (!modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
            return;
        }

        // Si está oculto, mostrarlo y generar el contenido
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

        // Posicionar el modal de la leyenda al lado del modal principal
        if (plantModal && !plantModal.classList.contains('hidden')) {
            const plantModalContent = plantModal.querySelector('.modal-content');
            if (plantModalContent) {
                const plantModalRect = plantModalContent.getBoundingClientRect();
                const legendModalContent = modal.querySelector('.modal-content');
                
                if (legendModalContent) {
                    // Posicionar a la derecha del modal principal
                    const leftPosition = plantModalRect.right + 20; // 20px de espacio
                    const topPosition = plantModalRect.top;
                    
                    legendModalContent.style.left = `${leftPosition}px`;
                    legendModalContent.style.top = `${topPosition}px`;
                    
                    // Si se sale de la pantalla por la derecha, posicionar a la izquierda
                    if (leftPosition + 250 > window.innerWidth) {
                        legendModalContent.style.left = `${plantModalRect.left - 270}px`; // 250px ancho + 20px espacio
                    }
                    
                    // Si se sale por arriba o abajo, ajustar verticalmente
                    if (topPosition + legendModalContent.offsetHeight > window.innerHeight) {
                        legendModalContent.style.top = `${window.innerHeight - legendModalContent.offsetHeight - 20}px`;
                    }
                    if (topPosition < 0) {
                        legendModalContent.style.top = '20px';
                    }
                }
            }
        }

        // Reposicionar cuando se redimensione la ventana
        const repositionLegend = () => {
            if (plantModal && !plantModal.classList.contains('hidden') && !modal.classList.contains('hidden')) {
                const plantModalContent = plantModal.querySelector('.modal-content');
                const legendModalContent = modal.querySelector('.modal-content');
                
                if (plantModalContent && legendModalContent) {
                    const plantModalRect = plantModalContent.getBoundingClientRect();
                    const leftPosition = plantModalRect.right + 20;
                    const topPosition = plantModalRect.top;
                    
                    legendModalContent.style.left = `${leftPosition}px`;
                    legendModalContent.style.top = `${topPosition}px`;
                    
                    // Si se sale de la pantalla por la derecha, posicionar a la izquierda
                    if (leftPosition + 250 > window.innerWidth) {
                        legendModalContent.style.left = `${plantModalRect.left - 270}px`;
                    }
                    
                    // Si se sale por arriba o abajo, ajustar verticalmente
                    if (topPosition + legendModalContent.offsetHeight > window.innerHeight) {
                        legendModalContent.style.top = `${window.innerHeight - legendModalContent.offsetHeight - 20}px`;
                    }
                    if (topPosition < 0) {
                        legendModalContent.style.top = '20px';
                    }
                }
            }
        };

        window.addEventListener('resize', repositionLegend);
    }

    async initFirebase() {
        // Verificar si Firebase está inicializado
        if (typeof firebaseInitialized !== 'undefined' && firebaseInitialized && typeof firebase !== 'undefined') {
            try {
                this.db = firebase.firestore();
                this.storage = firebase.storage();
                this.useFirebase = true;
                // Firebase conectado correctamente
                await this.loadPlantsFromFirebase();
            } catch (error) {
                console.error('Error inicializando Firebase:', error);
                const localPlants = this.loadPlantsFromLocalStorage();
                this.plants = localPlants.map(plant => this.normalizePlantData(plant));
                this.useFirebase = false;
            }
        } else {
            // Firebase no configurado, usando localStorage
            const localPlants = this.loadPlantsFromLocalStorage();
            this.plants = localPlants.map(plant => this.normalizePlantData(plant));
        }
        // Renderizar plantas después de cargar los datos
        this.renderPlants();
        // Renderizar avisos después de cargar plantas
        this.renderReminders();
    }

    async loadPlantsFromFirebase() {
        try {
            const snapshot = await this.db.collection('plants').get();
            this.plants = snapshot.docs.map(doc => {
                const plant = { id: doc.id, ...doc.data() };
                return this.normalizePlantData(plant);
            });
            // Plantas cargadas desde Firebase
            
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

    // Configurar manejo del botón atrás del navegador en móvil
    setupBackButtonHandler() {
        if (!this.isMobileDevice()) return;
        
        // Escuchar el evento popstate (botón atrás)
        window.addEventListener('popstate', (event) => {
            const plantModal = document.getElementById('plantModal');
            const plantFormModal = document.getElementById('plantFormModal');
            const wateringCalendarModal = document.getElementById('wateringCalendarModal');
            const photoLightboxModal = document.getElementById('photoLightboxModal');
            
            // Cerrar modales abiertos
            if (plantModal && !plantModal.classList.contains('hidden')) {
                plantModal.classList.add('hidden');
                event.preventDefault();
            } else if (plantFormModal && !plantFormModal.classList.contains('hidden')) {
                // Verificar si hay cambios sin guardar
                if (this.hasFormChanges()) {
                    if (confirm('¿Estás seguro de que quieres salir? Tienes cambios sin guardar que se perderán.')) {
                        this.closePlantFormModal();
                    } else {
                        // Prevenir que se cierre si el usuario cancela
                        history.pushState({ modal: 'plantForm' }, '', window.location.href);
                    }
                } else {
                    this.closePlantFormModal();
                }
                event.preventDefault();
            } else if (wateringCalendarModal && !wateringCalendarModal.classList.contains('hidden')) {
                wateringCalendarModal.classList.add('hidden');
                event.preventDefault();
            } else if (photoLightboxModal && !photoLightboxModal.classList.contains('hidden')) {
                photoLightboxModal.classList.add('hidden');
                event.preventDefault();
            }
        });
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

    // Detectar si es un dispositivo móvil
    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               (window.matchMedia && window.matchMedia("(max-width: 768px)").matches);
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

            // Cerrar formulario al hacer clic fuera (pero NO cerrar el modal de detalles)
            // Solo en dispositivos de escritorio, no en móviles
            const plantFormModal = document.getElementById('plantFormModal');
            if (plantFormModal && !this.isMobileDevice()) {
                let mouseDownOnBackground = false;
                
                plantFormModal.addEventListener('mousedown', (e) => {
                    // Marcar si el mousedown ocurrió en el fondo
                    mouseDownOnBackground = (e.target.id === 'plantFormModal');
                });
                
                plantFormModal.addEventListener('mouseup', (e) => {
                    // Solo cerrar si tanto mousedown como mouseup ocurrieron en el fondo
                    if (mouseDownOnBackground && e.target.id === 'plantFormModal') {
                        // closePlantFormModal() ya verifica los cambios, no hace falta duplicar la verificación
                        this.closePlantFormModal();
                    }
                    mouseDownOnBackground = false;
                });
            }

            // Búsqueda
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.applyActiveFilters(); // Aplicar filtros activos + búsqueda
                });
            }

            // Filtros
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.applyFilter(e.target.dataset.filter);
                });
            });

            // Botón de toggle de vista
            const toggleViewModeBtn = document.getElementById('toggleViewModeBtn');
            if (toggleViewModeBtn) {
                // Inicializar texto del botón según el modo actual
                const viewModeText = toggleViewModeBtn.querySelector('.view-mode-text');
                if (viewModeText) {
                    viewModeText.textContent = this.viewMode === 'compact' ? 'Compacta' : 'Kanban';
                }
                toggleViewModeBtn.title = this.viewMode === 'compact' ? 'Cambiar a vista kanban' : 'Cambiar a vista compacta';
                
                toggleViewModeBtn.addEventListener('click', () => {
                    this.toggleViewMode();
                });
            }
            
            // Botón de quitar todos los filtros
            const clearAllFiltersBtn = document.getElementById('clearAllFiltersBtn');
            if (clearAllFiltersBtn) {
                clearAllFiltersBtn.addEventListener('click', () => {
                    this.clearAllFilters();
                });
            }

            // Botón de toggle del dashboard
            const toggleDashboardBtn = document.getElementById('toggleDashboardBtn');
            if (toggleDashboardBtn) {
                // Inicializar icono según estado inicial (colapsado por defecto)
                const dashboardSection = document.getElementById('dashboardSection');
                if (dashboardSection && dashboardSection.classList.contains('collapsed')) {
                    const toggleIcon = toggleDashboardBtn.querySelector('.toggle-icon');
                    if (toggleIcon) {
                        toggleIcon.src = 'img/icons/plus.svg';
                        toggleIcon.alt = 'Expandir';
                    }
                }
                
                toggleDashboardBtn.addEventListener('click', () => {
                    const dashboardSection = document.getElementById('dashboardSection');
                    const dashboardContent = document.getElementById('dashboardContent');
                    if (dashboardSection && dashboardContent) {
                        dashboardSection.classList.toggle('collapsed');
                        const isCollapsed = dashboardSection.classList.contains('collapsed');
                        const toggleIcon = toggleDashboardBtn.querySelector('.toggle-icon');
                        if (toggleIcon) {
                            toggleIcon.src = isCollapsed ? 'img/icons/plus.svg' : 'img/icons/minus.svg';
                            toggleIcon.alt = isCollapsed ? 'Expandir' : 'Colapsar';
                        }
                    }
                });
            }

            // Modal
            const plantModal = document.getElementById('plantModal');
            if (plantModal) {
                // Listener para el botón de cerrar del modal de detalles
                const closeModalBtn = plantModal.querySelector('.close-modal');
                if (closeModalBtn) {
                    closeModalBtn.addEventListener('click', () => {
                        // Solo cerrar si el formulario no está abierto
                        const formModal = document.getElementById('plantFormModal');
                        if (!formModal || formModal.classList.contains('hidden')) {
                            // Si es móvil y hay un estado en el historial, retroceder
                            if (this.isMobileDevice() && history.state && history.state.modal === 'plantDetails') {
                                history.back();
                            } else {
                                this.closeModal();
                            }
                        }
                    });
                }
                
                // Listener para cerrar al hacer clic fuera (en el fondo)
                // Solo en dispositivos de escritorio, no en móviles
                if (!this.isMobileDevice()) {
                    let mouseDownOnBackground = false;
                    
                    plantModal.addEventListener('mousedown', (e) => {
                        // Marcar si el mousedown ocurrió en el fondo
                        mouseDownOnBackground = (e.target.id === 'plantModal');
                    });
                    
                    plantModal.addEventListener('mouseup', (e) => {
                        // Solo cerrar si tanto mousedown como mouseup ocurrieron en el fondo
                        if (mouseDownOnBackground && e.target.id === 'plantModal') {
                            const formModal = document.getElementById('plantFormModal');
                            if (!formModal || formModal.classList.contains('hidden')) {
                                this.closeModal();
                            }
                        }
                        mouseDownOnBackground = false;
                    });
                }
                
                // Observer para detectar cuando el modal se oculta y cerrar la leyenda
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                            if (plantModal.classList.contains('hidden')) {
                                const legendModal = document.getElementById('substrateLegendModal');
                                if (legendModal && !legendModal.classList.contains('hidden')) {
                                    legendModal.classList.add('hidden');
                                }
                            }
                        }
                    });
                });
                observer.observe(plantModal, { attributes: true });
            }


            // Dual-list selector para enfermedades
            const addDiseaseBtn = document.getElementById('addDiseaseBtn');
            const removeDiseaseBtn = document.getElementById('removeDiseaseBtn');
            if (addDiseaseBtn) {
                addDiseaseBtn.addEventListener('click', () => this.addDiseasesToSelected());
            }
            if (removeDiseaseBtn) {
                removeDiseaseBtn.addEventListener('click', () => this.removeDiseasesFromSelected());
            }

            // Dual-list selector para estados de planta
            const addStateBtn = document.getElementById('addStateBtn');
            const removeStateBtn = document.getElementById('removeStateBtn');
            if (addStateBtn) {
                addStateBtn.addEventListener('click', () => this.addPlantStatesToSelected());
            }
            if (removeStateBtn) {
                removeStateBtn.addEventListener('click', () => this.removePlantStatesFromSelected());
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

            // Botón para añadir recordatorio personalizado
            const addCustomReminderBtn = document.getElementById('addCustomReminderBtn');
            if (addCustomReminderBtn) {
                addCustomReminderBtn.addEventListener('click', () => {
                    this.addCustomReminderForm();
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

            // Font changer
            const changeFontBtn = document.getElementById('changeFontBtn');
            if (changeFontBtn) {
                changeFontBtn.addEventListener('click', (e) => {
                    const modal = document.getElementById('fontModal');
                    if (modal) {
                        modal.classList.remove('hidden');
                        this.updateFontModal();
                        this.positionModalNearButton(modal, changeFontBtn);
                    }
                });
            }

            // Cerrar modal de fuente
            const fontModal = document.getElementById('fontModal');
            if (fontModal) {
                const closeFontModal = fontModal.querySelector('.close-font-modal');
                if (closeFontModal) {
                    closeFontModal.addEventListener('click', () => {
                        fontModal.classList.add('hidden');
                    });
                }
                
                // Cerrar al hacer clic fuera del modal
                fontModal.addEventListener('click', (e) => {
                    if (e.target === fontModal) {
                        fontModal.classList.add('hidden');
                    }
                });
                
                // Reposicionar al hacer scroll o redimensionar
                window.addEventListener('scroll', () => {
                    if (!fontModal.classList.contains('hidden')) {
                        const changeFontBtn = document.getElementById('changeFontBtn');
                        if (changeFontBtn) {
                            this.positionModalNearButton(fontModal, changeFontBtn);
                        }
                    }
                }, true);
                
                window.addEventListener('resize', () => {
                    if (!fontModal.classList.contains('hidden')) {
                        const changeFontBtn = document.getElementById('changeFontBtn');
                        if (changeFontBtn) {
                            this.positionModalNearButton(fontModal, changeFontBtn);
                        }
                    }
                });
            }

            // Opciones de fuente
            document.querySelectorAll('.font-option').forEach(option => {
                option.addEventListener('click', () => {
                    const fontFamily = option.dataset.font;
                    this.changeFont(fontFamily);
                });
            });

            // Control de tamaño de fuente
            const fontSizeSlider = document.getElementById('fontSizeSlider');
            const fontSizeInput = document.getElementById('fontSizeValue');
            const fontSizeNumberInput = document.getElementById('fontSizeInput');
            
            if (fontSizeSlider && fontSizeInput && fontSizeNumberInput) {
                // Sincronizar slider e input numérico
                const syncFontSize = (value) => {
                    const numValue = typeof value === 'string' ? parseFloat(value) : value;
                    fontSizeSlider.value = numValue;
                    fontSizeNumberInput.value = numValue;
                    fontSizeInput.textContent = `${numValue}%`;
                    this.changeFontSize(numValue);
                };

                fontSizeSlider.addEventListener('input', (e) => {
                    syncFontSize(parseFloat(e.target.value));
                });

                fontSizeNumberInput.addEventListener('input', (e) => {
                    let value = parseFloat(e.target.value);
                    if (isNaN(value)) return;
                    if (value < 50) value = 50;
                    if (value > 150) value = 150;
                    syncFontSize(value);
                });

                fontSizeNumberInput.addEventListener('blur', (e) => {
                    let value = parseFloat(e.target.value);
                    if (isNaN(value) || value < 50) value = 50;
                    if (value > 150) value = 150;
                    syncFontSize(value);
                });
            }

            // Background changer
            const changeBgBtn = document.getElementById('changeBgBtn');
            if (changeBgBtn) {
                changeBgBtn.addEventListener('click', (e) => {
                    this.showBgModal();
                    const modal = document.getElementById('bgModal');
                    if (modal) {
                        this.positionModalNearButton(modal, changeBgBtn);
                    }
                });
            }

            const bgModal = document.getElementById('bgModal');
            if (bgModal) {
                // Cerrar al hacer clic fuera del modal
                bgModal.addEventListener('click', (e) => {
                    if (e.target === bgModal) {
                        this.closeBgModal();
                    }
                });
                
                // Reposicionar al hacer scroll o redimensionar
                window.addEventListener('scroll', () => {
                    if (!bgModal.classList.contains('hidden')) {
                        const changeBgBtn = document.getElementById('changeBgBtn');
                        if (changeBgBtn) {
                            this.positionModalNearButton(bgModal, changeBgBtn);
                        }
                    }
                }, true);
                
                window.addEventListener('resize', () => {
                    if (!bgModal.classList.contains('hidden')) {
                        const changeBgBtn = document.getElementById('changeBgBtn');
                        if (changeBgBtn) {
                            this.positionModalNearButton(bgModal, changeBgBtn);
                        }
                    }
                });
            }

            // Event listeners configurados correctamente
        } catch (error) {
            console.error('Error configurando event listeners:', error);
        }

        // Initialize background
        this.initBackground();
        
        // Initialize font
        this.initFont();
    }

    initBackground() {
        const savedBg = localStorage.getItem('plantDiaryBackground') || 'palm-tree-leaves';
        this.changeBackground(savedBg, false);
        
        // Cargar fondo personalizado si existe
        const customBg = localStorage.getItem('plantDiaryCustomBackground');
        if (customBg && savedBg === 'custom') {
            document.body.style.backgroundImage = `url('${customBg}')`;
        }
    }
    
    initFont() {
        const savedFont = localStorage.getItem('plantDiaryFont');
        if (savedFont) {
            this.changeFont(savedFont, false);
        }
        
        // Cargar tamaño de fuente guardado
        const savedFontSize = localStorage.getItem('plantDiaryFontSize') || '100';
        this.changeFontSize(savedFontSize, false);
    }

    showBgModal() {
        const modal = document.getElementById('bgModal');
        const savedBg = localStorage.getItem('plantDiaryBackground') || 'palm-tree-leaves';
        const customBg = localStorage.getItem('plantDiaryCustomBackground');
        
        // Mostrar/ocultar opción de fondo personalizado
        const customBgOption = document.getElementById('customBgOption');
        const customBgPreview = document.getElementById('customBgPreview');
        const removeCustomBgBtn = document.getElementById('removeCustomBgBtn');
        
        if (customBg) {
            if (customBgOption) {
                customBgOption.style.display = 'block';
                if (customBgPreview) {
                    customBgPreview.src = customBg;
                }
            }
            if (removeCustomBgBtn) {
                removeCustomBgBtn.style.display = 'block';
            }
        } else {
            if (customBgOption) {
                customBgOption.style.display = 'none';
            }
            if (removeCustomBgBtn) {
                removeCustomBgBtn.style.display = 'none';
            }
        }
        
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
        
        // Event listener para subir fondo personalizado
        const customBgInput = document.getElementById('customBgInput');
        if (customBgInput) {
            customBgInput.onchange = (e) => {
                this.handleCustomBackgroundUpload(e);
            };
        }
        
        // Event listener para eliminar fondo personalizado
        if (removeCustomBgBtn) {
            removeCustomBgBtn.onclick = () => {
                this.removeCustomBackground();
            };
        }

        if (modal) modal.classList.remove('hidden');
    }
    
    handleCustomBackgroundUpload(event) {
        const file = event.target.files[0];
        if (!file || !file.type.startsWith('image/')) {
            this.showNotification('Por favor, selecciona una imagen válida', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;
            // Guardar en localStorage
            localStorage.setItem('plantDiaryCustomBackground', imageData);
            localStorage.setItem('plantDiaryBackground', 'custom');
            
            // Aplicar el fondo
            document.body.style.backgroundImage = `url('${imageData}')`;
            
            // Actualizar el modal
            const customBgOption = document.getElementById('customBgOption');
            const customBgPreview = document.getElementById('customBgPreview');
            const removeCustomBgBtn = document.getElementById('removeCustomBgBtn');
            
            if (customBgOption) {
                customBgOption.style.display = 'block';
                customBgOption.classList.add('active');
                // Desmarcar otros fondos
                document.querySelectorAll('.bg-option').forEach(option => {
                    if (option !== customBgOption) {
                        option.classList.remove('active');
                    }
                });
            }
            if (customBgPreview) {
                customBgPreview.src = imageData;
            }
            if (removeCustomBgBtn) {
                removeCustomBgBtn.style.display = 'block';
            }
            
            this.showNotification('Fondo personalizado guardado correctamente', 'success');
        };
        
        reader.onerror = () => {
            this.showNotification('Error al leer la imagen', 'error');
        };
        
        reader.readAsDataURL(file);
    }
    
    removeCustomBackground() {
        if (confirm('¿Estás seguro de que quieres eliminar el fondo personalizado?')) {
            localStorage.removeItem('plantDiaryCustomBackground');
            localStorage.setItem('plantDiaryBackground', 'palm-tree-leaves');
            
            // Aplicar fondo por defecto
            this.changeBackground('palm-tree-leaves', false);
            
            // Ocultar opción personalizada en el modal
            const customBgOption = document.getElementById('customBgOption');
            const removeCustomBgBtn = document.getElementById('removeCustomBgBtn');
            
            if (customBgOption) {
                customBgOption.style.display = 'none';
                customBgOption.classList.remove('active');
            }
            if (removeCustomBgBtn) {
                removeCustomBgBtn.style.display = 'none';
            }
            
            this.showNotification('Fondo personalizado eliminado', 'success');
        }
    }

    closeBgModal() {
        const modal = document.getElementById('bgModal');
        if (modal) modal.classList.add('hidden');
    }

    changeBackground(bgName, save = true) {
        if (save) {
            localStorage.setItem('plantDiaryBackground', bgName);
        }
        
        let bgUrl;
        if (bgName === 'custom') {
            // Usar fondo personalizado de localStorage
            const customBg = localStorage.getItem('plantDiaryCustomBackground');
            if (customBg) {
                bgUrl = customBg;
            } else {
                // Si no hay fondo personalizado, usar el por defecto
                bgUrl = 'img/bgs/palm-tree-leaves.jpg';
                if (save) {
                    localStorage.setItem('plantDiaryBackground', 'palm-tree-leaves');
                }
            }
        } else {
            bgUrl = `img/bgs/${bgName}.jpg`;
        }
        
        document.body.style.backgroundImage = `url('${bgUrl}')`;
        
        // Marcar opción activa en el modal si está abierto
        document.querySelectorAll('.bg-option').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.bg === bgName) {
                option.classList.add('active');
            }
        });
    }
    
    // Posicionar modal cerca del botón
    positionModalNearButton(modal, button) {
        if (!modal || !button) return;
        
        const modalContent = modal.querySelector('.modal-content');
        if (!modalContent) return;
        
        // En móvil, centrar el modal
        if (this.isMobileDevice() || window.innerWidth <= 768) {
            modalContent.style.top = '50%';
            modalContent.style.left = '50%';
            modalContent.style.right = 'auto';
            modalContent.style.bottom = 'auto';
            modalContent.style.transform = 'translate(-50%, -50%)';
            modalContent.style.position = 'fixed';
            return;
        }
        
        // En desktop, posicionar cerca del botón
        const buttonRect = button.getBoundingClientRect();
        const top = buttonRect.bottom + 10;
        const right = window.innerWidth - buttonRect.right;
        
        modalContent.style.top = `${top}px`;
        modalContent.style.right = `${right}px`;
        modalContent.style.left = 'auto';
        modalContent.style.bottom = 'auto';
        modalContent.style.transform = 'none';
        modalContent.style.position = 'fixed';
    }
    
    // Actualizar modal de fuente con la fuente activa
    updateFontModal() {
        const savedFont = localStorage.getItem('plantDiaryFont') || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        document.querySelectorAll('.font-option').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.font === savedFont) {
                option.classList.add('active');
            }
        });

        // Cargar tamaño de fuente guardado
        const savedFontSize = localStorage.getItem('plantDiaryFontSize') || '100';
        const fontSizeSlider = document.getElementById('fontSizeSlider');
        const fontSizeInput = document.getElementById('fontSizeValue');
        const fontSizeNumberInput = document.getElementById('fontSizeInput');
        
        if (fontSizeSlider && fontSizeInput && fontSizeNumberInput) {
            fontSizeSlider.value = savedFontSize;
            fontSizeNumberInput.value = savedFontSize;
            fontSizeInput.textContent = `${savedFontSize}%`;
        }
    }
    
    // Cambiar fuente de toda la página
    changeFont(fontFamily, save = true) {
        if (save) {
            localStorage.setItem('plantDiaryFont', fontFamily);
        }
        
        // Aplicar fuente usando CSS variable para mejor rendimiento
        // Esto es mucho más eficiente que iterar sobre todos los elementos
        document.documentElement.style.setProperty('--app-font-family', fontFamily);
        document.body.style.fontFamily = fontFamily;
        
        // Marcar opción activa en el modal si está abierto
        document.querySelectorAll('.font-option').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.font === fontFamily) {
                option.classList.add('active');
            }
        });
    }

    // Cambiar tamaño de fuente de toda la página
    changeFontSize(percentage, save = true) {
        // Asegurar que percentage sea un número
        const percentageNum = typeof percentage === 'string' ? parseFloat(percentage) : percentage;
        
        if (isNaN(percentageNum)) {
            console.error('changeFontSize: percentage no es un número válido', percentage);
            return;
        }
        
        const multiplier = percentageNum / 100;
        
        if (save) {
            localStorage.setItem('plantDiaryFontSize', percentageNum.toString());
        }
        
        // Actualizar variable CSS
        document.documentElement.style.setProperty('--font-size-multiplier', multiplier);
        
        // Detectar navegador antes de aplicar cambios
        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        
        if (isFirefox) {
            // Firefox no soporta zoom, usar transform scale
            document.documentElement.style.zoom = '';
            document.documentElement.style.transform = `scale(${multiplier})`;
            document.documentElement.style.transformOrigin = 'top left';
            // Ajustar el viewport para evitar scroll horizontal
            const viewportWidth = 100 / multiplier;
            document.body.style.width = `${viewportWidth}%`;
            document.body.style.minHeight = `${100 / multiplier}vh`;
        } else {
            // Chrome, Edge, Safari: usar zoom (más eficiente y sin problemas de layout)
            document.documentElement.style.zoom = multiplier;
            // Limpiar transform si estaba aplicado previamente
            document.documentElement.style.transform = '';
            document.body.style.width = '';
            document.body.style.minHeight = '';
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
    async deletePlantFromStorage(plantId, plant = null) {
        if (this.useFirebase && this.db) {
            try {
                // Usar la planta pasada como parámetro, o buscarla si no se proporcionó
                if (!plant) {
                    plant = this.plants.find(p => p.id === plantId);
                }
                
                if (plant && this.storage) {
                    // Normalizar la planta para asegurarnos de tener el array photos
                    const normalizedPlant = this.normalizePlantData(plant);
                    const photos = normalizedPlant.photos || [];
                    
                    // Eliminar todas las fotos de Firebase Storage
                    if (photos.length > 0) {
                        for (const photoUrl of photos) {
                            // Solo intentar eliminar si es una URL de Firebase Storage
                            if (photoUrl && photoUrl.includes('firebasestorage.googleapis.com')) {
                                try {
                                    const imageRef = this.storage.refFromURL(photoUrl);
                                    await imageRef.delete();
                                    console.log('✅ Foto eliminada de Storage:', photoUrl);
                                } catch (storageError) {
                                    console.warn('⚠️ No se pudo eliminar la foto de Storage (puede que ya no exista):', photoUrl, storageError);
                                    // Continuar eliminando otras fotos aunque falle una
                                }
                            }
                        }
                    }
                    
                    // También intentar eliminar el campo photo antiguo si existe (retrocompatibilidad)
                    if (plant.photo && plant.photo.includes('firebasestorage.googleapis.com')) {
                        try {
                            const imageRef = this.storage.refFromURL(plant.photo);
                            await imageRef.delete();
                            console.log('✅ Imagen antigua eliminada de Storage');
                        } catch (storageError) {
                            console.warn('⚠️ No se pudo eliminar la imagen antigua de Storage:', storageError);
                            // Continuar aunque falle
                        }
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
        const plantModal = document.getElementById('plantModal');
        
        if (plant) {
            // Editar planta - cargar datos
            this.currentEditingId = plant.id;
            modalTitle.textContent = 'Editar Planta';
            this.loadPlantDataIntoForm(plant);
            // Guardar datos iniciales para detectar cambios
            this.saveInitialFormData();
            
            // Deshabilitar pointer-events en el modal de detalles para que no intercepte clics
            if (plantModal && !plantModal.classList.contains('hidden')) {
                plantModal.style.pointerEvents = 'none';
            }
        } else {
            // Nueva planta - resetear formulario
            this.currentEditingId = null;
            this.plantBeforeEdit = null;
            modalTitle.textContent = 'Nueva Planta';
            document.getElementById('plantForm').reset();
            // Resetear dual-list selectors
            this.initDualListSelector([]);
            this.initPlantStateSelector([]);
            this.removePhotoPreview();
            this.initSubstrateSelector(); // Inicializar selector vacío
            this.initCustomReminders([]); // Resetear recordatorios personalizados
            this.initialFormData = null;
        }
        
        modal.classList.remove('hidden');
    }

    // Guardar datos iniciales del formulario para detectar cambios
    saveInitialFormData() {
        if (!this.currentEditingId) {
            this.initialFormData = null;
            return;
        }
        
        this.initialFormData = {
            name: document.getElementById('plantName').value.trim(),
            species: document.getElementById('plantSpecies').value.trim(),
            variety: document.getElementById('plantVariety').value.trim(),
            type: document.getElementById('plantType').value || '',
            acquisitionDate: document.getElementById('plantAcquisitionDate').value || null,
            description: document.getElementById('plantDescription').value.trim(),
            light: document.getElementById('plantLight').value,
            temperature: document.getElementById('plantTemperature').value.trim(),
            humidity: document.getElementById('plantHumidity').value,
            substrate: this.getSubstrateData(),
            wateringSpring: document.getElementById('plantWateringSpring').value.trim(),
            wateringSummer: document.getElementById('plantWateringSummer').value.trim(),
            wateringAutumn: document.getElementById('plantWateringAutumn').value.trim(),
            wateringWinter: document.getElementById('plantWateringWinter').value.trim(),
            poorHealth: this.calculatePoorHealth(),
            diseases: this.getSelectedDiseases(),
            plantStates: this.getSelectedPlantStates(),
            baby: document.getElementById('plantBaby') ? document.getElementById('plantBaby').checked : false
        };
    }

    // Detectar si hay cambios en el formulario
    hasFormChanges() {
        if (!this.initialFormData || !this.currentEditingId) {
            return false;
        }

        const currentData = {
            name: document.getElementById('plantName').value.trim(),
            species: document.getElementById('plantSpecies').value.trim(),
            variety: document.getElementById('plantVariety').value.trim(),
            type: document.getElementById('plantType').value || '',
            acquisitionDate: document.getElementById('plantAcquisitionDate').value || null,
            description: document.getElementById('plantDescription').value.trim(),
            light: document.getElementById('plantLight').value,
            temperature: document.getElementById('plantTemperature').value.trim(),
            humidity: document.getElementById('plantHumidity').value,
            substrate: this.getSubstrateData(),
            wateringSpring: document.getElementById('plantWateringSpring').value.trim(),
            wateringSummer: document.getElementById('plantWateringSummer').value.trim(),
            wateringAutumn: document.getElementById('plantWateringAutumn').value.trim(),
            wateringWinter: document.getElementById('plantWateringWinter').value.trim(),
            poorHealth: this.calculatePoorHealth(),
            diseases: this.getSelectedDiseases(),
            plantStates: this.getSelectedPlantStates(),
            baby: document.getElementById('plantBaby') ? document.getElementById('plantBaby').checked : false
        };

        // Comparar objetos (comparación profunda para substrate y diseases)
        const compareObjects = (obj1, obj2) => {
            if (obj1 === obj2) return true;
            if (obj1 == null || obj2 == null) return obj1 === obj2;
            if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return obj1 === obj2;
            
            const keys1 = Object.keys(obj1);
            const keys2 = Object.keys(obj2);
            if (keys1.length !== keys2.length) return false;
            
            for (let key of keys1) {
                if (!keys2.includes(key)) return false;
                if (key === 'substrate') {
                    if (!compareObjects(obj1[key] || {}, obj2[key] || {})) return false;
                } else if (key === 'diseases' || key === 'plantStates') {
                    const arr1 = (obj1[key] || []).sort();
                    const arr2 = (obj2[key] || []).sort();
                    if (arr1.length !== arr2.length) return false;
                    if (arr1.some((val, i) => val !== arr2[i])) return false;
                } else if (obj1[key] !== obj2[key]) {
                    return false;
                }
            }
            return true;
        };

        return !compareObjects(this.initialFormData, currentData);
    }

    closePlantFormModal() {
        // Verificar si hay cambios sin guardar (solo si NO se está guardando)
        if (!this.isSubmittingForm && this.hasFormChanges()) {
            if (!confirm('¿Estás seguro de que quieres salir? Tienes cambios sin guardar que se perderán.')) {
                return; // No cerrar si el usuario cancela
            }
        }

        const modal = document.getElementById('plantFormModal');
        const plantModal = document.getElementById('plantModal');
        
        // Si es móvil y hay un estado en el historial, retroceder
        if (this.isMobileDevice() && history.state && history.state.modal === 'plantForm') {
            history.back();
        }
        
        modal.classList.add('hidden');
        this.currentEditingId = null;
        this.initialFormData = null;
        document.getElementById('plantForm').reset();
        this.removePhotoPreview();
        
        // Restaurar pointer-events en el modal de detalles si estaba abierto
        if (plantModal && !plantModal.classList.contains('hidden')) {
            plantModal.style.pointerEvents = 'auto';
        }
        
        // No necesitamos actualizar la ficha aquí porque:
        // 1. Si se guardó, ya se actualizó en handleFormSubmit()
        // 2. Si se canceló, no hay cambios que mostrar
        // 3. La ficha nunca se cerró, así que sigue visible
        this.plantBeforeEdit = null;
    }

    loadPlantDataIntoForm(plant) {
        document.getElementById('plantName').value = plant.name || '';
        document.getElementById('plantSpecies').value = plant.species || '';
        document.getElementById('plantVariety').value = plant.variety || '';
        document.getElementById('plantType').value = plant.type || '';
        document.getElementById('plantAcquisitionDate').value = plant.acquisitionDate || '';
        document.getElementById('plantDescription').value = plant.description || '';
        document.getElementById('plantLight').value = plant.light || '';
        document.getElementById('plantTemperature').value = plant.temperature || '';
        document.getElementById('plantHumidity').value = plant.humidity || '';
        document.getElementById('plantWateringSpring').value = plant.wateringSpring || '';
        document.getElementById('plantWateringSummer').value = plant.wateringSummer || '';
        document.getElementById('plantWateringAutumn').value = plant.wateringAutumn || '';
        document.getElementById('plantWateringWinter').value = plant.wateringWinter || '';
        if (document.getElementById('plantBaby')) {
            document.getElementById('plantBaby').checked = plant.baby || false;
        }
        
        // Cargar enfermedades seleccionadas en el dual-list
        this.initDualListSelector(plant.diseases || []);
        
        // Cargar estados de planta seleccionados en el dual-list
        this.initPlantStateSelector(plant.plantStates || []);
        
        // Cargar recordatorios personalizados
        this.initCustomReminders(plant.customReminders || []);
        
        // Guardar datos iniciales después de cargar (con un pequeño delay para asegurar que todo está cargado)
        setTimeout(() => {
            this.saveInitialFormData();
        }, 100);
        
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

    // Calcular automáticamente si la planta está en mala salud
    // Retorna true si hay al menos una enfermedad/plaga o un estado/síntoma
    calculatePoorHealth() {
        const diseases = this.getSelectedDiseases();
        const plantStates = this.getSelectedPlantStates();
        return (diseases.length > 0) || (plantStates.length > 0);
    }

    // Obtener enfermedades seleccionadas del dual-list
    getSelectedDiseases() {
        const selectedList = document.getElementById('plantDiseasesSelected');
        if (!selectedList) return [];
        return Array.from(selectedList.options).map(option => option.value);
    }

    // Inicializar el dual-list selector con enfermedades pre-seleccionadas
    initDualListSelector(selectedDiseases = []) {
        const availableList = document.getElementById('plantDiseasesAvailable');
        const selectedList = document.getElementById('plantDiseasesSelected');
        
        if (!availableList || !selectedList) return;

        // Limpiar ambas listas
        availableList.innerHTML = '';
        selectedList.innerHTML = '';

        // Lista completa de enfermedades
        const allDiseases = [
            'Cochinilla algodonosa',
            'Pulgón',
            'Araña roja',
            'Trips',
            'Mosca del sustrato (sciáridos)',
            'Mosca blanca',
            'Hormigas',
            'Caracoles/babosas (exterior)',
            'Orugas (exterior)',
            'Nematodos',
            'Oídio',
            'Mildiu',
            'Negrilla/fumagina',
            'Podredumbre radicular',
            'Roya'
        ];

        // Separar disponibles y seleccionadas
        allDiseases.forEach(disease => {
            const option = document.createElement('option');
            option.value = disease;
            option.textContent = disease;
            
            if (selectedDiseases.includes(disease)) {
                selectedList.appendChild(option);
            } else {
                availableList.appendChild(option);
            }
        });
    }

    // Añadir enfermedades seleccionadas de disponibles a seleccionadas
    addDiseasesToSelected() {
        const availableList = document.getElementById('plantDiseasesAvailable');
        const selectedList = document.getElementById('plantDiseasesSelected');
        
        if (!availableList || !selectedList) return;

        const selectedOptions = Array.from(availableList.selectedOptions);
        selectedOptions.forEach(option => {
            selectedList.appendChild(option);
        });
    }

    // Quitar enfermedades seleccionadas de seleccionadas a disponibles
    removeDiseasesFromSelected() {
        const availableList = document.getElementById('plantDiseasesAvailable');
        const selectedList = document.getElementById('plantDiseasesSelected');
        
        if (!availableList || !selectedList) return;

        const selectedOptions = Array.from(selectedList.selectedOptions);
        selectedOptions.forEach(option => {
            availableList.appendChild(option);
        });
    }

    // Obtener estados de planta seleccionados del dual-list
    getSelectedPlantStates() {
        const selectedList = document.getElementById('plantStatesSelected');
        if (!selectedList) return [];
        return Array.from(selectedList.options).map(option => option.value);
    }

    // Inicializar el dual-list selector de estados con estados pre-seleccionados
    initPlantStateSelector(selectedStates = []) {
        const availableList = document.getElementById('plantStatesAvailable');
        const selectedList = document.getElementById('plantStatesSelected');
        
        if (!availableList || !selectedList) return;

        // Limpiar ambas listas
        availableList.innerHTML = '';
        selectedList.innerHTML = '';

        // Lista completa de estados de planta
        const allStates = [
            'Hojas amarillas',
            'Mustia',
            'Pérdida de hojas',
            'Hojas secas',
            'Hojas marrones',
            'Hojas caídas',
            'Tallo débil',
            'Crecimiento lento',
            'Sin crecimiento',
            'Hojas pequeñas',
            'Hojas deformadas',
            'Manchas en hojas',
            'Raíces visibles',
            'Sustrato muy seco',
            'Sustrato muy húmedo'
        ];

        // Separar disponibles y seleccionadas
        allStates.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            
            if (selectedStates.includes(state)) {
                selectedList.appendChild(option);
            } else {
                availableList.appendChild(option);
            }
        });
    }

    // Añadir estados seleccionados de disponibles a seleccionadas
    addPlantStatesToSelected() {
        const availableList = document.getElementById('plantStatesAvailable');
        const selectedList = document.getElementById('plantStatesSelected');
        
        if (!availableList || !selectedList) return;

        const selectedOptions = Array.from(availableList.selectedOptions);
        selectedOptions.forEach(option => {
            selectedList.appendChild(option);
        });
    }

    // Quitar estados seleccionados de seleccionadas a disponibles
    removePlantStatesFromSelected() {
        const availableList = document.getElementById('plantStatesAvailable');
        const selectedList = document.getElementById('plantStatesSelected');
        
        if (!availableList || !selectedList) return;

        const selectedOptions = Array.from(selectedList.selectedOptions);
        selectedOptions.forEach(option => {
            availableList.appendChild(option);
        });
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
        
        // Marcar que se está guardando para evitar el aviso de cambios sin guardar
        this.isSubmittingForm = true;
        
        // Deshabilitar página y mostrar toast de guardando
        this.disablePage();
        this.showSavingToast();
        
        try {
            const photoData = await this.getPhotoData();
        const existingPlant = this.currentEditingId ? this.plants.find(p => p.id === this.currentEditingId) : null;
        
        // Obtener fotos existentes normalizadas (sin duplicados)
        let existingPhotos = [];
        if (existingPlant) {
            const normalized = this.normalizePlantData({...existingPlant});
            existingPhotos = normalized.photos || [];
        }
        
        // Si hay nueva foto, añadirla (sin duplicados)
        if (photoData) {
            if (!existingPhotos.includes(photoData)) {
                existingPhotos.push(photoData);
            }
        }
        
        // Si no hay fotos, usar imagen por defecto
        if (existingPhotos.length === 0) {
            existingPhotos = ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'];
        }
        
        const formData = {
            id: this.currentEditingId || Date.now().toString(),
            name: document.getElementById('plantName').value.trim(),
            species: document.getElementById('plantSpecies').value.trim(),
            variety: document.getElementById('plantVariety').value.trim(),
            type: document.getElementById('plantType').value || '',
            acquisitionDate: document.getElementById('plantAcquisitionDate').value || null,
            photos: existingPhotos,
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
            poorHealth: this.calculatePoorHealth(),
            diseases: this.getSelectedDiseases(),
            plantStates: this.getSelectedPlantStates(),
            baby: document.getElementById('plantBaby') ? document.getElementById('plantBaby').checked : false,
            plantStates: this.getSelectedPlantStates(),
            comments: existingPlant?.comments || [],
            customReminders: this.getCustomReminders(),
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
            this.renderReminders(); // Actualizar avisos después de guardar
            
            // Si había una ficha abierta antes de editar, actualizarla con los nuevos datos
            if (this.plantBeforeEdit && this.currentEditingId) {
                const updatedPlant = this.plants.find(p => p.id === this.currentEditingId);
                if (updatedPlant) {
                    this.showPlantDetails(updatedPlant);
                }
            }
            
            this.closePlantFormModal();
            this.hideSavingToast();
            this.enablePage();
            this.showNotification(this.currentEditingId ? 'Planta actualizada' : 'Planta agregada', 'success');
        } catch (error) {
            console.error('Error guardando planta:', error);
            this.hideSavingToast();
            this.enablePage();
            this.showNotification('Error al guardar la planta', 'error');
        } finally {
            // Restaurar el flag al finalizar (exitoso o con error)
            this.isSubmittingForm = false;
        }
    }

    // Renderizar avisos de riego y recordatorios
    renderReminders() {
        const remindersSection = document.getElementById('remindersSection');
        const remindersContent = document.getElementById('remindersContent');
        if (!remindersSection || !remindersContent) return;
        
        const today = new Date().toISOString().split('T')[0];
        const todayDate = new Date(today + 'T00:00:00');
        const plantsNeedingWater = [];
        const customRemindersDue = [];
        
        // Buscar plantas que necesitan riego hoy
        this.plants.forEach(plant => {
            if (this.needsWateringToday(plant)) {
                plantsNeedingWater.push(plant);
            }
            
            // Buscar recordatorios personalizados que vencen hoy o están vencidos
            if (plant.customReminders && Array.isArray(plant.customReminders)) {
                plant.customReminders.forEach(reminder => {
                    if (reminder.nextDue) {
                        const nextDueDate = new Date(reminder.nextDue + 'T00:00:00');
                        // Incluir si vence hoy o está vencido
                        if (nextDueDate <= todayDate) {
                            customRemindersDue.push({
                                plant: plant,
                                reminder: reminder,
                                isOverdue: nextDueDate < todayDate
                            });
                        }
                    }
                });
            }
        });
        
        // Si no hay avisos, ocultar la sección
        if (plantsNeedingWater.length === 0 && customRemindersDue.length === 0) {
            remindersSection.style.display = 'none';
            return;
        }
        
        // Mostrar la sección
        remindersSection.style.display = 'block';
        
        let html = '';
        
        // Avisos de riego (PRIMERO)
        if (plantsNeedingWater.length > 0) {
            html += `
                <div class="reminder-group">
                    <div class="reminder-group-header">
                        <img src="img/icons/water-drop.svg" alt="Riego" class="reminder-icon">
                        <h3>Plantas que necesitan riego hoy (${plantsNeedingWater.length})</h3>
                    </div>
                    <div class="reminder-items">
                        ${plantsNeedingWater.map(plant => `
                            <div class="reminder-item watering-reminder" onclick="plantManager.showPlantDetails(plantManager.plants.find(p => p.id === '${plant.id}'))" style="cursor: pointer;">
                                <div class="reminder-item-content">
                                    <span class="reminder-plant-name">${this.escapeHtml(plant.name)}</span>
                                    <span class="reminder-action">Necesita riego</span>
                                </div>
                                <button class="reminder-action-btn" onclick="event.stopPropagation(); (async () => { await plantManager.updateWatering('${plant.id}'); plantManager.renderReminders(); })();" title="Regar ahora">
                                    <img src="img/icons/water-drop.svg" alt="Regar" class="reminder-btn-icon">
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        // Recordatorios personalizados
        if (customRemindersDue.length > 0) {
            // Separar vencidos y pendientes de hoy
            const overdueReminders = customRemindersDue.filter(r => r.isOverdue);
            const todayReminders = customRemindersDue.filter(r => !r.isOverdue);
            
            html += `
                <div class="reminder-group">
                    <div class="reminder-group-header">
                        <img src="img/icons/notification.svg" alt="Recordatorios" class="reminder-icon">
                        <h3>Recordatorios personalizados (${customRemindersDue.length})</h3>
                    </div>
                    <div class="reminder-items">
                        ${overdueReminders.map(({plant, reminder}) => {
                            const daysOverdue = Math.floor((todayDate - new Date(reminder.nextDue + 'T00:00:00')) / (1000 * 60 * 60 * 24));
                            return `
                            <div class="reminder-item custom-reminder overdue-reminder" onclick="plantManager.showPlantDetails(plantManager.plants.find(p => p.id === '${plant.id}'))" style="cursor: pointer;">
                                <div class="reminder-item-content">
                                    <span class="reminder-plant-name">${this.escapeHtml(plant.name)}</span>
                                    <span class="reminder-action overdue-action">${this.escapeHtml(reminder.action)}</span>
                                    <span class="reminder-overdue-badge">⚠️ Vencido hace ${daysOverdue} ${daysOverdue === 1 ? 'día' : 'días'}</span>
                                </div>
                                <button class="reminder-action-btn overdue-btn" onclick="event.stopPropagation(); plantManager.completeCustomReminder('${plant.id}', '${reminder.id}');" title="Marcar como completado">
                                    <img src="img/icons/ok.svg" alt="Completar" class="reminder-btn-icon">
                                </button>
                            </div>
                        `}).join('')}
                        ${todayReminders.map(({plant, reminder}) => `
                            <div class="reminder-item custom-reminder" onclick="plantManager.showPlantDetails(plantManager.plants.find(p => p.id === '${plant.id}'))" style="cursor: pointer;">
                                <div class="reminder-item-content">
                                    <span class="reminder-plant-name">${this.escapeHtml(plant.name)}</span>
                                    <span class="reminder-action">${this.escapeHtml(reminder.action)}</span>
                                </div>
                                <button class="reminder-action-btn" onclick="event.stopPropagation(); plantManager.completeCustomReminder('${plant.id}', '${reminder.id}');" title="Marcar como completado">
                                    <img src="img/icons/ok.svg" alt="Completar" class="reminder-btn-icon">
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        remindersContent.innerHTML = html;
    }
    
    // Inicializar recordatorios personalizados en el formulario
    initCustomReminders(reminders = []) {
        const remindersList = document.getElementById('customRemindersList');
        if (!remindersList) return;
        
        remindersList.innerHTML = '';
        
        reminders.forEach((reminder, index) => {
            this.addCustomReminderItem(reminder, index);
        });
    }
    
    // Añadir item de recordatorio al formulario
    addCustomReminderItem(reminder = null, index = null) {
        const remindersList = document.getElementById('customRemindersList');
        if (!remindersList) return;
        
        const reminderId = reminder?.id || `reminder-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const action = reminder?.action || '';
        const frequency = reminder?.frequency || '';
        const lastCompleted = reminder?.lastCompleted || '';
        const nextDue = reminder?.nextDue || '';
        
        const reminderItem = document.createElement('div');
        reminderItem.className = 'custom-reminder-item';
        reminderItem.dataset.reminderId = reminderId;
        if (lastCompleted) {
            reminderItem.dataset.lastCompleted = lastCompleted;
        }
        if (nextDue) {
            reminderItem.dataset.nextDue = nextDue;
        }
        reminderItem.innerHTML = `
            <div class="custom-reminder-form-row">
                <div class="form-group" style="flex: 1;">
                    <label>Acción</label>
                    <select class="custom-reminder-action" data-reminder-id="${reminderId}">
                        <option value="">Seleccionar...</option>
                        <option value="Cambiar sustrato" ${action === 'Cambiar sustrato' ? 'selected' : ''}>Cambiar sustrato</option>
                        <option value="Añadir abono" ${action === 'Añadir abono' ? 'selected' : ''}>Añadir abono</option>
                        <option value="Podar" ${action === 'Podar' ? 'selected' : ''}>Podar</option>
                        <option value="Limpiar hojas" ${action === 'Limpiar hojas' ? 'selected' : ''}>Limpiar hojas</option>
                        <option value="Rotar maceta" ${action === 'Rotar maceta' ? 'selected' : ''}>Rotar maceta</option>
                        <option value="Trasplantar" ${action === 'Trasplantar' ? 'selected' : ''}>Trasplantar</option>
                        <option value="Fertilizar" ${action === 'Fertilizar' ? 'selected' : ''}>Fertilizar</option>
                        <option value="Revisar raíces" ${action === 'Revisar raíces' ? 'selected' : ''}>Revisar raíces</option>
                        <option value="Aplicar tratamiento" ${action === 'Aplicar tratamiento' ? 'selected' : ''}>Aplicar tratamiento</option>
                        <option value="Otro" ${action === 'Otro' ? 'selected' : ''}>Otro</option>
                    </select>
                </div>
                <div class="form-group" style="flex: 0 0 150px;">
                    <label>Frecuencia (días)</label>
                    <input type="number" class="custom-reminder-frequency" data-reminder-id="${reminderId}" 
                           value="${frequency}" min="0" placeholder="Ej: 30 (0 para probar)">
                </div>
                <div class="form-group" style="flex: 0 0 40px; display: flex; align-items: flex-end;">
                    <button type="button" class="btn-action btn-delete-action" onclick="plantManager.removeCustomReminderItem('${reminderId}')" title="Eliminar">
                        <img src="img/icons/delete.svg" alt="Eliminar" class="btn-action-icon">
                    </button>
                </div>
            </div>
        `;
        
        remindersList.appendChild(reminderItem);
    }
    
    // Añadir formulario de recordatorio nuevo
    addCustomReminderForm() {
        this.addCustomReminderItem();
    }
    
    // Eliminar item de recordatorio del formulario
    removeCustomReminderItem(reminderId) {
        const reminderItem = document.querySelector(`[data-reminder-id="${reminderId}"]`);
        if (reminderItem) {
            reminderItem.remove();
        }
    }
    
    // Obtener recordatorios personalizados del formulario
    getCustomReminders() {
        const remindersList = document.getElementById('customRemindersList');
        if (!remindersList) return [];
        
        const reminders = [];
        const reminderItems = remindersList.querySelectorAll('.custom-reminder-item');
        
        reminderItems.forEach(item => {
            const reminderId = item.dataset.reminderId;
            const actionSelect = item.querySelector('.custom-reminder-action');
            const frequencyInput = item.querySelector('.custom-reminder-frequency');
            
            if (actionSelect && frequencyInput) {
                const action = actionSelect.value.trim();
                const frequency = parseInt(frequencyInput.value);
                
                if (action && frequency >= 0 && !isNaN(frequency)) {
                    // Obtener lastCompleted del dataset o del recordatorio original
                    const lastCompleted = item.dataset.lastCompleted || '';
                    const existingNextDue = item.dataset.nextDue || '';
                    let nextDue = '';
                    
                    if (frequency === 0) {
                        // Si es 0 días, vence hoy
                        nextDue = new Date().toISOString().split('T')[0];
                    } else if (lastCompleted) {
                        // Si hay fecha de último completado, calcular próxima desde ahí
                        const lastDate = new Date(lastCompleted + 'T00:00:00');
                        lastDate.setDate(lastDate.getDate() + frequency);
                        nextDue = lastDate.toISOString().split('T')[0];
                    } else if (existingNextDue) {
                        // Si existe nextDue pero no lastCompleted, mantenerlo (solo si no se cambió la frecuencia)
                        // Si se cambió la frecuencia, recalcular desde hoy
                        const today = new Date().toISOString().split('T')[0];
                        const nextDueDate = new Date(existingNextDue + 'T00:00:00');
                        const todayDate = new Date(today + 'T00:00:00');
                        
                        // Si la fecha programada es futura, mantenerla
                        if (nextDueDate >= todayDate) {
                            nextDue = existingNextDue;
                        } else {
                            // Si ya pasó, recalcular desde hoy
                            const newDate = new Date(today + 'T00:00:00');
                            newDate.setDate(newDate.getDate() + frequency);
                            nextDue = newDate.toISOString().split('T')[0];
                        }
                    } else {
                        // Si nunca se ha completado, empezar desde hoy + frecuencia
                        const today = new Date();
                        today.setDate(today.getDate() + frequency);
                        nextDue = today.toISOString().split('T')[0];
                    }
                    
                    reminders.push({
                        id: reminderId,
                        action: action,
                        frequency: frequency,
                        lastCompleted: lastCompleted || null,
                        nextDue: nextDue
                    });
                }
            }
        });
        
        return reminders;
    }
    
    // Completar un recordatorio personalizado
    async completeCustomReminder(plantId, reminderId) {
        const plant = this.plants.find(p => p.id === plantId);
        if (!plant || !plant.customReminders) return;
        
        const reminder = plant.customReminders.find(r => r.id === reminderId);
        if (!reminder) return;
        
        const today = new Date().toISOString().split('T')[0];
        
        // Actualizar recordatorio
        reminder.lastCompleted = today;
        const nextDate = new Date(today + 'T00:00:00');
        nextDate.setDate(nextDate.getDate() + reminder.frequency);
        reminder.nextDue = nextDate.toISOString().split('T')[0];
        
        // Guardar cambios
        const saved = await this.savePlantToFirebase(plant);
        if (!saved) {
            await this.savePlants();
        }
        
        this.renderReminders();
        this.showPlantDetails(plant);
        this.showNotification('Recordatorio completado', 'success');
    }
    
    // Mostrar formulario para añadir recordatorio desde detalles
    showAddCustomReminderForm(plantId) {
        const form = document.getElementById(`customReminderAddForm-${plantId}`);
        const btn = document.getElementById(`showAddReminderBtn-${plantId}`);
        if (form && btn) {
            form.style.display = 'block';
            btn.style.display = 'none';
        }
    }
    
    // Cancelar añadir recordatorio desde detalles
    cancelAddCustomReminder(plantId) {
        const form = document.getElementById(`customReminderAddForm-${plantId}`);
        const btn = document.getElementById(`showAddReminderBtn-${plantId}`);
        if (form && btn) {
            form.style.display = 'none';
            btn.style.display = 'block';
            // Limpiar campos
            const actionSelect = document.getElementById(`newReminderAction-${plantId}`);
            const frequencyInput = document.getElementById(`newReminderFrequency-${plantId}`);
            if (actionSelect) actionSelect.value = '';
            if (frequencyInput) frequencyInput.value = '';
        }
    }
    
    // Guardar nuevo recordatorio desde detalles
    async saveNewCustomReminder(plantId) {
        const plant = this.plants.find(p => p.id === plantId);
        if (!plant) return;
        
        const actionSelect = document.getElementById(`newReminderAction-${plantId}`);
        const frequencyInput = document.getElementById(`newReminderFrequency-${plantId}`);
        
        if (!actionSelect || !frequencyInput) return;
        
        const action = actionSelect.value.trim();
        const frequency = parseInt(frequencyInput.value);
        
        if (!action || frequency < 0 || isNaN(frequency)) {
            this.showNotification('Por favor, completa todos los campos correctamente', 'error');
            return;
        }
        
        // Crear nuevo recordatorio
        const reminderId = `reminder-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        let nextDue = '';
        
        if (frequency === 0) {
            // Si es 0 días, vence hoy
            nextDue = new Date().toISOString().split('T')[0];
        } else {
            const today = new Date();
            today.setDate(today.getDate() + frequency);
            nextDue = today.toISOString().split('T')[0];
        }
        
        const newReminder = {
            id: reminderId,
            action: action,
            frequency: frequency,
            lastCompleted: null,
            nextDue: nextDue
        };
        
        // Añadir a la planta
        if (!plant.customReminders) {
            plant.customReminders = [];
        }
        plant.customReminders.push(newReminder);
        
        // Guardar cambios
        const saved = await this.savePlantToFirebase(plant);
        if (!saved) {
            await this.savePlants();
        }
        
        this.renderReminders();
        this.showPlantDetails(plant);
        this.showNotification('Recordatorio añadido', 'success');
    }
    
    // Editar recordatorio personalizado desde detalles
    editCustomReminder(plantId, reminderId) {
        const plant = this.plants.find(p => p.id === plantId);
        if (!plant || !plant.customReminders) return;
        
        const reminder = plant.customReminders.find(r => r.id === reminderId);
        if (!reminder) return;
        
        // Ocultar el item y mostrar formulario de edición
        const reminderItem = document.querySelector(`[data-reminder-id="${reminderId}"]`);
        if (!reminderItem) return;
        
        // Crear formulario de edición
        const editFormHtml = `
            <div class="custom-reminder-edit-form" data-reminder-id="${reminderId}" style="margin-top: 10px; padding: 15px; background: rgba(10, 31, 10, 0.5); border-radius: 8px; border: 2px solid rgba(74, 154, 74, 0.5);">
                <div class="form-group" style="margin-bottom: 12px;">
                    <label style="display: block; margin-bottom: 6px; color: var(--text-light); font-weight: 500;">Acción</label>
                    <select id="editReminderAction-${reminderId}" class="custom-reminder-action-select" style="width: 100%; padding: 10px; border: 1px solid rgba(255, 255, 255, 0.8); border-radius: 6px; background: rgba(10, 31, 10, 0.7); color: var(--text-light); font-size: 0.9rem;">
                        <option value="">Seleccionar...</option>
                        <option value="Cambiar sustrato" ${reminder.action === 'Cambiar sustrato' ? 'selected' : ''}>Cambiar sustrato</option>
                        <option value="Añadir abono" ${reminder.action === 'Añadir abono' ? 'selected' : ''}>Añadir abono</option>
                        <option value="Podar" ${reminder.action === 'Podar' ? 'selected' : ''}>Podar</option>
                        <option value="Limpiar hojas" ${reminder.action === 'Limpiar hojas' ? 'selected' : ''}>Limpiar hojas</option>
                        <option value="Rotar maceta" ${reminder.action === 'Rotar maceta' ? 'selected' : ''}>Rotar maceta</option>
                        <option value="Trasplantar" ${reminder.action === 'Trasplantar' ? 'selected' : ''}>Trasplantar</option>
                        <option value="Fertilizar" ${reminder.action === 'Fertilizar' ? 'selected' : ''}>Fertilizar</option>
                        <option value="Revisar raíces" ${reminder.action === 'Revisar raíces' ? 'selected' : ''}>Revisar raíces</option>
                        <option value="Aplicar tratamiento" ${reminder.action === 'Aplicar tratamiento' ? 'selected' : ''}>Aplicar tratamiento</option>
                        <option value="Otro" ${reminder.action === 'Otro' ? 'selected' : ''}>Otro</option>
                    </select>
                </div>
                <div class="form-group" style="margin-bottom: 12px;">
                    <label style="display: block; margin-bottom: 6px; color: var(--text-light); font-weight: 500;">Frecuencia (días)</label>
                    <input type="number" id="editReminderFrequency-${reminderId}" class="custom-reminder-frequency-input" min="0" value="${reminder.frequency}" placeholder="Ej: 30 (0 para probar)" style="width: 100%; padding: 10px; border: 1px solid rgba(255, 255, 255, 0.8); border-radius: 6px; background: rgba(10, 31, 10, 0.7); color: var(--text-light); font-size: 0.9rem;">
                </div>
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button class="btn-secondary btn-small" onclick="plantManager.cancelEditCustomReminder('${plantId}', '${reminderId}')">
                        <img src="img/icons/cancel.svg" alt="Cancelar" class="btn-icon"> Cancelar
                    </button>
                    <button class="btn-primary btn-small" onclick="plantManager.saveEditCustomReminder('${plantId}', '${reminderId}')">
                        <img src="img/icons/save.svg" alt="Guardar" class="btn-icon"> Guardar
                    </button>
                </div>
            </div>
        `;
        
        // Insertar formulario después del item
        reminderItem.insertAdjacentHTML('afterend', editFormHtml);
        
        // Ocultar el item original
        reminderItem.style.display = 'none';
    }
    
    // Cancelar edición de recordatorio
    cancelEditCustomReminder(plantId, reminderId) {
        const editForm = document.querySelector(`.custom-reminder-edit-form[data-reminder-id="${reminderId}"]`);
        const reminderItem = document.querySelector(`[data-reminder-id="${reminderId}"]`);
        
        if (editForm) editForm.remove();
        if (reminderItem) reminderItem.style.display = 'flex';
    }
    
    // Guardar edición de recordatorio
    async saveEditCustomReminder(plantId, reminderId) {
        const plant = this.plants.find(p => p.id === plantId);
        if (!plant || !plant.customReminders) return;
        
        const reminder = plant.customReminders.find(r => r.id === reminderId);
        if (!reminder) return;
        
        const actionSelect = document.getElementById(`editReminderAction-${reminderId}`);
        const frequencyInput = document.getElementById(`editReminderFrequency-${reminderId}`);
        
        if (!actionSelect || !frequencyInput) return;
        
        const action = actionSelect.value.trim();
        const frequency = parseInt(frequencyInput.value);
        
        if (!action || frequency < 0 || isNaN(frequency)) {
            this.showNotification('Por favor, completa todos los campos correctamente', 'error');
            return;
        }
        
        // Actualizar recordatorio
        reminder.action = action;
        reminder.frequency = frequency;
        
        // Recalcular próxima fecha si es necesario
        if (frequency === 0) {
            // Si es 0 días, vence hoy
            reminder.nextDue = new Date().toISOString().split('T')[0];
        } else if (reminder.lastCompleted) {
            const lastDate = new Date(reminder.lastCompleted + 'T00:00:00');
            lastDate.setDate(lastDate.getDate() + frequency);
            reminder.nextDue = lastDate.toISOString().split('T')[0];
        } else {
            // Si nunca se completó, recalcular desde hoy
            const today = new Date();
            today.setDate(today.getDate() + frequency);
            reminder.nextDue = today.toISOString().split('T')[0];
        }
        
        // Guardar cambios
        const saved = await this.savePlantToFirebase(plant);
        if (!saved) {
            await this.savePlants();
        }
        
        this.renderReminders();
        this.showPlantDetails(plant);
        this.showNotification('Recordatorio actualizado', 'success');
    }
    
    // Eliminar recordatorio personalizado desde detalles
    async deleteCustomReminder(plantId, reminderId) {
        if (!confirm('¿Estás seguro de que quieres eliminar este recordatorio?')) {
            return;
        }
        
        const plant = this.plants.find(p => p.id === plantId);
        if (!plant || !plant.customReminders) return;
        
        // Eliminar recordatorio
        plant.customReminders = plant.customReminders.filter(r => r.id !== reminderId);
        
        // Guardar cambios
        const saved = await this.savePlantToFirebase(plant);
        if (!saved) {
            await this.savePlants();
        }
        
        this.renderReminders();
        this.showPlantDetails(plant);
        this.showNotification('Recordatorio eliminado', 'success');
    }

    // Renderizado
    renderDashboard(plantsToAnalyze = null) {
        const dashboardContent = document.getElementById('dashboardContent');
        if (!dashboardContent) return;
        
        // Renderizar avisos después del dashboard
        this.renderReminders();

        // Usar las plantas proporcionadas o todas las plantas
        const plants = plantsToAnalyze !== null ? plantsToAnalyze : this.plants;

        // El dashboard siempre se muestra, incluso si no hay plantas
        // Si no hay plantas, se mostrará con valores en 0

        // Calcular estadísticas basadas en las plantas proporcionadas
        let totalPlants = plants.length;
        let needsWater = 0;
        let poorHealth = 0;
        let babyPlants = 0;
        let recentPlants = 0;
        let typeStats = {};
        let lightStats = {};
        let humidityStats = {};
        let tempStats = {};
        let wateringFreqStats = { alta: 0, moderado: 0, bajo: 0 };
        
        // Contadores separados para el gráfico donut de salud
        let healthyOnlyPlants = 0; // Saludables y no baby
        let poorHealthOnlyPlants = 0; // Mala salud pero no baby
        let babyOnlyPlants = 0; // Baby (pueden tener o no poorHealth)

        plants.forEach(plant => {
            const normalized = this.normalizePlantData(plant);
            const wateringDates = normalized.wateringDates || [];
            const lastWateringDate = wateringDates.length > 0 ? wateringDates[0] : null;
            const daysSinceWatering = lastWateringDate ? this.daysSince(lastWateringDate) : null;
            
            if (daysSinceWatering !== null && daysSinceWatering >= 7) {
                needsWater++;
            } else if (!lastWateringDate) {
                needsWater++;
            }
            
            const isBaby = plant.baby || false;
            const isPoorHealth = plant.poorHealth || false;
            
            if (isPoorHealth) {
                poorHealth++;
            }
            
            if (isBaby) {
                babyPlants++;
            }
            
            // Clasificar para el gráfico donut
            if (isBaby) {
                babyOnlyPlants++;
            } else if (isPoorHealth) {
                poorHealthOnlyPlants++;
            } else {
                healthyOnlyPlants++;
            }
            
            if (plant.createdAt && this.daysSince(plant.createdAt) <= 7) {
                recentPlants++;
            }
            
            // Estadísticas por tipo
            const type = plant.type || 'Sin tipo';
            typeStats[type] = (typeStats[type] || 0) + 1;
            
            // Estadísticas por luz
            const light = plant.light || 'Sin especificar';
            lightStats[light] = (lightStats[light] || 0) + 1;
            
            // Estadísticas por humedad
            const humidity = plant.humidity || 'Sin especificar';
            humidityStats[humidity] = (humidityStats[humidity] || 0) + 1;
            
            // Estadísticas por temperatura
            const temp = plant.temperature || 'Sin especificar';
            tempStats[temp] = (tempStats[temp] || 0) + 1;
            
            // Analizar frecuencia de riego (promedio de las 4 estaciones)
            const spring = parseInt(plant.wateringSpring) || 0;
            const summer = parseInt(plant.wateringSummer) || 0;
            const autumn = parseInt(plant.wateringAutumn) || 0;
            const winter = parseInt(plant.wateringWinter) || 0;
            const avgDays = (spring + summer + autumn + winter) / 4;
            if (avgDays > 0) {
                if (avgDays <= 5) {
                    wateringFreqStats.alta++;
                } else if (avgDays <= 10) {
                    wateringFreqStats.moderado++;
                } else {
                    wateringFreqStats.bajo++;
                }
            }
        });

        const healthyPlants = totalPlants - poorHealth;
        const healthPercentage = totalPlants > 0 ? Math.round((healthyPlants / totalPlants) * 100) : 0;

        // Generar donut chart SVG para distribución por tipo
        // Usar TODOS los tipos individuales, no categorías agrupadas
        const donutSize = 130;
        const radius = 45;
        const innerRadius = 28;
        const centerX = donutSize / 2;
        const centerY = donutSize / 2;
        
        // Ordenar todos los tipos por cantidad (no solo top 5)
        const sortedTypes = Object.entries(typeStats)
            .sort((a, b) => b[1] - a[1]);
        
        // Generar colores suficientes para todos los tipos
        const baseColors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722', '#9C27B0', '#3F51B5', '#00BCD4', '#009688', '#8BC34A', '#CDDC39', '#FFEB3B', '#FF9800', '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3'];
        const colors = [];
        for (let i = 0; i < sortedTypes.length; i++) {
            colors.push(baseColors[i % baseColors.length]);
        }
        
        let donutPaths = '';
        let currentAngleDeg = -90;
        
        sortedTypes.forEach(([type, count], index) => {
            const percentage = (count / totalPlants) * 100;
            const angleDeg = (percentage / 100) * 360;
            const endAngleDeg = currentAngleDeg + angleDeg;
            const color = colors[index];
            
            if (percentage > 0) {
                // Convertir grados a radianes
                const startAngleRad = (currentAngleDeg * Math.PI) / 180;
                const endAngleRad = (endAngleDeg * Math.PI) / 180;
                const tooltipText = `${type}: ${Math.round(percentage)}% (${count} planta${count !== 1 ? 's' : ''})`;
                donutPaths += `<path d="${this.createDonutSlice(centerX, centerY, innerRadius, radius, startAngleRad, endAngleRad)}" fill="${color}" data-tooltip="${this.escapeHtml(tooltipText)}" style="cursor: pointer;" />`;
                currentAngleDeg = endAngleDeg;
            }
        });

        const typeDonutSvg = `
            <svg width="${donutSize}" height="${donutSize}" viewBox="0 0 ${donutSize} ${donutSize}">
                <circle cx="${centerX}" cy="${centerY}" r="${innerRadius}" fill="#1a3a1a"/>
                ${donutPaths}
                <text x="${centerX}" y="${centerY + 5}" text-anchor="middle" 
                      fill="var(--text-light)" font-size="22" font-weight="700">${totalPlants}</text>
            </svg>
        `;

        // Generar donut chart SVG para salud (con tres segmentos: verde, rojo, amarillo)
        const healthDonutSize = 110;
        const healthRadius = 38;
        const healthInnerRadius = 22;
        const healthCenterX = healthDonutSize / 2;
        const healthCenterY = healthDonutSize / 2;
        
        let healthDonutSvg = '';
        if (totalPlants > 0) {
            let healthyPath = '';
            let poorPath = '';
            let babyPath = '';
            
            // Convertir grados a radianes
            const startAngleDeg = -90;
            const startAngleRad = (startAngleDeg * Math.PI) / 180;
            const fullCircleRad = (270 * Math.PI) / 180;
            
            // Calcular porcentajes para cada categoría
            const healthyPercentage = totalPlants > 0 ? (healthyOnlyPlants / totalPlants) * 100 : 0;
            const poorPercentage = totalPlants > 0 ? (poorHealthOnlyPlants / totalPlants) * 100 : 0;
            const babyPercentage = totalPlants > 0 ? (babyOnlyPlants / totalPlants) * 100 : 0;
            
            // Calcular ángulos en radianes
            let currentAngleRad = startAngleRad;
            
            // Segmento verde: saludables (no baby, no poorHealth)
            let healthyPathWithTooltip = '';
            if (healthyOnlyPlants > 0) {
                const healthyAngleRad = (healthyPercentage / 100) * (2 * Math.PI);
                const healthyEndAngleRad = currentAngleRad + healthyAngleRad;
                const healthyPathData = this.createDonutSlice(healthCenterX, healthCenterY, healthInnerRadius, healthRadius, currentAngleRad, healthyEndAngleRad);
                const healthyTooltip = `Saludable: ${Math.round(healthyPercentage)}% (${healthyOnlyPlants} planta${healthyOnlyPlants !== 1 ? 's' : ''})`;
                healthyPathWithTooltip = `<path d="${healthyPathData}" fill="var(--accent-green)" data-tooltip="${healthyTooltip}" data-segment="healthy" style="cursor: pointer;" />`;
                healthyPath = healthyPathData;
                currentAngleRad = healthyEndAngleRad;
            }
            
            // Segmento amarillo: baby/esqueje
            let babyPathWithTooltip = '';
            if (babyOnlyPlants > 0) {
                const babyAngleRad = (babyPercentage / 100) * (2 * Math.PI);
                const babyEndAngleRad = currentAngleRad + babyAngleRad;
                const babyPathData = this.createDonutSlice(healthCenterX, healthCenterY, healthInnerRadius, healthRadius, currentAngleRad, babyEndAngleRad);
                const babyTooltip = `Baby/Esqueje: ${Math.round(babyPercentage)}% (${babyOnlyPlants} planta${babyOnlyPlants !== 1 ? 's' : ''})`;
                babyPathWithTooltip = `<path d="${babyPathData}" fill="rgba(255, 192, 203, 0.8)" data-tooltip="${babyTooltip}" data-segment="baby" style="cursor: pointer;" />`;
                babyPath = babyPathData;
                currentAngleRad = babyEndAngleRad;
            }
            
            // Segmento rojo: mala salud (no baby)
            let poorPathWithTooltip = '';
            if (poorHealthOnlyPlants > 0) {
                const poorAngleRad = (poorPercentage / 100) * (2 * Math.PI);
                const poorEndAngleRad = currentAngleRad + poorAngleRad;
                const poorPathData = this.createDonutSlice(healthCenterX, healthCenterY, healthInnerRadius, healthRadius, currentAngleRad, poorEndAngleRad);
                const poorTooltip = `Mala salud: ${Math.round(poorPercentage)}% (${poorHealthOnlyPlants} planta${poorHealthOnlyPlants !== 1 ? 's' : ''})`;
                poorPathWithTooltip = `<path d="${poorPathData}" fill="rgba(220, 53, 69, 0.8)" data-tooltip="${poorTooltip}" data-segment="poor" style="cursor: pointer;" />`;
                poorPath = poorPathData;
            }
            
            healthDonutSvg = `
                <svg width="${healthDonutSize}" height="${healthDonutSize}" viewBox="0 0 ${healthDonutSize} ${healthDonutSize}">
                    <circle cx="${healthCenterX}" cy="${healthCenterY}" r="${healthInnerRadius}" fill="#1a3a1a"/>
                    ${healthyPathWithTooltip}
                    ${babyPathWithTooltip}
                    ${poorPathWithTooltip}
                    <text x="${healthCenterX}" y="${healthCenterY + 4}" text-anchor="middle" 
                          fill="var(--text-light)" font-size="18" font-weight="700">${healthPercentage}%</text>
                </svg>
            `;
        }

        // Estadísticas de temperatura (calculadas en el loop anterior)
        // tempStats ya está calculado en el loop de plantas arriba

        // Estadísticas de luz - usar valores reales
        const sortedLightStats = Object.entries(lightStats)
            .filter(([light]) => light !== 'Sin especificar')
            .sort((a, b) => {
                // Ordenar por orden lógico: Sombra, Sombra Parcial, Luz Indirecta, Luz Directa, Luz Intensa
                const order = { 'Sombra': 1, 'Sombra Parcial': 2, 'Luz Indirecta': 3, 'Luz Directa': 4, 'Luz Intensa': 5 };
                return (order[a[0]] || 99) - (order[b[0]] || 99);
            });
        const totalLight = Object.values(lightStats).reduce((a, b) => a + b, 0);

        // Estadísticas de riego - calcular rangos reales de días
        const wateringRanges = {};
        plants.forEach(plant => {
            const spring = parseInt(plant.wateringSpring) || 0;
            const summer = parseInt(plant.wateringSummer) || 0;
            const autumn = parseInt(plant.wateringAutumn) || 0;
            const winter = parseInt(plant.wateringWinter) || 0;
            const avgDays = (spring + summer + autumn + winter) / 4;
            
            if (avgDays > 0) {
                let range;
                if (avgDays <= 3) {
                    range = '1-3 días';
                } else if (avgDays <= 7) {
                    range = '4-7 días';
                } else if (avgDays <= 14) {
                    range = '8-14 días';
                } else if (avgDays <= 21) {
                    range = '15-21 días';
                } else {
                    range = '22+ días';
                }
                wateringRanges[range] = (wateringRanges[range] || 0) + 1;
            }
        });
        const sortedWateringRanges = Object.entries(wateringRanges)
            .sort((a, b) => {
                // Ordenar por número de días (extrayendo el primer número)
                const numA = parseInt(a[0]) || 0;
                const numB = parseInt(b[0]) || 0;
                return numA - numB;
            });
        const totalWatering = Object.values(wateringRanges).reduce((a, b) => a + b, 0);

        // Estadísticas de temperatura - usar valores reales
        const sortedTempStats = Object.entries(tempStats)
            .filter(([temp]) => temp !== 'Sin especificar')
            .sort((a, b) => {
                // Ordenar por orden lógico: Muy Fría, Fría, Templada, Cálida, Caliente, Muy Caliente
                const order = { 'Muy Fría': 1, 'Fría': 2, 'Templada': 3, 'Cálida': 4, 'Caliente': 5, 'Muy Caliente': 6 };
                return (order[a[0]] || 99) - (order[b[0]] || 99);
            });
        const totalTemp = Object.values(tempStats).reduce((a, b) => a + b, 0);

        // Estadísticas de humedad - usar valores reales
        const sortedHumidityStats = Object.entries(humidityStats)
            .filter(([humidity]) => humidity !== 'Sin especificar')
            .sort((a, b) => {
                // Ordenar por orden lógico: BAJA, MEDIA, ALTA, MUY ALTA
                const order = { 'BAJA (<40%)': 1, 'MEDIA (40-60%)': 2, 'ALTA (60-80%)': 3, 'MUY ALTA (>80%)': 4 };
                return (order[a[0]] || 99) - (order[b[0]] || 99);
            });
        const totalHumidity = Object.values(humidityStats).reduce((a, b) => a + b, 0);

        dashboardContent.innerHTML = `
            <div class="dashboard-rows-container">
                <!-- Primera fila: 2 informes -->
                <div class="dashboard-row dashboard-row-2">
                    <!-- Donut de distribución por tipo -->
                    <div class="dashboard-panel dashboard-panel-horizontal">
                    <h3 class="dashboard-panel-title">Distribución por tipo</h3>
                    <div class="dashboard-horizontal-content">
                        <div class="dashboard-compact-legend">
                            ${sortedTypes.map(([type, count], index) => `
                                <div class="dashboard-compact-legend-item">
                                    <span class="dashboard-compact-color" style="background: ${colors[index]};"></span>
                                    <span>${this.escapeHtml(type)}: ${count} · ${Math.round((count / totalPlants) * 100)}%</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="dashboard-donut-wrapper">
                            ${typeDonutSvg}
                        </div>
                    </div>
                </div>
                
                <!-- Donut de salud -->
                <div class="dashboard-panel dashboard-panel-horizontal">
                    <h3 class="dashboard-panel-title">Estado de Salud</h3>
                    <div class="dashboard-horizontal-content">
                        <div class="dashboard-compact-legend">
                            <div class="dashboard-compact-legend-item" onclick="plantManager.filterByHealth('healthy')" style="cursor: pointer;">
                                <span class="dashboard-compact-color" style="background: var(--accent-green);"></span>
                                <span>Saludable: ${healthyPlants}</span>
                            </div>
                            <div class="dashboard-compact-legend-item" onclick="plantManager.filterByHealth('poor')" style="cursor: pointer;">
                                <span class="dashboard-compact-color" style="background: rgba(220, 53, 69, 0.8);"></span>
                                <span>Mala salud: ${poorHealth}</span>
                            </div>
                            <div class="dashboard-compact-legend-item" onclick="plantManager.filterPlantsByBaby(true)" style="cursor: pointer;">
                                <span class="dashboard-compact-color" style="background: rgba(255, 192, 203, 0.8);"></span>
                                <span>Baby/Esqueje: ${babyPlants}</span>
                            </div>
                        </div>
                        <div class="dashboard-donut-wrapper">
                            ${healthDonutSvg}
                        </div>
                    </div>
                    </div>
                </div>
                
                <!-- Segunda fila: 2 informes -->
                <div class="dashboard-row dashboard-row-2">
                    <!-- Estadísticas de Luz -->
                    <div class="dashboard-panel">
                    <h3 class="dashboard-panel-title">Luz</h3>
                    <div class="dashboard-progress-section">
                        ${sortedLightStats.length > 0 ? sortedLightStats.map(([light, count]) => `
                            <div class="dashboard-progress-item">
                                <span class="dashboard-progress-label">${this.escapeHtml(light)}</span>
                                <div class="dashboard-progress-bar">
                                    <div class="dashboard-progress-fill" style="width: ${totalLight > 0 ? (count / totalLight) * 100 : 0}%; background: rgba(255, 193, 7, 0.8);"></div>
                                </div>
                                <span class="dashboard-progress-value">${count} · ${totalLight > 0 ? Math.round((count / totalLight) * 100) : 0}%</span>
                            </div>
                        `).join('') : '<p style="color: var(--text-muted); text-align: center;">Sin datos</p>'}
                    </div>
                    </div>
                    
                    <!-- Estadísticas de Riego -->
                    <div class="dashboard-panel">
                    <h3 class="dashboard-panel-title">Riego</h3>
                    <div class="dashboard-progress-section">
                        ${sortedWateringRanges.length > 0 ? sortedWateringRanges.map(([range, count]) => `
                            <div class="dashboard-progress-item">
                                <span class="dashboard-progress-label">${this.escapeHtml(range)}</span>
                                <div class="dashboard-progress-bar">
                                    <div class="dashboard-progress-fill" style="width: ${totalWatering > 0 ? (count / totalWatering) * 100 : 0}%; background: var(--water-blue);"></div>
                                </div>
                                <span class="dashboard-progress-value">${count} · ${totalWatering > 0 ? Math.round((count / totalWatering) * 100) : 0}%</span>
                            </div>
                        `).join('') : '<p style="color: var(--text-muted); text-align: center;">Sin datos</p>'}
                    </div>
                    </div>
                </div>
                
                <!-- Tercera fila: 2 informes -->
                <div class="dashboard-row dashboard-row-2">
                    <!-- Estadísticas de Temperatura -->
                    <div class="dashboard-panel">
                    <h3 class="dashboard-panel-title">Temperatura</h3>
                    <div class="dashboard-progress-section">
                        ${sortedTempStats.length > 0 ? sortedTempStats.map(([temp, count]) => `
                            <div class="dashboard-progress-item">
                                <span class="dashboard-progress-label">${this.escapeHtml(temp)}</span>
                                <div class="dashboard-progress-bar">
                                    <div class="dashboard-progress-fill" style="width: ${totalTemp > 0 ? (count / totalTemp) * 100 : 0}%; background: #FF6B35;"></div>
                                </div>
                                <span class="dashboard-progress-value">${count} · ${totalTemp > 0 ? Math.round((count / totalTemp) * 100) : 0}%</span>
                            </div>
                        `).join('') : '<p style="color: var(--text-muted); text-align: center;">Sin datos</p>'}
                    </div>
                    </div>
                    
                    <!-- Estadísticas de Humedad -->
                    <div class="dashboard-panel">
                    <h3 class="dashboard-panel-title">Humedad</h3>
                    <div class="dashboard-progress-section">
                        ${sortedHumidityStats.length > 0 ? sortedHumidityStats.map(([humidity, count]) => `
                            <div class="dashboard-progress-item">
                                <span class="dashboard-progress-label">${this.escapeHtml(humidity)}</span>
                                <div class="dashboard-progress-bar">
                                    <div class="dashboard-progress-fill" style="width: ${totalHumidity > 0 ? (count / totalHumidity) * 100 : 0}%; background: var(--water-blue);"></div>
                                </div>
                                <span class="dashboard-progress-value">${count} · ${totalHumidity > 0 ? Math.round((count / totalHumidity) * 100) : 0}%</span>
                            </div>
                        `).join('') : '<p style="color: var(--text-muted); text-align: center;">Sin datos</p>'}
                    </div>
                    </div>
                </div>
            </div>
        `;
        
        // Añadir event listeners para filtrado interactivo
        setTimeout(() => {
            // Añadir tooltips a los paths del donut de tipo
            document.querySelectorAll('.dashboard-panel').forEach(panel => {
                const title = panel.querySelector('.dashboard-panel-title');
                if (title && title.textContent.includes('Distribución por tipo')) {
                    const svg = panel.querySelector('.dashboard-donut-wrapper svg');
                    if (svg) {
                        const paths = svg.querySelectorAll('path');
                        paths.forEach((path, index) => {
                            const tooltipText = path.getAttribute('data-tooltip');
                            if (tooltipText) {
                                path.addEventListener('mouseenter', (e) => {
                                    this.showDashboardTooltip(e, tooltipText);
                                });
                                path.addEventListener('mouseleave', () => {
                                    this.hideDashboardTooltip();
                                });
                                path.addEventListener('mousemove', (e) => {
                                    this.updateDashboardTooltipPosition(e);
                                });
                            }
                        });
                    }
                }
            });
            
            // Añadir tooltips a los paths del donut de salud
            document.querySelectorAll('.dashboard-panel').forEach(panel => {
                const title = panel.querySelector('.dashboard-panel-title');
                if (title && title.textContent.includes('Estado de Salud')) {
                    const svg = panel.querySelector('.dashboard-donut-wrapper svg');
                    if (svg) {
                        const paths = svg.querySelectorAll('path');
                        paths.forEach((path) => {
                            const tooltipText = path.getAttribute('data-tooltip');
                            if (tooltipText) {
                                path.addEventListener('mouseenter', (e) => {
                                    this.showDashboardTooltip(e, tooltipText);
                                });
                                path.addEventListener('mouseleave', () => {
                                    this.hideDashboardTooltip();
                                });
                                path.addEventListener('mousemove', (e) => {
                                    this.updateDashboardTooltipPosition(e);
                                });
                            }
                        });
                    }
                }
            });
            
            // Filtrado por tipo desde la leyenda del donut
            
            document.querySelectorAll('.dashboard-compact-legend-item').forEach((item, index) => {
                const panel = item.closest('.dashboard-panel');
                if (panel && panel.querySelector('.dashboard-panel-title').textContent.includes('tipo')) {
                    item.addEventListener('click', () => {
                        const text = item.textContent.trim();
                        const type = text.split(':')[0].trim();
                        this.filterByType(type);
                    });
                }
            });
            
            // Filtrado por luz
            document.querySelectorAll('.dashboard-progress-item').forEach(item => {
                const panel = item.closest('.dashboard-panel');
                if (panel && panel.querySelector('.dashboard-panel-title').textContent.includes('Luz')) {
                    const label = item.querySelector('.dashboard-progress-label').textContent.trim();
                    if (!label.includes('Promedio')) {
                        item.addEventListener('click', () => {
                            this.filterByLight(label);
                        });
                    }
                }
            });
            
            // Filtrado por riego
            document.querySelectorAll('.dashboard-progress-item').forEach(item => {
                const panel = item.closest('.dashboard-panel');
                if (panel && panel.querySelector('.dashboard-panel-title').textContent.includes('Riego')) {
                    const label = item.querySelector('.dashboard-progress-label').textContent.trim();
                    if (!label.includes('Promedio')) {
                        item.addEventListener('click', () => {
                            this.filterByWatering(label);
                        });
                    }
                }
            });
            
            // Filtrado por temperatura
            document.querySelectorAll('.dashboard-progress-item').forEach(item => {
                const panel = item.closest('.dashboard-panel');
                if (panel && panel.querySelector('.dashboard-panel-title').textContent.includes('Temperatura')) {
                    const label = item.querySelector('.dashboard-progress-label').textContent.trim();
                    if (!label.includes('Promedio')) {
                        item.addEventListener('click', () => {
                            this.filterByTemperature(label);
                        });
                    }
                }
            });
            
            // Filtrado por humedad
            document.querySelectorAll('.dashboard-progress-item').forEach(item => {
                const panel = item.closest('.dashboard-panel');
                if (panel && panel.querySelector('.dashboard-panel-title').textContent.includes('Humedad')) {
                    const label = item.querySelector('.dashboard-progress-label').textContent.trim();
                    if (!label.includes('Promedio')) {
                        item.addEventListener('click', () => {
                            this.filterByHumidity(label);
                        });
                    }
                }
            });
            
            // Los filtros de salud ahora se manejan con onclick inline en el HTML
        }, 100);
    }

    // Aplicar todos los filtros activos combinados
    applyActiveFilters() {
        let filtered = [...this.plants];
        
        // Aplicar cada filtro activo
        Object.keys(this.activeFilters).forEach(filterKey => {
            const filterValue = this.activeFilters[filterKey];
            
            switch(filterKey) {
                case 'type':
                    filtered = filtered.filter(plant => {
                        const plantType = plant.type || 'Sin tipo';
                        return plantType === filterValue || (filterValue === 'Sin tipo' && !plant.type);
                    });
                    break;
                case 'light':
                    filtered = filtered.filter(plant => {
                        const light = plant.light || '';
                        return light === filterValue;
                    });
                    break;
                case 'watering':
                    filtered = filtered.filter(plant => {
                        const spring = parseInt(plant.wateringSpring) || 0;
                        const summer = parseInt(plant.wateringSummer) || 0;
                        const autumn = parseInt(plant.wateringAutumn) || 0;
                        const winter = parseInt(plant.wateringWinter) || 0;
                        const avgDays = (spring + summer + autumn + winter) / 4;
                        if (avgDays === 0) return false;
                        if (filterValue === '1-3 días') return avgDays <= 3;
                        if (filterValue === '4-7 días') return avgDays > 3 && avgDays <= 7;
                        if (filterValue === '8-14 días') return avgDays > 7 && avgDays <= 14;
                        if (filterValue === '15-21 días') return avgDays > 14 && avgDays <= 21;
                        if (filterValue === '22+ días') return avgDays > 21;
                        return false;
                    });
                    break;
                case 'temperature':
                    filtered = filtered.filter(plant => {
                        const temp = plant.temperature || '';
                        return temp === filterValue;
                    });
                    break;
                case 'humidity':
                    filtered = filtered.filter(plant => {
                        const humidity = plant.humidity || '';
                        return humidity === filterValue;
                    });
                    break;
                case 'health':
                    filtered = filtered.filter(plant => {
                        const normalized = this.normalizePlantData(plant);
                        const isPoorHealth = normalized.poorHealth || false;
                        if (filterValue === 'healthy') return !isPoorHealth;
                        if (filterValue === 'poor') return isPoorHealth;
                        return false;
                    });
                    break;
                case 'baby':
                    filtered = filtered.filter(plant => {
                        const normalized = this.normalizePlantData(plant);
                        return normalized.baby === (filterValue === 'true');
                    });
                    break;
            }
        });
        
        // Aplicar búsqueda de texto si existe
        const searchInput = document.getElementById('searchInput');
        if (searchInput && searchInput.value.trim()) {
            const searchTerm = searchInput.value.trim().toLowerCase();
            filtered = filtered.filter(plant => {
                return plant.name.toLowerCase().includes(searchTerm) ||
                       plant.species.toLowerCase().includes(searchTerm) ||
                       (plant.variety && plant.variety.toLowerCase().includes(searchTerm)) ||
                       (plant.description && plant.description.toLowerCase().includes(searchTerm));
            });
        }
        
        this.renderPlants(filtered);
        this.renderActiveFiltersPills();
    }
    
    // Añadir/quitar filtro activo
    toggleFilter(filterKey, filterValue, filterLabel) {
        if (this.activeFilters[filterKey] === filterValue) {
            // Si ya está activo, quitarlo
            delete this.activeFilters[filterKey];
        } else {
            // Añadir o reemplazar el filtro
            this.activeFilters[filterKey] = filterValue;
        }
        
        this.applyActiveFilters();
    }
    
    // Quitar un filtro específico
    removeFilter(filterKey) {
        delete this.activeFilters[filterKey];
        this.applyActiveFilters();
    }
    
    // Renderizar pills de filtros activos
    renderActiveFiltersPills() {
        const container = document.getElementById('activeFiltersContainer');
        if (!container) return;
        
        const filterLabels = {
            'type': (v) => `Tipo: ${v}`,
            'light': (v) => `Luz: ${v}`,
            'watering': (v) => `Riego: ${v}`,
            'temperature': (v) => `Temp: ${v}`,
            'humidity': (v) => `Humedad: ${v}`,
            'health': (v) => v === 'healthy' ? 'Saludable' : 'Mala salud',
            'baby': (v) => v === 'true' ? 'Baby/Esqueje' : 'No baby'
        };
        
        if (Object.keys(this.activeFilters).length === 0) {
            container.innerHTML = '';
            return;
        }
        
        container.innerHTML = Object.keys(this.activeFilters).map(filterKey => {
            const filterValue = this.activeFilters[filterKey];
            const label = filterLabels[filterKey] ? filterLabels[filterKey](filterValue) : `${filterKey}: ${filterValue}`;
            // Clase CSS según el tipo de filtro para colorear
            let filterClass = `filter-pill-${filterKey}`;
            // Clase adicional para salud cuando es "poor"
            if (filterKey === 'health' && filterValue === 'poor') {
                filterClass += ' filter-pill-health-poor';
            }
            return `
                <div class="active-filter-pill ${filterClass}" data-filter-key="${filterKey}">
                    <span>${this.escapeHtml(label)}</span>
                    <button class="filter-pill-remove" onclick="plantManager.removeFilter('${filterKey}')" title="Quitar filtro">
                        <img src="img/icons/cancel.svg" alt="Quitar" class="filter-pill-icon">
                    </button>
                </div>
            `;
        }).join('');
    }
    
    // Toggle entre vista kanban y compacta
    toggleViewMode() {
        this.viewMode = this.viewMode === 'kanban' ? 'compact' : 'kanban';
        const container = document.getElementById('plantsContainer');
        const toggleBtn = document.getElementById('toggleViewModeBtn');
        
        if (container) {
            if (this.viewMode === 'compact') {
                container.classList.add('compact-view');
            } else {
                container.classList.remove('compact-view');
            }
        }
        
        // Actualizar título y texto del botón para indicar el modo actual
        if (toggleBtn) {
            toggleBtn.title = this.viewMode === 'compact' ? 'Cambiar a vista kanban' : 'Cambiar a vista compacta';
            const currentModeText = this.viewMode === 'compact' ? 'Compacta' : 'Kanban';
            const existingText = toggleBtn.querySelector('.view-mode-text');
            if (existingText) {
                existingText.textContent = currentModeText;
            }
        }
        
        // Re-renderizar para aplicar cambios
        this.renderPlants();
        this.showNotification(`Vista cambiada a: ${this.viewMode === 'compact' ? 'Compacta' : 'Kanban'}`, 'success');
    }

    filterByType(type) {
        this.toggleFilter('type', type, `Tipo: ${type}`);
    }

    filterByLight(lightLevel) {
        this.toggleFilter('light', lightLevel, `Luz: ${lightLevel}`);
    }

    filterByWatering(wateringRange) {
        this.toggleFilter('watering', wateringRange, `Riego: ${wateringRange}`);
    }

    filterByTemperature(temperatureLevel) {
        this.toggleFilter('temperature', temperatureLevel, `Temp: ${temperatureLevel}`);
    }

    filterByHumidity(humidityLevel) {
        this.toggleFilter('humidity', humidityLevel, `Humedad: ${humidityLevel}`);
    }

    filterByHealth(healthStatus) {
        this.toggleFilter('health', healthStatus, healthStatus === 'healthy' ? 'Saludable' : 'Mala salud');
    }

    renderPlants(plantsToRender = null) {
        let plants = plantsToRender || this.plants;
        
        // Ordenar plantas: primero por tipo, luego alfabéticamente por nombre
        plants = [...plants].sort((a, b) => {
            // Primero por tipo
            const typeA = (a.type || 'Sin tipo').toLowerCase();
            const typeB = (b.type || 'Sin tipo').toLowerCase();
            
            if (typeA !== typeB) {
                // Si uno es "Sin tipo", va al final
                if (typeA === 'sin tipo') return 1;
                if (typeB === 'sin tipo') return -1;
                // Ordenar alfabéticamente por tipo
                return typeA.localeCompare(typeB, 'es');
            }
            
            // Si tienen el mismo tipo, ordenar alfabéticamente por nombre
            const nameA = (a.name || '').toLowerCase();
            const nameB = (b.name || '').toLowerCase();
            return nameA.localeCompare(nameB, 'es');
        });
        
        this.renderDashboard(plants); // Actualizar dashboard con las plantas a mostrar
        const container = document.getElementById('plantsContainer');
        
        // Aplicar clase de vista según el modo
        if (container) {
            if (this.viewMode === 'compact') {
                container.classList.add('compact-view');
            } else {
                container.classList.remove('compact-view');
            }
        }
        
        // Renderizar pills de filtros activos
        this.renderActiveFiltersPills();

        // Si no hay plantas en la base de datos
        if (this.plants.length === 0) {
            container.innerHTML = `
                <div class="glass-panel" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <p style="font-size: 1.2rem; color: var(--text-muted);">
                        🌱 No hay plantas registradas aún. ¡Agrega tu primera planta!
                    </p>
                </div>
            `;
            return;
        }

        // Si hay plantas pero los filtros no encontraron coincidencias
        if (plants.length === 0) {
            container.innerHTML = `
                <div class="glass-panel" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <p style="font-size: 1.2rem; color: var(--text-muted);">
                        🔍 No se encontraron plantas que coincidan con los filtros aplicados.
                    </p>
                </div>
            `;
            return;
        }

        // Crear tarjetas según el modo de vista
        if (this.viewMode === 'compact') {
            container.innerHTML = plants.map(plant => this.createPlantCardCompact(plant)).join('');
        } else {
            container.innerHTML = plants.map(plant => this.createPlantCard(plant)).join('');
        }
        
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
                    <div style="display: flex; gap: 8px; align-items: center;">
                        ${plant.baby ? `
                            <div class="baby-indicator" title="Baby / Esqueje">
                                <img src="img/icons/pacifier.svg" alt="Baby/Esqueje" class="baby-icon">
                            </div>
                        ` : ''}
                        ${plant.poorHealth ? `
                            <div class="poor-health-indicator" title="Planta en mala salud">
                                <img src="img/icons/warning.svg" alt="Mala salud" class="poor-health-icon">
                            </div>
                        ` : ''}
                        ${this.needsWateringToday(plant) ? `
                            <div class="watering-due-indicator" title="Necesita riego hoy">
                                <img src="img/icons/water-drop.svg" alt="Riego debido" class="watering-due-icon">
                            </div>
                        ` : ''}
                        ${this.hasCustomRemindersDueToday(plant) ? `
                            <div class="custom-reminder-indicator" title="Tiene recordatorios personalizados para hoy">
                                <img src="img/icons/notification.svg" alt="Recordatorios" class="custom-reminder-icon">
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div class="plant-card-content">
                    <img src="${lastPhoto}" alt="${this.escapeHtml(plant.name)}" class="plant-card-image" 
                         onerror="if(this.src !== 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400') { plantManager.removeInvalidPhoto('${plant.id}', this.src).then(() => { this.src='https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'; }); } else { this.src='https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'; }">
                    <div class="plant-card-info">
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
            </div>
        `;
    }
    
    // Crear fila compacta de planta (vista lista)
    createPlantCardCompact(plant) {
        const normalizedPlant = this.normalizePlantData(plant);
        
        // Obtener última fecha de riego
        const wateringDates = normalizedPlant.wateringDates || [];
        const lastWateringDate = wateringDates.length > 0 ? wateringDates[0] : null;
        const daysSinceWatering = lastWateringDate ? this.daysSince(lastWateringDate) : null;
        
        const wateringStatus = !lastWateringDate 
            ? '<span class="watering-status needs-water">Sin registrar</span>'
            : daysSinceWatering >= 7
                ? `<span class="watering-status needs-water">Hace ${daysSinceWatering} días</span>`
                : `<span class="watering-status recent">Hace ${daysSinceWatering} días</span>`;

        // Obtener tipo de planta
        const plantType = plant.type || 'Sin tipo';
        
        // Obtener luz requerida
        const light = plant.light || 'Sin especificar';

        const iconsHtml = `
            ${plant.baby ? `
                <div class="baby-indicator" title="Baby / Esqueje">
                    <img src="img/icons/pacifier.svg" alt="Baby/Esqueje" class="baby-icon">
                </div>
            ` : ''}
            ${plant.poorHealth ? `
                <div class="poor-health-indicator" title="Planta en mala salud">
                    <img src="img/icons/warning.svg" alt="Mala salud" class="poor-health-icon">
                </div>
            ` : ''}
            ${this.needsWateringToday(plant) ? `
                <div class="watering-due-indicator" title="Necesita riego hoy">
                    <img src="img/icons/water-drop.svg" alt="Riego debido" class="watering-due-icon">
                </div>
            ` : ''}
            ${this.hasCustomRemindersDueToday(plant) ? `
                <div class="custom-reminder-indicator" title="Tiene recordatorios personalizados para hoy">
                    <img src="img/icons/notification.svg" alt="Recordatorios" class="custom-reminder-icon">
                </div>
            ` : ''}
        `;
        
        const buttonsHtml = `
            <button class="btn-action btn-water-action" data-water-id="${plant.id}" title="Regar">
                <img src="img/icons/water-drop.svg" alt="Regar" class="btn-action-icon">
            </button>
            <button class="btn-action btn-edit-action" data-edit-id="${plant.id}" title="Editar">
                <img src="img/icons/edit.svg" alt="Editar" class="btn-action-icon">
            </button>
            <button class="btn-action btn-delete-action" data-delete-id="${plant.id}" title="Eliminar">
                <img src="img/icons/delete.svg" alt="Eliminar" class="btn-action-icon">
            </button>
        `;

        return `
            <div class="plant-list-row" data-plant-id="${plant.id}">
                <!-- Vista PC: Todo en una fila horizontal -->
                <div class="plant-list-desktop">
                    <div class="plant-list-name-desktop">
                        <h3 class="plant-list-title">${this.escapeHtml(plant.name)}</h3>
                    </div>
                    <div class="plant-list-info-desktop">
                        <div class="plant-list-field">
                            <span class="plant-list-label">Tipo:</span>
                            <span class="plant-list-value">${this.escapeHtml(plantType)}</span>
                        </div>
                        <div class="plant-list-field">
                            <span class="plant-list-label">Luz:</span>
                            <span class="plant-list-value">${this.escapeHtml(light)}</span>
                        </div>
                    </div>
                    <div class="plant-list-actions-desktop">
                        ${buttonsHtml}
                    </div>
                    <div class="plant-list-icons-desktop">
                        ${iconsHtml}
                    </div>
                </div>
                
                <!-- Vista Móvil: 2 columnas + fila de iconos -->
                <div class="plant-list-mobile">
                    <div class="plant-list-main">
                        <div class="plant-list-col-left">
                            <div class="plant-list-name-only">
                                <h3 class="plant-list-title">${this.escapeHtml(plant.name)}</h3>
                            </div>
                            <div class="plant-list-actions">
                                ${buttonsHtml}
                            </div>
                        </div>
                        <div class="plant-list-col-right">
                            <div class="plant-list-field">
                                <span class="plant-list-label">Tipo:</span>
                                <span class="plant-list-value">${this.escapeHtml(plantType)}</span>
                            </div>
                            <div class="plant-list-field">
                                <span class="plant-list-label">Luz:</span>
                                <span class="plant-list-value">${this.escapeHtml(light)}</span>
                            </div>
                        </div>
                    </div>
                    <div class="plant-list-icons">
                        ${iconsHtml}
                    </div>
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
            this.renderReminders(); // Actualizar avisos después de regar
            this.showNotification('Riego registrado correctamente', 'success');
        }
    }

    async addWateringDate(plantId, dateStr) {
        const plant = this.plants.find(p => p.id === plantId);
        if (!plant) return;
        
        const normalizedPlant = this.normalizePlantData(plant);
        
        // Añadir la fecha si no existe ya
        if (!normalizedPlant.wateringDates.includes(dateStr)) {
            normalizedPlant.wateringDates.push(dateStr);
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
        
        // Actualizar el modal del calendario si está abierto
        const calendarModal = document.getElementById('wateringCalendarModal');
        if (calendarModal && !calendarModal.classList.contains('hidden')) {
            this.showWateringCalendarModal(plantId);
        }
        
        // Actualizar el modal de detalles si está abierto
        const plantModal = document.getElementById('plantModal');
        if (plantModal && !plantModal.classList.contains('hidden')) {
            this.showPlantDetails(plant);
        }
        
        this.renderPlants();
        this.renderReminders(); // Actualizar avisos
        this.showNotification('Riego añadido correctamente', 'success');
    }

    async deleteWateringDate(plantId, dateStr) {
        const plant = this.plants.find(p => p.id === plantId);
        if (!plant) return;
        
        const normalizedPlant = this.normalizePlantData(plant);
        
        // Eliminar la fecha del array
        normalizedPlant.wateringDates = normalizedPlant.wateringDates.filter(date => date !== dateStr);
        normalizedPlant.wateringDates.sort().reverse(); // Ordenar descendente
        
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
        
        // Actualizar el modal del calendario si está abierto
        const calendarModal = document.getElementById('wateringCalendarModal');
        if (calendarModal && !calendarModal.classList.contains('hidden')) {
            this.showWateringCalendarModal(plantId);
        }
        
        // Actualizar el modal de detalles si está abierto
        const plantModal = document.getElementById('plantModal');
        if (plantModal && !plantModal.classList.contains('hidden')) {
            this.showPlantDetails(plant);
        }
        
        this.renderPlants();
        this.renderReminders(); // Actualizar avisos
        this.showNotification('Riego eliminado correctamente', 'success');
    }

    editPlant(plant) {
        // Guardar la planta que estaba abierta antes de editar (pero NO cerrar el modal)
        const plantModal = document.getElementById('plantModal');
        if (plantModal && !plantModal.classList.contains('hidden')) {
            this.plantBeforeEdit = plant;
        } else {
            this.plantBeforeEdit = null;
        }
        // NO cerrar el modal de detalles - el formulario se abrirá encima
        this.openPlantFormModal(plant);
    }

    async deletePlant(plantId, skipConfirm = false) {
        // Mostrar confirmación si no se ha saltado
        if (!skipConfirm && !confirm('¿Estás seguro de que quieres eliminar esta planta?')) {
            return false; // Retornar false si se cancela
        }
        
        // Si skipConfirm es true, mostrar confirmación aquí (para el botón de la ficha de detalles)
        if (skipConfirm && !confirm('¿Estás seguro de que quieres eliminar esta planta?')) {
            return false; // Retornar false si se cancela
        }
        
        // IMPORTANTE: Primero obtener la referencia a la planta ANTES de eliminarla del array
        // para poder borrar las fotos de Firebase Storage
        const plant = this.plants.find(p => p.id === plantId);
        
        // Eliminar las fotos de Storage y el documento de Firestore (necesita la planta antes de eliminarla)
        await this.deletePlantFromStorage(plantId, plant);
        
        // Ahora sí, eliminar la planta del array
        this.plants = this.plants.filter(p => p.id !== plantId);
        await this.savePlants();
        this.renderPlants();
        this.renderReminders(); // Actualizar avisos después de eliminar
        this.showNotification('Planta eliminada', 'success');
        return true; // Retornar true si se eliminó correctamente
    }

    generateWateringCalendar(wateringDates, plantId) {
        // Mostrar calendario incluso si no hay riegos, para poder añadirlos
        const datesToShow = wateringDates || [];
        const plant = this.plants.find(p => p.id === plantId);
        
        // Calcular días de riego futuros (gotas verdes)
        const scheduledWateringDays = plant ? this.calculateWateringDays(plant, 180) : [];
        const scheduledWateringSet = new Set(scheduledWateringDays);

        const now = new Date();
        const wateringDatesSet = new Set((datesToShow || []).map(date => {
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
                const isScheduled = scheduledWateringSet.has(dateStr) && !isWatered; // Solo mostrar si no está regado
                const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
                
                calendarHtml += `
                    <div class="calendar-day-small-wrapper" style="position: relative;">
                        <div class="calendar-day-small ${isWatered ? 'watered' : ''} ${isScheduled ? 'scheduled-watering' : ''} ${isToday ? 'today' : ''} ${!isWatered && !isScheduled ? 'add-watering' : ''}" 
                             title="${isWatered ? dateStr + ' - Regado' : isScheduled ? dateStr + ' - Día programado para regar' : dateStr + ' - Click para añadir riego'}"
                             ${!isWatered && !isScheduled ? `onclick="plantManager.addWateringDate('${plantId}', '${dateStr}')" style="cursor: pointer;"` : ''}>
                            ${isWatered ? '<img src="img/icons/water-drop.svg" alt="Riego" class="watering-icon-small">' : ''}
                            ${isScheduled ? '<img src="img/icons/water-drop.svg" alt="Riego programado" class="watering-icon-small scheduled-icon">' : ''}
                            <span class="day-number-small">${day}</span>
                        </div>
                        ${isWatered ? `
                            <button class="calendar-delete-watering-btn" onclick="event.stopPropagation(); plantManager.deleteWateringDate('${plantId}', '${dateStr}')" title="Eliminar riego">
                                <img src="img/icons/delete.svg" alt="Eliminar" class="calendar-delete-icon">
                            </button>
                        ` : ''}
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
                            <img src="img/icons/water-drop.svg" alt="Calendario" class="label-icon" style="width: 24px; height: 24px;"> Calendario de riego
                        </h2>
                        <div id="wateringCalendarModalBody"></div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        }
        
        const newModal = document.getElementById('wateringCalendarModal');
        const newModalBody = document.getElementById('wateringCalendarModalBody');
        
        // Siempre mostrar el calendario, incluso si no hay riegos (para poder añadirlos)
        newModalBody.innerHTML = this.generateWateringCalendar(wateringDates, plantId);
        
        newModal.classList.remove('hidden');
        
        // Cerrar al hacer clic fuera (solo en escritorio, no en móviles)
        if (!this.isMobileDevice()) {
            let mouseDownOnBackground = false;
            newModal.addEventListener('mousedown', (e) => {
                mouseDownOnBackground = (e.target.id === 'wateringCalendarModal');
            });
            newModal.addEventListener('mouseup', (e) => {
                if (mouseDownOnBackground && e.target.id === 'wateringCalendarModal') {
                    newModal.classList.add('hidden');
                }
                mouseDownOnBackground = false;
            });
        }
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
            
            // Cerrar al hacer clic fuera o con ESC (solo en escritorio, no en móviles)
            if (!this.isMobileDevice()) {
                let mouseDownOnBackground = false;
                lightbox.addEventListener('mousedown', (e) => {
                    mouseDownOnBackground = (e.target.id === 'photoLightboxModal' || e.target.classList.contains('lightbox-image'));
                });
                lightbox.addEventListener('mouseup', (e) => {
                    if (mouseDownOnBackground && (e.target.id === 'photoLightboxModal' || e.target.classList.contains('lightbox-image'))) {
                        lightbox.classList.add('hidden');
                    }
                    mouseDownOnBackground = false;
                });
            }
            
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

    // Navegar a la siguiente planta
    navigateToNextPlant(currentPlantId) {
        const currentIndex = this.plants.findIndex(p => p.id === currentPlantId);
        if (currentIndex === -1) return;
        
        const nextIndex = (currentIndex + 1) % this.plants.length;
        const nextPlant = this.plants[nextIndex];
        if (nextPlant) {
            this.showPlantDetails(nextPlant);
        }
    }

    // Navegar a la planta anterior
    navigateToPreviousPlant(currentPlantId) {
        const currentIndex = this.plants.findIndex(p => p.id === currentPlantId);
        if (currentIndex === -1) return;
        
        const prevIndex = currentIndex === 0 ? this.plants.length - 1 : currentIndex - 1;
        const prevPlant = this.plants[prevIndex];
        if (prevPlant) {
            this.showPlantDetails(prevPlant);
        }
    }

    showPlantDetails(plant) {
        const modal = document.getElementById('plantModal');
        const modalBody = document.getElementById('modalBody');
        const normalizedPlant = this.normalizePlantData(plant);
        const photos = normalizedPlant.photos || [];
        const lastPhoto = photos.length > 0 ? photos[photos.length - 1] : 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800';
        const wateringDates = normalizedPlant.wateringDates || [];
        const lastWateringDate = wateringDates.length > 0 ? wateringDates[0] : null;
        
        // Obtener índices para navegación
        const currentIndex = this.plants.findIndex(p => p.id === plant.id);
        const hasNext = currentIndex !== -1 && currentIndex < this.plants.length - 1;
        const hasPrev = currentIndex !== -1 && currentIndex > 0;
        
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
                                <img src="img/icons/edit.svg" alt="Editar" class="comment-btn-icon">
                            </button>
                            <button class="comment-btn delete-comment-btn" onclick="plantManager.deleteComment('${plant.id}', '${commentId}')" title="Eliminar">
                                <img src="img/icons/delete.svg" alt="Eliminar" class="comment-btn-icon">
                            </button>
                        </div>
                    </div>
                    <div class="comment-text" id="comment-text-${commentId}">${this.escapeHtml(comment.text)}</div>
                    ${comment.photos && comment.photos.length > 0 ? `
                        <div class="comment-photos">
                            ${comment.photos.map((photo, photoIndex) => `
                                <div class="comment-photo-wrapper">
                                    <img src="${photo}" alt="Foto del comentario" class="comment-photo" onclick="plantManager.openCommentPhotoLightbox('${plant.id}', '${commentId}', ${photoIndex})" 
                                         onerror="this.style.display='none';">
                                    <button class="comment-photo-delete-btn" onclick="event.stopPropagation(); plantManager.deleteCommentPhoto('${plant.id}', '${commentId}', ${photoIndex})" title="Eliminar foto">
                                        <img src="img/icons/delete.svg" alt="Eliminar" class="comment-photo-delete-icon">
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    <div class="comment-edit-form hidden" id="comment-edit-${commentId}">
                        <textarea class="comment-edit-textarea" id="comment-edit-text-${commentId}">${this.escapeHtml(comment.text)}</textarea>
                        <div id="comment-edit-photos-${commentId}" class="comment-edit-photos" style="margin-top: 10px; margin-bottom: 10px;">
                            ${comment.photos && comment.photos.length > 0 ? `
                                <div class="comment-photos-edit-label" style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 8px; font-weight: 500;">Fotos actuales:</div>
                                <div class="comment-photos-edit-list" style="display: flex; flex-wrap: wrap; gap: 10px;">
                                    ${comment.photos.map((photo, photoIndex) => `
                                        <div class="comment-photo-edit-wrapper" data-photo-index="${photoIndex}" style="position: relative; width: 80px; height: 80px; border-radius: 8px; overflow: hidden; border: 2px solid rgba(255, 255, 255, 0.3);">
                                            <img src="${photo}" alt="Foto" style="width: 100%; height: 100%; object-fit: cover;">
                                            <button class="comment-photo-edit-delete" onclick="plantManager.removeCommentPhotoFromEdit('${commentId}', ${photoIndex})" title="Eliminar foto" style="position: absolute; top: 2px; right: 2px; background: rgba(220, 53, 69, 0.9); border: 1px solid rgba(255, 255, 255, 0.9); border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0;">
                                                <img src="img/icons/delete.svg" alt="Eliminar" style="width: 14px; height: 14px; filter: brightness(0) invert(1);">
                                            </button>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                        <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
                            <label for="commentEditPhotoInput-${commentId}" class="btn-secondary btn-small" style="cursor: pointer; margin: 0; display: inline-flex; align-items: center; gap: 6px;">
                                <img src="img/icons/photo.svg" alt="Foto" class="btn-icon" style="width: 16px; height: 16px;"> Añadir Foto
                            </label>
                            <input type="file" id="commentEditPhotoInput-${commentId}" accept="image/*" multiple style="display: none;">
                            <small style="color: var(--text-muted); flex: 1;">Puedes añadir más fotos</small>
                        </div>
                        <div id="comment-edit-photos-preview-${commentId}" class="comment-photos-preview" style="display: none; margin-bottom: 10px;"></div>
                        <div class="comment-edit-actions">
                            <button class="btn-primary btn-small" onclick="plantManager.saveComment('${plant.id}', '${commentId}')" title="Guardar">
                                <img src="img/icons/save.svg" alt="Guardar" class="btn-icon"> Guardar
                            </button>
                            <button class="btn-secondary btn-small" onclick="plantManager.cancelEditComment('${plant.id}', '${commentId}')" title="Cancelar">
                                <img src="img/icons/cancel.svg" alt="Cancelar" class="btn-icon"> Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            `;
            }).join('')
            : '<p style="color: var(--text-muted);">No hay comentarios aún.</p>';

        const currentPhotoIndex = this.modalPhotoIndex[plant.id] !== undefined ? this.modalPhotoIndex[plant.id] : photos.length - 1;
        
        const photoCarouselHtml = photos.length > 1 ? `
            <div class="photo-carousel-modal">
                <div class="carousel-main-photo">
                    <img src="${photos[currentPhotoIndex]}" alt="${this.escapeHtml(plant.name)}" class="modal-image carousel-main-img" id="modalMainPhoto-${plant.id}" onclick="plantManager.openPhotoLightbox('${plant.id}', ${currentPhotoIndex})" style="cursor: pointer;"
                         onerror="if(this.src !== 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800') { plantManager.removeInvalidPhoto('${plant.id}', this.src).then(() => { this.src='https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'; }); } else { this.src='https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'; }">
                    <button class="carousel-delete-btn" onclick="event.stopPropagation(); plantManager.deletePhoto('${plant.id}', '${photos[currentPhotoIndex]}', ${currentPhotoIndex})" title="Eliminar foto">
                        <img src="img/icons/delete.svg" alt="Eliminar" class="carousel-delete-icon">
                    </button>
                    <button class="carousel-nav prev" onclick="event.stopPropagation(); plantManager.changeModalPhoto('${plant.id}', 'prev')">‹</button>
                    <button class="carousel-nav next" onclick="event.stopPropagation(); plantManager.changeModalPhoto('${plant.id}', 'next')">›</button>
                </div>
                <div class="carousel-thumbnails">
                    ${photos.map((photo, index) => `
                        <div class="carousel-thumb-wrapper">
                            <img src="${photo}" alt="Foto ${index + 1}" class="carousel-thumb ${index === currentPhotoIndex ? 'active' : ''}" 
                                 onclick="plantManager.selectModalPhoto('${plant.id}', ${index})" data-index="${index}"
                                 onerror="if(this.src !== 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800') { plantManager.removeInvalidPhoto('${plant.id}', this.src); this.style.display='none'; }">
                            <button class="carousel-thumb-delete-btn" onclick="event.stopPropagation(); plantManager.deletePhoto('${plant.id}', '${photo}', ${index})" title="Eliminar foto">
                                <img src="img/icons/delete.svg" alt="Eliminar" class="carousel-thumb-delete-icon">
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : `
            <div class="photo-carousel-modal">
                <div class="carousel-main-photo">
                    <img src="${lastPhoto}" alt="${this.escapeHtml(plant.name)}" class="modal-image carousel-main-img" onclick="plantManager.openPhotoLightbox('${plant.id}', 0)" style="cursor: pointer;"
                         onerror="if(this.src !== 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800') { plantManager.removeInvalidPhoto('${plant.id}', this.src).then(() => { this.src='https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'; }); } else { this.src='https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'; }">
                    <button class="carousel-delete-btn" onclick="event.stopPropagation(); plantManager.deletePhoto('${plant.id}', '${lastPhoto}', 0)" title="Eliminar foto">
                        <img src="img/icons/delete.svg" alt="Eliminar" class="carousel-delete-icon">
                    </button>
                </div>
            </div>
        `;

        // Añadir estado al historial si es móvil
        if (this.isMobileDevice()) {
            history.pushState({ modal: 'plantDetails', plantId: plant.id }, '', window.location.href);
        }
        
        modalBody.innerHTML = `
            <div class="modal-body">
                ${photoCarouselHtml}
                <div style="margin-top: 15px;">
                    <button class="btn-secondary btn-small" onclick="plantManager.addPhotoToPlant('${plant.id}')">
                        <img src="img/icons/photo.svg" alt="Foto" class="btn-icon"> Añadir Foto Nueva
                    </button>
                </div>
                
                <div class="modal-section">
                    ${this.plants.length > 1 ? `
                        <div class="plant-navigation" style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px; margin-bottom: 15px; gap: 10px;">
                            <button class="btn-action plant-nav-btn" ${!hasPrev ? 'disabled style="opacity: 0.3; cursor: not-allowed;"' : ''} onclick="plantManager.navigateToPreviousPlant('${plant.id}')" title="Planta anterior">
                                <img src="img/icons/minus.svg" alt="Anterior" class="btn-action-icon" style="transform: rotate(90deg);">
                            </button>
                            <span style="color: var(--text-muted); font-size: 0.9rem;">${currentIndex + 1} / ${this.plants.length}</span>
                            <button class="btn-action plant-nav-btn" ${!hasNext ? 'disabled style="opacity: 0.3; cursor: not-allowed;"' : ''} onclick="plantManager.navigateToNextPlant('${plant.id}')" title="Siguiente planta">
                                <img src="img/icons/plus.svg" alt="Siguiente" class="btn-action-icon" style="transform: rotate(90deg);">
                            </button>
                        </div>
                    ` : ''}
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

                ${plant.poorHealth ? `
                    <div class="modal-section poor-health-section">
                        <div class="info-item">
                            <span class="info-label"><img src="img/icons/warning.svg" alt="Advertencia" class="info-icon"> Estado de Salud:</span>
                            <span class="info-value poor-health-badge">⚠️ Planta en mala salud</span>
                        </div>
                    </div>
                ` : ''}

                ${plant.diseases && plant.diseases.length > 0 ? `
                    <div class="modal-section diseases-section">
                        <div class="info-item diseases-info-item">
                            <span class="info-label diseases-label"><img src="img/icons/virus.svg" alt="Enfermedades" class="info-icon"> Enfermedades/Plagas:</span>
                            <div class="diseases-pills">
                                ${plant.diseases.map(disease => `
                                    <span class="disease-pill clickable-pill" onclick="plantManager.showSolution('${this.escapeHtml(disease)}')" title="Click para ver solución">${this.escapeHtml(disease)}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                ` : ''}

                ${plant.plantStates && plant.plantStates.length > 0 ? `
                    <div class="modal-section diseases-section">
                        <div class="info-item diseases-info-item">
                            <span class="info-label diseases-label"><img src="img/icons/sad.svg" alt="Estado" class="info-icon"> Estado de la Planta / Síntomas:</span>
                            <div class="diseases-pills">
                                ${plant.plantStates.map(state => `
                                    <span class="disease-pill clickable-pill" onclick="plantManager.showSolution('${this.escapeHtml(state)}')" title="Click para ver solución">${this.escapeHtml(state)}</span>
                                `).join('')}
                            </div>
                        </div>
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
                    ${plant.type ? `
                        <div class="info-item">
                            <span class="info-label"><img src="img/icons/plant-type.svg" alt="Tipo" class="info-icon"> Tipo de Planta:</span>
                            <span class="info-value">${this.escapeHtml(plant.type)}</span>
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
                            <strong style="color: var(--light-green); display: block; margin-bottom: 10px;">Frecuencia de Riego por Estación (días):</strong>
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

                <div class="modal-section custom-reminders-details-section">
                    <h3 style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                        <img src="img/icons/notification.svg" alt="Recordatorios" class="label-icon" style="width: 24px; height: 24px;">
                        Recordatorios Personalizados
                    </h3>
                    <div id="customRemindersDetailsList-${plant.id}" class="custom-reminders-details-list">
                        ${plant.customReminders && plant.customReminders.length > 0 ? plant.customReminders.map((reminder, index) => {
                            const today = new Date().toISOString().split('T')[0];
                            const todayDate = new Date(today + 'T00:00:00');
                            const isDue = reminder.nextDue === today;
                            const isOverdue = reminder.nextDue && new Date(reminder.nextDue + 'T00:00:00') < todayDate;
                            const nextDueDate = reminder.nextDue ? new Date(reminder.nextDue + 'T00:00:00') : null;
                            const formattedDate = nextDueDate ? this.formatDate(reminder.nextDue) : 'No programado';
                            const daysOverdue = isOverdue ? Math.floor((todayDate - nextDueDate) / (1000 * 60 * 60 * 24)) : 0;
                            
                            return `
                                <div class="custom-reminder-detail-item ${isDue ? 'due-today' : ''} ${isOverdue ? 'overdue' : ''}" data-reminder-id="${reminder.id}">
                                    <div class="custom-reminder-detail-content">
                                        <div class="custom-reminder-detail-header">
                                            <span class="custom-reminder-action-name ${isOverdue ? 'overdue-name' : ''}">${this.escapeHtml(reminder.action)}</span>
                                            <span class="custom-reminder-frequency-badge">Cada ${reminder.frequency} días</span>
                                        </div>
                                        <div class="custom-reminder-detail-info">
                                            ${reminder.lastCompleted ? `
                                                <span class="custom-reminder-last-completed">Último: ${this.formatDate(reminder.lastCompleted)}</span>
                                            ` : ''}
                                            <span class="custom-reminder-next-due ${isDue ? 'due-today-badge' : ''} ${isOverdue ? 'overdue-badge' : ''}">
                                                ${isDue ? '🔔 Vence hoy' : isOverdue ? `⚠️ Vencido hace ${daysOverdue} ${daysOverdue === 1 ? 'día' : 'días'}` : `Próximo: ${formattedDate}`}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="custom-reminder-detail-actions">
                                        ${isDue || isOverdue ? `
                                            <button class="btn-action btn-small ${isOverdue ? 'overdue-action-btn' : ''}" onclick="plantManager.completeCustomReminder('${plant.id}', '${reminder.id}')" title="Marcar como completado">
                                                <img src="img/icons/ok.svg" alt="Completar" class="btn-action-icon">
                                            </button>
                                        ` : ''}
                                        <button class="btn-action btn-edit-action btn-small" onclick="plantManager.editCustomReminder('${plant.id}', '${reminder.id}')" title="Editar recordatorio">
                                            <img src="img/icons/edit.svg" alt="Editar" class="btn-action-icon">
                                        </button>
                                        <button class="btn-action btn-delete-action btn-small" onclick="plantManager.deleteCustomReminder('${plant.id}', '${reminder.id}')" title="Eliminar recordatorio">
                                            <img src="img/icons/delete.svg" alt="Eliminar" class="btn-action-icon">
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('') : '<p style="color: var(--text-muted); margin-bottom: 15px;">No hay recordatorios personalizados.</p>'}
                    </div>
                    <div class="custom-reminder-add-form" id="customReminderAddForm-${plant.id}" style="display: none; margin-top: 15px; padding: 15px; background: rgba(10, 31, 10, 0.3); border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1);">
                        <div class="form-group" style="margin-bottom: 12px;">
                            <label style="display: block; margin-bottom: 6px; color: var(--text-light); font-weight: 500;">Acción</label>
                            <select id="newReminderAction-${plant.id}" class="custom-reminder-action-select" style="width: 100%; padding: 10px; border: 1px solid rgba(255, 255, 255, 0.8); border-radius: 6px; background: rgba(10, 31, 10, 0.7); color: var(--text-light); font-size: 0.9rem;">
                                <option value="">Seleccionar...</option>
                                <option value="Cambiar sustrato">Cambiar sustrato</option>
                                <option value="Añadir abono">Añadir abono</option>
                                <option value="Podar">Podar</option>
                                <option value="Limpiar hojas">Limpiar hojas</option>
                                <option value="Rotar maceta">Rotar maceta</option>
                                <option value="Trasplantar">Trasplantar</option>
                                <option value="Fertilizar">Fertilizar</option>
                                <option value="Revisar raíces">Revisar raíces</option>
                                <option value="Aplicar tratamiento">Aplicar tratamiento</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div class="form-group" style="margin-bottom: 12px;">
                            <label style="display: block; margin-bottom: 6px; color: var(--text-light); font-weight: 500;">Frecuencia (días)</label>
                            <input type="number" id="newReminderFrequency-${plant.id}" class="custom-reminder-frequency-input" min="0" placeholder="Ej: 30 (0 para probar)" style="width: 100%; padding: 10px; border: 1px solid rgba(255, 255, 255, 0.8); border-radius: 6px; background: rgba(10, 31, 10, 0.7); color: var(--text-light); font-size: 0.9rem;">
                        </div>
                        <div style="display: flex; gap: 10px; justify-content: flex-end;">
                            <button class="btn-secondary btn-small" onclick="plantManager.cancelAddCustomReminder('${plant.id}')">
                                <img src="img/icons/cancel.svg" alt="Cancelar" class="btn-icon"> Cancelar
                            </button>
                            <button class="btn-primary btn-small" onclick="plantManager.saveNewCustomReminder('${plant.id}')">
                                <img src="img/icons/save.svg" alt="Guardar" class="btn-icon"> Guardar
                            </button>
                        </div>
                    </div>
                    <button class="btn-secondary btn-small" onclick="plantManager.showAddCustomReminderForm('${plant.id}')" id="showAddReminderBtn-${plant.id}" style="margin-top: 10px;">
                        <img src="img/icons/plus.svg" alt="Añadir" class="btn-icon"> Añadir Recordatorio
                    </button>
                </div>

                <div class="modal-section comments-section">
                    <h3>Comentarios</h3>
                    <div id="commentsList">
                        ${commentsHtml}
                    </div>
                    <div class="comment-form">
                        <div id="newCommentContainer" class="hidden">
                            <textarea id="newComment" rows="3" placeholder="Agregar un comentario sobre esta planta..." style="margin-bottom: 10px;"></textarea>
                            <div id="commentPhotosPreview" class="comment-photos-preview" style="display: none; margin-bottom: 10px;"></div>
                            <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
                                <label for="commentPhotoInput" class="btn-secondary btn-small" style="cursor: pointer; margin: 0; display: inline-flex; align-items: center; gap: 6px;">
                                    <img src="img/icons/photo.svg" alt="Foto" class="btn-icon" style="width: 16px; height: 16px;"> Añadir Foto
                                </label>
                                <input type="file" id="commentPhotoInput" accept="image/*" multiple style="display: none;">
                                <small style="color: var(--text-muted); flex: 1;">Puedes añadir múltiples fotos</small>
                            </div>
                            <div style="display: flex; justify-content: flex-end; margin-top: 0;">
                                <button class="btn-save-comment" onclick="plantManager.addComment('${plant.id}')" title="Guardar Comentario">
                                    <img src="img/icons/save.svg" alt="Guardar" class="btn-save-comment-icon"> Guardar
                                </button>
                            </div>
                        </div>
                        <div class="plant-card-actions" style="margin-top: 10px;">
                            ${wateringDates.length > 0 ? `
                                <button class="btn-action btn-water-action" onclick="plantManager.showWateringCalendarModal('${plant.id}')" title="Calendario de riego">
                                    <img src="img/icons/water-drop.svg" alt="Calendario" class="btn-action-icon"> Calendario de riego
                                </button>
                            ` : ''}
                            <button class="btn-action" onclick="plantManager.showCommentForm('${plant.id}')" title="Agregar Comentario">
                                <img src="img/icons/comment.svg" alt="Comentario" class="btn-action-icon"> Agregar Comentario
                            </button>
                        </div>
                    </div>
                </div>
                </div>

                <div class="plant-card-actions" style="margin-top: 25px; justify-content: center;">
                    <button class="btn-action btn-water-action" onclick="(async () => { await plantManager.updateWatering('${plant.id}'); plantManager.closeModal(); })();" title="Registrar Riego">
                        <img src="img/icons/water-drop.svg" alt="Regar" class="btn-action-icon">
                    </button>
                    <button class="btn-action btn-edit-action" onclick="plantManager.editPlant(plantManager.plants.find(p => p.id === '${plant.id}'));" title="Editar">
                        <img src="img/icons/edit.svg" alt="Editar" class="btn-action-icon">
                    </button>
                    <button class="btn-action btn-delete-action" onclick="(async () => { const deleted = await plantManager.deletePlant('${plant.id}', true); if(deleted) { plantManager.closeModal(); } })();" title="Eliminar">
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

    // Extraer el path del archivo desde una URL de Firebase Storage

    async deletePhoto(plantId, photoUrl, photoIndex) {
        if (!confirm('¿Estás seguro de que quieres eliminar esta foto?')) {
            return;
        }

        const plant = this.plants.find(p => p.id === plantId);
        if (!plant) return;

        try {
            const normalizedPlant = this.normalizePlantData(plant);
            const photos = normalizedPlant.photos || [];

            // Si hay fotos en Firebase Storage, intentar borrarlas primero
            if (this.useFirebase && this.storage) {
                try {
                    // Usar refFromURL para obtener la referencia directamente desde la URL
                    const imageRef = this.storage.refFromURL(photoUrl);
                    await imageRef.delete();
                    console.log('✅ Foto eliminada de Firebase Storage:', photoUrl);
                } catch (error) {
                    console.warn('⚠️ No se pudo eliminar la foto de Storage (puede que ya no exista o no sea de Firebase):', error);
                    // Continuar aunque falle el borrado de Storage (puede ser una URL externa)
                }
            }

            // Eliminar la foto del array
            const updatedPhotos = photos.filter((photo, index) => index !== photoIndex);

            // Actualizar la planta
            normalizedPlant.photos = updatedPhotos;
            const index = this.plants.findIndex(p => p.id === plantId);
            if (index !== -1) {
                this.plants[index] = normalizedPlant;
            }

            // Guardar en Firebase/LocalStorage
            await this.savePlantToFirebase(normalizedPlant);
            
            // Si no quedan fotos, usar la imagen por defecto
            if (updatedPhotos.length === 0) {
                normalizedPlant.photos = [];
                // Limpiar el índice del carousel
                delete this.modalPhotoIndex[plantId];
            } else {
                // Ajustar el índice del carousel si es necesario
                const currentIndex = this.modalPhotoIndex[plantId] !== undefined ? this.modalPhotoIndex[plantId] : photos.length - 1;
                if (photoIndex <= currentIndex) {
                    // Si se borró una foto antes o igual a la actual, ajustar el índice
                    let newIndex = currentIndex - 1;
                    if (newIndex < 0) newIndex = 0;
                    if (newIndex >= updatedPhotos.length) newIndex = updatedPhotos.length - 1;
                    this.modalPhotoIndex[plantId] = newIndex;
                } else {
                    // Si se borró una foto después de la actual, mantener el índice
                    if (this.modalPhotoIndex[plantId] >= updatedPhotos.length) {
                        this.modalPhotoIndex[plantId] = updatedPhotos.length - 1;
                    }
                }
            }

            // Refrescar la vista
            this.showPlantDetails(normalizedPlant);
            this.showNotification('Foto eliminada correctamente', 'success');
        } catch (error) {
            console.error('Error eliminando foto:', error);
            this.showNotification('Error eliminando foto', 'error');
        }
    }

    showCommentForm(plantId) {
        const container = document.getElementById('newCommentContainer');
        if (container) {
            // Toggle: si está visible, ocultarlo; si está oculto, mostrarlo
            if (container.classList.contains('hidden')) {
                container.classList.remove('hidden');
                const textarea = document.getElementById('newComment');
                if (textarea) {
                    textarea.focus();
                }
                
                // Configurar el input de fotos para comentarios
                const commentPhotoInput = document.getElementById('commentPhotoInput');
                if (commentPhotoInput) {
                    commentPhotoInput.onchange = (e) => this.handleCommentPhotosSelect(e);
                }
            } else {
                container.classList.add('hidden');
                // Limpiar el textarea y las fotos al ocultar
                const textarea = document.getElementById('newComment');
                if (textarea) {
                    textarea.value = '';
                }
                this.clearCommentPhotosPreview();
            }
        }
    }
    
    handleCommentPhotosSelect(event) {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;
        
        const previewContainer = document.getElementById('commentPhotosPreview');
        if (!previewContainer) return;
        
        previewContainer.innerHTML = '';
        previewContainer.style.display = 'flex';
        previewContainer.style.flexWrap = 'wrap';
        previewContainer.style.gap = '10px';
        
        files.forEach((file, index) => {
            if (!file.type.startsWith('image/')) {
                this.showNotification('Solo se permiten archivos de imagen', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const photoWrapper = document.createElement('div');
                photoWrapper.className = 'comment-photo-preview-wrapper';
                photoWrapper.style.cssText = `
                    position: relative;
                    width: 80px;
                    height: 80px;
                    border-radius: 8px;
                    overflow: hidden;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                `;
                
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'comment-photo-preview-delete';
                deleteBtn.style.cssText = `
                    position: absolute;
                    top: 2px;
                    right: 2px;
                    background: rgba(220, 53, 69, 0.9);
                    border: 1px solid rgba(255, 255, 255, 0.9);
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    padding: 0;
                `;
                deleteBtn.onclick = () => {
                    photoWrapper.remove();
                    // Actualizar el input file
                    const input = document.getElementById('commentPhotoInput');
                    if (input) {
                        const dt = new DataTransfer();
                        Array.from(input.files).forEach((f, i) => {
                            if (i !== index) dt.items.add(f);
                        });
                        input.files = dt.files;
                    }
                    // Si no quedan fotos, ocultar el contenedor
                    if (previewContainer.children.length === 0) {
                        previewContainer.style.display = 'none';
                    }
                };
                
                const deleteIcon = document.createElement('img');
                deleteIcon.src = 'img/icons/delete.svg';
                deleteIcon.style.cssText = 'width: 14px; height: 14px; filter: brightness(0) invert(1);';
                deleteBtn.appendChild(deleteIcon);
                
                photoWrapper.appendChild(img);
                photoWrapper.appendChild(deleteBtn);
                previewContainer.appendChild(photoWrapper);
            };
            reader.readAsDataURL(file);
        });
    }
    
    clearCommentPhotosPreview() {
        const previewContainer = document.getElementById('commentPhotosPreview');
        if (previewContainer) {
            previewContainer.innerHTML = '';
            previewContainer.style.display = 'none';
        }
        const input = document.getElementById('commentPhotoInput');
        if (input) {
            input.value = '';
        }
    }

    async addComment(plantId) {
        const commentText = document.getElementById('newComment').value.trim();
        const commentPhotoInput = document.getElementById('commentPhotoInput');
        
        // Permitir comentario sin texto si hay fotos
        if (!commentText && (!commentPhotoInput || !commentPhotoInput.files || commentPhotoInput.files.length === 0)) {
            this.showNotification('Por favor, escribe un comentario o añade al menos una foto', 'error');
            return;
        }

        // Deshabilitar página y mostrar toast de guardando
        this.disablePage();
        this.showSavingToast();

        try {
            const plant = this.plants.find(p => p.id === plantId);
            if (plant) {
                if (!plant.comments) {
                    plant.comments = [];
                }
                
                // Subir fotos si las hay
                let commentPhotos = [];
                if (commentPhotoInput && commentPhotoInput.files && commentPhotoInput.files.length > 0) {
                    const files = Array.from(commentPhotoInput.files);
                    for (const file of files) {
                        try {
                            let photoUrl;
                            if (this.useFirebase && this.storage) {
                                // Subir a Firebase Storage con ruta específica para comentarios
                                const timestamp = Date.now();
                                const fileName = `comments/${plantId}/${timestamp}_${file.name}`;
                                const storageRef = this.storage.ref().child(fileName);
                                await storageRef.put(file);
                                photoUrl = await storageRef.getDownloadURL();
                            } else {
                                // Usar base64 si no hay Firebase
                                photoUrl = await new Promise((resolve) => {
                                    const reader = new FileReader();
                                    reader.onload = (e) => resolve(e.target.result);
                                    reader.readAsDataURL(file);
                                });
                            }
                            commentPhotos.push(photoUrl);
                        } catch (error) {
                            console.error('Error subiendo foto del comentario:', error);
                            this.showNotification('Error subiendo algunas fotos', 'error');
                        }
                    }
                }
                
                const newComment = {
                    id: `${plantId}-comment-${Date.now()}`,
                    date: new Date().toISOString(),
                    text: commentText || '',
                    photos: commentPhotos.length > 0 ? commentPhotos : undefined
                };
                
                plant.comments.push(newComment);
                
                // Guardar individualmente en Firebase
                const saved = await this.savePlantToFirebase(plant);
                if (!saved) {
                    await this.savePlants(); // Fallback
                }
                
                this.showPlantDetails(plant);
                document.getElementById('newComment').value = '';
                this.clearCommentPhotosPreview();
                const container = document.getElementById('newCommentContainer');
                if (container) {
                    container.classList.add('hidden');
                }
                this.hideSavingToast();
                this.enablePage();
                this.showNotification('Comentario agregado', 'success');
            }
        } catch (error) {
            console.error('Error guardando comentario:', error);
            this.hideSavingToast();
            this.enablePage();
            this.showNotification('Error al guardar el comentario', 'error');
        }
    }

    editComment(plantId, commentId) {
        const commentTextDiv = document.getElementById(`comment-text-${commentId}`);
        const commentEditForm = document.getElementById(`comment-edit-${commentId}`);
        
        if (commentTextDiv && commentEditForm) {
            commentTextDiv.style.display = 'none';
            commentEditForm.classList.remove('hidden');
            
            // Configurar el input de fotos para edición
            const editPhotoInput = document.getElementById(`commentEditPhotoInput-${commentId}`);
            if (editPhotoInput) {
                editPhotoInput.onchange = (e) => this.handleCommentEditPhotosSelect(e, commentId);
            }
            
            // Guardar referencia a las fotos originales para poder restaurarlas si se cancela
            const plant = this.plants.find(p => p.id === plantId);
            if (plant && plant.comments) {
                const comment = plant.comments.find(c => c.id === commentId);
                if (comment) {
                    // Guardar estado original en el elemento
                    commentEditForm.dataset.originalPhotos = JSON.stringify(comment.photos || []);
                }
            }
        }
    }
    
    handleCommentEditPhotosSelect(event, commentId) {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;
        
        const previewContainer = document.getElementById(`comment-edit-photos-preview-${commentId}`);
        if (!previewContainer) return;
        
        // Limpiar preview anterior si existe
        previewContainer.innerHTML = '';
        previewContainer.style.display = 'flex';
        previewContainer.style.flexWrap = 'wrap';
        previewContainer.style.gap = '10px';
        
        files.forEach((file, index) => {
            if (!file.type.startsWith('image/')) {
                this.showNotification('Solo se permiten archivos de imagen', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const photoWrapper = document.createElement('div');
                photoWrapper.className = 'comment-photo-preview-wrapper';
                photoWrapper.style.cssText = `
                    position: relative;
                    width: 80px;
                    height: 80px;
                    border-radius: 8px;
                    overflow: hidden;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                `;
                
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'comment-photo-preview-delete';
                deleteBtn.style.cssText = `
                    position: absolute;
                    top: 2px;
                    right: 2px;
                    background: rgba(220, 53, 69, 0.9);
                    border: 1px solid rgba(255, 255, 255, 0.9);
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    padding: 0;
                `;
                deleteBtn.onclick = () => {
                    photoWrapper.remove();
                    // Actualizar el input file
                    const input = document.getElementById(`commentEditPhotoInput-${commentId}`);
                    if (input) {
                        const dt = new DataTransfer();
                        Array.from(input.files).forEach((f, i) => {
                            if (i !== index) dt.items.add(f);
                        });
                        input.files = dt.files;
                    }
                    // Si no quedan fotos nuevas, ocultar el contenedor
                    if (previewContainer.children.length === 0) {
                        previewContainer.style.display = 'none';
                    }
                };
                
                const deleteIcon = document.createElement('img');
                deleteIcon.src = 'img/icons/delete.svg';
                deleteIcon.style.cssText = 'width: 14px; height: 14px; filter: brightness(0) invert(1);';
                deleteBtn.appendChild(deleteIcon);
                
                photoWrapper.appendChild(img);
                photoWrapper.appendChild(deleteBtn);
                previewContainer.appendChild(photoWrapper);
            };
            reader.readAsDataURL(file);
        });
    }
    
    removeCommentPhotoFromEdit(commentId, photoIndex) {
        const editForm = document.getElementById(`comment-edit-${commentId}`);
        if (!editForm) return;
        
        const photoWrapper = editForm.querySelector(`[data-photo-index="${photoIndex}"]`);
        if (photoWrapper) {
            photoWrapper.remove();
        }
        
        // Marcar que esta foto debe eliminarse al guardar
        if (!editForm.dataset.photosToDelete) {
            editForm.dataset.photosToDelete = JSON.stringify([]);
        }
        const photosToDelete = JSON.parse(editForm.dataset.photosToDelete);
        photosToDelete.push(photoIndex);
        editForm.dataset.photosToDelete = JSON.stringify(photosToDelete);
    }

    async saveComment(plantId, commentId) {
        const plant = this.plants.find(p => p.id === plantId);
        if (!plant || !plant.comments) return;

        const editForm = document.getElementById(`comment-edit-${commentId}`);
        const editTextarea = document.getElementById(`comment-edit-text-${commentId}`);
        const editPhotoInput = document.getElementById(`commentEditPhotoInput-${commentId}`);
        
        if (!editForm || !editTextarea) return;
        
        const newText = editTextarea.value.trim();
        
        // Permitir comentario sin texto si hay fotos
        const hasExistingPhotos = editForm.querySelector('.comment-photos-edit-list') && 
                                   editForm.querySelector('.comment-photos-edit-list').children.length > 0;
        const hasNewPhotos = editPhotoInput && editPhotoInput.files && editPhotoInput.files.length > 0;
        
        if (!newText && !hasExistingPhotos && !hasNewPhotos) {
            this.showNotification('El comentario debe tener texto o al menos una foto', 'error');
            return;
        }

        // Deshabilitar página y mostrar toast de guardando
        this.disablePage();
        this.showSavingToast();

        try {
            const comment = plant.comments.find(c => c.id === commentId);
            if (comment) {
                comment.text = newText;
                comment.editedAt = new Date().toISOString();
                
                // Manejar fotos eliminadas
                const photosToDelete = editForm.dataset.photosToDelete ? 
                    JSON.parse(editForm.dataset.photosToDelete) : [];
                
                // Eliminar fotos marcadas para eliminar (en orden inverso para mantener índices)
                if (photosToDelete.length > 0 && comment.photos) {
                    const photosToDeleteSorted = [...photosToDelete].sort((a, b) => b - a);
                    for (const photoIndex of photosToDeleteSorted) {
                        const photoUrl = comment.photos[photoIndex];
                        
                        // Eliminar de Firebase Storage si es una URL de Firebase
                        if (photoUrl && photoUrl.includes('firebasestorage.googleapis.com') && this.useFirebase && this.storage) {
                            try {
                                const imageRef = this.storage.refFromURL(photoUrl);
                                await imageRef.delete();
                                console.log('✅ Foto del comentario eliminada de Storage');
                            } catch (error) {
                                console.warn('⚠️ No se pudo eliminar la foto del comentario:', error);
                            }
                        }
                        
                        comment.photos.splice(photoIndex, 1);
                    }
                    
                    if (comment.photos.length === 0) {
                        delete comment.photos;
                    }
                }
                
                // Subir nuevas fotos si las hay
                if (editPhotoInput && editPhotoInput.files && editPhotoInput.files.length > 0) {
                    const files = Array.from(editPhotoInput.files);
                    if (!comment.photos) {
                        comment.photos = [];
                    }
                    
                    for (const file of files) {
                        try {
                            let photoUrl;
                            if (this.useFirebase && this.storage) {
                                // Subir a Firebase Storage con ruta específica para comentarios
                                const timestamp = Date.now();
                                const fileName = `comments/${plantId}/${timestamp}_${file.name}`;
                                const storageRef = this.storage.ref().child(fileName);
                                await storageRef.put(file);
                                photoUrl = await storageRef.getDownloadURL();
                            } else {
                                // Usar base64 si no hay Firebase
                                photoUrl = await new Promise((resolve) => {
                                    const reader = new FileReader();
                                    reader.onload = (e) => resolve(e.target.result);
                                    reader.readAsDataURL(file);
                                });
                            }
                            comment.photos.push(photoUrl);
                        } catch (error) {
                            console.error('Error subiendo foto del comentario:', error);
                            this.showNotification('Error subiendo algunas fotos', 'error');
                        }
                    }
                }
                
                // Guardar individualmente en Firebase
                const saved = await this.savePlantToFirebase(plant);
                if (!saved) {
                    await this.savePlants(); // Fallback
                }
                this.showPlantDetails(plant);
                this.hideSavingToast();
                this.enablePage();
                this.showNotification('Comentario actualizado', 'success');
            }
        } catch (error) {
            console.error('Error guardando comentario:', error);
            this.hideSavingToast();
            this.enablePage();
            this.showNotification('Error al actualizar el comentario', 'error');
        }
    }

    cancelEditComment(plantId, commentId) {
        const commentTextDiv = document.getElementById(`comment-text-${commentId}`);
        const commentEditForm = document.getElementById(`comment-edit-${commentId}`);
        
        if (commentTextDiv && commentEditForm) {
            // Limpiar preview de fotos nuevas
            const previewContainer = document.getElementById(`comment-edit-photos-preview-${commentId}`);
            if (previewContainer) {
                previewContainer.innerHTML = '';
                previewContainer.style.display = 'none';
            }
            
            // Limpiar input de fotos
            const editPhotoInput = document.getElementById(`commentEditPhotoInput-${commentId}`);
            if (editPhotoInput) {
                editPhotoInput.value = '';
            }
            
            // Limpiar datos temporales
            delete commentEditForm.dataset.photosToDelete;
            
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
            const comment = plant.comments.find(c => c.id === commentId);
            
            // Eliminar fotos del comentario de Firebase Storage si existen
            if (comment && comment.photos && comment.photos.length > 0 && this.useFirebase && this.storage) {
                for (const photoUrl of comment.photos) {
                    if (photoUrl && photoUrl.includes('firebasestorage.googleapis.com')) {
                        try {
                            const imageRef = this.storage.refFromURL(photoUrl);
                            await imageRef.delete();
                            console.log('✅ Foto del comentario eliminada de Storage');
                        } catch (error) {
                            console.warn('⚠️ No se pudo eliminar la foto del comentario:', error);
                        }
                    }
                }
            }
            
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
    
    async deleteCommentPhoto(plantId, commentId, photoIndex) {
        if (!confirm('¿Estás seguro de que quieres eliminar esta foto del comentario?')) {
            return;
        }

        const plant = this.plants.find(p => p.id === plantId);
        if (!plant || !plant.comments) return;

        const comment = plant.comments.find(c => c.id === commentId);
        if (!comment || !comment.photos || photoIndex >= comment.photos.length) return;

        try {
            const photoUrl = comment.photos[photoIndex];
            
            // Eliminar de Firebase Storage si es una URL de Firebase
            if (photoUrl && photoUrl.includes('firebasestorage.googleapis.com') && this.useFirebase && this.storage) {
                try {
                    const imageRef = this.storage.refFromURL(photoUrl);
                    await imageRef.delete();
                    console.log('✅ Foto del comentario eliminada de Storage');
                } catch (error) {
                    console.warn('⚠️ No se pudo eliminar la foto del comentario:', error);
                }
            }
            
            // Eliminar del array
            comment.photos.splice(photoIndex, 1);
            if (comment.photos.length === 0) {
                delete comment.photos;
            }
            
            // Guardar cambios
            const saved = await this.savePlantToFirebase(plant);
            if (!saved) {
                await this.savePlants(); // Fallback
            }
            
            this.showPlantDetails(plant);
            this.showNotification('Foto eliminada del comentario', 'success');
        } catch (error) {
            console.error('Error eliminando foto del comentario:', error);
            this.showNotification('Error eliminando foto', 'error');
        }
    }
    
    openCommentPhotoLightbox(plantId, commentId, photoIndex) {
        const plant = this.plants.find(p => p.id === plantId);
        if (!plant || !plant.comments) return;
        
        const comment = plant.comments.find(c => c.id === commentId);
        if (!comment || !comment.photos || photoIndex >= comment.photos.length) return;
        
        // Guardar las fotos del comentario para navegación
        this.lightboxCommentPhotos = comment.photos;
        this.lightboxPhotoIndex = photoIndex;
        this.lightboxPlantId = plantId;
        
        // Crear o actualizar el lightbox
        let lightbox = document.getElementById('photoLightboxModal');
        if (!lightbox) {
            const lightboxHtml = `
                <div id="photoLightboxModal" class="modal hidden">
                    <div class="lightbox-container">
                        <span class="close-modal" onclick="document.getElementById('photoLightboxModal').classList.add('hidden')" style="color: white; font-size: 3rem; z-index: 1001;">&times;</span>
                        <button class="lightbox-nav prev" onclick="event.stopPropagation(); plantManager.changeCommentLightboxPhoto('prev')">‹</button>
                        <button class="lightbox-nav next" onclick="event.stopPropagation(); plantManager.changeCommentLightboxPhoto('next')">›</button>
                        <img id="lightboxImage" src="" alt="Foto" class="lightbox-image">
                        <div class="lightbox-info">
                            <span id="lightboxPhotoCount"></span>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', lightboxHtml);
            lightbox = document.getElementById('photoLightboxModal');
        }
        
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxInfo = document.getElementById('lightboxPhotoCount');
        const prevBtn = lightbox.querySelector('.lightbox-nav.prev');
        const nextBtn = lightbox.querySelector('.lightbox-nav.next');
        
        if (lightboxImage) {
            lightboxImage.src = comment.photos[photoIndex];
        }
        if (lightboxInfo) {
            lightboxInfo.textContent = `${photoIndex + 1} / ${comment.photos.length}`;
        }
        
        // Configurar navegación
        if (prevBtn) {
            prevBtn.style.display = comment.photos.length > 1 ? 'flex' : 'none';
        }
        if (nextBtn) {
            nextBtn.style.display = comment.photos.length > 1 ? 'flex' : 'none';
        }
        
        lightbox.classList.remove('hidden');
    }
    
    changeCommentLightboxPhoto(direction) {
        if (!this.lightboxCommentPhotos || this.lightboxCommentPhotos.length === 0) return;
        
        let newIndex = this.lightboxPhotoIndex;
        if (direction === 'prev') {
            newIndex = newIndex > 0 ? newIndex - 1 : this.lightboxCommentPhotos.length - 1;
        } else if (direction === 'next') {
            newIndex = newIndex < this.lightboxCommentPhotos.length - 1 ? newIndex + 1 : 0;
        }
        
        this.lightboxPhotoIndex = newIndex;
        
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxInfo = document.getElementById('lightboxPhotoCount');
        
        if (lightboxImage) {
            lightboxImage.src = this.lightboxCommentPhotos[newIndex];
        }
        if (lightboxInfo) {
            lightboxInfo.textContent = `${newIndex + 1} / ${this.lightboxCommentPhotos.length}`;
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
        const plantModal = document.getElementById('plantModal');
        // Si es móvil y hay un estado en el historial, retroceder
        if (this.isMobileDevice() && history.state && history.state.modal === 'plantDetails') {
            history.back();
        } else {
            if (plantModal) plantModal.classList.add('hidden');
        }
        // Cerrar también el modal de la leyenda de sustratos si está abierto
        const legendModal = document.getElementById('substrateLegendModal');
        if (legendModal) {
            legendModal.classList.add('hidden');
        }
    }

    // Filtros y búsqueda
    filterPlantsByBaby(isBaby) {
        this.toggleFilter('baby', isBaby.toString(), isBaby ? 'Baby/Esqueje' : 'No baby');
    }

    filterPlants(searchTerm) {
        // La búsqueda se aplica en applyActiveFilters
        this.applyActiveFilters();
    }

    applyFilter(filterType) {
        switch(filterType) {
            case 'needs-water':
                // Este filtro es especial, se aplica directamente
                const needsWaterFiltered = this.plants.filter(plant => {
                    const normalizedPlant = this.normalizePlantData(plant);
                    const wateringDates = normalizedPlant.wateringDates || [];
                    if (wateringDates.length === 0) return true;
                    const lastWatering = new Date(wateringDates[0]);
                    return this.daysSince(lastWatering.toISOString()) >= 7;
                });
                this.renderPlants(needsWaterFiltered);
                break;
            case 'recent':
                const recentFiltered = this.plants.filter(plant => {
                    if (!plant.createdAt) return false;
                    return this.daysSince(plant.createdAt) <= 7;
                });
                this.renderPlants(recentFiltered);
                break;
            case 'poor-health':
                this.toggleFilter('health', 'poor', 'Mala salud');
                break;
            case 'all':
                this.clearAllFilters();
                break;
            default:
                this.applyActiveFilters();
        }
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
        // Limpiar campos de filtros avanzados si existen
        const filterSpecies = document.getElementById('filterSpecies');
        const filterLight = document.getElementById('filterLight');
        const filterHumidity = document.getElementById('filterHumidity');
        const filterVariety = document.getElementById('filterVariety');
        
        if (filterSpecies) filterSpecies.value = '';
        if (filterLight) filterLight.value = '';
        if (filterHumidity) filterHumidity.value = '';
        if (filterVariety) filterVariety.value = '';
        
        // Limpiar input de búsqueda
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
    }

    clearAllFilters() {
        // Limpiar filtros activos
        this.activeFilters = {};
        
        // Limpiar filtros avanzados (de forma segura)
        this.clearAdvancedFilters();
        
        // Limpiar filtros de píldoras si existen
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
        if (allBtn) {
            allBtn.classList.add('active');
        }
        
        // Limpiar búsqueda
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }
        
        // Renderizar todas las plantas (sin filtros)
        this.renderPlants();
        this.renderActiveFiltersPills();
        this.showNotification('Filtros quitados', 'success');
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

    // Deshabilitar página durante guardado
    disablePage() {
        // Crear overlay de bloqueo
        const overlay = document.createElement('div');
        overlay.id = 'savingOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9999;
            pointer-events: all;
            cursor: wait;
        `;
        document.body.appendChild(overlay);
        
        // Deshabilitar todos los elementos interactivos
        document.body.style.pointerEvents = 'none';
        document.body.style.userSelect = 'none';
    }

    // Habilitar página después de guardar
    enablePage() {
        // Remover overlay
        const overlay = document.getElementById('savingOverlay');
        if (overlay) {
            overlay.remove();
        }
        
        // Restaurar interacciones
        document.body.style.pointerEvents = '';
        document.body.style.userSelect = '';
    }

    // Mostrar toast persistente de guardando
    showSavingToast() {
        // Remover toast anterior si existe
        const existingToast = document.getElementById('savingToast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.id = 'savingToast';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-green);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        toast.innerHTML = `
            <div style="width: 20px; height: 20px; border: 3px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <span>Guardando...</span>
        `;
        document.body.appendChild(toast);
    }

    // Ocultar toast de guardando
    hideSavingToast() {
        const toast = document.getElementById('savingToast');
        if (toast) {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }
    }

    showSolution(itemName) {
        const solution = PLANT_SOLUTIONS[itemName];
        if (!solution) {
            this.showNotification('No hay solución disponible para este item', 'error');
            return;
        }
        
        // Crear o obtener el modal de soluciones
        let solutionModal = document.getElementById('solutionModal');
        if (!solutionModal) {
            const modalHtml = `
                <div id="solutionModal" class="modal hidden">
                    <div class="modal-content glass-panel" style="max-width: 600px;">
                        <span class="close-modal" onclick="document.getElementById('solutionModal').classList.add('hidden')">&times;</span>
                        <h2 id="solutionModalTitle" style="color: var(--light-green); margin-bottom: 15px;"></h2>
                        <div id="solutionModalBody" style="color: var(--text-light); line-height: 1.6;"></div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            solutionModal = document.getElementById('solutionModal');
        }
        
        // Añadir event listener para cerrar al hacer click fuera (solo en escritorio)
        // Solo añadir listeners una vez usando una bandera
        if (!this.solutionModalListenersAdded) {
            if (!this.isMobileDevice()) {
                let mouseDownOnBackground = false;
                
                solutionModal.addEventListener('mousedown', (e) => {
                    mouseDownOnBackground = (e.target.id === 'solutionModal');
                });
                
                solutionModal.addEventListener('mouseup', (e) => {
                    if (mouseDownOnBackground && e.target.id === 'solutionModal') {
                        solutionModal.classList.add('hidden');
                    }
                    mouseDownOnBackground = false;
                });
            }
            this.solutionModalListenersAdded = true;
        }
        
        const title = document.getElementById('solutionModalTitle');
        const body = document.getElementById('solutionModalBody');
        
        if (title) title.textContent = `Solución: ${itemName}`;
        if (body) body.textContent = solution;
        
        solutionModal.classList.remove('hidden');
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

// Función para hashear contraseña usando SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Inicializar autenticación
let isAuthenticated = false;
let correctPasswordHash = null;

async function initAuth() {
    // Calcular el hash de la contraseña correcta una sola vez
    if (!correctPasswordHash) {
        correctPasswordHash = await hashPassword('20212404');
    }
    
    const authModal = document.getElementById('authModal');
    const mainContent = document.getElementById('mainContent');
    const authForm = document.getElementById('authForm');
    const authError = document.getElementById('authError');
    const pinDisplay = document.getElementById('pinDisplay');
    const pinDeleteBtn = document.getElementById('pinDeleteBtn');
    const pinSubmitBtn = document.getElementById('pinSubmitBtn');
    const pinKeys = document.querySelectorAll('.pin-key[data-number]');
    
    let pinInput = ''; // Almacenar el PIN ingresado
    const maxPinLength = 8; // Longitud máxima del PIN
    
    // Verificar si ya está autenticado (en sessionStorage)
    const sessionAuth = sessionStorage.getItem('authenticated');
    if (sessionAuth === 'true') {
        isAuthenticated = true;
        authModal.classList.add('hidden');
        mainContent.style.display = 'block';
        initApp();
        return;
    }
    
    // Mostrar modal de autenticación
    authModal.classList.remove('hidden');
    mainContent.style.display = 'none';
    
    // Función para actualizar el display del PIN
    function updatePinDisplay() {
        const dots = pinDisplay.querySelectorAll('.pin-dot');
        dots.forEach((dot, index) => {
            if (index < pinInput.length) {
                dot.classList.add('filled');
            } else {
                dot.classList.remove('filled');
            }
        });
    }
    
    // Función para borrar el último dígito
    function deleteLastDigit() {
        if (pinInput.length > 0) {
            pinInput = pinInput.slice(0, -1);
            updatePinDisplay();
            authError.style.display = 'none';
        }
    }
    
    // Función para agregar un dígito
    function addDigit(digit) {
        if (pinInput.length < maxPinLength) {
            pinInput += digit;
            updatePinDisplay();
            authError.style.display = 'none';
        }
    }
    
    // Event listeners para las teclas numéricas
    pinKeys.forEach(key => {
        key.addEventListener('click', () => {
            const number = key.getAttribute('data-number');
            addDigit(number);
        });
    });
    
    // Botón de borrar
    pinDeleteBtn.addEventListener('click', () => {
        deleteLastDigit();
    });
    
    // Botón de enviar
    pinSubmitBtn.addEventListener('click', async () => {
        if (pinInput.length === 0) {
            authError.textContent = 'Por favor, introduce el PIN';
            authError.style.display = 'block';
            return;
        }
        
        // Hashear el PIN ingresado
        const inputHash = await hashPassword(pinInput);
        
        // Comparar con el hash correcto
        if (inputHash === correctPasswordHash) {
            isAuthenticated = true;
            sessionStorage.setItem('authenticated', 'true');
            authModal.classList.add('hidden');
            mainContent.style.display = 'block';
            pinInput = '';
            updatePinDisplay();
            authError.style.display = 'none';
            initApp();
        } else {
            authError.textContent = 'PIN incorrecto. Inténtalo de nuevo.';
            authError.style.display = 'block';
            pinInput = '';
            updatePinDisplay();
        }
    });
    
    // Permitir usar el teclado físico también
    document.addEventListener('keydown', (e) => {
        if (authModal.classList.contains('hidden')) return;
        
        if (e.key >= '0' && e.key <= '9') {
            addDigit(e.key);
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            deleteLastDigit();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            pinSubmitBtn.click();
        }
    });
}

// Inicializar la aplicación después de autenticación
function initApp() {
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
}

// Inicializar autenticación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initAuth();
});

let plantManager;

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
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(style);
