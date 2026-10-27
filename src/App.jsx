import { useEffect, useReducer } from "react";
import Gallery from "./components/Gallery";
import favouritesReducer, {
  getInitialFavourites,
} from "./reducers/favouritesReducer";

export default function App() {
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    getInitialFavourites,
  );

  useEffect(() => {
    try {
      localStorage.setItem("favouritePhotoIds", JSON.stringify(favourites));
    } catch {
      // The gallery still works if storage is unavailable.
    }
  }, [favourites]);

  function handleToggleFavourite(photoId) {
    dispatch({
      type: "TOGGLE_FAVOURITE",
      payload: photoId,
    });
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <header className="mb-10 border-b border-gray-200 pb-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Photo collection
              </p>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Photo Gallery
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600">
                Explore photographs, search by author, and save your favourites.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5 text-rose-500"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
                />
              </svg>

              <span>
                <strong>{favourites.length}</strong>{" "}
                {favourites.length === 1 ? "favourite" : "favourites"}
              </span>
            </div>
          </div>
        </header>

        <Gallery
          favourites={favourites}
          onToggleFavourite={handleToggleFavourite}
        />

        <footer className="mt-12 border-t border-gray-200 pt-5 text-center text-xs text-gray-500">
          Photos provided by{" "}
          <a
            href="https://picsum.photos/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-gray-900"
          >
            Lorem Picsum
          </a>
        </footer>
      </div>
    </main>
  );
}
