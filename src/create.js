import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { guestNavBar, userNavBar } from "./nabBar.js";
import { footer } from "./footer.js";
import { request } from "./httpRequests.js";


const create = () => html`
${sessionStorage.getItem("logged") ? userNavBar() : guestNavBar()}
<section id="create-page" class="content">
    <h1>Create Article</h1>

    <form id="create" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="create-title">Title:</label>
                <input type="text" id="create-title" name="title" placeholder="Enter article title">
            </p>

            <p class="field category">
                <label for="create-category">Category:</label>
                <input type="text" id="create-category" name="category" placeholder="Enter article category">
            </p>
            <p class="field">
                <label for="create-content">Content:</label>
                <textarea name="content" id="create-content"></textarea>
            </p>

            <p class="field submit">
                <input @click=${createListing} class="btn submit" type="submit" value="Create">
            </p>

        </fieldset>
    </form>
</section>
${footer()}
`

export function showCreatePage() {
    render(create(), document.getElementById("main-content"))
}


async function createListing(e) {
    e.preventDefault();
    const form = [...new FormData(document.getElementById("create")).entries()];
    const title = form[0][1];
    const category = form[1][1];
    const content = form[2][1];


    if (title && checkCategory(category) && content) {
        const body = {
            title: title,
            category: category,
            content: content
        }
        try {
            await request("http://localhost:3030/data/wiki", "post", body, sessionStorage.getItem("token"));
            page("/");
        } catch (err) {
            return;
        }
    } else {
        alert(`All Fields Are Mandatory And Category Must Be "JavaScript", "C#", "Java", or "Python".`);
    }
}


function checkCategory(category) {
    switch (category) {
        case "JavaScript":
            return true;
            break;
        case "C#":
            return true;
            break;
        case "Java":
            return true;
            break;
        case "Python":
            return true;
            break;
    }
    return false;
}