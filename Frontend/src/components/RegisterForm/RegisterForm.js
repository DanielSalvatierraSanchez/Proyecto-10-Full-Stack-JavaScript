import { Button } from "../Button/Button";
import { FieldForm } from "../FieldForm/FieldForm";
import "./RegisterForm.css";

export const RegisterForm = (form) => {
    form.className = "register-form";
    form.innerHTML = `
    <h2>Registro de Usuario</h2>
    ${FieldForm({ labelText: "Nombre de Usuario:", inputType: "text", inputPlaceholder: "Nombre de Usuario" })}
    ${FieldForm({ labelText: "Email:", inputType: "email", inputPlaceholder: "email@email.email" })}
    ${FieldForm({ labelText: "Contraseña:", inputType: "password", inputPlaceholder: "********" })}
    ${FieldForm({ labelText: "Teléfono:", inputType: "tel", inputPlaceholder: "123456789" })}
    ${FieldForm({ labelText: "Imagen de perfil:", inputType: "file", inputPlaceholder: "123456789" })}
    `;

    form.append(Button({ text: "Crear Cuenta" }));
};
