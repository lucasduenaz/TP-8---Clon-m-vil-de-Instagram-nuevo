import { Dimensions, Image, Pressable, StyleSheet } from "react-native";

// El tamaño de cada celda es exactamente un tercio del ancho de pantalla
const CELL_SIZE = Dimensions.get("window").width / 3;

// Miniatura cuadrada para la cuadrícula del perfil
// Recibe el post completo y un handler de navegación
export default function GridThumbnail({ post, onPress }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <Image
        source={{ uri: post.image }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 0.5,
    borderColor: "#ffffff",
    backgroundColor: "#efefef",
  },
});
