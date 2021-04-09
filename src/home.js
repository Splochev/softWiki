import { html, render } from "../node_modules/lit-html/lit-html.js";
import { repeat } from "../node_modules/lit-html/directives/repeat.js";
import page from "../node_modules/page/page.mjs";
import { guestNavBar, userNavBar } from "./nabBar.js";
import { footer } from "./footer.js";
import { request } from "./httpRequests.js";


const home = (js,java,python,c) => html`
${sessionStorage.getItem("logged") ? userNavBar() : guestNavBar()}
<section id="home-page" class="content">
    <h1>Recent Articles</h1>
    <section class="recent js">
        <h2>JavaScript</h2>
        ${showJs(js)}
    </section>
    <section class="recent csharp">
        <h2>C#</h2>
        ${showC(c)}
    </section>
    <section class="recent java">
        <h2>Java</h2>
        ${showJava(java)}
    </section>
    <section class="recent python">
        <h2>Python</h2>
        ${showPython(python)}
    </section>

</section>
${footer()}
`
const noArticles = () => html`<h3 class="no-articles">No articles yet</h3>`

const showJs = (articles) => html`${articles.length > 0 ?  showArtcile(articles)  : noArticles()}`
const showPython = (articles) => html`${articles.length >0? showArtcile(articles): noArticles()}`
const showJava = (articles) => html`${articles.length>0 ?  showArtcile(articles) : noArticles()}`
const showC =(articles) => html`${articles.length >0 ? showArtcile(articles) : noArticles()}`


const showArtcile = (articles) => repeat(articles, a => html`
    <article>
    <h3>${a.title}</h3>
    <p>${a.content}</p>
    <a @click=${details} id=${a._id} href="#" class="btn details-btn">Details</a>
</article>
    `)

export async function showHomePage() {
    let data;
    try {
        data = await request("http://localhost:3030/data/wiki?sortBy=_createdOn%20desc&distinct=category", "get");
    } catch (err) {
        console.log(err)
    }
    const js = [];
    const java = [];
    const python = [];
    const c = [];

    for (const key in data) {
        const e = data[key];
        switch (e.category) {
            case "JavaScript":
                js.push(e);
                break;
            case "Python":
                python.push(e);
                break;
            case "Java":
                java.push(e);
                break;
            case "C#":
                c.push(e);
                break;
        }
    }
    render(home(js,java,python,c), document.getElementById("main-content") );
}

function details(e) {
    e.preventDefault()
    const id = e.target.id;
    page(`/details/${id}`);
}