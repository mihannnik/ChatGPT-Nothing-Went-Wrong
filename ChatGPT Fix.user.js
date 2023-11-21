// ==UserScript==
// @name         ChatGPT Fix
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Fix ChatGPT issue
// @author       Mikhail Grekov
// @match        https://chat.openai.com/*
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
                return response; // Вернуть исходный ответ для потоковых данных
            }

            let clonedResponse = response.clone(); // Создание клонированной копии ответа
            const body = await clonedResponse.text();

            if (body === null || body === undefined) {
                return response; // Вернуть исходный ответ, если тело null или undefined
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
