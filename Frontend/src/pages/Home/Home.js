import { createPage } from "../../functions/createPage";
import "./Home.css";

export const Home = () => {
    const div = createPage("Home");
    div.innerHTML = "<h1>Esto es la Home</h1>";
};
