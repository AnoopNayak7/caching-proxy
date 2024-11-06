const express = require('express');
const axios = require('axios');
const cache = require('./cache');

function startServer(port, origin) {
    const app = express();

    app.use(async (req, res) => {
        const cacheKey = `${req.method}-${req.url}`;
        const cachedResponse = cache.get(cacheKey);

        if (cachedResponse) {
            res.set('X-Cache', 'HIT');
            return res.send(cachedResponse);
        }

        try {
            const response = await axios.get(`${origin}${req.url}`);
            cache.set(cacheKey, response.data);

            res.set('X-Cache', 'MISS');
            res.send(response.data);
        } catch (error) {
            res.status(500).send('Error fetching data from origin server.');
        }
    });

    app.listen(port, () => {
        console.log(`Caching proxy server running on port ${port}`);
    });
}

module.exports = startServer;
