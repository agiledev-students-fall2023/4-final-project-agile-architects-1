import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../testServer.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('GET /fridge', () => {

    it('responds with a list of JSON objects', async () => {
        const res = await chai.request(server).get(`/fridge`);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
    });

    it('each fridge item has the expected properties', async () => {
        const response = await chai.request(server).get('/fridge');
        const firstFridgeItem = response.body[0];
        
        expect(firstFridgeItem).to.have.property('name').to.be.a('string');
        expect(firstFridgeItem).to.have.property('quantity').to.be.a('number');
        expect(firstFridgeItem).to.have.property('purchasedDate').to.be.a('string');
        expect(firstFridgeItem).to.have.property('expiration').to.be.a('string');
      });

    after(() => {
        server.close();
    });
});
