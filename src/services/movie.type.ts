export interface MovieNowPlaying {
  adult: boolean
  backdrop_path?: string
  genre_ids: Array<number>
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface MovieGenres {
  genres: Array<{
    id: number
    name: string
  }>
}

export interface MovieDetails {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: any
  budget: number
  genres: Array<{
    id: number
    name: string
  }>
  homepage: string
  id: number
  imdb_id: string
  origin_country: Array<string>
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: Array<{
    id: number
    logo_path?: string
    name: string
    origin_country: string
  }>
  production_countries: Array<{
    iso_3166_1: string
    name: string
  }>
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: Array<{
    english_name: string
    iso_639_1: string
    name: string
  }>
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  videos: {
    results: Array<{
      iso_639_1: string
      iso_3166_1: string
      name: string
      key: string
      site: string
      size: number
      type: string
      official: boolean
      published_at: string
      id: string
    }>
  }
  images: {
    backdrops: Array<any>
    logos: Array<any>
    posters: Array<any>
  }
  credits: {
    cast: Array<{
      adult: boolean
      gender: number
      id: number
      known_for_department: string
      name: string
      original_name: string
      popularity: number
      profile_path?: string
      cast_id: number
      character: string
      credit_id: string
      order: number
    }>
    crew: Array<{
      adult: boolean
      gender: number
      id: number
      known_for_department: string
      name: string
      original_name: string
      popularity: number
      profile_path?: string
      credit_id: string
      department: string
      job: string
    }>
  }
  reviews: {
    page: number
    results: Array<{
      author: string
      author_details: {
        name: string
        username: string
        avatar_path?: string
        rating?: number
      }
      content: string
      created_at: string
      id: string
      updated_at: string
      url: string
    }>
    total_pages: number
    total_results: number
  }
  similar: {
    page: number
    results: Array<{
      adult: boolean
      backdrop_path?: string
      genre_ids: Array<number>
      id: number
      original_language: string
      original_title: string
      overview: string
      popularity: number
      poster_path: string
      release_date: string
      title: string
      video: boolean
      vote_average: number
      vote_count: number
    }>
    total_pages: number
    total_results: number
  }
}