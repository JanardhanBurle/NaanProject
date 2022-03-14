const request = require('supertest');
let server;

describe('api/raffles', () => {

    beforeEach(() => {
        server = require('../../index');
    });
    afterEach(() => {
        server.close();
    });

    describe('get /', () => {
        it('Should return all Raffles', async () => {
            const result = await request(server).get('api/raffles');
            expect(request.status).toBe(200);
        });
    });
});