import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App, { Game } from "./routes/App.tsx";
import { createBrowserRouter, Params, RouterProvider } from "react-router-dom";
import GamePage from "./routes/games/GamePage.tsx";
import connections from "./connections.json";
import { GameContext, GameProvider } from "./routes/games/GameContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <span>oh noooo</span>,
    children: [
      {
        path: "games/:gameId",
        // element: <GamePage />,
        element: (
          <GameProvider>
            <GamePage />
          </GameProvider>
        ),
        loader: ({ params }) => {
          const games = connections as Game[];
          const asNumber = parseInt(params.gameId ?? "0", 10);
          return games[asNumber];
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
