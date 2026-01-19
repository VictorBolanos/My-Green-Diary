# 🌿 My Green Diary

<div align="center">

**Un diario digital moderno e interactivo para gestionar y cuidar todas tus plantas de interior**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

[Características](#-características-principales) • [Tecnologías](#-stack-técnico) • [Instalación](#-instalación-y-configuración) • [Uso](#-cómo-usar)

</div>

---

## 📖 Sobre el Proyecto

**My Green Diary** es una aplicación web progresiva (PWA) diseñada para amantes de las plantas que buscan una solución completa para gestionar su colección de plantas de interior. La aplicación combina un diseño moderno con glassmorphism, funcionalidades avanzadas de seguimiento y una base de datos robusta que permite sincronizar tus datos entre dispositivos.

### 🎯 Objetivo

Facilitar el cuidado de plantas mediante:
- **Registro detallado** de cada planta con toda su información
- **Seguimiento inteligente** de riegos con calendario visual
- **Diagnóstico y soluciones** para problemas comunes (enfermedades, plagas, síntomas)
- **Gestión de fotos** múltiples para documentar el crecimiento
- **Filtros avanzados** para encontrar plantas según necesidades específicas

---

## ✨ Características Principales

### 🌱 Gestión Completa de Plantas
- **Registro detallado**: Nombre, especie, variedad, edad, descripción
- **Requisitos ambientales**: Luz, temperatura, humedad con opciones predefinidas
- **Sustrato personalizado**: Sistema de mezcla con 14 tipos diferentes y gráfico visual tipo donut
- **Frecuencia de riego**: Configuración por estación (primavera, verano, otoño, invierno)
- **Múltiples fotos**: Carrusel de imágenes para documentar el crecimiento
- **Comentarios**: Sistema de notas y observaciones por planta

### 💧 Sistema de Riego Inteligente
- **Calendario visual**: Vista mensual con días regados marcados
- **Registro manual**: Añadir o eliminar riegos directamente desde el calendario
- **Alertas visuales**: Indicadores de plantas que necesitan riego
- **Historial completo**: Seguimiento de todos los riegos registrados

### 🏥 Diagnóstico y Soluciones
- **Enfermedades y plagas**: 15 opciones comunes con soluciones integradas
- **Estados y síntomas**: 15 síntomas con diagnósticos y remedios
- **Sistema de pills clickables**: Click en cualquier problema para ver solución detallada
- **Cálculo automático**: Estado de salud se calcula automáticamente según problemas detectados

### 🔍 Búsqueda y Filtros Avanzados
- **Búsqueda en tiempo real**: Por nombre, especie o variedad
- **Filtros por estado**: Saludable, mala salud, baby/esqueje
- **Filtros por necesidades**: Plantas que necesitan riego, recientes
- **Dashboard interactivo**: Estadísticas visuales con contadores clickables

### 🎨 Diseño Moderno
- **Glassmorphism**: Efecto de vidrio esmerilado con transparencias
- **Tema oscuro**: Paleta verde oscuro con acentos vibrantes
- **Responsive design**: Optimizado para móvil, tablet y escritorio
- **Animaciones suaves**: Transiciones y efectos hover elegantes
- **Navegación intuitiva**: Modales, lightbox de fotos, navegación entre plantas

### 🔐 Seguridad y Persistencia
- **Autenticación por PIN**: Sistema de acceso restringido con teclado numérico
- **Firebase Integration**: Firestore para datos y Storage para imágenes
- **Fallback a localStorage**: Funciona sin conexión si Firebase no está configurado
- **Migración automática**: Transfiere datos de localStorage a Firebase automáticamente
- **Exportar/Importar**: Respaldos manuales en formato JSON

---

## 🛠️ Stack Técnico

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: 
  - Glassmorphism con `backdrop-filter` y transparencias
  - CSS Grid y Flexbox para layouts responsivos
  - Variables CSS para tema consistente
  - Animaciones y transiciones CSS
- **JavaScript Vanilla (ES6+)**:
  - Clases ES6 (`PlantManager`)
  - Async/await para operaciones asíncronas
  - Arrow functions y destructuring
  - LocalStorage API
  - History API para navegación móvil

### Backend y Almacenamiento
- **Firebase SDK (Compat Mode v10.7.1)**:
  - **Firestore**: Base de datos NoSQL para plantas y datos
  - **Storage**: Almacenamiento de imágenes y fotos
  - **Auth**: Sistema de autenticación (preparado para futuras mejoras)
- **LocalStorage**: Fallback cuando Firebase no está disponible

### Librerías y Dependencias
- **Firebase SDK**: CDN desde `gstatic.com`
  - `firebase-app-compat.js`
  - `firebase-firestore-compat.js`
  - `firebase-auth-compat.js`
  - `firebase-storage-compat.js`

### Arquitectura
- **Patrón Singleton**: Una única instancia de `PlantManager`
- **Programación orientada a objetos**: Clase principal con métodos organizados
- **Separación de responsabilidades**: Lógica separada por funcionalidad
- **Normalización de datos**: Sistema de migración para compatibilidad hacia atrás

---

## 📁 Estructura del Proyecto

```
My-Green-Diary/
│
├── index.html              # Estructura HTML principal
├── script.js               # Lógica de la aplicación (3955+ líneas)
├── styles.css              # Estilos CSS con glassmorphism
├── firebase-config.js      # Configuración de Firebase
│
├── img/
│   ├── favicon.png         # Icono de la aplicación
│   ├── My Green Diary Logo.png
│   ├── bgs/                # Fondos de pantalla
│   │   ├── leaves-close-up.jpg
│   │   ├── leaves-red-fruits.jpg
│   │   └── palm-tree-leaves.jpg
│   └── icons/              # Iconos SVG
│       ├── plant.svg
│       ├── water-drop.svg
│       ├── sun.svg
│       ├── temperature.svg
│       ├── humidity.svg
│       ├── sad.svg
│       ├── pacifier.svg
│       └── ... (más iconos)
│
└── docs/
    ├── FIREBASE_SETUP.md           # Guía de configuración Firebase
    ├── PERMISOS_FIRESTORE.md       # Reglas de seguridad Firestore
    └── PLANTILLA_REGISTRO_PLANTAS.md  # Plantilla para registro de plantas
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Cuenta de Firebase (opcional, para sincronización en la nube)
- Editor de código (opcional, para personalización)

### Instalación Básica (LocalStorage)

1. **Clonar o descargar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/My-Green-Diary.git
   cd My-Green-Diary
   ```

2. **Abrir en el navegador**
   - Simplemente abre `index.html` en tu navegador
   - La aplicación funcionará con localStorage automáticamente

### Configuración de Firebase (Opcional)

Para habilitar sincronización en la nube y almacenamiento de imágenes:

1. **Crear proyecto en Firebase Console**
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Crea un nuevo proyecto

2. **Habilitar Firestore Database**
   - Ve a Firestore Database > Crear base de datos
   - Selecciona "Modo de prueba" (para desarrollo)

3. **Habilitar Storage**
   - Ve a Storage > Empezar
   - Configura reglas de seguridad

4. **Obtener credenciales**
   - Ve a Configuración del proyecto > Tus apps > Web
   - Copia el objeto `firebaseConfig`

5. **Configurar en el proyecto**
   - Abre `firebase-config.js`
   - Pega tus credenciales de Firebase

6. **Configurar reglas de seguridad**
   - Consulta `PERMISOS_FIRESTORE.md` para reglas detalladas
   - ⚠️ **Importante**: Ajusta las reglas para producción

📖 **Guía completa**: Ver [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

---

## 💻 Cómo Usar

### Primeros Pasos

1. **Abrir la aplicación**
   - Abre `index.html` en tu navegador
   - Si está configurado Firebase, introduce el PIN de acceso

2. **Agregar tu primera planta**
   - Click en "➕ Agregar Nueva Planta"
   - Completa el formulario con la información de tu planta
   - Sube fotos (opcional)
   - Guarda los cambios

3. **Ver detalles de una planta**
   - Click en cualquier tarjeta de planta
   - Navega entre plantas con los botones anterior/siguiente
   - Explora todas las secciones: fotos, riegos, comentarios

### Funcionalidades Principales

#### 📝 Registro de Plantas
- **Información básica**: Nombre, especie, variedad, edad
- **Requisitos**: Selecciona luz, temperatura y humedad de listas predefinidas
- **Sustrato**: Crea mezclas personalizadas con porcentajes (máximo 100%)
- **Riego**: Configura frecuencia por estación del año
- **Problemas**: Selecciona enfermedades/plagas y síntomas de la planta
- **Baby/Esqueje**: Marca si es una planta pequeña o esqueje

#### 💧 Gestión de Riegos
- **Registrar riego**: Click en "💧 Regar Ahora" en la ficha de la planta
- **Calendario**: Ve al calendario desde la ficha para ver historial completo
- **Añadir manualmente**: Click en días sin riego para añadir registro
- **Eliminar**: Click en el icono ❌ de días regados para eliminar registro

#### 🔍 Búsqueda y Filtros
- **Búsqueda**: Escribe en el campo de búsqueda para filtrar por nombre/especie
- **Filtros rápidos**: 
  - "Necesitan riego": Plantas sin regar en 7+ días
  - "Recientes": Plantas añadidas en los últimos 7 días
- **Dashboard**: Click en contadores del dashboard para filtrar por estado

#### 🏥 Soluciones a Problemas
- **Ver soluciones**: Click en cualquier pill de enfermedad/síntoma
- **Cerrar modal**: Click fuera del modal o en la X
- **Información concisa**: Soluciones breves y prácticas (máximo 3 frases)

#### 📸 Gestión de Fotos
- **Subir múltiples**: Añade varias fotos por planta
- **Carrusel**: Navega entre fotos en la ficha de la planta
- **Lightbox**: Click en foto para ver en pantalla completa
- **Eliminar**: Botón de eliminar en cada foto del carrusel

---

## 🏗️ Arquitectura Técnica

### Clase Principal: `PlantManager`

```javascript
class PlantManager {
    constructor() {
        // Inicialización de propiedades
        this.plants = [];
        this.db = null; // Firestore instance
        this.storage = null; // Firebase Storage instance
        this.useFirebase = false;
        // ... más propiedades
    }
}
```

### Flujo de Datos

1. **Carga inicial**:
   ```
   Constructor → initFirebase() → loadPlantsFromFirebase() → renderDashboard()
   ```

2. **Guardar planta**:
   ```
   Form Submit → getFormData() → normalizePlantData() → savePlantToFirebase() → renderPlants()
   ```

3. **Sincronización**:
   ```
   Firebase disponible → Firestore
   Firebase no disponible → localStorage
   ```

### Estructura de Datos

#### Objeto Planta
```javascript
{
    id: "uuid-v4",
    name: "Monstera Deliciosa",
    species: "Monstera deliciosa",
    variety: "Variegata",
    age: "2 años",
    description: "...",
    light: "Luz indirecta brillante",
    temperature: "18-24°C",
    humidity: "Alta (60-80%)",
    substrate: {
        universal: 50,
        perlita: 30,
        turba_rubia: 20
    },
    wateringFrequency: {
        spring: 2,
        summer: 3,
        autumn: 1,
        winter: 1
    },
    wateringDates: ["2024-01-15", "2024-01-20", ...],
    photos: ["url1", "url2", ...],
    diseases: ["Cochinilla algodonosa", ...],
    plantStates: ["Hojas amarillas", ...],
    poorHealth: true, // Calculado automáticamente
    baby: false,
    comments: [
        { date: "2024-01-15", text: "..." },
        ...
    ],
    createdAt: "2024-01-01T00:00:00.000Z"
}
```

### Constantes Globales

- **`PLANT_SOLUTIONS`**: Objeto con soluciones para 30 problemas comunes
- **`SUBSTRATE_TYPES`**: Array con 14 tipos de sustrato y sus colores

---

## 🎨 Características de Diseño

### Glassmorphism
```css
.glass-panel {
    background: rgba(30, 40, 30, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

### Paleta de Colores
- **Fondo oscuro**: `#1a1f1a` (verde muy oscuro)
- **Acento verde**: `#4ade80` (verde claro)
- **Texto**: `#e5e7eb` (gris claro)
- **Texto secundario**: `#9ca3af` (gris medio)

### Responsive Breakpoints
- **Móvil**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Escritorio**: `> 1024px`

---

## 🔧 Funcionalidades Técnicas Avanzadas

### Normalización de Datos
- Sistema de migración automática para compatibilidad hacia atrás
- Conversión de estructuras antiguas (`photo` → `photos`, `lastWatered` → `wateringDates`)
- Validación y limpieza de datos

### Detección de Cambios
- Comparación profunda de objetos para detectar modificaciones
- Alerta de cambios no guardados antes de cerrar formularios
- Guardado automático en Firebase

### Manejo de Historial del Navegador
- `history.pushState()` para modales en móvil
- `popstate` event para cerrar modales con botón atrás
- Prevención de salida accidental de la aplicación

### Optimizaciones
- Renderizado condicional de elementos
- Lazy loading de imágenes
- Event delegation para mejor rendimiento
- Debounce en búsqueda (implícito)

---

## 📊 Datos y Estadísticas

### Información Registrable por Planta

- ✅ Nombre, especie, variedad, edad
- ✅ Descripción personalizada
- ✅ Requisitos: Luz (5 opciones), Temperatura (6 opciones), Humedad (5 opciones)
- ✅ Sustrato: 14 tipos diferentes con porcentajes personalizados
- ✅ Riego: Frecuencia por estación (1-7 días)
- ✅ Historial de riegos: Fechas ilimitadas
- ✅ Fotos: Múltiples imágenes por planta
- ✅ Enfermedades/Plagas: 15 opciones predefinidas
- ✅ Estados/Síntomas: 15 opciones predefinidas
- ✅ Comentarios: Notas ilimitadas con fecha
- ✅ Baby/Esqueje: Indicador booleano

### Opciones Predefinidas

**Luz**: Muy poca, Poca, Media, Mucha, Muy directa  
**Temperatura**: Muy fría, Fría, Templada, Cálida, Muy cálida, Variable  
**Humedad**: Muy baja, Baja, Media, Alta, Muy alta  
**Sustratos**: Universal, Turba rubia, Fibra de coco, Mantillo, Perlita, Vermiculita, Arcilla expandida, Arena de río, Grava, Corteza de pino, Humus, Musgo sphagnum, Carbón vegetal  
**Enfermedades/Plagas**: 15 opciones con soluciones integradas  
**Estados/Síntomas**: 15 opciones con soluciones integradas

---

## 🐛 Solución de Problemas

### La aplicación no carga
- Verifica que todos los archivos estén en la misma carpeta
- Abre la consola del navegador (F12) para ver errores
- Asegúrate de tener conexión a internet (para cargar Firebase SDK)

### Firebase no funciona
- Verifica `firebase-config.js` tiene credenciales correctas
- Revisa las reglas de Firestore en Firebase Console
- La app funcionará con localStorage como fallback

### Las fotos no se suben
- Verifica que Storage esté habilitado en Firebase
- Revisa las reglas de Storage
- Si usas localStorage, las fotos se guardan en base64

### Los cambios no se guardan
- Revisa la consola del navegador para errores
- Verifica conexión a internet si usas Firebase
- Asegúrate de hacer click en "Guardar" después de editar

---

## 🚧 Mejoras Futuras

- [ ] Autenticación de usuarios múltiples
- [ ] Notificaciones push para riegos
- [ ] Estadísticas avanzadas y gráficos
- [ ] Modo oscuro/claro configurable
- [ ] Exportación a PDF
- [ ] Compartir plantas con otros usuarios
- [ ] API REST para integraciones
- [ ] App móvil nativa (React Native / Flutter)
- [ ] Reconocimiento de plantas por foto (ML)
- [ ] Recordatorios personalizados

---

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 👨‍💻 Autor

**Victor** - Desarrollador y amante de las plantas 🌱

---

## 🙏 Agradecimientos

- Firebase por la infraestructura gratuita
- Comunidad de desarrolladores web por las inspiraciones
- Todas las plantas que inspiraron este proyecto 🌿

---

<div align="center">

**Hecho con ❤️ y mucho ☕ para cuidar mejor nuestras plantas**

⭐ Si te gusta este proyecto, ¡dale una estrella!

</div>
