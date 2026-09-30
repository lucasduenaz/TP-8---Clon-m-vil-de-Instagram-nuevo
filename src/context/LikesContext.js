import { createContext, useCallback, useMemo, useState } from "react";

// Context global de "me gusta": lista de IDs de publicaciones con like
export const LikesContext = createContext(null);

export function LikesProvider({ children }) {
  const [likedIds, setLikedIds] = useState([]);

  const toggleLike = useCallback((postId) => {
    setLikedIds((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  }, []);

  const isLiked = useCallback((postId) => likedIds.includes(postId), [likedIds]);

  const value = useMemo(
    () => ({ likedIds, toggleLike, isLiked }),
    [likedIds, toggleLike, isLiked]
  );

  return <LikesContext.Provider value={value}>{children}</LikesContext.Provider>;
}
