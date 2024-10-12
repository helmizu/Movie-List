import React from 'react'
import { Card } from '../ui/card'
import { MoviePoster } from './movie-poster'
import { ClassValue } from 'clsx';
import clsx from 'clsx';
import moment from 'moment';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

interface CardMovieProps {
  posterPath: string;
  title: string;
  className?: ClassValue;
  releaseDate: string;
  genres?: string[];
  rate: number;
  href?: string;
  movieId: number;
}

export const CardMovie: React.FC<CardMovieProps> = ({ posterPath, title, className, releaseDate, genres, rate, movieId }) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const onClick = () => {
    const params = new URLSearchParams(searchParams);
    if (!params.has("mid")) params.append('mid', movieId.toString());
    else params.set('mid', movieId.toString());
    navigate(`${pathname}?${params.toString()}`, { replace: true });
  }

  return (
    <Card className={clsx("p-0 overflow-hidden cursor-pointer relative group", className)} onClick={onClick}>
      <div className={clsx("aspect-[2/3]",)}>
        <MoviePoster path={posterPath} title={title} />
      </div>
      <div className="p-2 pb-4 flex flex-col opacity-0 group-hover:!opacity-100 transition-all absolute bottom-0 bg-black/80 left-0 right-0 !text-white">
        <h3 className="text-md font-semibold w-full truncate text-ellipsis">{title}</h3>
        <div className="flex flex-row gap-1">
          <span className="text-sm">{moment(releaseDate).format('YYYY')}</span>
          <span className="text-sm">•</span>
          <span className="text-sm">{rate?.toFixed(2)}/10</span>
        </div>
        <div className="flex flex-row gap-x-1 gap-y-0.5 flex-wrap">
          {genres?.map((genre, idx) => (
            <React.Fragment key={genre + idx}>
              {idx > 0 && <span className="text-xs">•</span>}
              <span key={genre} className="text-xs text-nowrap">{genre}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </Card>
  )
}
