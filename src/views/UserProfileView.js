import { useEffect } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import UserBanner from "../ui/widgets/UserBanner";
import GridThumbnail from "../ui/widgets/GridThumbnail";
import { activeUser } from "../store/seed_data";

// Vista del perfil del usuario activo con cuadrícula de publicaciones
export default function UserProfileView({ navigation, posts }) {
  // Accede al Stack navigator padre para actualizar su título cuando este tab está activo
  const stackNav = navigation.getParent();

  useEffect(() => {
    // Actualiza el header del Stack parent al entrar al tab de perfil
    const unsubscribe = navigation.addListener("focus", () => {
      stackNav?.setOptions({
        title: activeUser.username,
        headerRight: () => (
          <Pressable hitSlop={8} style={{ marginRight: 4 }}>
            <Ionicons name="reorder-three-outline" size={28} color="#262626" />
          </Pressable>
        ),
      });
    });
    return unsubscribe;
  }, [navigation, stackNav]);

  const goToDetail = (post) => navigation.navigate("PostDetail", { post });

  return (
    <SafeAreaView style={styles.screen} edges={["left", "right"]}>
      <FlatList
        data={posts}
        keyExtractor={(item) => `grid-${item.id}`}
        numColumns={3}
        ListHeaderComponent={
          <UserBanner user={activeUser} postsCount={posts.length} />
        }
        renderItem={({ item }) => (
          <GridThumbnail post={item} onPress={() => goToDetail(item)} />
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
});
