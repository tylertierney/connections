import { Link, Outlet } from "react-router-dom";
import styles from "./App.module.css";
import { Bounce, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import useTheme from "../hooks/useTheme";

const sunIcon = (
  <svg
    fill="inherit"
    height="1.5rem"
    width="1.5rem"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 457.32 457.32"
    xmlSpace="preserve"
  >
    <g id="XMLID_467_">
      <path
        id="XMLID_922_"
        d="M228.66,112.692c-63.945,0-115.968,52.022-115.968,115.967c0,63.945,52.023,115.968,115.968,115.968
s115.968-52.023,115.968-115.968C344.628,164.715,292.605,112.692,228.66,112.692z"
      />
      <path
        fill="var(--text-color)"
        id="XMLID_1397_"
        d="M401.429,228.66l42.467-57.07c2.903-3.9,3.734-8.966,2.232-13.59c-1.503-4.624-5.153-8.233-9.794-9.683
l-67.901-21.209l0.811-71.132c0.056-4.862-2.249-9.449-6.182-12.307c-3.934-2.858-9.009-3.633-13.615-2.077l-67.399,22.753
L240.895,6.322C238.082,2.356,233.522,0,228.66,0c-4.862,0-9.422,2.356-12.235,6.322l-41.154,58.024l-67.4-22.753
c-4.607-1.555-9.682-0.781-13.615,2.077c-3.933,2.858-6.238,7.445-6.182,12.307l0.812,71.132l-67.901,21.209
c-4.641,1.45-8.291,5.059-9.793,9.683c-1.503,4.624-0.671,9.689,2.232,13.59l42.467,57.07l-42.467,57.07
c-2.903,3.9-3.734,8.966-2.232,13.59c1.502,4.624,5.153,8.233,9.793,9.683l67.901,21.208l-0.812,71.132
c-0.056,4.862,2.249,9.449,6.182,12.307c3.934,2.857,9.007,3.632,13.615,2.077l67.4-22.753l41.154,58.024
c2.813,3.966,7.373,6.322,12.235,6.322c4.862,0,9.422-2.356,12.235-6.322l41.154-58.024l67.399,22.753
c4.606,1.555,9.681,0.781,13.615-2.077c3.933-2.858,6.238-7.445,6.182-12.306l-0.811-71.133l67.901-21.208
c4.641-1.45,8.291-5.059,9.794-9.683c1.502-4.624,0.671-9.689-2.232-13.59L401.429,228.66z M228.66,374.627
c-80.487,0-145.968-65.481-145.968-145.968S148.173,82.692,228.66,82.692s145.968,65.48,145.968,145.967
S309.147,374.627,228.66,374.627z"
      />
    </g>
  </svg>
);

const moonIcon = (
  <svg
    width="1.5rem"
    height="1.5rem"
    stroke="none"
    viewBox="0 0 24 24"
    fill="inherit"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      fill="inherit"
    />
  </svg>
);

export interface Answer {
  level: number;
  group: string;
  members: string[];
}

export interface Game {
  id: number;
  date: string;
  answers: Answer[];
}

export default function App() {
  const [darkTheme, setDarkTheme] = useTheme();

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
        icon={undefined}
      />
      <nav className={styles.nav}>
        <Link to={"puzzles"} className="hoverable-link">
          Puzzles
        </Link>
        <button
          className={styles.themeButton}
          onClick={() => setDarkTheme((prev) => !prev)}
        >
          {darkTheme ? sunIcon : moonIcon}
        </button>
      </nav>

      <Outlet></Outlet>
    </>
  );
}
