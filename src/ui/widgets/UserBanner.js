import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Bloque de estadística individual (publicaciones / seguidores / seguidos)
function StatBlock({ value, label }) {
  return (
    <View style={styles.statBlock}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// Círculo de destacado con emoji y etiqueta
function HighlightCircle({ emoji, label }) {
  return (
    <View style={styles.highlightItem}>
      <View style={styles.highlightRing}>
        <Text style={styles.highlightEmoji}>{emoji}</Text>
      </View>
      <Text style={styles.highlightLabel}>{label}</Text>
    </View>
  );
}

// Encabezado completo del perfil de usuario:
// foto, estadísticas, bio, botones y destacados
export default function UserBanner({ user, postsCount }) {
  return (
    <View style={styles.container}>
      {/* Fila superior: foto + estadísticas */}
      <View style={styles.topRow}>
        <Image source={{ uri: user.profilePic }} style={styles.avatar} />

        <View style={styles.statsRow}>
          <StatBlock value={postsCount} label="Publicaciones" />
          <StatBlock value={user.followers} label="Seguidores" />
          <StatBlock value={user.following} label="Seguidos" />
        </View>
      </View>

      {/* Biografía */}
      <View style={styles.bioSection}>
        <Text style={styles.displayName}>{user.name}</Text>
        <Text style={styles.bioText}>{user.bio}</Text>
        <Text style={styles.websiteLink}>michihouse.com</Text>
      </View>

      {/* Botones de acción */}
      <View style={styles.actionButtons}>
        <Pressable style={styles.btnEdit}>
          <Text style={styles.btnEditText}>Editar perfil</Text>
        </Pressable>

        <Pressable style={styles.btnIcon}>
          <Ionicons name="person-add-outline" size={18} color="#262626" />
        </Pressable>
      </View>

      {/* Destacados */}
      <View style={styles.highlights}>
        <HighlightCircle emoji="🐱" label="BTS" />
        <HighlightCircle emoji="🎥" label="Fotos" />
      </View>

      {/* Pestañas de la cuadrícula */}
      <View style={styles.tabBar}>
        <Ionicons name="grid-outline" size={22} color="#262626" />
        <Ionicons name="play-outline" size={22} color="#8e8e8e" />
        <Ionicons name="person-circle-outline" size={22} color="#8e8e8e" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    marginRight: 24,
  },
  statsRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBlock: {
    alignItems: "center",
  },
  statValue: {
    fontWeight: "700",
    fontSize: 17,
    color: "#262626",
  },
  statLabel: {
    fontSize: 12,
    color: "#262626",
    marginTop: 2,
  },
  bioSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  displayName: {
    fontWeight: "700",
    fontSize: 14,
    color: "#262626",
  },
  bioText: {
    fontSize: 14,
    color: "#262626",
    marginTop: 2,
  },
  websiteLink: {
    color: "#00376b",
    fontWeight: "600",
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 14,
    gap: 8,
  },
  btnEdit: {
    flex: 1,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#efefef",
    justifyContent: "center",
    alignItems: "center",
  },
  btnEditText: {
    fontWeight: "700",
    color: "#262626",
  },
  btnIcon: {
    width: 42,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#efefef",
    justifyContent: "center",
    alignItems: "center",
  },
  highlights: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 18,
    gap: 18,
  },
  highlightItem: {
    alignItems: "center",
  },
  highlightRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#dbdbdb",
    justifyContent: "center",
    alignItems: "center",
  },
  highlightEmoji: {
    fontSize: 28,
  },
  highlightLabel: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600",
  },
  tabBar: {
    height: 46,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#efefef",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
