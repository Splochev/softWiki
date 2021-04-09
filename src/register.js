import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { guestNavBar, userNavBar } from "./nabBar.js";
import { footer } from "./footer.js";
import { request } from "./httpRequests.js";


const register = () => html`
${sessionStorage.getItem("logged") ? userNavBar() : guestNavBar()}
<section id="register-page" class="content auth">
    <h1>Register</h1>

    <form id="register" action="#" method="">
        <fieldset>
            <blockquote>Knowledge is not simply another commodity. On the contrary. Knowledge is never used up.
                It
                increases by diffusion and grows by dispersion.</blockquote>
            <p class="field email">
                <label for="register-email">Email:</label>
                <input type="email" id="register-email" name="email" placeholder="maria@email.com">
            </p>
            <p class="field password">
                <label for="register-pass">Password:</label>
                <input type="password" name="password" id="register-pass">
            </p>
            <p class="field password">
                <label for="register-rep-pass">Repeat password:</label>
                <input type="password" name="rep-pass" id="register-rep-pass">
            </p>
            <p class="field submit">
                <input @click=${reg} class="btn submit" type="submit" value="Register">
            </p>
            <p class="field">
                <span>If you already have profile click <a @click=${clickHere} href="#">here</a></span>
            </p>
        </fieldset>
    </form>
</section>
${footer()}
`

export function showRegisterPage() {
    render(register(), document.getElementById("main-content"))
}



async function reg(e) {
    e.preventDefault();
    const form = [...new FormData(document.getElementById("register")).entries()];
    const username = form[0][1];
    const pass = form[1][1];
    const repeatPass = form[2][1];

    if (username && pass && repeatPass) {
        if (pass === repeatPass) {
            try {
                const body = { email: username, password: pass };
                const data = await request("http://localhost:3030/users/register", "post", body);
                console.log(data);
                sessionStorage.setItem("token", data.accessToken);
                sessionStorage.setItem("email", data.email);
                sessionStorage.setItem("owner", data._id);
                sessionStorage.setItem("logged", true);
                page("/");
            } catch (err) {
                return;
            }
        } else {
            alert("Passwords must match!");
        }
    } else {
        alert("All Fields Are Mandatory!");
    }
}

function clickHere(e) {
    e.preventDefault();
    page("/login")
}