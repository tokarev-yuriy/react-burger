
/**
 * Check if json response is ok
 * @param object res 
 * @returns 
 */
async function checkJsonResponse(res) {
    if (!res.ok) {
        const json = await res.json();
        if (res.status === 403) {
            if (json && json['message'] && json['message'] === "jwt expired") {
                throw new TokenError();
            }
            throw new Error(json['message'] ?? 'Api error');
        }
        throw new Error(json['message'] ?? 'Api error');
    }
    return await res.json();
};


/**
 * TokenError exception
 * @param string message 
 */
function TokenError(message) {
    this.name = 'TokenError';
    this.message = message || 'Error';
    this.stack = (new Error()).stack;
}
TokenError.prototype = Object.create(Error.prototype);
TokenError.prototype.constructor = TokenError;

export { checkJsonResponse, TokenError };