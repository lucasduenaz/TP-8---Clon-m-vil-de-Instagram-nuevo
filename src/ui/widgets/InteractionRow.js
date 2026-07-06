import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Tamaño uniforme para todos los íconos de la barra
const ICON_SIZE = 27;
const ICON_COLOR_DEFAULT = "#262626";
const ICON_COLOR_LIKED = "#ed4956";

// Botón genérico de acción reutilizable dentro de la barra
function ActionButton({ iconName, size, color, onPress }) {
  return (
    <Pressable onPress={onPress} hitSlop={6}>
      <Ionicons name={iconName} size={size} color={color} />
    </Pressable>
  );
}

// Barra de interacciones: me gusta, comentar, compartir y guardar
export default function InteractionRow({ isLiked, onToggleLike, onOpenComments }) {
  const heartIcon = isLiked ? "heart" : "heart-outline";
  const heartColor = isLiked ? ICON_COLOR_LIKED : ICON_COLOR_DEFAULT;

  return (
    <View style={styles.wrapper}>
      <View style={styles.groupLeft}>
        <ActionButton
          iconName={heartIcon}
          size={ICON_SIZE}
          color={heartColor}
          onPress={onToggleLike}
        />
        <ActionButton
          iconName="chatbubble-outline"
          size={ICON_SIZE - 1}
          color={ICON_COLOR_DEFAULT}
          onPress={onOpenComments}
        />
        <ActionButton
          iconName="paper-plane-outline"
          size={ICON_SIZE - 1}
          color={ICON_COLOR_DEFAULT}
        />
      </View>

      <ActionButton
        iconName="bookmark-outline"
        size={ICON_SIZE - 1}
        color={ICON_COLOR_DEFAULT}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 6,
  },
  groupLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
});
