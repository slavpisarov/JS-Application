import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteBook, getById, getLikesByBookId, getMyLikeBookId, likeBook } from '../data/books.js';
import { getUserData } from '../util.js';

//book,onDelete
const catalogTemplate = (book, onDelete, likes, showLikeButton, onLike) => html`
        <section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src="${book.imageUrl}"></p>
                <div class="actions">
                    <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                    ${book.canEdit ? html`
                    <a class="button" href="/dashboard/${book._id}/edit">Edit</a>
                    <a class="button" @click=${onDelete} href="javascript:void(0)">Delete</a>
                    `: null}
        
                    <!-- Bonus -->
                    <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                    <!-- <a class="button" href="#">Like</a> -->
                    ${likesControlsTemplate(showLikeButton,onLike)}
        
                    <!-- ( for Guests and Users )  -->
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: ${likes}</span>
                    </div>
                    <!-- Bonus -->
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${book.description}</p>
            </div>
        </section>`

//BONUS
const likesControlsTemplate = (showLikeButton, onLike) => {
    if (showLikeButton) {
        return html`
            <a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`
    }else{
        return null;
    }
}



export async function detailsView(ctx) {
    const id = ctx.params.id;

    const book = await getById(id);

    const userID = getUserData()?._id;

    book.canEdit = false;

    if (userID && userID == book._ownerId) {
        book.canEdit = true;
    }
    //BONUS
    const likes = await getLikesByBookId(id);
    const myLikes = userID && await getMyLikeBookId(id, userID);
    const showLikeButton = !book.canEdit && !myLikes && userID;
    //-----

    ctx.render(catalogTemplate(book, onDelete, likes, showLikeButton, onLike))

    async function onDelete() {
        const choice = confirm('Are you sure?')

        if (choice) {
            await deleteBook(id);
            ctx.page.redirect('/')
        }

    }

    //BONUS
    async function onLike() {
        await likeBook(id);
        ctx.page.redirect(`/dashboard/${id}`)
    }
}

