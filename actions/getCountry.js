const apiURL = 'http://192.168.3.221:4001'

export const getCountries = async (id) => {
    let result = {}
    try {

        const resp = await fetch(`${apiURL}/countries/${id}`);
        const body = await resp.json();

        if (body.ok) {
            result.country = body.pais
        }


    } catch (err) {
        result.statusResponse = false
        result.error = error
    }
    return result
}