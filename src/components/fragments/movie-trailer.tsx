import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2Icon, PlayIcon } from "lucide-react";

export const MovieTrailer: React.FC<{ trailerKey: string; backdropPath: string }> = ({ trailerKey, backdropPath }) => {
  const backdropUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;
  const [isLoading, setIsLoading] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const [isPlay, setIsPlay] = useState(false)

  // Handle video state when it starts playing
  const handleVideoReady = () => {
    setIsLoading(false);
  };

  // Handle when the video ends
  const handleVideoEnd = () => {
    setIsEnded(true);
  };

  return (
    <div className="bg-gray-300 aspect-video relative">
      {((isLoading || isEnded) || !trailerKey || !isPlay) && !!backdropPath && (
        <div className="absolute w-full h-full top-0 left-0 aspect-video z-[1] group cursor-pointer">
          <img
            src={backdropUrl}
            alt="backdrop-trailer"
            className="h-full w-full object-cover aspect-video"
          />
          <div className="bg-black/10 opacity-0 group-hover:!opacity-100 transition-all absolute z-[2] top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <Button variant="outline" size="icon" className="rounded-full h-20 w-20 p-4 bg-white/80" onClick={() => setIsPlay(true)} disabled={(isLoading && isPlay) || !trailerKey}>
              {isLoading && isPlay ? (<Loader2Icon className="animate-spin h-full w-full" />) : (<PlayIcon className="h-full w-full" />)}
            </Button>
          </div>
        </div>
      )}
      {isPlay && !isEnded && !!trailerKey && (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailerKey}?enablejsapi=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: isLoading ? -1 : 2,
            border: 'none',
          }}
          onLoad={handleVideoReady}
          onEnded={handleVideoEnd}
          className="aspect-video"
        />
      )}
    </div>
  );
};
