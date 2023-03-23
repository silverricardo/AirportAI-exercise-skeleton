const chai = require('chai');
const chaiHttp = require('chai-http');

const URL = 'http://localhost:3300/'

chai.use(chaiHttp);

describe('/GET list products public', () => {
    it('Get a list of all products passenger', async () => {

        chai.request(URL)
            .get('api/public/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })

    })
})