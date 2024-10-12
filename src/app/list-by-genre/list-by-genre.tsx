import { CardMovie } from '@/components/fragments/card-movie'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { movieServices } from '@/services/movie'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export const ListByGenre = () => {
  const { genreId } = useParams();

  const { data: genres = [] } = useQuery({
    queryKey: [movieServices.getMovieGenres.key],
    queryFn: async () => (await movieServices.getMovieGenres.call()).data?.genres
  })

  const { data: dataRawDiscover, isPending: isPendingDisocver, isFetching: isFetchingDiscover, fetchNextPage: fetchNextPageDiscover, hasNextPage: hasNextPageDiscover } = useInfiniteQuery({
    queryKey: [movieServices.getMovieDiscover.key, { genreId }],
    queryFn: async ({ pageParam }) => (await movieServices.getMovieDiscover.call({ page: pageParam, with_genres: genreId })).data,
    getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  })
  const dataDiscover = dataRawDiscover?.pages.flatMap((page) => page.results);
  const isLoadingDiscover = isPendingDisocver || isFetchingDiscover;

  return (
    <section>
      <h1 className="font-bold text-xl mb-2">{genres.find(g => g.id === Number(genreId))?.name}</h1>
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
  )
}
