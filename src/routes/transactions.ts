import { FastifyInstance } from 'fastify';

import { database } from '../config/database.config';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function transactionsRoutes(app: FastifyInstance) {
    app.get('/', {
        preHandler: [checkSessionIdExists],
    }, async (request) => {
        const { sessionId } = request.cookies;

        const transactions = await database('transactions')
            .where('session_id', sessionId)  
            .select('*');

        return {transactions};
    });

    app.get('/:id', {
        preHandler: [checkSessionIdExists],
    }, async (request) => {
        const { sessionId } = request.cookies;
      
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid(),
        });

        const {id} = getTransactionParamsSchema.parse(request.params);

        const transaction = await database('transactions')
            .select('*')
            .where({id, session_id: sessionId})
            .first();

        if (!transaction) {
            return {message: 'Transaction not found'};
        }

        return {transaction};
    });

    app.get('/summary', {
        preHandler: [checkSessionIdExists],
    }, async (request) => {
        const { sessionId } = request.cookies;

        const summary = await database('transactions')
            .where('session_id', sessionId)
            .sum('amount', {as: 'amount'})
            .first();

        return {summary};
    });

    app.post('/', async (request, reply) => {
        const createTransctionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        });
    
        const {title, amount, type} = createTransctionBodySchema.parse(request.body);

        let sessionId = request.cookies.sessionId;

        if (!sessionId) {
            sessionId = randomUUID();

            reply.setCookie('sessionId', sessionId, {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            });
        }

        await database('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
            session_id: sessionId,
        });

        return reply.status(201).send({
            message: 'Transaction created successfully',
        });
    });
}
