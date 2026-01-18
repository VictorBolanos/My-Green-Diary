# 🔒 Cómo Configurar Permisos en Firestore

## Paso a Paso para Configurar las Reglas de Seguridad

### Paso 1: Abre Firebase Console
1. Ve a https://console.firebase.google.com/
2. Selecciona tu proyecto **"my-green-diary"**

### Paso 2: Ir a Firestore Database
1. En el menú lateral izquierdo, busca **"Firestore Database"** o **"Base de datos Firestore"**
2. Haz clic en él

### Paso 3: Ir a la Pestaña "Reglas"
1. En la parte superior de la pantalla de Firestore verás varias pestañas:
   - **Datos** (donde ves las colecciones)
   - **Reglas** ← **HAZ CLIC AQUÍ**
   - **Índices**
   - **Uso**

2. Haz clic en la pestaña **"Reglas"**

### Paso 4: Editar las Reglas
1. Verás un editor de código con reglas similares a estas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;  // ← Esto bloquea todo
    }
  }
}
```

2. **Reemplaza** todo el contenido con esto:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /plants/{plantId} {
      allow read, write: if true;  // ← Permite todo (solo para desarrollo)
    }
  }
}
```

### Paso 5: Publicar las Reglas
1. Haz clic en el botón **"Publicar"** (arriba a la derecha del editor)
2. Espera a que aparezca el mensaje de confirmación

### ✅ Listo!

Ahora tu app podrá:
- ✅ Leer plantas de Firestore
- ✅ Crear nuevas plantas
- ✅ Editar plantas existentes
- ✅ Eliminar plantas
- ✅ Guardar comentarios
- ✅ Actualizar riegos

---

## 📝 Nota Importante

⚠️ **Estas reglas permiten que CUALQUIERA pueda leer y escribir en tu base de datos.**

**Para producción, deberías usar reglas más seguras**, por ejemplo:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /plants/{plantId} {
      // Requiere autenticación
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

Pero por ahora, con `if true` funcionará perfectamente para desarrollo. 🚀
