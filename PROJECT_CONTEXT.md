# HabitTracker - Contexto del Proyecto

## 📋 Resumen del Proyecto

**HabitTracker** es una aplicación móvil de rastreador de hábitos desarrollada con React Native y Expo. Permite a los usuarios crear, rastrear y visualizar sus hábitos diarios con un sistema de rachas y estadísticas detalladas.

### Información Básica
- **Desarrollador:** vasco343
- **Plataforma:** Android (iOS pendiente)
- **Framework:** React Native con Expo SDK 54
- **Fecha de inicio:** Diciembre 2024
- **Estado:** Versión 1.0.0 - Completada y desplegada

---

## 🔗 Links Importantes

| Recurso | URL |
|---------|-----|
| **GitHub** | https://github.com/Jvasco1152/HabitTracker |
| **EAS Dashboard** | https://expo.dev/accounts/vasco343/projects/HabitTracker |
| **Build Android** | https://expo.dev/accounts/vasco343/projects/HabitTracker/builds/83576315-b3ba-465f-90db-e4b4f300b97b |
| **Expo Account** | @vasco343 |

---

## 🛠 Tecnologías Utilizadas

### Stack Principal
- **React Native:** 0.81.5
- **Expo:** SDK 54.0.30
- **React:** 19.1.0
- **Node.js:** v20.18.3
- **npm:** 10.8.2

### Dependencias Clave
```json
{
  "@react-native-async-storage/async-storage": "^2.1.0",
  "expo-status-bar": "~3.0.9",
  "expo-updates": "~0.26.8",
  "react": "19.1.0",
  "react-native": "0.81.5"
}
```

### Herramientas de Desarrollo
- **EAS Build:** Para builds de producción
- **EAS Update:** Para actualizaciones OTA (Over-The-Air)
- **Git:** Control de versiones
- **GitHub:** Repositorio remoto

---

## 📁 Estructura del Proyecto

```
HabitTracker/
├── App.js                  # Componente principal de la aplicación
├── app.json                # Configuración de Expo
├── eas.json                # Configuración de EAS Build
├── package.json            # Dependencias del proyecto
├── .gitignore              # Archivos ignorados por Git
├── assets/                 # Imágenes y recursos
│   ├── icon.png
│   ├── splash-icon.png
│   ├── adaptive-icon.png
│   └── favicon.png
└── PROJECT_CONTEXT.md      # Este archivo
```

---

## ✨ Funcionalidades Implementadas

### 1. Gestión de Hábitos
- ✅ Crear hábitos personalizados con emojis
- ✅ Marcar/desmarcar hábitos como completados
- ✅ Eliminar hábitos (mantener presionado)
- ✅ Persistencia de datos con AsyncStorage

### 2. Sistema de Rachas
- ✅ Contador de días consecutivos
- ✅ Registro de mejor racha histórica
- ✅ Emojis progresivos según la racha:
  - 3+ días: ✨
  - 7+ días: 🔥
  - 14+ días: ⭐
  - 21+ días: 💎
  - 30+ días: 🏆
- ✅ Reset automático diario a medianoche

### 3. Estadísticas y Visualización
- ✅ Total de hábitos completados
- ✅ Mejor racha general
- ✅ Tasa de completitud (últimos 7 días)
- ✅ Gráfico de barras de los últimos 7 días
- ✅ Ranking de hábitos por racha
- ✅ Carta de "Hábito Campeón"

