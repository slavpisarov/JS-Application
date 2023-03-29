import { html } from '../../node_modules/lit-html/lit-html.js';
import { addBuys, deleteProduct, getBuysByMyId, getById, totalBuyCountForProducts } from '../data/services.js';
import { getUserData } from '../util.js';

//book,onDelete
const detailsTemplate = (product, onDelete, buys, showBuyBtn, onBuys) => html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${product.imageUrl}" alt="example1" />
            <p id="details-title">${product.name}</p>
            <p id="details-category">
              Category: <span id="categories">${product.category}</span>
            </p>
            <p id="details-price">
              Price: <span id="price-number">${product.price}</span>$</p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Bought: <span id="buys">${buys}</span> times.</h4>
                <span>${product.description}</span>
              </div>
            </div>
        
            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
        
              ${product.canEdit ? html`
              <a href="/catalog/${product._id}/edit" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
              ` : null}
        
              <!--Bonus - Only for logged-in users ( not authors )-->
              ${product.isNotOwner ? html`
                      <a href="" id="buy-btn">Buy</a>
                      ` : null}


        
            </div>
        
          </div>
        </section>
`




export async function detailsView(ctx) {
  const id = ctx.params.id;

  const product = await getById(id);

  const userID = getUserData()?._id;

  product.canEdit = false; //BONUS

  if (userID && userID == product._ownerId) {
    product.canEdit = true;
  }

  if (userID && userID != product._ownerId) {
    product.isNotOwner = true;
  }


  ctx.render(detailsTemplate(product, onDelete))

  async function onDelete() {
    const choice = confirm('Are you sure?')

    if (choice) {
      await deleteProduct(id);
      ctx.page.redirect('/catalog')
    }

  }


}

