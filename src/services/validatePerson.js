const exceptedProps = ['id', 'name', 'age', 'hobbies']

const validatePerson = (person) => {
    if (!Object.keys(person).every(k => exceptedProps.includes(k))) {
        console.log(Object.keys(person));
        return false
    }

    if (!(typeof person.name === 'string' && typeof person.age === 'number' && Array.isArray(person.hobbies))) {
        console.log(2);
        return false
    }

    return person.hobbies.every(h => typeof h === 'string')
}

module.exports = validatePerson