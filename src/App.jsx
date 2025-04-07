import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoutes } from "./layout/ProtectedRoutes";
import RootLayouts from "./layout/RootLayouts";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Mualliflar from "./pages/Mualliflar";
import { Toaster } from "sonner";

function App() {
  const admin = true;
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes admin={admin}>
          <RootLayouts />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/authors",
          element: <Mualliflar />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />,
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
