import { Link, Outlet } from "react-router-dom";
import c from "../connections.json";
import "./App.css";

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
  const connections = c as Game[];

  return (
    <>
      <nav style={{ backgroundColor: "cornflowerblue" }}>
        this is where the navbar would be asd
        <button
          onClick={() => {
            document.body.classList.toggle("dark-theme");
          }}
        >
          test
        </button>
      </nav>
      <ul>
        {connections.slice(0, 9).map((game, i) => {
          return (
            <li key={i}>
              <Link to={`games/${i + 1}`}>Game #{i + 1} </Link>
            </li>
          );
        })}
      </ul>

      <Outlet></Outlet>
    </>
  );
}
