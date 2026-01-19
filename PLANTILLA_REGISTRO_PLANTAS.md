# PLANTILLA PARA REGISTRO DE PLANTAS - My Green Diary

## INSTRUCCIONES PARA LA IA
Esta plantilla contiene TODOS los campos y opciones disponibles en el sistema de registro de plantas. Cuando el usuario te proporcione información sobre una planta, debes extraer y organizar los datos según esta estructura.

---

## CAMPOS OBLIGATORIOS (marcados con *)

### 1. **Nombre de la Planta** *
- Campo: Texto libre
- Ejemplo: "Monstera Deliciosa", "Ficus Lyrata", "Pothos Dorado"

### 2. **Especie** *
- Campo: Texto libre (nombre científico)
- Ejemplo: "Monstera deliciosa", "Ficus lyrata", "Epipremnum aureum"

---

## CAMPOS OPCIONALES

### 3. **Variación**
- Campo: Texto libre
- Ejemplo: "Variegata", "Albo", "Aurea", "Tricolor"

### 4. **Tipo de Planta**
- Campo: Selección única (picklist)
- **OPCIONES DISPONIBLES:**
  - Planta verde
  - Trepadora
  - Colgante
  - Suculenta
  - Cactus
  - Planta de flor
  - Planta aromática
  - Planta acuática
  - Bonsái
  - Palmera
  - Helecho
  - Bulbosa
  - Orquídea
  - Carnívora
  - Epífita
  - Tapizante
  - Arbusto
  - Árbol
  - Bambú
  - Planta aérea

### 5. **Fecha de Adquisición**
- Campo: Fecha (formato: YYYY-MM-DD)
- Ejemplo: "2024-01-15", "2023-12-20"

### 6. **Descripción**
- Campo: Texto libre (textarea)
- Ejemplo: "Planta de interior con hojas grandes y verdes. Requiere mucha humedad."

---

## CUIDADOS Y CONDICIONES

### 7. **Luz Requerida**
- Campo: Selección única (picklist)
- **OPCIONES DISPONIBLES:**
  - Sombra
  - Sombra Parcial
  - Luz Indirecta
  - Luz Directa
  - Luz Intensa

### 8. **Temperatura**
- Campo: Texto libre
- Formato recomendado: "18-24°C", "15-20°C", "20-25°C"
- Ejemplo: "18-24°C", "Entre 15 y 20 grados"

### 9. **Humedad**
- Campo: Selección única (picklist)
- **OPCIONES DISPONIBLES:**
  - BAJA (<40%)
  - MEDIA (40-60%)
  - ALTA (60-80%)
  - MUY ALTA (>80%)

---

## MEZCLA DE SUSTRATO

### 10. **Mezcla de Sustrato**
- Campo: Múltiples porcentajes (la suma debe ser 100%)
- **TIPOS DE SUSTRATO DISPONIBLES:**
  1. Sustrato universal
  2. Turba rubia
  3. Fibra de coco
  4. Mantillo
  5. Perlita
  6. Vermiculita
  7. Arcilla expandida
  8. Arena de río
  9. Grava
  10. Corteza de pino
  11. Humus de lombriz
  12. Musgo sphagnum

- **Formato de respuesta:**
  - Especificar cada sustrato con su porcentaje
  - Ejemplo: "Sustrato universal: 40%, Perlita: 30%, Turba rubia: 20%, Fibra de coco: 10%"
  - La suma de todos los porcentajes debe ser 100%

---

## FRECUENCIA DE RIEGO POR ESTACIÓN

### 11. **Frecuencia de Riego**
- Campo: Texto libre (4 campos, uno por estación)
- **ESTACIONES:**
  - **Primavera:** Ejemplo: "Cada 5-7 días", "2 veces por semana"
  - **Verano:** Ejemplo: "Cada 3-5 días", "3 veces por semana"
  - **Otoño:** Ejemplo: "Cada 7-10 días", "1 vez por semana"
  - **Invierno:** Ejemplo: "Cada 10-14 días", "Cada 2 semanas"

---

## ENFERMEDADES Y PLAGAS

### 12. **Enfermedades/Plagas**
- Campo: Selección múltiple (puede elegir varias)
- **OPCIONES DISPONIBLES:**
  1. Cochinilla algodonosa
  2. Pulgón
  3. Araña roja
  4. Trips
  5. Mosca del sustrato (sciáridos)
  6. Mosca blanca
  7. Hormigas
  8. Caracoles/babosas (exterior)
  9. Orugas (exterior)
  10. Nematodos
  11. Oídio
  12. Mildiu
  13. Negrilla/fumagina
  14. Podredumbre radicular
  15. Roya

