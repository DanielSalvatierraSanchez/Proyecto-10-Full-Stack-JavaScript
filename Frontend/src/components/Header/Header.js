import { navigate } from "../../functions/navigate";
import { routes } from "../../routes/routes";
import "./Header.css";

export const Header = () => {
    const header = document.createElement("header");
    const nav = document.createElement("nav");
    const ul = document.createElement("ul");

    for (const route of routes) {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.textContent = route.title;
        a.href = route.path;
        a.addEventListener("click", (e) => {
            navigate(e, route);
        });
        li.append(a);
        ul.append(li);
    }
    nav.append(ul);
    header.append(nav);
    document.body.append(header);
};
