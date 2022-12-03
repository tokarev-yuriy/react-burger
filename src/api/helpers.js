
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


function TokenError(message) {
    this.name = 'TokenError';
    this.message = message || 'Error';
    this.stack = (new Error()).stack;
}
TokenError.prototype = Object.create(Error.prototype);
TokenError.prototype.constructor = TokenError;

export { checkJsonResponse, TokenError };