import { CardMovie } from '@/components/fragments/card-movie'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { movieServices } from '@/services/movie'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

export const SearchContainer = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';

  const { data: genres = [] } = useQuery({
    queryKey: [movieServices.getMovieGenres.key],
    queryFn: async () => (await movieServices.getMovieGenres.call()).data?.genres
  })

  const { data: dataRawSearched, isPending: isPendingDisocver, isFetching: isFetchingSearched, fetchNextPage: fetchNextPageSearched, hasNextPage: hasNextPageSearched } = useInfiniteQuery({
    queryKey: [movieServices.getSearchMovie.key, { q }],
    queryFn: async ({ pageParam }) => (await movieServices.getSearchMovie.call({ page: pageParam, query: q })).data,
    getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!q,
  })
  const dataSearched = dataRawSearched?.pages.flatMap((page) => page.results);
  const isLoadingSearched = isPendingDisocver || isFetchingSearched;

  return (
    <section className="max-w-[1420px] mx-auto">
      <h1 className="font-bold text-xl mb-2">Search {(dataSearched?.length || 0) > 1 ? "Results" : "Result"} from {q}:</h1>
      <div className="flex flex-row flex-wrap gap-3">
        {dataSearched?.map((movie) => (
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
        {isLoadingSearched && Array.from({ length: 10 }).map((_, idx) => (
          <Skeleton key={'skeleton-Searched' + idx} className="w-48 aspect-[2/3]" />
        ))}
      </div>
      {hasNextPageSearched && !isLoadingSearched && (
        <div className="flex items-center justify-center py-4">
          <Button onClick={() => fetchNextPageSearched()} className="w-fit" variant="secondary">
            Load More
          </Button>
        </div>
      )}
    </section>
  )
}
