import { html, render } from "../node_modules/lit-html/lit-html.js";
import { repeat } from "../node_modules/lit-html/directives/repeat.js";
import page from "../node_modules/page/page.mjs";
import { guestNavBar, userNavBar } from "./nabBar.js";
import { footer } from "./footer.js";
import { request } from "./httpRequests.js";

const catalogue = (articles) => html`
${sessionStorage.getItem("logged") ? userNavBar() : guestNavBar()}
<section id="catalog-page" class="content catalogue">
    <h1>All Articles</h1>
    ${articles.length > 0 ? showArticles(articles) : noArticles()}
</section>
${footer()}
`

const noArticles = () => html`
    <h3 class="no-articles">No articles yet</h3>
`

const showArticles = (articles) => repeat(articles, a => html`
<a @click=${details} id=${a._id} class="article-preview" href="#">
    <article>
        <h3>Topic: <span>${a.title}</span></h3>
        <p>Category: <span>${a.category}</span></p>
    </article>
</a>
`)

export async function showCataloguePage() {
    let data;
    try {
        data = await request("http://localhost:3030/data/wiki?sortBy=_createdOn%20desc", "get");
    } catch (err) {
        console.log(err);
    }
    render(catalogue(data), document.getElementById("main-content") )
}

function details(e) {
    e.preventDefault()
    let aElement = e.target;
    while (aElement.tagName != "A") {
        aElement = aElement.parentElement;
    } 
    const id = aElement.id;
    page(`/details/${id}`);
}