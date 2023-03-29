import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllBooks } from '../data/books.js';

const dashboardTemplate = (books) => html`
        <section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>

            ${books.length > 0 ?
            html`<ul class="other-books-list">
                 ${books.map(bookCard)}
               </ul>` : html`
               <p class="no-books">No books in database!</p>
               `}

        </section>`

const bookCard = (book) => html`
             <li class="otherBooks">
                    <h3>${book.title}</h3>
                    <p>Type: ${book.type}</p>
                    <p class="img"><img src=${book.imageUrl}></p>
                    <a class="button" href="/dashboard/${book._id}">Details</a>
                </li>`


export async function dashboardView(ctx) {
    const books = await getAllBooks()
    ctx.render(dashboardTemplate(books))
}