
/**
 * Check if json response is ok
 * @param Response res 
 * @returns 
 */
async function checkJsonResponse<T>(res: Response): Promise<T> {
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
 * @param RequestInfo url 
 * @param RequestInit options 
 * @returns 
 */
async function requestWithCheck<T>(url: RequestInfo, options: RequestInit = {}): Promise<T> {
    const resp = await fetch(url, options);
    return await checkJsonResponse(resp);
}


/**
 * TokenError exception
 * @param string message 
 */
class TokenError extends Error {
    name: 'TokenError';
    message: string;
    stack?: string;

    constructor(message?: string) {
        super(message);
        this.name = 'TokenError';
        this.message = message || 'Error';
        this.stack = (new Error()).stack;
    }
}

export { checkJsonResponse, TokenError, requestWithCheck };