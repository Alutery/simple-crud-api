class DataFormatError extends Error {
    constructor(message) {
        super(message)
        this.name = "DataFormatError"
    }
}

module.exports = DataFormatError