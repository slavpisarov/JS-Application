import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { getUserData } from './util.js';
import { layoutTemplate } from './views/layout.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/login.js';
import { registerView } from './views/registerView.js';
import { logout } from './data/auth.js';
import { dashboardView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { searchView } from './views/search.js';

const root = document.getElementById('wrapper');

page(decorateContext)
page('/',homeView);
page('/login',loginView);
page('/register',registerView);
page('/logout',logoutAction);
page('/catalog',dashboardView);
page('/catalog/:id',detailsView);
page('/catalog/:id/edit',editView);
page('/create',createView);
page('/search',searchView);

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