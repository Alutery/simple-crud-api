class ServerHelper {
    static sendJSON(response, data, end = false) {
        response.setHeader('Content-Type', 'application/json')
        response.write(JSON.stringify(data))
        end && response.end()
    }

    static notFound(response) {
        response.writeHead(404)
        response.end('Not Found')
    }

    static serverError(response) {
        response.statusCode = 500
        response.end('Server error')
    }

    static invalidDataFormat(response) {
        // response.statusCode = 500
        response.end('Data format is invalid')
    }
}

module.exports = ServerHelper