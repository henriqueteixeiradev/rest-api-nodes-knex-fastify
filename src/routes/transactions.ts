import { FastifyInstance } from 'fastify';

import { database } from '../config/database.config';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';



export async function transactionsRoutes(app: FastifyInstance) {
    app.post('/', async (request, reply) => {
        const createTransctionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        });
    
        const {title, amount, type} = createTransctionBodySchema.parse(request.body);

        await database('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1
        });

        return reply.status(201).send();
    });
}
