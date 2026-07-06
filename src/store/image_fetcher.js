import axios from "axios";
import {
  feedUsernames,
  postCaptions,
  postLocations,
  sampleComments,
  postTags,
} from "./seed_data";

// URL de la API pública de imágenes de gatos
const CAT_API_URL = "https://api.thecatapi.com/v1/images/search?limit=18";

// Convierte una respuesta cruda de la API en un objeto de publicación
// listo para ser consumido por la interfaz
function buildPostFromApiResult(catItem, position) {
  const pickByIndex = (arr) => arr[position % arr.length];

  return {
    id: catItem.id,
    image: catItem.url,
    avatar: catItem.url,
    username: pickByIndex(feedUsernames),
    location: pickByIndex(postLocations),
    caption: pickByIndex(postCaptions),
    likes: Math.floor(Math.random() * 900) + 100,
    date: "Hace unas horas",
    comments: sampleComments.slice(0, 3),
    tags: postTags.slice(0, 3),
  };
}

// Realiza la petición a The Cat API y devuelve el listado de publicaciones
export async function fetchCatPosts() {
  const { data } = await axios.get(CAT_API_URL);
  return data.map((cat, idx) => buildPostFromApiResult(cat, idx));
}
