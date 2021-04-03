const apiURL = 'http://192.168.3.221:4001'

export const getCountries = async ({ offset = 0, limit = 10, order = 'ASC', orderBy = 'id', busqueda = '', donde = 'name', act = false } = {}) => {
    const result = { statusResponse: true, error: null, countries: [], startCountries: null }
    try {
        let url;
        if (act) {
            url = 'activity';
        } else {
            url = 'countries'
        }
        const resp = await fetch(`${apiURL}/${url}?offset=${offset}&limit=${limit}&ordenar=${order}&by=${orderBy}&busqueda=${busqueda}&donde=${donde}`);
        const body = await resp.json();

        if (body.ok) {
            result.startCountries = body.paises.length - 1
            result.countries.push(body)
        }

        // if (body.ok) {
        //     dispatch(countries({ paises: body.paises, allResults: body.count, find: false, order, orderBy, busqueda, donde }))
        //     if (offset === 0) {
        //         dispatch(countItems(body.count))
        //         dispatch(changePage(1))
        //     } else {
        //         dispatch(countItems(body.count))
        //     }
        // } else {
        //     dispatch(showAlert({ type: 'Alert', text: "No se encontro ningun pais." }))
        // }

    } catch (err) {
        result.statusResponse = false
        result.error = error
    }
    return result
}