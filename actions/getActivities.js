const apiURL = 'http://192.168.3.221:4001'

export const getActivities = async () => {
    const result = { statusResponse: true, error: null, activities: [], startActivities: null }
    try {

        const resp = await fetch(`${apiURL}/activity`);
        const body = await resp.json();

        if (body.ok) {
            result.activities.push(body)
        }

    } catch (err) {
        result.statusResponse = false
        result.error = error
    }
    return result
}