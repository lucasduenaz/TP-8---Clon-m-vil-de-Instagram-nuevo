import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import InteractionRow from "./InteractionRow";

// Encabezado de la publicación: avatar, usuario, ubicación y menú
function EntryHeader({ avatarUri, username, location }) {
  return (
    <View style={styles.header}>
      <Image source={{ uri: avatarUri }} style={styles.avatar} />
      <View style={styles.headerText}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
      <Ionicons name="ellipsis-horizontal" size={20} color="#262626" />
    </View>
  );
}

// Tarjeta completa de una publicación en el feed
export default function FeedEntry({ post, onOpenPost }) {
  const [liked, setLiked] = useState(false);

  // El contador de likes refleja el estado local del botón
  const displayLikes = liked ? post.likes + 1 : post.likes;

  const toggleLike = () => setLiked((prev) => !prev);

  return (
    <View style={styles.card}>
      <EntryHeader
        avatarUri={post.avatar}
        username={post.username}
        location={post.location}
      />

      <Pressable onPress={onOpenPost} accessibilityRole="button">
        <Image
          source={{ uri: post.image }}
          style={styles.photo}
          resizeMode="cover"
        />
      </Pressable>

      <InteractionRow
        isLiked={liked}
        onToggleLike={toggleLike}
        onOpenComments={onOpenPost}
      />

      <Text style={styles.likeCount}>{displayLikes} Me gusta</Text>

      <Text style={styles.captionLine}>
        <Text style={styles.username}>{post.username}</Text>
        {"  "}
        {post.caption}
      </Text>

      <Pressable onPress={onOpenPost}>
        <Text style={styles.viewMore}>Ver publicación completa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
  header: {
    height: 56,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  username: {
    fontWeight: "700",
    color: "#262626",
  },
  location: {
    fontSize: 12,
    color: "#262626",
    marginTop: 1,
  },
  photo: {
    width: "100%",
    height: 420,
    backgroundColor: "#efefef",
  },
  likeCount: {
    paddingHorizontal: 12,
    fontWeight: "700",
    marginBottom: 6,
    color: "#262626",
  },
  captionLine: {
    paddingHorizontal: 12,
    fontSize: 14,
    lineHeight: 20,
    color: "#262626",
    marginBottom: 6,
  },
  viewMore: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    color: "#737373",
    fontSize: 14,
  },
});
