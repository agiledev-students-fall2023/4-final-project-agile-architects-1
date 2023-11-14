import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../testServer.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('GET /profile', () => {

    it('responds with a list of JSON objects', async () => {
        const res = await chai.request(server).get(`/profile`);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        // Additional assertions based on your response structure
    });
    it('each post has the expected properties', async () => {
        const response = await chai.request(server).get('/profile');
        const firstPost = response.body[0];
        expect(firstPost).to.have.property('image').to.be.a('string');
        expect(firstPost).to.have.property('title').to.be.a('string');
        expect(firstPost).to.have.property('author').to.be.a('string');
        expect(firstPost).to.have.property('usrImg').to.be.a('string');
      });

    after(() => {
        server.close();
    });
});

  