import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { getUserData } from './util.js';
import { layoutTemplate } from './views/layout.js';
import { dashboardView } from './views/dashboardView.js';
import { loginView } from './views/login.js';
import { registerView } from './views/registerView.js';
import { logout } from './data/auth.js';
import { addBookView } from './views/addBook.js';
import { detailsView } from './views/details.js';
import { editView } from './views/editBook.js';
import { myBooksView } from './views/myBooks.js';


const root = document.getElementById('container');

page(decorateContext)
page('/',dashboardView);
// page('/dashboard',dashboardView);
page('/dashboard/:id',detailsView);
page('/dashboard/:id/edit',editView);
page('/login',loginView);
page('/addBook',addBookView);
page('/register',registerView);
page('/logout',logoutAction);
page('/mybooks',myBooksView);

page.start();

function decorateContext(ctx, next) {
    ctx.render = renderView;

    next()
}

//TODO inject dependencies
function renderView(content) {
    const userData = getUserData();
    render(layoutTemplate(userData,content),root)
}

function logoutAction(ctx) {
    logout();
    ctx.page.redirect('/')
}