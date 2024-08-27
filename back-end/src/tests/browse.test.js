import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../testServer.js';

import { getPostList, getPostById } from "./../routes/BrowseRoutes.js";

const { expect } = chai;
chai.use(chaiHttp);

describe('Testing Browse Routes', () => {
    
    describe('getPostList() function', () => {
        it('should get a list of posts', () => {
            const postList = getPostList(1);
            expect(postList).to.be.an('array');
            expect(postList).to.have.lengthOf.at.most(24); // Assuming each page can have at most 24 posts
            expect(postList[0]).to.have.property('id');
        });
    });

    describe('getPostById() function', () => {      
        it('should get details of a post by ID', () => {
            const postId = 12345;
            const post = getPostById(postId);
            expect(post).to.be.an('object');
            expect(post).to.have.property('id').equal(postId);
        });
    });

    describe('GET /browse', () => {

        it('responds with a list of JSON objects', async () => {
            const res = await chai.request(server).get(`/browse`);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            // Additional assertions based on your response structure
        });
        it('each post has the expected properties', async () => {
            const response = await chai.request(server).get('/browse');
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

});