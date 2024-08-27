import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../path-to-your-server-file'; // Update this path
import bcrypt from 'bcryptjs';

const { expect } = chai;
chai.use(chaiHttp);

describe('POST /login', () => {
    it('should login successfully with correct credentials', async () => {
        const user = {
            username: 'user1',
            password: 'pass1'
        };

        const res = await chai.request(server)
            .post('/login')
            .send(user);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('auth').to.be.true;
        expect(res.body).to.have.property('token');
    });

    it('should fail to login with incorrect username', async () => {
        const user = {
            username: 'nonexistentuser',
            password: 'pass1'
        };

        const res = await chai.request(server)
            .post('/login')
            .send(user);

        expect(res).to.have.status(404);
    });

    it('should fail to login with incorrect password', async () => {
        const user = {
            username: 'user1',
            password: 'wrongpassword'
        };

        const res = await chai.request(server)
            .post('/login')
            .send(user);

        expect(res).to.have.status(401);
    });

    // Add more tests as needed for other cases
});

// Optional: If you're using a server that needs to be closed after tests
after(() => {
    server.close();
});
