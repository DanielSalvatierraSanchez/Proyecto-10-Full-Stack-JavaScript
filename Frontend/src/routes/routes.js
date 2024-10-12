import { CreatePadelMatch } from "../pages/CreatePadelMatch/createPadelMatch";
import { Home } from "../pages/Home/home";
import { Login } from "../pages/Login/login";
import { PadelMatches } from "../pages/PadelMatches/padelMatches";

export const routes = [
    {
        path: "/home",
        title: "Home",
        page: Home
    },
    {
        path: "/padel-matches",
        title: "Partidos de Padel",
        page: PadelMatches
    },
    {
        path: "/create-padel-match",
        title: "Crea un partido",
        page: CreatePadelMatch
    },
    {
        path: "/login",
        title: "Login",
        page: Login
    }
];
