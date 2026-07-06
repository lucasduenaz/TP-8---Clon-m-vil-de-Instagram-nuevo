import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// Vista de exploración — pantalla sin contenido dinámico
export default function DiscoverView() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.body}>
        <Ionicons name="compass-outline" size={42} color="#262626" />
        <Text style={styles.heading}>Explorar</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#262626",
    marginTop: 12,
  },
});
