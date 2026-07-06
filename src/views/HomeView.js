import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FeedEntry from "../ui/widgets/FeedEntry";
import HighlightReel from "../ui/widgets/HighlightReel";

// Pantalla de carga mientras se obtienen los datos de la API
function LoadingState() {
  return (
    <SafeAreaView style={styles.centered}>
      <ActivityIndicator size="large" color="#262626" />
      <Text style={styles.loadingLabel}>Cargando publicaciones...</Text>
    </SafeAreaView>
  );
}

// Pantalla de error cuando la petición falla
function ErrorState({ message }) {
  return (
    <SafeAreaView style={styles.centered}>
      <Text style={styles.errorLabel}>{message}</Text>
    </SafeAreaView>
  );
}

// Vista principal del feed: muestra historias arriba y publicaciones abajo
export default function HomeView({ navigation, posts, loading, error }) {
  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const goToDetail = (post) => navigation.navigate("PostDetail", { post });

  return (
    <SafeAreaView style={styles.screen} edges={["left", "right"]}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<HighlightReel posts={posts} />}
        renderItem={({ item }) => (
          <FeedEntry post={item} onOpenPost={() => goToDetail(item)} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  centered: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingLabel: {
    marginTop: 12,
    fontSize: 14,
    color: "#737373",
  },
  errorLabel: {
    fontSize: 15,
    color: "#ed4956",
  },
});
