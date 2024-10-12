import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { XIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { movieServices } from "@/services/movie"
import { MovieTrailer } from "@/components/fragments/movie-trailer"
import { Badge } from "@/components/ui/badge"
import moment from "moment"
import { CardMovie } from "@/components/fragments/card-movie"
import { ScrollArea } from "@/components/ui/scroll-area"

export const MovieDetails = () => {
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const movieId = searchParams.get('mid')
  const { data: genres = [] } = useQuery({
    queryKey: [movieServices.getMovieGenres.key, { movieId }],
    queryFn: async () => (await movieServices.getMovieGenres.call()).data.genres,
    enabled: !!movieId
  })
  const { data } = useQuery({
    queryKey: [movieServices.getMovieDetail.key, { movieId }],
    queryFn: async () => (await movieServices.getMovieDetail.call(movieId!)).data,
    enabled: !!movieId
  })
  const trailerKey = data?.videos.results.find((video) => video.type === 'Trailer' && video.site === "YouTube")?.key;

  const onClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('mid');
    navigate(`${pathname}?${params.toString()}`, { replace: true });
  }

  return (
    <>
      <Dialog open={!!movieId}>
        <DialogContent className="max-w-screen-lg p-0 overflow-hidden" closeButton={false} onPointerDownOutside={onClose}>
          <ScrollArea className="max-h-[calc(100vh-80px)]">
            <div className="grid relative">
              <MovieTrailer backdropPath={data?.backdrop_path ?? ''} trailerKey={trailerKey ?? ""} />
              <div className="grid gap-3 p-4">
                <div className="grid grid-cols-3 gap-3">
                  {data ? (
                    <>
                      <div className="col-span-2 flex flex-col gap-2">
                        <div className="flex gap-1">
                          <Badge variant="default" className="pb-1 pt-[3px]">{data.release_date ? moment(data.release_date).format("YYYY") : ''}</Badge>
                          <Badge variant="default" className="pb-1 pt-[3px]">{data.spoken_languages.map(s => s.english_name).join(', ')}</Badge>
                          <Badge variant="default" className="pb-1 pt-[3px]">{data.production_countries.map(p => p.name).join(', ')}</Badge>
                        </div>
                        <h1 className="text-xl font-bold">{data.title}</h1>
                        <p>{data.overview}</p>
                      </div>
                      <div className="flex flex-col gap-2 text-sm">
                        <span className="font-medium"><span className="text-muted-foreground font-normal">Cast:</span> {data.credits.cast.sort((a, b) => b.popularity - a.popularity).slice(0, 5).map(c => c.name).join(', ')}</span>
                        <span className="font-medium"><span className="text-muted-foreground font-normal">Genre:</span> {data.genres.map(g => g.name).join(', ')}</span>
                        <span className="font-medium"><span className="text-muted-foreground font-normal">Score:</span> {data.vote_average?.toFixed(2)}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-span-2 flex flex-col gap-2">
                        <div className="flex gap-1">
                          <Skeleton className="w-12 h-6 rounded-full" />
                          <Skeleton className="w-12 h-6 rounded-full" />
                          <Skeleton className="w-12 h-6 rounded-full" />
                        </div>
                        <Skeleton className="w-1/2 h-7" />
                        <Skeleton className="w-full h-5" />
                        <Skeleton className="w-full h-5" />
                      </div>
                      <div className="flex flex-col gap-2 text-sm">
                        <span className="font-medium inline-flex items-center gap-1"><span className="text-muted-foreground font-normal">Cast:</span> <Skeleton className="w-full h-4" /></span>
                        <span className="font-medium inline-flex items-center gap-1"><span className="text-muted-foreground font-normal">Genre:</span> <Skeleton className="w-full h-4" /></span>
                        <span className="font-medium inline-flex items-center gap-1"><span className="text-muted-foreground font-normal">Score:</span> <Skeleton className="w-full h-4" /></span>
                      </div>
                    </>
                  )}
                </div>
                {!!data?.similar?.results?.length && (
                  <div>
                    <h6 className="font-bold mb-2">Similar Movies</h6>
                    <div className="grid grid-cols-6 gap-3">
                      {data?.similar.results.slice(0, 18).map((movie) => (
                        <CardMovie
                          movieId={movie.id}
                          className="w-full"
                          key={movie.id}
                          posterPath={movie.poster_path}
                          title={movie.title}
                          releaseDate={movie.release_date}
                          genres={genres.filter((genre) => movie.genre_ids.includes(genre.id)).map((genre) => genre.name)}
                          rate={movie.vote_average}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button variant="outline" size="icon" className="rounded-full absolute right-4 top-4 bg-white/50 z-10" onClick={onClose}>
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
