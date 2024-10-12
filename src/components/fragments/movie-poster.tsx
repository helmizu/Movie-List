import React from "react";

export const MoviePoster: React.FC<{ path: string; title?: string }> = ({ path, title = '' }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${path}`;

  return (
    <img
      src={imageUrl}
      alt={`Poster ${title}`}
      className="h-full w-full"
      loading="lazy"
      // onError={(e) => { e.currentTarget.src = "" }}
    />
  );
};