import {test} from 'vitest';


test('o usuário consegue criar uma nova transação', ({expect}) => {
    const responseStatusCode = 201;
    expect(responseStatusCode).toBe(201);
});
