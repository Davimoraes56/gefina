import { createServer } from 'node:http';

import send from './send.ts';

createServer(function (request, response) {
    if (request.url !== '/api/health') {
        send(response, 404, {message: 'Recurso não encontrado.'});
        return;
    }


    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ status: 'ok' }));
}).listen(3000);


