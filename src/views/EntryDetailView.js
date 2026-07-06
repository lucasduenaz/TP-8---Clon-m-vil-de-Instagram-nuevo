import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InteractionRow from "../ui/widgets/InteractionRow";

// Encabezado del detalle: avatar, usuario y ubicación con navegación al perfil
function DetailHeader({ post, onGoToProfile }) {
  return (
    <View style={styles.postHeader}>
      <Pressable onPress={onGoToProfile}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
      </Pressable>
      <View style={styles.headerInfo}>
        <Text style={styles.username}>{post.username}</Text>
        <Text style={styles.location}>{post.location}</Text>
      </View>
    </View>
  );
}

// Bloque de etiquetas temáticas del post
function TagList({ tags }) {
  return (
    <View style={styles.tagRow}>
      {tags.map((tag) => (
        <Text key={tag} style={styles.tagText}>
          {tag}
        </Text>
      ))}
    </View>
  );
}

// Vista extendida de una publicación con imagen grande, comentarios y like interactivo
export default function EntryDetailView({ route, navigation }) {
  const { post } = route.params;

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  function toggleLike() {
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked((prev) => !prev);
  }

  const navigateToProfile = () => navigation.navigate("Profile");

  // El contenido que aparece antes de la lista de comentarios
  const headerContent = (
    <>
      <DetailHeader post={post} onGoToProfile={navigateToProfile} />

      <Image source={{ uri: post.image }} style={styles.mainImage} />

      <InteractionRow
        isLiked={isLiked}
        onToggleLike={toggleLike}
        onOpenComments={null}
      />

      <Text style={styles.likeCount}>{likeCount} Me gusta</Text>

      <Text style={styles.captionBlock}>
        <Text style={styles.username}>{post.username}</Text>
        {"  "}
        {post.caption}
      </Text>

      <TagList tags={post.tags} />

      <Text style={styles.timestamp}>{post.date}</Text>

      <Text style={styles.commentsHeading}>Comentarios</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.screen} edges={["left", "right"]}>
      <FlatList
        data={post.comments}
        keyExtractor={(_, idx) => `cmt-${idx}`}
        ListHeaderComponent={headerContent}
        renderItem={({ item, index }) => (
          <View style={styles.commentRow}>
            <Text style={styles.commentText}>
              <Text style={styles.username}>usuario_{index + 1}</Text>
              {"  "}
              {item}
            </Text>
          </View>
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
  postHeader: {
    height: 58,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  headerInfo: {
    flex: 1,
  },
  username: {
    fontWeight: "700",
    color: "#262626",
  },
  location: {
    fontSize: 12,
    color: "#737373",
  },
  mainImage: {
    width: "100%",
    height: 440,
    backgroundColor: "#efefef",
  },
  likeCount: {
    paddingHorizontal: 12,
    fontWeight: "700",
    marginBottom: 6,
    color: "#262626",
  },
  captionBlock: {
    paddingHorizontal: 12,
    lineHeight: 20,
    marginBottom: 8,
    color: "#262626",
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: 8,
  },
  tagText: {
    color: "#00376b",
    fontSize: 14,
  },
  timestamp: {
    paddingHorizontal: 12,
    color: "#8e8e8e",
    fontSize: 12,
    textTransform: "uppercase",
    marginBottom: 14,
  },
  commentsHeading: {
    paddingHorizontal: 12,
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 8,
  },
  commentRow: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
  commentText: {
    fontSize: 14,
    color: "#262626",
    lineHeight: 20,
  },
});
