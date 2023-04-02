import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllFruits } from '../data/services.js';

const dashboardTemplate = (fruits) => html`
        <h2>Fruits</h2>


        ${fruits.length > 0 ? html`
        <section id="dashboard">
            ${fruits.map(fruitCard)}            
            </section>
        `: html`
        <h2>No fruit info yet.</h2>
        `}
      `

const fruitCard = (fruit) => html`
          <div class="fruit">
            <img src="${fruit.imageUrl}" alt="example1" />
            <h3 class="title">${fruit.name}</h3>
            <p class="description">${fruit.description}</p>
            <a class="details-btn" href="/catalog/${fruit._id}">More Info</a>
          </div>
`

export async function dashboardView(ctx) {
    const fruits = await getAllFruits()
    ctx.render(dashboardTemplate(fruits))
}