import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';

// //TODO replace with actual view
// const loginTemplate = (onLogin) => html`
// <h1>Login Page</h1>
// <form @submit = ${onLogin}>
//     <label>Email: <input type="text" name="email"></label>
//     <label>Password: <input type="password" name="password"></label>
//     <button>Login</button>
// </form>
// `
//TODO replace with actual view
const loginTemplate = (onLogin) => html`
        <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${onLogin}>
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
`

export function loginView(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));

    async function onLogin({email, password},form) {

        if(email =='' || password == ''){
            return alert ('Fill in all fields')
        }
        await login(email,password)

        form.reset()
        ctx.page.redirect('/catalog')
    }
}