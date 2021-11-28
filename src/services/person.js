const {
    v4: uuidv4
} = require('uuid')
const validatePerson = require('./validatePerson')
const PersonNotExistError = require('../errors/personNotExist')
const DataFormatError = require('../errors/dataFormat')

class PersonService {
    constructor() {
        this.db = []
    }

    _checkPerson(person) {
        const isValid = validatePerson(person)
        if (!isValid) {
            throw new DataFormatError()
        }
    }

    _checkIsPersonExist(id) {
        if (!this.db.find(p => p.id === id)) {
            throw new PersonNotExistError()
        }
    }

    select(id) {
        if (id) {
            this._checkIsPersonExist(id)
            return this.db.find(p => p.id === id)
        }
        return this.db
    }

    create(person) {
        const personToCreate = {
            ...person,
            id: uuidv4()
        }
        this._checkPerson(personToCreate)
        this.db.push(personToCreate)

        return personToCreate
    }

    update(id, person) {
        this._checkPerson({
            ...person,
            id
        })
        this._checkIsPersonExist(id)

        this.db = this.db.map(p => p.id === id ? {
            id,
            ...person
        } : p)

        return person
    }

    delete(id) {
        this._checkIsPersonExist(id)
        this.db = this.db.filter(p => p.id !== id)

        return true
    }
}

module.exports = PersonService