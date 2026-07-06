import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeView from "../views/HomeView";
import LookupView from "../views/LookupView";
import DiscoverView from "../views/DiscoverView";
import ClipsView from "../views/ClipsView";
import UserProfileView from "../views/UserProfileView";

const BottomTab = createBottomTabNavigator();

// Mapa de configuración de cada pestaña: nombre de ruta → íconos activo/inactivo
const TAB_ICONS = {
  Home:    { active: "home",          inactive: "home-outline" },
  Search:  { active: "search",        inactive: "search-outline" },
  Explore: { active: "compass",       inactive: "compass-outline" },
  Reels:   { active: "play-circle",   inactive: "play-circle-outline" },
  Profile: { active: "person-circle", inactive: "person-circle-outline" },
};

function resolveIcon(routeName, focused) {
  const entry = TAB_ICONS[routeName];
  if (!entry) return "ellipse-outline";
  return focused ? entry.active : entry.inactive;
}

// Barra de pestañas inferior con las cinco secciones principales
export default function TabBar({ posts, loading, error }) {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 64,
          backgroundColor: "#ffffff",
          borderTopColor: "#dbdbdb",
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#262626",
        tabBarIcon: ({ focused, color }) => (
          <Ionicons
            name={resolveIcon(route.name, focused)}
            size={27}
            color={color}
          />
        ),
      })}
    >
      <BottomTab.Screen name="Home">
        {(props) => (
          <HomeView {...props} posts={posts} loading={loading} error={error} />
        )}
      </BottomTab.Screen>

      <BottomTab.Screen name="Search" component={LookupView} />
      <BottomTab.Screen name="Explore" component={DiscoverView} />
      <BottomTab.Screen name="Reels" component={ClipsView} />

      <BottomTab.Screen name="Profile">
        {(props) => <UserProfileView {...props} posts={posts} />}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
}
