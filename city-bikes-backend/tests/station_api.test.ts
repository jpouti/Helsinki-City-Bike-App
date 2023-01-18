const { connectToDatabase } = require('../src/utils/db')
const supertest = require('supertest')

const app = require('../src/app')
const api = supertest(app);

// connect to the database before the tests
(async () => {
    await connectToDatabase()
})

describe('Station list tests', () => {
    test('Station lists returns with status code 200 on default query', async () => {
        await api
            .get('/api/stations')
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

describe('Single station tests', () => {
    test('Returns status 200 and station info with valid ID call', async () => {
        await api
            .get('/api/stations/1')
            .expect('Content-Type', /json/)
            .expect(200)
    })
    test('Return status 404 with invalid station ID', async () => {
        await api
            .get('/api/stations/999')
            .expect(404)
    })
    test('Return status 400 with error when id is called as string instead of numbers', async () => {
        await api
            .get('/api/stations/station')
            .expect(400)
    })

})

describe

export {}