import { Button } from "../Button/Button";
import { FieldForm } from "../FieldForm/FieldForm";
import "./LoginForm.css";

export const LoginForm = (form) => {
    form.className = "login-form";
    form.innerHTML = `
    <h2>Login</h2>
        ${FieldForm({ labelText: "Nombre / Email", inputType: "text", inputPlaceholder: "Nombre o Email" })}
        ${FieldForm({ labelText: "Contraseña", inputType: "password", inputPlaceholder: "********" })}
    `;

    form.append(Button({ text: "Login" }));
};
