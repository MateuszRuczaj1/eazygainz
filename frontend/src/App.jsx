import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import About from "./pages/About";
import Trainings from "./pages/Trainings";
import { QueryClient, QueryClientProvider } from "react-query";
import Register from "./pages/Register";
import PrivateRoutes from "./components/PrivateRoutes";
function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          element: <PrivateRoutes />,
          children: [
            {
              path: "/trainings",

              element: <Trainings />,
            },
          ],
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
