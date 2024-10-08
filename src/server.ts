import fastify from 'fastify';
import { database } from './config/database.config';

const PORT = 3333;

const app = fastify();

app.get('/', async () => {
    const tables = await database('sqlite_schema').select('*');
    return tables;
});

app
    .listen({
        port: PORT,
    })
    .then(() => {
        console.log('Server is running on http://localhost:3333');
    });
