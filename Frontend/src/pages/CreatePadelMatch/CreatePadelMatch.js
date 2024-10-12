import { createPage } from "../../functions/createPage";
import "./CreatePadelMatch.css";

export const CreatePadelMatch = () => {
    const div = createPage("CreatePadelMatch");
    // const main = document.querySelector("main");
    // const divCreate = document.createElement("div");
    // const divCreateData = document.createElement("div");

    // divCreate.classList("divCreate");
    // divCreateData.classList("divCreateData");

    // main.innerHTML = "";
    div.innerHTML = "<h1>Crea un partido</h1>";
    // divCreate.innerHTML = "Crea un partido de padel";
    // divCreateData.innerHTML = "Datos del partido de padel";

    // divCreate.append(divCreateData);
    // main.append(divCreate);
};
