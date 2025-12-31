# 📱 HabitTracker

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-Android-green.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61dafb.svg)
![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Una aplicación móvil elegante y minimalista para rastrear tus hábitos diarios**

[Descargar App](https://expo.dev/accounts/vasco343/projects/HabitTracker) • [Ver Demo](#-características) • [Reportar Bug](https://github.com/Jvasco1152/HabitTracker/issues)

</div>

---

## 🌟 Características

✨ **Gestión de Hábitos**
- Crea hábitos personalizados con emojis
- Marca/desmarca hábitos completados con un tap
- Elimina hábitos fácilmente (mantener presionado)

🔥 **Sistema de Rachas**
- Seguimiento de días consecutivos
- Registro de mejor racha histórica
- Emojis progresivos de motivación (✨ → 🔥 → ⭐ → 💎 → 🏆)

📊 **Estadísticas Detalladas**
- Visualización de progreso semanal con gráficos
- Tasa de completitud de los últimos 7 días
- Ranking de hábitos por racha
- Carta de "Hábito Campeón"

💾 **Persistencia Local**
- Todos los datos se guardan automáticamente
- Sin necesidad de cuenta o conexión a internet
- Reset automático diario a medianoche

🎨 **Diseño Moderno**
- Tema oscuro elegante
- Interfaz intuitiva y responsiva
- Animaciones suaves

---

## 📸 Capturas de Pantalla

> *Próximamente: Screenshots de la app*

---

## 🚀 Descargar e Instalar

### Android
1. Descarga la app desde el [link de build](https://expo.dev/accounts/vasco343/projects/HabitTracker/builds/83576315-b3ba-465f-90db-e4b4f300b97b)
2. Instala el APK en tu dispositivo
3. ¡Empieza a rastrear tus hábitos!

### iOS
*Próximamente*

---

## 🛠 Tecnologías Utilizadas

- **[React Native](https://reactnative.dev/)** - Framework de desarrollo móvil
- **[Expo](https://expo.dev/)** - Plataforma de desarrollo y deployment
- **[AsyncStorage](https://react-native-async-storage.github.io/async-storage/)** - Almacenamiento local persistente
- **[EAS Build](https://docs.expo.dev/build/introduction/)** - Sistema de builds nativo
- **[EAS Update](https://docs.expo.dev/eas-update/introduction/)** - Actualizaciones OTA

---

## 💻 Desarrollo Local

### Prerequisitos

- Node.js (v20.18.3 o superior)
- npm o yarn
- Expo CLI
- Dispositivo Android/iOS o emulador

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Jvasco1152/HabitTracker.git

# Navegar al directorio
cd HabitTracker

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npx expo start
```

### Comandos Útiles

```bash
# Iniciar con puerto específico
npx expo start --port 8085

# Iniciar con tunnel (compartir remotamente)
npx expo start --tunnel

# Limpiar caché
npx expo start --clear

# Crear build de desarrollo
eas build --platform android --profile development

# Publicar actualización OTA
eas update --branch development --message "Descripción"
```

---

## 📁 Estructura del Proyecto

```
HabitTracker/
├── App.js                  # Componente principal con toda la lógica
├── app.json                # Configuración de Expo
├── eas.json                # Configuración de EAS Build
├── package.json            # Dependencias del proyecto
├── PROJECT_CONTEXT.md      # Documentación técnica detallada
├── README.md               # Este archivo
└── assets/                 # Recursos (íconos, splash screen)
```

---

## 🎯 Roadmap

### Versión 1.0 (Actual) ✅
- [x] Gestión básica de hábitos
- [x] Sistema de rachas
- [x] Estadísticas y gráficos
- [x] Persistencia local
- [x] Build de Android

### Versión 1.1 (Próxima)
- [ ] Notificaciones push diarias
- [ ] Build de iOS
- [ ] Temas personalizables (claro/oscuro)
- [ ] Exportación de datos (CSV/JSON)

### Versión 2.0 (Futuro)
- [ ] Categorías de hábitos
- [ ] Sincronización en nube
- [ ] Widgets para pantalla de inicio
- [ ] Sistema de logros y gamificación
- [ ] Estadísticas avanzadas con gráficos interactivos

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar HabitTracker:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: Amazing Feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Reportar Bugs

Si encuentras un bug, por favor [abre un issue](https://github.com/Jvasco1152/HabitTracker/issues) con:
- Descripción del problema
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Screenshots (si aplica)
- Versión de la app y dispositivo

---

## 📝 Documentación

Para información técnica detallada, consulta [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) que incluye:
- Arquitectura de la aplicación
- Estructura de datos
- Guía de desarrollo
- Solución de problemas comunes
- API reference

---

## 📊 Estado del Proyecto

| Aspecto | Estado |
|---------|--------|
| Desarrollo | ✅ Activo |
| Android Build | ✅ Disponible |
| iOS Build | 🚧 Pendiente |
| Publicación en Stores | 📅 Planeado |
| Documentación | ✅ Completa |

---

## 🔗 Links Útiles

- **GitHub:** [Jvasco1152/HabitTracker](https://github.com/Jvasco1152/HabitTracker)
- **EAS Dashboard:** [Proyecto en Expo](https://expo.dev/accounts/vasco343/projects/HabitTracker)
- **Descargar Android:** [Build Link](https://expo.dev/accounts/vasco343/projects/HabitTracker/builds/83576315-b3ba-465f-90db-e4b4f300b97b)

---

## 👨‍💻 Autor

**Vasco**
- GitHub: [@Jvasco1152](https://github.com/Jvasco1152)
- Expo: [@vasco343](https://expo.dev/@vasco343)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- [Expo](https://expo.dev/) por la increíble plataforma de desarrollo
- [React Native Community](https://reactnative.dev/) por las herramientas y librerías
- Todos los que usen y contribuyan a este proyecto

---

<div align="center">

**¿Te gusta este proyecto? ¡Dale una ⭐️ en GitHub!**

Hecho con ❤️ y React Native

</div>
