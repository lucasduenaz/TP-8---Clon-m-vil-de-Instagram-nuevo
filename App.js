import { StatusBar } from "expo-status-bar";
import RootNavigator from "./src/routing/RootNavigator";

// Punto de entrada de la aplicación.
// Monta el navegador raíz y configura la barra de estado del sistema.
export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <RootNavigator />
    </>
  );
}