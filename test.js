require('dotenv').config();
const superTest = require('supertest');
const request = superTest('http://localhost:3000');
const expect = require('chai').expect;
var token;
var refreshToken;
var productId;
describe('/GET list products public', () => {
    it('Get a list of all products passenger', async () => {
        const res = await request.get('/api/public/products').set({ apikey: process.env.API_KEY, Accept: 'application/json' });
        expect(res.status).to.eql(200);
    })
})

describe('/GET Search products public free search', () => {
    it('Search products public free search', async () => {
        const res = await request.get('/api/public/products')
            .set({ apikey: process.env.API_KEY, Accept: 'application/json' })
            .send({
                "lostTime": "2023-03-25T14:37:11.081Z",
                "freeSearch": "I lost my Samsung S4 phone"
            })
        expect(res.status).to.eql(200);
    })
})

describe('/GET Search products public ', () => {
    it('Search products public', async () => {
        const res = await request.get('/api/public/products')
            .set({ apikey: process.env.API_KEY, Accept: 'application/json' })
            .send({
                "lostTime": "2023-03-25T14:37:11.081Z",
                "typeOfProduct": "Phone",
                "brand": "Iphone",
                "color": "Black"
            })
        expect(res.status).to.eql(200);
    })
})

describe('/POST Login Error', () => {
    it('Login as an agent with wrong credentials', async () => {
        const res = await request.post('/api/authenticate')
            .set({ apikey: process.env.API_KEY, Accept: 'application/json' })
            .send({
                "username": "user1@test.pt",
                "password": "password"
            })
        expect(res.status).to.eql(401);
    })
})

describe('/POST Login successfully', () => {
    it('Login as an agent successfully', async () => {
        const res = await request.post('/api/authenticate')
            .set({ apikey: process.env.API_KEY, Accept: 'application/json' })
            .send({
                "username": "user1@test.pt",
                "password": "P4ssw0rd"
            })
        expect(res.status).to.eql(200);
        expect(res.body.token).to.exist;
        expect(res.body.refreshToken).to.exist;
        expect(res.body.name).to.eql('User 1');

        token = res.body.token;
        refreshToken = res.body.refreshToken;

    })
})

describe('/GET list products as an agent', () => {
    it('Get a list of all products as an agent', async () => {
        const res = await request.get('/api/private/products')
            .set({ apikey: process.env.API_KEY, Accept: 'application/json', token: token, refreshToken: refreshToken });
        expect(res.status).to.eql(200);
    })
})

describe('/POST Creat an product', () => {
    it('Created a product as an agent', async () => {
        const res = await request.post('/api/private/products')
            .set({ apikey: process.env.API_KEY, Accept: 'application/json', token: token, refreshToken: refreshToken })
            .send({
                "typeOfProduct": "Phone",
                "brand": "Iphone",
                "model": "XS",
                "color": "Black"
            })

        expect(res.status).to.eql(201);
        expect(res.body.typeOfProduct).to.eql('Phone');
        expect(res.body.brand).to.eql('Iphone');
        expect(res.body.model).to.eql('XS');
        expect(res.body.color).to.eql('Black');

        productId = res.body._id;
    })
})

describe('/GET Search products as an agent free search', () => {
    it('Search products as an agent free search', async () => {
        const res = await request.get('/api/private/products')
            .set({ apikey: process.env.API_KEY, Accept: 'application/json', token: token, refreshToken: refreshToken })
            .send({
                "lostTime": "2023-03-25T14:37:11.081Z",
                "freeSearch": "I lost my Iphone Xs phone"
            })
        expect(res.status).to.eql(200);
    })
})

describe('/GET Search products as an agent ', () => {
    it('Search products as an agent', async () => {
        const res = await request.get('/api/private/products')
            .set({ apikey: process.env.API_KEY, Accept: 'application/json' })
            .send({
                "lostTime": "2023-03-25T14:37:11.081Z",
                "typeOfProduct": "Phone",
                "brand": "Iphone",
            })
        expect(res.status).to.eql(400);
    })
})

describe('/DELETE Delete an product', () => {
    it('Delete a product as an agent', async () => {

        const res = await request.delete('/api/private/products')
            .set({ apikey: process.env.API_KEY, Accept: 'application/json', token: token, refreshToken: refreshToken })
            .send({
                "productId": productId
            })
        expect(res.status).to.eql(200);

    })
})