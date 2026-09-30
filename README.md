# Clon de Instagram — React Native con Expo

Aplicación móvil construida con React Native y Expo que replica la interfaz principal de Instagram. Las publicaciones del feed se cargan en tiempo real desde [The Cat API](https://thecatapi.com/), que provee imágenes de gatos como contenido dinámico.

Referencia de diseño utilizada: [Instagram Mobile UI — Figma Community](https://www.figma.com/community/file/1235135369163092252)

---

## Requisitos previos

- Node.js instalado
- Expo Go instalado en el dispositivo móvil (iOS o Android)
- Conexión a internet para la carga de imágenes

---

## Cómo ejecutar el proyecto

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo con túnel (recomendado para Expo Go)
npx expo start --tunnel
```

Escaneá el código QR que aparece en la terminal con la app Expo Go para ver la aplicación en tu dispositivo.

---

## Estructura del proyecto

```
src/
├── context/
│   └── LikesContext.js    # Context global de "me gusta": likedIds, toggleLike, isLiked
│
├── routing/
│   ├── RootNavigator.js   # Navegador raíz (Stack) + carga de datos desde la API
│   └── TabBar.js          # Barra de pestañas inferior con las 5 secciones
│
├── store/
│   ├── seed_data.js        # Datos estáticos: usuario, captions, ubicaciones, comentarios
│   └── image_fetcher.js    # Lógica de consumo de The Cat API con Axios
│
├── ui/
│   └── widgets/
│       ├── FeedEntry.js      # Tarjeta completa de publicación en el feed
│       ├── GridThumbnail.js  # Miniatura cuadrada para la grilla del perfil
│       ├── HighlightReel.js  # Barra horizontal de historias
│       ├── InteractionRow.js # Barra de acciones: me gusta, comentar, compartir
│       └── UserBanner.js     # Encabezado del perfil: avatar, stats, bio y botones
│
└── views/
    ├── HomeView.js         # Pantalla principal con feed de publicaciones
    ├── EntryDetailView.js  # Detalle ampliado de una publicación con comentarios
    ├── UserProfileView.js  # Perfil del usuario con cuadrícula 3×N
    ├── DiscoverView.js     # Pantalla Explorar (placeholder)
    ├── ClipsView.js        # Pantalla Reels (placeholder)
    └── LookupView.js       # Pantalla Buscar (placeholder)
```

---

## Componentes principales y uso de props

### `FeedEntry`
Representa una publicación completa en el scroll principal. Recibe el objeto `post` completo y una función `onOpenPost` para navegar al detalle. Lee y modifica el estado de like desde `LikesContext` mediante `useContext`.

### `InteractionRow`
Barra de botones de interacción reutilizable. Acepta `isLiked` (booleano), `onToggleLike` (función) y `onOpenComments` (función). Es usada tanto en `FeedEntry` como en `EntryDetailView`.

### `HighlightReel`
Lista horizontal de historias que aparece en la cabecera del feed. Recibe `posts` y toma los primeros 8 elementos para mostrar el avatar y nombre de cada usuario.

### `UserBanner`
Encabezado del perfil. Recibe `user` (objeto con nombre, bio, seguidores, etc.) y `postsCount` para mostrar las estadísticas. Internamente compone `StatBlock` y `HighlightCircle` como sub-componentes.

### `GridThumbnail`
Imagen cuadrada de tamaño `pantalla / 3` para la grilla del perfil. Recibe `post` y `onPress`. El tamaño se calcula una sola vez con `Dimensions.get("window").width`.

---

## Estados manejados con hooks

| Archivo | Estado | Descripción |
|---|---|---|
| `RootNavigator.js` | `postList` | Lista de publicaciones obtenidas de la API |
| `RootNavigator.js` | `isFetching` | Controla el indicador de carga |
| `RootNavigator.js` | `fetchError` | Almacena el mensaje de error si la petición falla |
| `LikesContext.js` | `likedIds` | Lista global de IDs de publicaciones con like activo |

---

## Flujo de navegación

```
RootNavigator (Stack)
│
├── MainTabs (TabBar)
│   ├── Home       → HomeView
│   ├── Search     → LookupView
│   ├── Explore    → DiscoverView
│   ├── Reels      → ClipsView
│   └── Profile    → UserProfileView
│
└── PostDetail     → EntryDetailView
```

La carga de datos ocurre en `RootNavigator` dentro de un `useEffect` con cleanup. Los posts se pasan hacia abajo por props hasta `HomeView` y `UserProfileView`. Al tocar una publicación en cualquiera de las dos pantallas, se navega a `EntryDetailView` enviando el objeto `post` como parámetro.

---

## React Context

**1. Datos compartidos:** IDs de las publicaciones con "me gusta" (`likedIds`)
y las funciones `toggleLike` e `isLiked`.

**2. Archivo del Context:** `src/context/LikesContext.js`

**3. Provider ubicado en:** `App.js`, envolviendo a `RootNavigator`.

**4. Componentes que consumen el Context con `useContext`:**
- `src/ui/widgets/FeedEntry.js`: da y quita el like desde el feed.
- `src/views/EntryDetailView.js`: muestra y modifica el like en el detalle.
- `src/routing/TabBar.js`: muestra en el tab de Perfil la cantidad de likes dados.

**5. Justificación técnica:** el estado de "me gusta" estaba duplicado en
`FeedEntry` y `EntryDetailView`, por lo que un like dado en el feed no se
reflejaba al abrir el detalle. Además, la `TabBar` necesita conocer ese dato
y está en otra rama del árbol de navegación. Con Context, todos leen y
modifican una única fuente de verdad sin pasar props por Stack → Tabs →
Vistas → Widgets ni sincronizar estados manualmente.

---

## Decisiones técnicas destacadas

- **FlatList en todos los listados**: tanto el feed como la grilla del perfil y la lista de comentarios usan `FlatList` para optimizar el rendimiento con listas largas.
- **numColumns={3} en el perfil**: la cuadrícula se logra configurando esta propiedad directamente en `FlatList`, sin `flexWrap` ni grillas manuales.
- **Sub-componentes internos**: varios widgets definen funciones auxiliares en el mismo archivo (ej. `EntryHeader`, `StatBlock`, `StoryItem`) para mantener el componente principal legible sin dividir en archivos innecesarios.
- **Cancelación del efecto**: el `useEffect` de `RootNavigator` usa una bandera `cancelled` para evitar actualizaciones de estado sobre componentes ya desmontados.
- **SafeAreaView con `edges`**: se usan únicamente los bordes laterales (`["left", "right"]`) en las pantallas con scroll para evitar conflictos con el encabezado del stack navigator.
- **Header dinámico según el tab activo**: `HomeView` y `UserProfileView` usan `navigation.addListener("focus")` junto con `navigation.getParent()` para actualizar el título y los botones del Stack header padre según qué tab esté activo. Esto permite mostrar "Instagram" con el ícono de mensajes en el Home, y el nombre de usuario con el ícono de menú en el Perfil.
- **Navegación al perfil desde el detalle**: `EntryDetailView` navega al perfil usando `navigation.navigate("MainTabs", { screen: "Profile" })` en lugar de `navigate("Profile")` a secas, lo que garantiza que el tab correcto quede seleccionado incluso cuando la llamada se realiza desde dentro del Stack navigator.
- **`app.json` con adaptiveIcon y plugin de splash**: se configuró `android.adaptiveIcon` para el ícono nativo adaptativo en Android y el plugin `expo-splash-screen` para la pantalla de carga según la especificación del SDK 54.
