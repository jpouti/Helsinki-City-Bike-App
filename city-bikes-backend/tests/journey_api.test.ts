const { connectToDatabase } = require('../src/utils/db')
const supertest = require('supertest')

const app = require('../src/app')
const api = supertest(app);

// connect to the database before the tests
(async () => {
    await connectToDatabase()
})

describe('Jourey list tests', () => {
    test('Journey lists returns with status code 200 on default query', async () => {
        await api
            .get('/api/journeys')
            .expect('Content-Type', /json/)
            .expect(200)
    })
    test('Returns with status code 200 on query containg valid limit and page', async () => {
        await api
            .get('/api/journeys?page=1&limit=2')
            .expect('Content-Type', /json/)
            .expect(200)
    })
})

export {}