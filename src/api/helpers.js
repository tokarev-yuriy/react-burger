
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
 * request with check
 * @param string url 
 * @param object options 
 * @returns 
 */
async function requestWithCheck(url, options = {}) {
    const resp = await fetch(url, options);
    return await checkJsonResponse(resp);
}


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

export { checkJsonResponse, TokenError, requestWithCheck };