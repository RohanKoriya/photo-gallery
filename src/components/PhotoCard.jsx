export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-colors hover:border-gray-300">
      <div className="aspect-4/3 overflow-hidden bg-gray-100">
        <img
          src={photo.download_url}
          alt={`Photograph by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
        />
      </div>

      <div className="flex items-center justify-between gap-3 p-4">
        <p
          className="truncate text-sm font-medium text-gray-800"
          title={photo.author}
        >
          {photo.author}
        </p>

        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={
            isFavourite
              ? `Remove ${photo.author} photo from favourites`
              : `Add ${photo.author} photo to favourites`
          }
          aria-pressed={isFavourite}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ${
            isFavourite
              ? "border-rose-200 bg-rose-50 text-rose-600"
              : "border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-rose-500"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill={isFavourite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}
