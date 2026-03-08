import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import MyTeam from "./pages/MyTeam";
import Standings from "./pages/Standings";
import Market from "./pages/Market";
import Calendar from "./pages/Calendar";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "squadra", Component: MyTeam },
      { path: "classifica", Component: Standings },
      { path: "mercato", Component: Market },
      { path: "calendario", Component: Calendar },
    ],
  },
]);
