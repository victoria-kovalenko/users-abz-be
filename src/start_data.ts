const fs = require('fs');
const { faker } = require('@faker-js/faker');

fs.appendFileSync('data.json', '[');

function createUser() {
    return {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number('+380 ## ### ## ##'),
        position_id: Math.floor(Math.random() * (5 - 1 + 1) + 1),
        photo: faker.image.people(70, 70)
    }
}

for (let i = 1; i <= 45; i++) {
    fs.appendFileSync('data.json', JSON.stringify(createUser(), null, "\t"));
    fs.appendFileSync('data.json', ',');
}

fs.appendFileSync('data.json', ']');