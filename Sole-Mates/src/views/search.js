import { html } from '../../node_modules/lit-html/lit-html.js';
import { getBrand } from '../data/services.js';
import { createSubmitHandler, getUserData } from '../util.js';


const searchTemplate = (searchShoe) => html`
        <section id="search">
          <h2>Search by Brand</h2>

          <form class="search-wrapper cf" @submit=${searchShoe}>
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit">Search</button>
          </form>

        </section>
    `

const resultsTemplate = (searchShoe,matches,userId) => html`
<section id="search">
  <h2>Search by Brand</h2>

  <form class="search-wrapper cf" @submit=${searchShoe}>
    <input
      id="#search-input"
      type="text"
      name="search"
      placeholder="Search here..."
      required
    />
    <button type="submit">Search</button>
  </form>

  <h3>Results:</h3>

  <div id="search-container">

    ${matches.length == 0 
    ?html`<h2>There are no results found.</h2>`
    : html`<ul class="card-wrapper">
        ${matches.map((match) => html`
        <li class="card">
                <img src="${match.imageUrl}" alt="travis" />
                <p>
                  <strong>Brand: </strong><span class="brand">${match.brand}</span>
                </p>
                <p>
                  <strong>Model: </strong
                  ><span class="model">${match.model}</span>
                </p>
                <p><strong>Value:</strong><span class="value">${match.value}</span>$</p>
                ${userId ? html`
                <a class="details-btn" href="/catalog/${match._id}">Details</a>
                `: null}
              </li>
        `)}
        </ul>`
    }

  </div>
</section>
`


export async function searchView(ctx) {

    const userId = getUserData()?._id;


    ctx.render(searchTemplate(createSubmitHandler(searchShoe)))


    async function searchShoe({search}) {

        console.log(userId);
        const matches = await getBrand(search)

        ctx.render(resultsTemplate(createSubmitHandler(searchShoe),matches,userId))

    }

}

