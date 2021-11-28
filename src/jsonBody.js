const jsonBody = (request, callback) => {
    const data = []
    request
        .on('data', (chunk) => {
            data.push(chunk)
        })

    request.on('end', () => {
        try {
            const parsedJSON = JSON.parse(Buffer.concat(data))
            callback(null, parsedJSON)
        } catch (e) {
            callback(e)
        }
    })

    request.on('error', (err) => {
        callback(err)
    })
}

module.exports = jsonBody