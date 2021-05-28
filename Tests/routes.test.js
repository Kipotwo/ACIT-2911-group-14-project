const app = require('../app')
const supertest = require('supertest');
const CardController = require("../Controllers/CardController")
const { it } = require('@jest/globals');

const fakeCard = {
    title: "a test card",
    context: "This is a test"
}

it("Tests '/' to see if we get a response.", async() => {
    await supertest(app)
        .get("/")
        .expect(200);
})

it("Tests '/Cards/Index' to see if we get a response.", async() => {
    await supertest(app)
        .get("/Card/Index")
        .expect(200);
})

it("Creates a flashcard, checks database to see if it exists.", async() => {
    await supertest(app)
        .post("/Card/CreateCard")
        .send(fakeCard)

    expect(CardController.database.length).toBe(2)
})

it("Edits a flashcard, checks database to see if it changed.", async() => {
    await supertest(app)
        .post("/Card/Update/1")
        .send(fakeCard)
    
    expect(CardController.database[1].title).toBe("a test card")
})

it("Deletes a flashcard, checks database to see if it exists.", async() => {
    await supertest(app)
        .get("/Card/Detail/1/Delete")
        .expect(200)
    
    expect(CardController.database.length).toBe(1)
})