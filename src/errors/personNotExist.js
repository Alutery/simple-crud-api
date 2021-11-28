class PersonNotExistError extends Error {
    constructor(message) {
        super(message)
        this.name = "PersonNotExistError"
    }
}

module.exports = PersonNotExistError