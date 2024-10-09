import { FastifyInstance } from 'fastify';

import { database } from '../config/database.config';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';

export async function transactionsRoutes(app: FastifyInstance) {
    app.get('/', async () => {
        const transactions = await database('transactions').select('*');

        return {transactions};
    });

    app.get('/:id', async (request) => {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid(),
        });

        const {id} = getTransactionParamsSchema.parse(request.params);

        const transaction = await database('transactions').select('*').where({id}).first();

        if (!transaction) {
            return {message: 'Transaction not found'};
        }

        return {transaction};
    });

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

        return reply.status(201).send({
            message: 'Transaction created successfully',
        });
    });
}
