export declare function removeQueryString(windowLocationHref: string): string;
/**
 *
 * @example
 * // basic
 * parseURL("/user/{id}/detail/{product}", "https://example.com/user/123/detail/book") => { id: "123", product: "book" }
 *
 * @param templateURL
 * @param actualURL
 * @returns
 */
export declare function parseURL(templateURL: string, actualURL: string): Record<string, string> | null;
export declare function buildBaseUrl(windowLocationHref: string): string;
