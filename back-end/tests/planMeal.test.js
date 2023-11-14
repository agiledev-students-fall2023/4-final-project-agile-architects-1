import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../testServer.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('GET /plan', () => {

    it('responds with a list of JSON objects', async () => {
        const res = await chai.request(server).get(`/plan`);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        // Additional assertions based on your response structure
    });
    it('each plan page has the expected properties', async () => {
        const response = await chai.request(server).get('/plan');
        const firstPlan = response.body[0];
        expect(firstPlan).to.have.all.keys('date', 'meals');
        expect(firstPlan.date).to.be.a('string');
        expect(firstPlan.meals).to.be.an('object');
      });

    after(() => {
        server.close();
    });
});