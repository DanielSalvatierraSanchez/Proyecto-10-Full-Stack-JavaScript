import { Button } from "../../components/Button/Button";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { createPage } from "../../functions/createPage";
import "./Login.css";

let showForm = true;

export const Login = () => {
    const div = createPage("Login");

    const form = document.createElement("form");

    div.append(
        Button({
            text: "Login / Registro",
            fnc: () => {
                showForm = !showForm;
                showForm ? LoginForm(form) : RegisterForm(form);
            }
        })
    );

    div.append(form);
    LoginForm(form);
};