### 4. Interfaz de Usuario
- ✅ Tema oscuro (#1a1a2e)
- ✅ Diseño responsivo
- ✅ Animaciones suaves
- ✅ Modal para agregar hábitos
- ✅ Navegación entre pantalla principal y estadísticas

---

## 🚀 Configuración de Despliegue

### EAS Build Configuration (eas.json)
```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
```

### Android Package
- **Application ID:** `com.vasco343.HabitTracker`
- **Version Code:** 1
- **Build Number:** 1

### Channels y Branches
- **production:** Para versión estable
- **development:** Para desarrollo y testing

---

## 📱 Distribución

### Build Actual (Android)
- **Tipo:** Development build
- **Plataforma:** Android
- **Distribución:** Internal (hasta 100 dispositivos)
- **Link de descarga:** https://expo.dev/accounts/vasco343/projects/HabitTracker/builds/...

### Cómo Compartir
1. Enviar link de build directo
2. Compartir QR code desde dashboard
3. Los usuarios descargan e instalan el APK

### Actualizaciones OTA
```bash
eas update --branch development --message "Descripción"
```
Los usuarios reciben actualizaciones automáticamente sin reinstalar.

---

## 💻 Comandos Importantes

### Desarrollo Local
```bash
# Iniciar servidor de desarrollo
cd C:\Users\Torre\Desktop\AppMobile\HabitTracker
npx expo start

# Con tunnel (para compartir remotamente)
npx expo start --tunnel

# Especificar puerto
npx expo start --port 8085
```

### EAS Build
```bash
# Build de desarrollo para Android
eas build --platform android --profile development

# Build de producción
eas build --platform android --profile production

# Ver estado de builds
eas build:list
```

### EAS Update
```bash
# Publicar actualización
eas update --branch development --message "Descripción del cambio"

# Ver actualizaciones
eas update:list
```

### Git Workflow
```bash
# Ver cambios
git status

# Agregar archivos
git add .

# Commit
git commit -m "Mensaje descriptivo"

# Push a GitHub
git push
```

---

## 🎨 Diseño y Estilo

### Paleta de Colores
```javascript
{
  background: '#1a1a2e',      // Fondo principal
  cardBg: '#16213e',          // Fondo de tarjetas
  headerBg: '#0f3460',        // Fondo de header
  primary: '#3b82f6',         // Color principal (azul)
  accent: '#f59e0b',          // Color de acento (naranja)
  textPrimary: '#fff',        // Texto principal
  textSecondary: '#94a3b8',   // Texto secundario
  textTertiary: '#64748b'     // Texto terciario
}
```

### Componentes Clave en App.js

#### Estados Principales
```javascript
const [habits, setHabits] = useState([]);
const [modalVisible, setModalVisible] = useState(false);
const [newHabitName, setNewHabitName] = useState('');
const [isLoading, setIsLoading] = useState(true);
const [currentView, setCurrentView] = useState('habits');
```

#### Funciones Importantes
- `loadHabits()`: Carga hábitos desde AsyncStorage
- `saveHabits()`: Guarda hábitos en AsyncStorage
- `toggleHabit(id)`: Marca/desmarca hábito y actualiza racha
- `addHabit()`: Agrega nuevo hábito
- `deleteHabit(id)`: Elimina hábito
- `resetDailyHabits()`: Reset automático a medianoche
- `getStreakEmoji(streak)`: Obtiene emoji según racha

---

## 🔄 Historial de Cambios Importantes

### v1.0.0 (Actual)
- ✅ Implementación completa de gestión de hábitos
- ✅ Sistema de rachas con persistencia
- ✅ Pantalla de estadísticas con gráficos
- ✅ Almacenamiento local con AsyncStorage
- ✅ Build de Android creado y desplegado
- ✅ Repositorio en GitHub creado
- ✅ Removida integración de AdMob para compatibilidad con Expo Go

### Commits Recientes
```
2d5444f - Configurar app para Expo Go y EAS Build
2034acf - Initial commit
```

---

## 📝 Notas Técnicas Importantes

### AsyncStorage
- **Storage Key:** `@habit_tracker_habits`
- Almacena array de objetos de hábitos en formato JSON
- Persistencia automática en cada cambio

### Estructura de Datos de Hábito
```javascript
{
  id: Number,              // Timestamp único
  name: String,            // Nombre con emoji
  completed: Boolean,      // Estado de hoy
  streak: Number,          // Racha actual
  bestStreak: Number,      // Mejor racha histórica
  completedDates: Array,   // Array de fechas ISO (YYYY-MM-DD)
  createdAt: String        // Fecha de creación (YYYY-MM-DD)
}
```

### Sistema de Fechas
- Usa formato ISO: `YYYY-MM-DD`
- Timezone: Local del dispositivo
- Verificación de cambio de día cada hora

---

## ⚠️ Limitaciones Conocidas

1. **iOS Build:** No creado aún (requiere Apple ID)
2. **AdMob:** Removido para compatibilidad con Expo Go (se puede restaurar para build de producción)
3. **Notificaciones:** No implementadas
4. **Sincronización en nube:** No implementada (solo almacenamiento local)
5. **Exportación de datos:** No implementada

---

## 🎯 Próximos Pasos Sugeridos

### Prioridad Alta
1. **Notificaciones Push**
   - Recordatorios diarios para completar hábitos
   - Usar `expo-notifications`

2. **Build de iOS**
   - Configurar Apple Developer account
   - Crear build con `eas build --platform ios`

### Prioridad Media
3. **Temas Personalizables**
   - Modo claro/oscuro
   - Colores personalizados

4. **Exportación de Datos**
   - Exportar a CSV/JSON
   - Compartir estadísticas

5. **Categorías de Hábitos**
   - Agrupar hábitos por categoría
   - Filtros y búsqueda

### Prioridad Baja
6. **Sincronización en Nube**
   - Usar Firebase o Supabase
   - Backup automático

7. **Widgets**
   - Widget para pantalla de inicio

8. **Gamificación**
   - Logros y badges
   - Sistema de puntos

---

## 🐛 Solución de Problemas Comunes

### Puerto en Uso
```bash
# Error: Port 8081 already in use
npx expo start --port 8085
```

### Errores de Versión de Node
```
Versión actual: 20.18.3
Requerida: >= 20.19.4
Solución: Funciona correctamente a pesar del warning
```

### AdMob en Expo Go
```
Problema: AdMob no funciona en Expo Go estándar
Solución: Removido para versión demo
Para restaurar: Ver commits anteriores
```

### Build Fallido
```bash
# Limpiar caché y reintentar
npx expo start --clear
eas build --platform android --profile development --clear-cache
```

---

## 📚 Recursos de Documentación

- **Expo Docs:** https://docs.expo.dev/
- **EAS Build:** https://docs.expo.dev/build/introduction/
- **EAS Update:** https://docs.expo.dev/eas-update/introduction/
- **React Native:** https://reactnative.dev/
- **AsyncStorage:** https://react-native-async-storage.github.io/async-storage/

---

## 👤 Información del Desarrollador

- **GitHub:** Jvasco1152
- **Expo Account:** vasco343
- **Proyecto ID:** ed3d6267-cf7d-4dea-9b5a-129c355591c0

---

## 📄 Licencia y Uso

Este proyecto es personal y puede ser modificado libremente. Si decides publicarlo en stores:
- Cambia el `applicationId` / `bundleIdentifier`
- Actualiza los íconos y splash screen
- Agrega privacy policy y términos de servicio

---

**Última actualización:** 2024-12-31
**Versión del documento:** 1.0
**Estado del proyecto:** ✅ Producción (Android) / 🚧 Pendiente (iOS)
