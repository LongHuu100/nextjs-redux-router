import APP_ROUTES from '../../app.router';

export const findRoute = (routeName) => {
    let route = null;
    APP_ROUTES.name.forEach(item => {
        if(item.pattern === routeName ) {
            route =  item;
        }
    });
    return route;
}
