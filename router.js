var CardController = require('./Controllers/CardController');

// Routes
module.exports = function(app){  

    app.get('/',      CardController.Index);
    
    app.get('/Card/Index',      CardController.Index);
    app.post('/Card/CreateCard', CardController.Create);
    app.get('/Card/Create', CardController.CreateCard);

    app.get('/Card/Detail/:id', CardController.Detail);
    app.get('/Card/Detail/:id/Delete', CardController.Delete);
    app.get('/Card/Detail/:id/Edit', CardController.Edit);
    app.post('/Card/Update/:id', CardController.Update);
    app.post('/Card/Search', CardController.Search);
};
