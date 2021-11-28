require('dotenv').config()

const PersonService = require('./services/person')
const ServerHelper = require('./serverHelper')
const jsonBody = require('./jsonBody')

const PersonNotExistError = require('./errors/personNotExist')
const DataFormatError = require('./errors/dataFormat')

const server = require('http').createServer()

const UUID_REGEX = /^\/person\/([0-9a-z-]+)$/

const dbService = new PersonService()

server.on('request', (req, res) => {
    try {
        if (req.url === '/person') {
            switch (req.method) {
                case 'GET':
                    res.statusCode = 200
                    ServerHelper.sendJSON(res, dbService.select(), true)
                    break
                case 'POST':
                    jsonBody(req, (err, data) => {
                        if (err) {
                            ServerHelper.invalidDataFormat(res)
                            return
                        }

                        const createdPerson = dbService.create(data)
                        res.statusCode = 201
                        ServerHelper.sendJSON(res, createdPerson, true)
                    })
                    break
                default:
                    ServerHelper.notFound(res)
                    break
            }
            return
        }

        const match = req.url.match(UUID_REGEX)
        if (req.url.startsWith('/person') && !match) {
            ServerHelper.idInvalid(res)
            return
        }

        // if `/person/{personId}`
        if (match) {
            const id = match[1]
            switch (req.method) {
                case 'GET':
                    const person = dbService.select(id)
                    res.statusCode = 200
                    ServerHelper.sendJSON(res, person, true)
                    break
                case 'PUT':
                    jsonBody(req, (err, data) => {
                        if (err && err instanceof PersonNotExistError) {
                            res.statusCode = 404
                            res.end('Person is not found')
                            return
                        }

                        if (err) {
                            ServerHelper.invalidDataFormat(res)
                            return
                        }

                        const updatedPerson = dbService.update(id, data)
                        res.statusCode = 200
                        ServerHelper.sendJSON(res, updatedPerson)
                        res.end()
                    })
                    break
                case 'DELETE':
                    dbService.delete(id)
                    res.writeHead(204)
                    res.end()
                    break
                default:
                    ServerHelper.notFound(res)
                    break
            }
            return
        }

        ServerHelper.notFound(res)
    } catch (e) {
        if (e instanceof PersonNotExistError) {
            res.statusCode = 404
            res.end('Person is not found')
        } else if (e instanceof DataFormatError) {
            ServerHelper.invalidDataFormat(res)
        } else {
            ServerHelper.serverError(res)
        }
    }
})

server.on('clientError', (err, socket) => {
    if (err.code === 'ECONNRESET' || !socket.writable) {
        return
    }

    console.error(err)
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

module.exports = server