//
//  App.tsx
//  dino-league
//
//  Created by d-exclaimation on 25 Nov 2022
//
import AuthProvider from "@dino/apollo/src/auth/AuthProvider";
import type { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BarrackPage from "./pages/barrack";
import InventoryPage from "./pages/inventory";
import LoginPage from "./pages/login";
import MainPage from "./pages/main";
import PartyPage from "./pages/party";
import PvEPage from "./pages/pve";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "/party",
    element: <PartyPage />,
  },
  {
    path: "/pve",
    element: <PvEPage />,
  },
  {
    path: "/barrack",
    element: <BarrackPage />,
  },
  {
    path: "/inventory",
    element: <InventoryPage />,
  },
  {
    path: "*",
    element: <MainPage />,
  },
]);

const App: FC = () => {
  return (
    <AuthProvider>
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <RouterProvider router={router} />
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </AuthProvider>
  );
};

export default App;
