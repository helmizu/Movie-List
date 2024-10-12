import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactQueryProvider } from './providers/react-query/provider.tsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
} from 'react-router-dom'
import './index.css'
import { WatchNow } from './app/watch-now/watch-now.tsx'
import { ListByGenre } from './app/list-by-genre/list-by-genre.tsx'
import { Layout } from './components/template/layout.tsx'
import { SearchContainer } from './app/search/search.tsx'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     loader: () => {
//       return redirect('/browse')
//     },
//   },
//   {
//     path: "/browse",
//     element: <WatchNow />,
//   },
//   {
//     path: "/genre/:genreId",
//     element: <ListByGenre />,
//   }
// ]);


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        path="/"
        loader={() => redirect('/browse')}
      />
      <Route
        path="/browse"
        element={
          <Layout>
            <WatchNow />
          </Layout>
        }
      />
      <Route
        path="/genre/:genreId"
        element={
          <Layout>
            <ListByGenre />
          </Layout>
        }
      />
      <Route
        path="/search"
        element={
          <Layout hideSidebar>
            <SearchContainer />
          </Layout>
        }
      />
    </Route>
  )
);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <RouterProvider router={router} />
    </ReactQueryProvider>
  </StrictMode>,
)
