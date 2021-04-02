

export const getCountries = async () => {
    const resp = await fetch('http://192.168.3.221:4001/countries/list/')
    const body = await resp.json();
    return body
}