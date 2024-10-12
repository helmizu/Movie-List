import { MovieDetails, MovieGenres, MovieNowPlaying } from "./movie.type";

import callApi from "@/lib/network";
import { ParamsDataPagination, ResponseDataList } from "./type";

export const movieServices = {
  getMovieNowPlaying: {
    call: (params?: ParamsDataPagination) => {
      return callApi.get<ResponseDataList<MovieNowPlaying>>(`/3/movie/now_playing`, {
        params: {
          region: "ID",
          // include_adult: true,
          ...params,
        },
      });
    },
    key: "get-movie-now-playing",
  },
  getMovieGenres: {
    call: () => {
      return callApi.get<MovieGenres>(`/3/genre/movie/list`);
    },
    key: "get-movie-genres",
  },
  getMovieDiscover: {
    call: (params?: ParamsDataPagination & { with_genres?: string }) => {
      return callApi.get<ResponseDataList<MovieNowPlaying>>(`/3/discover/movie`, {
        params: {
          watch_region: "ID",
          // include_adult: true,
          ...params,
        },
      });
    },
    key: "get-movie-discover",
  },
  getSearchMovie: {
    call: (params?: ParamsDataPagination & { query?: string }) => {
      return callApi.get<ResponseDataList<MovieNowPlaying>>(`/3/search/movie`, {
        params: {
          watch_region: "ID",
          // include_adult: true,
          ...params,
        },
      });
    },
    key: "get-search-movie",
  },
  getMovieDetail: {
    call: (movieId: string) => {
      return callApi.get<MovieDetails>(`/3/movie/${movieId}`, {
        params: {
          append_to_response: "videos,images,credits,reviews,similar",
        },
      });
    },
    key: "get-movie-detail",
  },
}