- **Formato de respuesta:**
  - Si la planta NO tiene enfermedades/plagas: dejar vacío o indicar "Ninguna"
  - Si tiene: listar todas las que presente
  - Ejemplo: "Pulgón, Araña roja"

---

## ESTADO DE LA PLANTA / SÍNTOMAS

### 13. **Estado de la Planta / Síntomas**
- Campo: Selección múltiple (puede elegir varias)
- **OPCIONES DISPONIBLES:**
  1. Hojas amarillas
  2. Mustia
  3. Pérdida de hojas
  4. Hojas secas
  5. Hojas marrones
  6. Hojas caídas
  7. Tallo débil
  8. Crecimiento lento
  9. Sin crecimiento
  10. Hojas pequeñas
  11. Hojas deformadas
  12. Manchas en hojas
  13. Raíces visibles
  14. Sustrato muy seco
  15. Sustrato muy húmedo

- **Formato de respuesta:**
  - Si la planta está saludable: dejar vacío o indicar "Ninguno"
  - Si tiene síntomas: listar todos los que presente
  - Ejemplo: "Hojas amarillas, Mustia"

---

## NOTAS IMPORTANTES

1. **Campo "Planta en mala salud":** Este campo se calcula AUTOMÁTICAMENTE. Si la planta tiene al menos una enfermedad/plaga O al menos un estado/síntoma, se marcará automáticamente como "en mala salud". NO es necesario indicarlo manualmente.

2. **Fotos:** El usuario puede añadir fotos, pero no es necesario especificarlas en la plantilla. Se gestionan por separado.

3. **Comentarios:** Los comentarios se añaden después de guardar la planta, no forman parte del formulario inicial.

---

## EJEMPLO DE PLANTILLA COMPLETA

```
NOMBRE: Monstera Deliciosa
ESPECIE: Monstera deliciosa
VARIACIÓN: Variegata
TIPO: Planta verde
FECHA ADQUISICIÓN: 2024-01-15
DESCRIPCIÓN: Planta de interior con hojas grandes y verdes. Variedad variegada con manchas blancas.

LUZ: Luz Indirecta
TEMPERATURA: 18-24°C
HUMEDAD: ALTA (60-80%)

SUSTRATO:
- Sustrato universal: 50%
- Perlita: 30%
- Turba rubia: 20%

RIEGO:
- Primavera: Cada 5-7 días
- Verano: Cada 3-5 días
- Otoño: Cada 7-10 días
- Invierno: Cada 10-14 días

ENFERMEDADES/PLAGAS: Ninguna

ESTADO/SÍNTOMAS: Ninguno
```

---

## FORMATO DE RESPUESTA PARA LA IA

Cuando el usuario te proporcione información sobre una planta, responde en este formato estructurado:

```
**NOMBRE:** [nombre de la planta]
**ESPECIE:** [nombre científico]
**VARIACIÓN:** [si aplica, o "N/A"]
**TIPO:** [seleccionar de la lista de tipos]
**FECHA ADQUISICIÓN:** [fecha o "N/A"]
**DESCRIPCIÓN:** [descripción o "N/A"]

**LUZ:** [seleccionar de la lista]
**TEMPERATURA:** [rango de temperatura]
**HUMEDAD:** [seleccionar de la lista]

**SUSTRATO:**
- [Sustrato 1]: [X]%
- [Sustrato 2]: [Y]%
- [Total debe sumar 100%]

**RIEGO:**
- Primavera: [frecuencia]
- Verano: [frecuencia]
- Otoño: [frecuencia]
- Invierno: [frecuencia]

**ENFERMEDADES/PLAGAS:** [listar o "Ninguna"]
**ESTADO/SÍNTOMAS:** [listar o "Ninguno"]
```

---

## VALIDACIONES IMPORTANTES

1. **Sustrato:** La suma de todos los porcentajes DEBE ser exactamente 100%
2. **Picklists:** Solo usar valores EXACTOS de las listas proporcionadas
3. **Campos obligatorios:** Nombre y Especie SIEMPRE deben estar presentes
4. **Múltiples selecciones:** Enfermedades y Estados pueden tener múltiples valores separados por comas
