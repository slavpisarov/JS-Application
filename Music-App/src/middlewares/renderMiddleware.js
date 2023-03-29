import { render} from '../../node_modules/lit-html/lit-html.js'
import { navigationView } from '../views/navigationView.js';

const headerElement = document.querySelector('.header-navigation')
const contentElement = document.querySelector('#main-content')

export const renderNavigationMiddleware = (ctx,next) =>{

    render(navigationView(ctx),headerElement)
    next();
}

const renderContent = (templateResult) => {
    render(templateResult,contentElement)
}
export const renderContentMiddleware = (ctx,next)=>{
    ctx.render = renderContent;
    next();
}