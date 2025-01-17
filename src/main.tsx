import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App, { Game } from "./routes/App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GamePage from "./routes/puzzles/puzzle/GamePage.tsx";
import connections from "../connections.json";
import { GameProvider } from "./routes/puzzles/puzzle/GameContext.tsx";
import PuzzlesPage from "./routes/puzzles/PuzzlesPage.tsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <PuzzlesPage /> },
      {
        path: "puzzles",
        element: <PuzzlesPage />,
      },
      {
        path: "puzzles/:gameId",
        element: (
          <GameProvider>
            <GamePage />
          </GameProvider>
        ),
        loader: ({ params }) => {
          const games = connections as Game[];
          const asNumber = parseInt(params.gameId ?? "0", 10);
          return games.find(({ id }) => id === asNumber) ?? null;
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
