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

export const filterCateInList = (id, listCates) => {
    const results = listCates.filter(f => {
        return f.id === id;
    })
    if(results.length <= 0)
        return '--'
    return results[0].name
}
