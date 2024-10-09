
import fastify from 'fastify';

import { env } from './env';
import { transactionsRoutes } from './routes/transactions';
import cookie from '@fastify/cookie';

const app = fastify();

app.addHook('onRequest', async (request) => {
    console.log(`onRequest hook: ${request.method} ${request.url}`);
});


app.register(cookie);

app.register(transactionsRoutes, {
    prefix: '/transactions',
});

app
    .listen({
        port: env.PORT, 
    })
    .then(() => {
        console.log('Server is running on http://localhost:3333');
    });
