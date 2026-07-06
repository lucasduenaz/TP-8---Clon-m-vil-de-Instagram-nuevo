import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import TabBar from "./TabBar";
import EntryDetailView from "../views/EntryDetailView";
import { fetchCatPosts } from "../store/image_fetcher";

const RootStack = createNativeStackNavigator();

// Opciones visuales compartidas por todas las pantallas del stack
const SHARED_SCREEN_OPTIONS = {
  headerStyle: { backgroundColor: "#ffffff" },
  headerTitleStyle: { fontWeight: "700" },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: "#ffffff" },
};

// Ícono de mensajes directos en la esquina derecha del encabezado
function DirectMessagesButton() {
  return (
    <Pressable hitSlop={8}>
      <Ionicons name="paper-plane-outline" size={26} color="#262626" />
    </Pressable>
  );
}

// Navegador raíz: carga los posts, gestiona estados y monta el stack principal
export default function RootNavigator() {
  const [postList, setPostList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadFeed() {
      try {
        const results = await fetchCatPosts();
        if (!cancelled) setPostList(results);
      } catch {
        if (!cancelled) setFetchError("No se pudieron cargar las imágenes.");
      } finally {
        if (!cancelled) setIsFetching(false);
      }
    }

    loadFeed();

    // Limpieza para evitar actualizaciones de estado en componente desmontado
    return () => { cancelled = true; };
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={SHARED_SCREEN_OPTIONS}>
          <RootStack.Screen
            name="MainTabs"
            options={{
              title: "Instagram",
              headerRight: () => <DirectMessagesButton />,
            }}
          >
            {(props) => (
              <TabBar
                {...props}
                posts={postList}
                loading={isFetching}
                error={fetchError}
              />
            )}
          </RootStack.Screen>

          <RootStack.Screen
            name="PostDetail"
            component={EntryDetailView}
            options={{ title: "Publicación" }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
