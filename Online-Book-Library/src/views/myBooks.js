import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllBooks, getMyBooks } from '../data/books.js';
import { getUserData } from '../util.js';

const myBooksTemplate = (books) => html`
        <section id="my-books-page" class="my-books">

            <h1>My Books</h1>

            ${books.length > 0 ?
            html`<ul class="my-books-list">
                 ${books.map(bookCard)}
               </ul>` : html`
               <p class="no-books">No books in database!</p>
               `}
        </section>
`
const bookCard = (book) => html`
                <li class="otherBooks">
                    <h3>${book.title}</h3>
                    <p>Type: ${book.type}</p>
                    <p class="img"><img src=${book.imageUrl}></p>
                    <a class="button" href="/dashboard/${book._id}">Details</a>
                </li>
`


// export async function myBooksView(ctx) {
//     const allBooks = await getAllBooks();

//     const books = [];
//     const userData = getUserData();

//     allBooks.forEach(book => {

//         if(book._ownerId == userData._id){
//             books.push(book)
//         }
//     });

//     ctx.render(myBooksTemplate(books))
// }

export async function myBooksView(ctx) {
    const userData = getUserData();

    const id = userData._id;

    const books =await getMyBooks(id)

    ctx.render(myBooksTemplate(books))
}