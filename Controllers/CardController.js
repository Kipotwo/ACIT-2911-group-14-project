const RequestService = require('../Services/RequestService');
const User           = require('../Models/User');

// Placeholder "Database"
database = [{title: "Test Card", context: "This is just a test", id: 1}]

searchListCard = []

let getCard = (cardId) => {
    let cardInfo = "placeholder"

    for (i in database){
        if (database[i].id === parseInt(cardId)){
            cardInfo = database[i]
        }
    }

    return cardInfo
}


let Index = (req, res) => {
    var reqInfo = RequestService.reqHelper(req);

    if(reqInfo.authenticated) {
            res.render("Card/Index", {cards: database, 
                reqInfo:reqInfo})
        }
    else {
        res.redirect('/User/Login?errorMessage=You ' + 
                     'must be logged in to view this page.')
    }

}

let CreateCard = (req, res) => {   
    var reqInfo = RequestService.reqHelper(req);

    if(reqInfo.authenticated) {   
        res.render("Card/Create", {cards: database, 
            reqInfo:reqInfo})
    }
    else {
    res.redirect('/User/Login?errorMessage=You ' + 
                 'must be logged in to view this page.')
    }   
}

let Create = (req, res) => {
    let flashcard = {
        title: req.body.title,
        context: req.body.context,
        id: database.length + 1
    };
    database.push(flashcard)
    res.redirect("/Card/Index")
}

let Detail = (req, res) => {
    var reqInfo = RequestService.reqHelper(req);

    if(reqInfo.authenticated) {  
        // Uses flashcard id to make it easier for myself :) 
        let cardId = req.params.id;
        let cardInfo = getCard(cardId)

        // Fixed the redirect part
        if (cardInfo === "placeholder"){
            res.render('Card/Index', {cards:database, 
                reqInfo:reqInfo});
        } else {
            res.render('Card/Detail', {cards:cardInfo,
                reqInfo:reqInfo});
        }
    }
    else {
    res.redirect('/User/Login?errorMessage=You ' + 
                 'must be logged in to view this page.')
    }  
}

let Delete = (req, res) => {
    var reqInfo = RequestService.reqHelper(req);

    if(reqInfo.authenticated) {   
        let cardId = req.params.id;

        let cardInfo = getCard(cardId)

        if (cardInfo !== "placeholder"){
            database.splice(database[i], 1)
        }

        res.render('Card/Index', {cards:database, reqInfo:reqInfo})
    }else {
        res.redirect('/User/Login?errorMessage=You ' + 
                    'must be logged in to view this page.')
    } 
}

let Edit = (req, res) => {
    var reqInfo = RequestService.reqHelper(req);

    if(reqInfo.authenticated) {   
        let cardId = req.params.id;

        let cardInfo = getCard(cardId)
    
        if (cardInfo === "placeholder"){
            res.render('Card/Index', {cards:database, 
                reqInfo:reqInfo})
        } else {
            res.render('Card/Edit', {card:cardInfo, 
                reqInfo:reqInfo})
        }
    }
    else {
    res.redirect('/User/Login?errorMessage=You ' + 
                 'must be logged in to view this page.')
    }  
}

let Update = (req, res) => {
    let cardId = req.params.id;

    let cardInfo = getCard(cardId);

    cardInfo.title = req.body.title;
    cardInfo.context = req.body.context;

    res.redirect("/")
}

let Search = (req, res) => {
    var reqInfo = RequestService.reqHelper(req);

    if(reqInfo.authenticated) {    

        let title = req.body.title
        console.log(title)

        for (i in database){
            var allCard = database[i]
            var allTitle = allCard.title

            if(allTitle.includes(title)){
                searchListCard.push(database[i])
            }
        }
        for (i in searchListCard){
            var allSearchCard = searchListCard[i]
            var allSearchTitle = allSearchCard.title

            if(allSearchTitle.indexOf(title) == -1){
                searchListCard.splice(searchListCard[i], 1)
            }
        }

        return res.render('Card/Search', { cards: searchListCard, reqInfo:reqInfo });
    }
}

let Shuffle = (req, res) => {
    var reqInfo = RequestService.reqHelper(req);

    if(reqInfo.authenticated) { 
        randomNumber = Math.floor(Math.random * this.database.length)
        randomItem = this.database[randomNumber]

        res.render('Card/Shuffle', { cards: randomItem })
    }
    
    else {
        res.redirect('/User/Login?errorMessage=You ' + 
                     'must be logged in to view this page.')
    }
}


module.exports = {database, searchListCard, Index, CreateCard, Create, Detail, Delete, Edit, Update, Search, Shuffle}