const exceptedProps = ['id', 'name', 'age', 'hobbies']

const validatePerson = (person) => {
    if (!Object.keys(person).every(k => exceptedProps.includes(k))) {
        return false
    }

    if (!(typeof person.name === 'string' && typeof person.age === 'number' && Array.isArray(person.hobbies))) {
        return false
    }

    return person.hobbies.every(h => typeof h === 'string')
}

module.exports = validatePerson