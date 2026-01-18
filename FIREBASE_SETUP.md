# 🔥 Guía de Configuración de Firebase

## Pasos para configurar Firebase

### 1. Crear Proyecto en Firebase Console
1. Ve a https://console.firebase.google.com/
2. Haz clic en **"Agregar proyecto"** o **"Add project"**
3. Nombre del proyecto: `my-green-diary` (o el que prefieras)
4. (Opcional) Desactiva Google Analytics si no lo necesitas
5. Haz clic en **"Crear proyecto"**

### 2. Habilitar Firestore Database
1. En el menú izquierdo, haz clic en **"Firestore Database"**
2. Haz clic en **"Crear base de datos"**
3. Selecciona **"Iniciar en modo de prueba"** (podrás ajustar las reglas después)
4. Elige la ubicación más cercana a ti (ej: `europe-west` o `us-central`)
5. Haz clic en **"Habilitar"**

### 3. Configurar Reglas de Seguridad (Temporal - para pruebas)
1. Ve a **Firestore Database** > **Reglas**
2. Usa estas reglas temporales:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /plants/{plantId} {
      allow read, write: if true; // Temporal - permite todo
    }
  }
}
```
3. Haz clic en **"Publicar"**

⚠️ **Nota de Seguridad**: Estas reglas permiten que cualquiera pueda leer/escribir. Para producción, configura reglas de autenticación.

### 4. Obtener Credenciales de la App Web
1. Haz clic en el ícono de **⚙️ Configuración del proyecto**
2. Ve a la sección **"Tus apps"**
3. Haz clic en el ícono **`</>` (Web)** o **"Agregar app"** > **Web**
4. Registra la app con un nickname: `Web App`
5. **NO marques** "También configura Firebase Hosting" (a menos que quieras usarlo)
6. Haz clic en **"Registrar app"**
7. Se mostrará un objeto `firebaseConfig`. **Cópialo**

### 5. Agregar Credenciales al Proyecto
1. Abre el archivo `firebase-config.js`
2. Reemplaza los valores con tus credenciales reales:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSy...TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

### 6. Inicializar Firebase
1. Asegúrate de que `firebase-config.js` tiene las credenciales correctas
2. Abre `index.html` en tu navegador
3. La app detectará automáticamente Firebase y usará Firestore
4. Si hay plantas en `localStorage`, te preguntará si quieres migrarlas a Firebase

## ✅ Verificación

1. Abre la consola del navegador (F12)
2. Deberías ver: `✅ Firebase conectado correctamente`
3. Si hay plantas en localStorage, verás: `📦 X plantas cargadas desde Firebase`
4. Las plantas nuevas se guardarán automáticamente en Firebase

## 📁 Estructura en Firestore

Las plantas se guardan en la colección `plants`:
```
plants/
  ├── {plantId1}/
  │   ├── name: "Monstera Deliciosa"
  │   ├── species: "Monstera deliciosa"
  │   ├── variety: "Variegata"
  │   ├── comments: [...]
  │   └── ...otros campos
  └── {plantId2}/
      └── ...
```

## 🔄 Migración desde localStorage

Si tienes plantas guardadas en `localStorage`, la app te ofrecerá migrarlas cuando:
- Firebase esté configurado correctamente
- No haya plantas en Firebase pero sí en localStorage

Puedes aceptar o rechazar la migración.

## 🛠️ Solución de Problemas

### "Firebase no configurado, usando localStorage"
- Verifica que `firebase-config.js` tiene las credenciales correctas
- Asegúrate de que los scripts de Firebase están cargados en `index.html`

### Error de permisos en Firestore
- Revisa las reglas de seguridad en Firebase Console
- Asegúrate de que las reglas permiten lectura/escritura (modo prueba)

### Las plantas no se guardan
- Abre la consola del navegador (F12) y revisa errores
- Verifica que Firestore está habilitado en Firebase Console

## 📝 Notas

- La app funciona con **localStorage** si Firebase no está configurado
- Una vez configurado Firebase, todo se guarda en la nube automáticamente
- Puedes usar exportar/importar para hacer respaldos manuales
- Los datos en Firebase persisten incluso si cambias de navegador/dispositivo
