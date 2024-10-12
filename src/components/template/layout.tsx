import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { ScrollArea } from "../ui/scroll-area"
import clsx from "clsx"
import { MovieDetails } from "@/app/movie-details"

interface LayoutProps {
  children?: React.ReactNode
  hideSidebar?: boolean
}

export const Layout: React.FC<LayoutProps> = ({ children, hideSidebar = false }) => {
  return (
    <>
      <div className="">
        <Header />
        <div className="border-t">
          <div className="bg-background">
            <div className={clsx("grid", !hideSidebar && "lg:grid-cols-5")}>
              {!hideSidebar && (<Sidebar className="hidden lg:block" />)}
              <ScrollArea className={clsx(!hideSidebar && "col-span-3 lg:col-span-4 lg:border-l", "py-3 px-6 h-[calc(100vh-40px)]")}>
                {children}
                <MovieDetails />
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}