import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { guestNavBar, userNavBar } from "./nabBar.js";
import { footer } from "./footer.js";
import { request } from "./httpRequests.js";

const details = (a) => html`
${sessionStorage.getItem("logged") ? userNavBar() : guestNavBar()}
<section id="details-page" class="content details">
    <h1>${a.title}</h1>

    <div class="details-content">
        <strong>Published in category ${a.category}</strong>
        <p>${a.content}</p>

        <div id=${a._id} class="buttons">
            ${sessionStorage.getItem("owner") === a._ownerId ? deleteBtn() : ""}
            ${sessionStorage.getItem("owner") === a._ownerId ? editBtn() : ""}
            <a @click=${back} href="#" class="btn edit">Back</a>
        </div>
    </div>
</section>
${footer()}
`


const deleteBtn = (a) => html`<a @click=${deletePost} href="#" class="btn delete">Delete</a>`
const editBtn = (a) => html`<a @click=${editPost} href="#" class="btn edit">Edit</a>`

export async function showDetailsPage(ctx) {
    let data;
    try {
        data = await request(`http://localhost:3030/data/wiki/${ctx.params.id}`, "get");
    } catch (err) {
        console.log(err);
    }
    render(details(data), document.getElementById("main-content"));
}

function back(e) {
    e.preventDefault();
    page("/");
}

async function deletePost(e) {
    e.preventDefault();
    const id = e.target.parentElement.id;

    try {
        await request(`http://localhost:3030/data/wiki/${id}`, "delete", '', sessionStorage.getItem("token"));
        page("/");
    } catch (err) {
        console.log(err);
    }


}

function editPost(e) {
    e.preventDefault();
    const id = e.target.parentElement.id;
    page(`/edit/${id}`);
}
