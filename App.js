import { StatusBar } from "expo-status-bar";
import RootNavigator from "./src/routing/RootNavigator";
import { LikesProvider } from "./src/context/LikesContext";

// Punto de entrada de la aplicación.
// LikesProvider envuelve todo el árbol para que cualquier componente
// pueda leer y modificar el estado global de "me gusta".
export default function App() {
  return (
    <LikesProvider>
      <StatusBar style="dark" />
      <RootNavigator />
    </LikesProvider>
  );
}
