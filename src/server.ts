import fastify from 'fastify';
import { knex } from './db/database.config';

const PORT = 3333;

const app = fastify();

app.get('/', async () => {
    const tables = await knex('sqlite_schema').select('*');
    return tables;
});

app
    .listen({
        port: PORT,
    })
    .then(() => {
        console.log('Server is running on http://localhost:3333');
    });
