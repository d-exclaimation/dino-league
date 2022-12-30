//
//  App.tsx
//  dino-league
//
//  Created by d-exclaimation on 25 Nov 2022
//
import AuthProvider from "@dino/apollo/src/auth/AuthProvider";
import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoadingBar from "./pages/common/LoadingBar";
import MainPage from "./pages/main";
import PartyPage from "./pages/party";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "login",
    element: <div>Login</div>,
  },
  {
    path: "/party",
    element: <PartyPage />,
  },
  {
    path: "/sandbox",
    element: <LoadingBar />,
  },
]);

const App: FC = () => {
  return (
    <AuthProvider>
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
};

export default App;
