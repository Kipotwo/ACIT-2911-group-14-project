// Placeholder "Database"
let data = [{title: "Test Card", desc: "This is just a test", id: 1}]

let listAll = (req, res) => {
    res.render("flashcard_list", data)
}

let addCard = (req, res) => {
    res.render("add_card")
}

let createCard = (req, res) => {
    let flashcard = {
        title: req.body.title,
        desc: req.body.desc,
        id: data.length + 1
    };
    data.push(flashcard)
    res.redirect("/flashcards")
}