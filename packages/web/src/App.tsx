//
//  App.tsx
//  dino-league
//
//  Created by d-exclaimation on 25 Nov 2022
//
import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DinoView from "./components/common/DinoView";
import MinoDinoView from "./components/common/MinoDinoView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DinoView />,
  },
  {
    path: "/bin",
    element: <MinoDinoView />,
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
