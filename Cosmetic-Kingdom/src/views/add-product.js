import { html } from '../../node_modules/lit-html/lit-html.js';
import { createProduct } from '../data/services.js';
import { createSubmitHandler } from '../util.js';

const addProductTemplate = (onAddProduct) => html`
        <section id="create">
          <div class="form">
            <h2>Add Product</h2>
            <form class="create-form" @submit=${onAddProduct}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
              />

              <button type="submit">Add</button>
            </form>
          </div>
        </section>
`


export function addProductView(ctx) {

    ctx.render(addProductTemplate(createSubmitHandler(onAddProduct)));

    async function onAddProduct({
        name,
        imageUrl, 
        category, 
        description, 
        price
    }) {
        if([
            name,
            imageUrl, 
            category, 
            description, 
            price          
        ].some(f => f == '')){
                return alert('Fill in all fields')
        }

        await createProduct({
            name,
            imageUrl, 
            category, 
            description, 
            price          
        });

        ctx.page.redirect('/catalog')
    }
}