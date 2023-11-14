import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../testServer.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('GET /recommend', () => {

    it('responds with a list of JSON objects', async () => {
        const res = await chai.request(server).get(`/recommend`);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        // Additional assertions based on your response structure
    });
    it('each plan page has the expected properties', async () => {
        const response = await chai.request(server).get('/recommend');
        const firstRecipe = response.body[0];
        expect(firstRecipe).to.have.all.keys('id', 'title', 'description');
        expect(firstRecipe.id).to.be.a('number');
        expect(firstRecipe.title).to.be.a('string');
        expect(firstRecipe.description).to.be.a('string');
      });

    after(() => {
        server.close();
    });
});