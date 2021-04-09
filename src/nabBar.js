import { html } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { request } from "./httpRequests.js";

export const userNavBar = () => html`
<header>
    <h1><a @click=${home} class="home" href="#">SoftWiki</a></h1>
    <nav class="nav-buttons">
        <a @click=${catalogue} href="#">Catalogue</a>
        <div id="user">
            <a @click=${create} href="#">Create</a>
            <a @click=${logout} href="#">Logout</a>
        </div>
    </nav>
</header>
`


export const guestNavBar = () => html`
<header>
    <h1><a @click=${home} class="home" href="#">SoftWiki</a></h1>
    <nav class="nav-buttons">
        <a @click=${catalogue} href="#">Catalogue</a>
        <div id="guest">
            <a @click=${login} href="#">Login</a>
            <a @click=${register} href="#">Register</a>
        </div>
    </nav>
</header>
`

// sessionStorage.getItem("logged") ? userNavBar() : guestNavBar()

function home(e) {
    e.preventDefault();
    page("/")
}

function catalogue(e) {
    e.preventDefault();
    page("/catalogue");
}

function create(e) {
    e.preventDefault();
    page("/create");
}

async function logout(e) {
    e.preventDefault();
    try {
        await request("http://localhost:3030/users/logout", "get", "", sessionStorage.getItem("token"));
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("owner");
        sessionStorage.removeItem("logged");
        page("/");
    } catch (err) {
        console.log(err);
    }
}

function login(e) {
    e.preventDefault();
    page("/login");
}

function register(e) {
    e.preventDefault();
    page("/register");
}