import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteAlbum, getById, getLikesByAlbumId, getMyLikeAlbumId, likeAlbum } from '../data/services.js';
import { getUserData } from '../util.js';

//book,onDelete
const catalogTemplate = (album, onDelete, likes, showLikeButton, onLike) => html`
    <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Album Details</p>
            <div id="img-wrapper">
                <img src="${album.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
                <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
                <p>
                    <strong>Album name:</strong><span id="details-album">${album.album}</span>
                </p>
                <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
                <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
                <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
            </div>
            <div id="likes">Likes: <span id="likes-count">${likes}</span></div>
    
            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
    
                <!-- ${album.loggedNotOwner ? html`
                <a href="" id="like-btn">Like</a>` : null} -->
                ${likesControlsTemplate(showLikeButton,onLike)}
    
                ${album.canEdit ? html`
                <a href="/catalog/${album._id}/edit" id="edit-btn">Edit</a>
                <a href="javascript:void(0)" @click=${onDelete} id="delete-btn">Delete</a>` : null}
            </div>
        </div>
    </section>`

//BONUS
const likesControlsTemplate = (showLikeButton, onLike) => {
    if (showLikeButton) {
        return html`
        <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`
    } else {
        return null;
    }
}



export async function detailsView(ctx) {
    const id = ctx.params.id;

    const album = await getById(id);

    const userId = getUserData()?._id;

    album.canEdit = false;
    if (userId && userId == album._ownerId) {
        album.canEdit = true;
    }
    //BONUS
    const likes = await getLikesByAlbumId(id);
    const myLikes = userId && await getMyLikeAlbumId(id, userId);
    const showLikeButton = !album.canEdit && !myLikes && userId;
    //-----

    ctx.render(catalogTemplate(album, onDelete, likes, showLikeButton, onLike))

    async function onDelete() {
        const choice = confirm('Are you sure?')

        if (choice) {
            await deleteAlbum(id);
            ctx.page.redirect('/catalog')
        }

    }

    async function onLike() {
        await likeAlbum(id);
        ctx.page.redirect(`/catalog/${id}`)
    }
}

