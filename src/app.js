import page from "../node_modules/page/page.mjs";
import { showHomePage } from "./home.js";
import { showCataloguePage } from "./catalogue.js"
import { showDetailsPage } from "./details.js";
import { showRegisterPage } from "./register.js";
import { showLoginPage } from "./login.js";
import { showCreatePage } from "./create.js";
import { showEditPage } from "./edit.js";

page("/", showHomePage);
page("/catalogue", showCataloguePage);
page("/details/:id", showDetailsPage);
page("/register", showRegisterPage);
page("/login", showLoginPage);
page("/create", showCreatePage);
page("/edit/:id", showEditPage);
page.start();