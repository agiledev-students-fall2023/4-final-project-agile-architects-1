// tests/homeRoutes.test.js
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../testServer.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Home Routes', () => {
  it('should return Hello World on GET /', async () => {
    const res = await chai.request(server).get('/');
    expect(res).to.have.status(200);
    expect(res.body.message).to.equal('Hello World');
  });
});
