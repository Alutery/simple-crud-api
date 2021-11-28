const server = require('../src/server')
const supertest = require('supertest')
const request = supertest(server)

const TEST_ID = "test"
jest.mock('uuid', () => ({
    v4: () => TEST_ID
}))

const newPerson = {
    name: 'test',
    age: 15,
    hobbies: ['flying']
}

const createdPerson = {
    ...newPerson,
    id: TEST_ID
}

it('get all persons', async () => {
    const response = await request.get('/person')

    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
})

describe('test in-memory CRUD API', () => {
    afterEach(async () => {
        await request.delete(`/person/${TEST_ID}`)
    })

    it('create new person', async () => {
        const response = await request.post('/person')
            .set('Content-type', 'application/json')
            .send(JSON.stringify(newPerson))

        expect(response.status).toBe(201)
        expect(response.body).toEqual(createdPerson)
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('get new person', async () => {
        await request.post('/person')
            .set('Content-type', 'application/json')
            .send(JSON.stringify(newPerson))

        const response = await request.get(`/person/${TEST_ID}`)

        expect(response.status).toBe(200)
        expect(response.body).toEqual(createdPerson)
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('change created person', async () => {
        await request.post('/person')
            .set('Content-type', 'application/json')
            .send(JSON.stringify(newPerson))

        const updatedPerson = {
            ...newPerson,
            name: "new_name"
        }
        const response = await request.put(`/person/${TEST_ID}`)
            .set('Content-type', 'application/json')
            .send(JSON.stringify(updatedPerson))

        expect(response.status).toBe(200)
        expect(response.body).toEqual(updatedPerson)
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })

    it('delete created person', async () => {
        await request.post('/person')
            .set('Content-type', 'application/json')
            .send(JSON.stringify(newPerson))

        const response = await request.delete(`/person/${TEST_ID}`)
        expect(response.status).toBe(204)
    })

    it('check deleted person', async () => {
        const response = await request.get(`/person/${TEST_ID}`)
        expect(response.status).toBe(404)
    })
})