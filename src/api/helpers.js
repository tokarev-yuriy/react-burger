
/**
 * Check if json response is ok
 * @param object res 
 * @returns 
 */
async function checkJsonResponse(res) {
    if (!res.ok) {
        throw new Error(await res.json());
    }
    return await res.json();
};

export { checkJsonResponse };