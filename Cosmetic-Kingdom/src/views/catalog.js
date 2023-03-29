import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllProducts } from '../data/services.js';


const catalogTemplate = (products) => html`
        <h2>Products</h2>
        
        <section id="dashboard">
            ${products.length > 0
           ? 
            products.map(
        (p) => html`       
        <div class="product">
            <img src="${p.imageUrl}" alt="example1" />
            <p class="title">${p.name}</p>
            <p><strong>Price:</strong><span class="price">${p.price}</span>$</p>
            <a class="details-btn" href="/catalog/${p._id}">Details</a>
          </div>
            `)
            : html`
            <h2>No products yet.</h2>`}
        </section>`


export async function catalogView(ctx) {
    const products = await getAllProducts()
    ctx.render(catalogTemplate(products))
}