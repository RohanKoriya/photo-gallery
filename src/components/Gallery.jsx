import { useCallback, useMemo, useState } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import PhotoCard from "./PhotoCard";

export default function Gallery({ favourites, onToggleFavourite }) {
  const { photos, loading, error } = useFetchPhotos();
  const [search, setSearch] = useState("");

  // Keep the same handler reference between renders when dependencies are unchanged.
  const handleSearchChange = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  // Filter the already-fetched photos; this makes no API request.
  const filteredPhotos = useMemo(() => {
    const query = search.trim().toLowerCase();

    return photos.filter((photo) => photo.author.toLowerCase().includes(query));
  }, [photos, search]);

  if (loading) {
    return (
      <div
        className="flex min-h-64 flex-col items-center justify-center gap-3"
        role="status"
      >
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
        <p className="text-sm text-gray-600">Loading photos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-xl border border-red-200 bg-red-50 p-6 text-center"
        role="alert"
      >
        <p className="font-medium text-red-700">Unable to load photos</p>
        <p className="mt-2 text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <label
          htmlFor="author-search"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Search by author
        </label>

        <div className="relative">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="m16 16 4 4" />
          </svg>

          <input
            id="author-search"
            type="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Enter an author name..."
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <p className="mt-2 text-xs text-gray-500">
          Showing {filteredPhotos.length} of {photos.length} photos
        </p>
      </div>

      {filteredPhotos.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 px-4 py-16 text-center">
          <p className="font-medium text-gray-800">No photos found</p>
          <p className="mt-2 text-sm text-gray-500">
            Try searching for a different author.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={onToggleFavourite}
            />
          ))}
        </div>
      )}
    </section>
  );
}
