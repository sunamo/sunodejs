"use strict";
// EN: URL utility functions using native Node.js URL API
// CZ: URL utility funkce používající nativní Node.js URL API
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeQueryString = removeQueryString;
exports.parseURL = parseURL;
exports.buildBaseUrl = buildBaseUrl;
// celé toto bylo zbytečné programovat. Tyto věci už umí next samotný const {id, product} = router.query
function removeQueryString(windowLocationHref) {
    const url = new URL(windowLocationHref);
    url.search = "";
    return url.toString();
}
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
function parseURL(templateURL, actualURL) {
    // 1. Define the template URL with wildcards
    const template = templateURL;
    // 2. Create the regular expression
    const regexTemplate = template.replace(/\{([^}]+)\}/g, "([^/]+)");
    const regex = new RegExp("^" + regexTemplate + "$");
    // 3. Use the URL object to parse the actual URL
    const baseUrl = buildBaseUrl(actualURL);
    const url = new URL(actualURL, baseUrl);
    const pathname = url.pathname;
    // 4. Perform the matching with the regular expression
    const matches = pathname.match(regex);
    if (matches) {
        const parameters = {};
        const wildcards = template.match(/\{([^}]+)\}/g);
        if (wildcards) {
            wildcards.forEach((wildcard, index) => {
                const parameterName = wildcard.replace(/\{|\}/g, "");
                parameters[parameterName] = matches[index + 1];
            });
        }
        return parameters;
    }
    else {
        return null;
    }
}
function buildBaseUrl(windowLocationHref) {
    const url = new URL(windowLocationHref);
    const protokol = url.protocol;
    const hostname = url.hostname;
    const port = url.port;
    const portCast = port ? `:${port}` : "";
    return `${protokol}//${hostname}${portCast}`;
}
