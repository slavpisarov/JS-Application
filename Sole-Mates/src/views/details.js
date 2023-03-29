import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteShoes, getById} from '../data/services.js';
import { getUserData } from '../util.js';

const catalogTemplate = (shoes, onDelete) => html`
        <section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src="${shoes.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${shoes.brand}</span></p>
              <p>
                Model: <span id="details-model">${shoes.model}</span>
              </p>
              <p>Release date: <span id="details-release">${shoes.release}</span></p>
              <p>Designer: <span id="details-designer">${shoes.designer}</span></p>
              <p>Value: <span id="details-value">${shoes.value}</span></p>
            </div>

            ${shoes.canEdit ? html`
            <div id="action-buttons">
              <a href="/catalog/${shoes._id}/edit" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" @click=${onDelete} id="delete-btn">Delete</a>
            </div>
            ` : null}
 
          </div>
        </section>
    `


export async function detailsView(ctx) {
    const id = ctx.params.id;

    const shoes = await getById(id);

    const userId = getUserData()?._id;

    if (userId && userId == shoes._ownerId) {
        shoes.canEdit = true;
    }

    ctx.render(catalogTemplate(shoes, onDelete))

    async function onDelete() {
        const choice = confirm('Are you sure?')

        if (choice) {
            await deleteShoes(id);
            ctx.page.redirect('/catalog')
        }

    }

}

