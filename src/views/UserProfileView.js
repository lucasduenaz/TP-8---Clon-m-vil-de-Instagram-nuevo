import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import UserBanner from "../ui/widgets/UserBanner";
import GridThumbnail from "../ui/widgets/GridThumbnail";
import { activeUser } from "../store/seed_data";

// Vista del perfil del usuario activo con cuadrícula de publicaciones
export default function UserProfileView({ navigation, posts }) {
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
