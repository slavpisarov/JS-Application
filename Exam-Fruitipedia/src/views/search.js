import { html } from '../../node_modules/lit-html/lit-html.js';
import { getFruit } from '../data/services.js';
import { createSubmitHandler, getUserData } from '../util.js';


const searchTemplate = (searchFruit) => html`
       <section id="search">

<div class="form">
  <h2>Search</h2>
  <form class="search-form" @submit=${searchFruit}>
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>

        </section>
    `


const resultsTemplate = (searchFruit, matches) => html`
       <section id="search">

<div class="form">
  <h2>Search</h2>
  <form class="search-form" @submit=${searchFruit}>
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4>Results:</h4>
  <div class="search-result">
    ${matches.length == 0 ? html`
    <p class="no-result">No result.</p>
    `: matches.map(matchCard)}

        
</div>

        </section>
`

const matchCard = (match)=> html`
    <div class="fruit">
        <img src="${match.imageUrl}" alt="example1" />
        <h3 class="title">${match.name}</h3>
        <p class="description">${match.description}</p>
        <a class="details-btn" href="/catalog/${match._id}">More Info</a>
    </div>
`


export async function searchView(ctx) {

    const userId = getUserData()?._id;

    ctx.render(searchTemplate(createSubmitHandler(searchFruit)))


    async function searchFruit({ search }) {

        const matches = await getFruit(search)

        ctx.render(resultsTemplate(createSubmitHandler(searchFruit), matches))

    }

}

