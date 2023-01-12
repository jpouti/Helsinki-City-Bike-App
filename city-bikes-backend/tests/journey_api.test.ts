const supertest = require('supertest')

const app = require('../src/app')
const api = supertest(app)

test('check jest & supertest', async () => {
    await api
        .get('/')
        .expect(200)
})