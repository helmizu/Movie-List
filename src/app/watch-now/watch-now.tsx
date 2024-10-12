import { CardMovie } from '@/components/fragments/card-movie'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { movieServices } from '@/services/movie'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export const WatchNow = () => {
  const { data: genres = [] } = useQuery({
    queryKey: [movieServices.getMovieGenres.key],
    queryFn: async () => (await movieServices.getMovieGenres.call()).data?.genres
  })

  const { data, isPending, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [movieServices.getMovieNowPlaying.key],
    queryFn: async ({ pageParam }) => (await movieServices.getMovieNowPlaying.call({ page: pageParam })).data,
    getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  })
  const dataNowPlaying = data?.pages.flatMap((page) => page.results);
  const isLoadingNowPlaying = isPending || isFetching;
  const { ref, inView } = useInView();

  const { data: dataRawDiscover, isPending: isPendingDisocver, isFetching: isFetchingDiscover, fetchNextPage: fetchNextPageDiscover, hasNextPage: hasNextPageDiscover } = useInfiniteQuery({
    queryKey: [movieServices.getMovieDiscover.key],
    queryFn: async ({ pageParam }) => (await movieServices.getMovieDiscover.call({ page: pageParam })).data,
    getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  })
  const dataDiscover = dataRawDiscover?.pages.flatMap((page) => page.results);
  const isLoadingDiscover = isPendingDisocver || isFetchingDiscover;

  useEffect(() => {
    if (inView && !isLoadingNowPlaying) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView, isLoadingNowPlaying])


  return (
    <div className="flex flex-col gap-4 overflow-auto">
      <section>
        <h1 className="font-bold text-xl mb-2">Now Playing</h1>
        <ScrollArea>
          <div className="flex gap-3 flex-row pb-3">
            {dataNowPlaying?.map((movie) => (
              <CardMovie
                movieId={movie.id}
                className="w-48"
                key={movie.id}
                posterPath={movie.poster_path}
                title={movie.title}
                releaseDate={movie.release_date}
                genres={genres.filter((genre) => movie.genre_ids.includes(genre.id)).map((genre) => genre.name)}
                rate={movie.vote_average}
              />
            ))}
            {isLoadingNowPlaying && Array.from({ length: 10 }).map((_, idx) => (
              <Skeleton key={'skeleton-playing-now' + idx} className="w-48 aspect-[2/3]" />
            ))}
            {hasNextPage && !isLoadingNowPlaying && (
              <div ref={ref}>
                <Skeleton className="w-48 aspect-[2/3]" />
              </div>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
      <section>
        <h1 className="font-bold text-xl mb-2">Discover</h1>
        <div className="flex flex-row flex-wrap gap-3">
          {dataDiscover?.map((movie) => (
            <CardMovie
              movieId={movie.id}
              className="w-48"
              key={movie.id}
              posterPath={movie.poster_path}
              title={movie.title}
              releaseDate={movie.release_date}
              genres={genres.filter((genre) => movie.genre_ids.includes(genre.id)).map((genre) => genre.name)}
              rate={movie.vote_average}
            />
          ))}
          {isLoadingDiscover && Array.from({ length: 10 }).map((_, idx) => (
            <Skeleton key={'skeleton-discover' + idx} className="w-48 aspect-[2/3]" />
          ))}
        </div>
        {hasNextPageDiscover && !isLoadingDiscover && (
          <div className="flex items-center justify-center py-4">
            <Button onClick={() => fetchNextPageDiscover()} className="w-fit" variant="secondary">
              Load More
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}
