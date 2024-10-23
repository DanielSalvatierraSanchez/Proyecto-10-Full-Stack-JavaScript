import { Button } from "../../components/Button/Button";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { createPage } from "../../functions/createPage";
import { Login } from "../Login/login";
import "./Home.css";

export const Home = () => {
    const div = createPage("Home");
    div.innerHTML = "<h1>Bienvenido a APPADEL</h1>";
    const homeContainer = document.createElement("div");
    homeContainer.classList.add("home-container");
    homeContainer.innerHTML = `
    <h1>Bienvenido a APPADEL</h1>
    <br/>
    <p>La APP de gestión de partidos de padel donde podrás crear y encontrar partidos donde poder apuntarte a ellos.</p>
    `;
    // homeContainer.textContent = "Home";
    div.append(homeContainer);
    Button({
        text: "Login / Registro",
        fnc: () => {
            showForm = !showForm;
            showForm ? LoginForm(form) : RegisterForm(form);
        }
    });
    // Button({
    //     text: "Login / Registro",
    //     fnc: () => {
    //         showForm = !showForm;
    //         showForm ? LoginForm(form) : RegisterForm(form);
    //     }
    // });
};
