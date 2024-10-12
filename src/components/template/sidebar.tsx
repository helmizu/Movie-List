import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQuery } from "@tanstack/react-query"
import { movieServices } from "@/services/movie"
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"

export const Sidebar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const { data: genres = [] } = useQuery({
    queryKey: [movieServices.getMovieGenres.key],
    queryFn: async () => (await movieServices.getMovieGenres.call()).data?.genres
  })

  return (
    <div className={cn("h-full", className)}>
      <div className="flex gap-2 flex-col h-[calc(100vh-40px)]">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <NavLink to="/browse">
              {({ isActive }) => {
                return (
                  <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="10 8 16 12 10 16 10 8" />
                    </svg>
                    Watch Now
                  </Button>
                )
              }}
            </NavLink>
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Genres
          </h2>
          <ScrollArea className="h-[calc(100vh-192px)] px-1">
            <div className="space-y-1 p-2">
              {genres?.map((genre, i) => (
                <NavLink to={`/genre/${genre.id}`} key={`${genre.id}-${i}`}>
                  {({ isActive }) => {
                    return (
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className="w-full justify-start font-normal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4"
                        >
                          <path d="m16 6 4 14" />
                          <path d="M12 6v14" />
                          <path d="M8 8v12" />
                          <path d="M4 4v16" />
                        </svg>
                        {genre.name}
                      </Button>
                    )
                  }}
                </NavLink>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div >
    </div >
  )
}