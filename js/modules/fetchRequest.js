// const URL = 'https://jumpy-global-capricorn.glitch.me/api/';

import {API_KEY, URL} from './const.js';


const fetchRequest = async (postfix, {
    method = 'get',
    callback,
    body,
    headers,
}) => {
    try {
        const options = {
            method,
        };

        if (body) options.body = JSON.stringify(body);
        if (headers) options.headers = headers;

        const response = await fetch(`${URL}${postfix}&apiKey=${API_KEY}`, options);

        if (response.ok) {
            const data = await response.json();
            if (callback) return callback(null, data, postfix);
            return;
        }

        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    } catch (err) {
        return callback(err);
    }
};

export default fetchRequest;
