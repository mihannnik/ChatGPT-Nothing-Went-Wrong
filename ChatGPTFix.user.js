// ==UserScript==
// @name         ChatGPT Fix
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Fix ChatGPT issue
// @author       Mikhail Grekov
// @match        https://chat.openai.com/*
// @downloadURL  https://github.com/mihannnik/ChatGPT-Nothing-Went-Wrong/raw/main/ChatGPTFix.user.js
// @updateURL    https://github.com/mihannnik/ChatGPT-Nothing-Went-Wrong/raw/main/ChatGPTFix.user.js
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    const originalFetch = unsafeWindow.fetch;
unsafeWindow.fetch = function (resource, init) {
    return originalFetch(resource, init)
        .then(async function(response) {
            const contentType = response.headers.get('content-type');
            const isStream = contentType && (contentType.includes('text/event-stream') || contentType.includes('multipart/x-mixed-replace') || contentType.includes('application/octet-stream'));

            if (isStream) {
                return response; 
            }

            let clonedResponse = response.clone(); 
            const body = await clonedResponse.text();

            if (body === null || body === undefined) {
                return response; 
            }

            if (resource === 'https://chat.openai.com/backend-api/compliance') {
                const modifiedBody = JSON.stringify({
                    "registration_country": "NE",
                    "require_cookie_consent": false,
                    "terms_of_use": { "is_required": false, "display": null },
                    "cookie_consent": { "is_required": false },
                    "age_verification": { "is_required": false }
                });

                clonedResponse = new Response(modifiedBody, {
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers
                });

                return clonedResponse;
            }

            return response;
        })
        .catch(function(error) {
            console.error('Intercepted error:', error);
            throw error;
        });
};
})();
