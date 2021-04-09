import { html, render } from "../node_modules/lit-html/lit-html.js";
import { repeat } from "../node_modules/lit-html/directives/repeat.js";
import page from "../node_modules/page/page.mjs";
import { guestNavBar, userNavBar } from "./nabBar.js";
import { footer } from "./footer.js";
import { request } from "./httpRequests.js";

const login = () => html`
${sessionStorage.getItem("logged") ? userNavBar() : guestNavBar()}
<section id="login-page" class="content auth">
    <h1>Login</h1>

    <form id="login" action="#" method="">
        <fieldset>
            <blockquote>Knowledge is like money: to be of value it must circulate, and in circulating it can
                increase in quantity and, hopefully, in value</blockquote>
            <p class="field email">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="maria@email.com">
            </p>
            <p class="field password">
                <label for="login-pass">Password:</label>
                <input type="password" id="login-pass" name="password">
            </p>
            <p class="field submit">
                <input @click=${log} class="btn submit" type="submit" value="Log in">
            </p>
            <p class="field">
                <span>If you don't have profile click <a @click=${clickHere} href="#">here</a></span>
            </p>
        </fieldset>
    </form>
</section>
${footer()}
`

export function showLoginPage() {
    render(login(), document.getElementById("main-content") );
}


async function log(e) {
    e.preventDefault();
    const form = [...new FormData(document.getElementById("login")).entries()];
    const username = form[0][1];
    const pass = form[1][1];

    if (username && pass) {
        try {
            const body = { email: username, password: pass };
            const data = await request("http://localhost:3030/users/login", "post", body);
            sessionStorage.setItem("token", data.accessToken);
            sessionStorage.setItem("email", data.email);
            sessionStorage.setItem("owner", data._id);
            sessionStorage.setItem("logged", true);
            page("/");
        } catch (err) {
            return;
        }
    } else {
        alert("All Fields Are Mandatory!");
    }

}


function clickHere(e) {
    e.preventDefault();
    page("/register")
}