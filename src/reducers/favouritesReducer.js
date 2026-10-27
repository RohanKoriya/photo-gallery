export default function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const photoId = action.payload;

      if (state.includes(photoId)) {
        return state.filter((id) => id !== photoId);
      }

      return [...state, photoId];
    }

    default:
      return state;
  }
}

// Safely restore saved favourites when the app initializes.
export function getInitialFavourites() {
  try {
    const savedFavourites = localStorage.getItem("favouritePhotoIds");

    if (!savedFavourites) {
      return [];
    }

    const parsedFavourites = JSON.parse(savedFavourites);

    if (
      !Array.isArray(parsedFavourites) ||
      !parsedFavourites.every(
        (id) =>
          (typeof id === "string" && id.length > 0) ||
          (typeof id === "number" && Number.isFinite(id))
      )
    ) {
      return [];
    }

    // Remove duplicate IDs if saved data contains any.
    return [...new Set(parsedFavourites)];
  } catch {
    // Invalid JSON or inaccessible localStorage.
    return [];
  }
}