//
//  App.tsx
//  dino-league
//
//  Created by d-exclaimation on 25 Nov 2022
//
import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PartyPage from "./pages/party";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PartyPage />,
  },
]);

const App: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
