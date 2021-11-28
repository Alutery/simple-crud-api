const jsonBody = (request, callback) => {
    const data = []
    request
        .on('data', (chunk) => {
            data.push(chunk)
        })

    request.on('end', () => {
        try {
            console.log(Buffer.concat(data).toString());
            const parsedJSON = JSON.parse(Buffer.concat(data))
            callback(null, parsedJSON)
        } catch (e) {
            console.log(e);
            callback(e)
        }
    })

    request.on('error', (err) => {
        callback(err)
    })
}

module.exports = jsonBody