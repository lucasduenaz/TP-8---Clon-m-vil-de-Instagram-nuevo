import { FlatList, Image, StyleSheet, Text, View } from "react-native";

// Número máximo de historias visibles en la barra
const MAX_STORIES = 8;

// Elemento individual de historia: avatar circular con degradado y nombre
function StoryItem({ item }) {
  return (
    <View style={styles.storyWrapper}>
      <View style={styles.gradientRing}>
        <Image source={{ uri: item.avatar }} style={styles.storyPhoto} />
      </View>
      <Text style={styles.storyName} numberOfLines={1}>
        {item.username}
      </Text>
    </View>
  );
}

// Barra horizontal de historias que aparece en la parte superior del feed
export default function HighlightReel({ posts }) {
  const visibleStories = posts.slice(0, MAX_STORIES);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={visibleStories}
        keyExtractor={(item) => `hl-${item.id}`}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <StoryItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
  storyWrapper: {
    width: 78,
    alignItems: "center",
  },
  gradientRing: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: "#d62976",
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  storyPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  storyName: {
    width: 70,
    marginTop: 6,
    fontSize: 12,
    color: "#262626",
    textAlign: "center",
  },
});
