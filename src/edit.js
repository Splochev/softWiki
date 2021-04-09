import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { guestNavBar, userNavBar } from "./nabBar.js";
import { footer } from "./footer.js";
import { request } from "./httpRequests.js";


const edit = (a) => html`
${sessionStorage.getItem("logged") ? userNavBar() : guestNavBar()}
<section id="edit-page" class="content">
    <h1>Edit Article</h1>

    <form id="edit" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" placeholder="Enter article title" value=${a.title}>
            </p>

            <p class="field category">
                <label for="category">Category:</label>
                <input type="text" name="category" id="category" placeholder="Enter article category"
                    value=${a.category}>
            </p>
            <p class="field">
                <label for="content">Content:</label>
                <textarea name="content" id="content">${a.content}</textarea>
            </p>

            <p class="field submit">
                <input @click=${editListing} id=${a._id} class="btn submit" type="submit" value="Save Changes">
            </p>

        </fieldset>
    </form>
</section>
${footer()}
`

export async function showEditPage(ctx) {
    const data = await request(`http://localhost:3030/data/wiki/${ctx.params.id}`, "get");
    render(edit(data), document.getElementById("main-content"));
}


async function editListing(e) {
    e.preventDefault();
    const form = [...new FormData(document.getElementById("edit")).entries()];
    const title = form[0][1];
    const category = form[1][1];
    const content = form[2][1];

    if (title && checkCategory(category) && content) {
        const id = e.target.id;
        const body = {
            title: title,
            category: category,
            content: content
        }
        try {
            await request(`http://localhost:3030/data/wiki/${id}`, "put", body, sessionStorage.getItem("token"));
            page(`/details/${id}`);
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