
var HomeController = require('./Controllers/HomeController');
var UserController = require('./Controllers/UserController');
var CardController = require('./Controllers/CardController');

// Routes
module.exports = function(app){  
    // Main Routes
    app.get('/',      HomeController.Index);

    app.get('/User/Register', UserController.Register);
    app.post('/User/RegisterUser', UserController.RegisterUser);
    app.get('/User/Login', UserController.Login);
    app.post('/User/LoginUser', UserController.LoginUser);
    app.get('/User/Logout', UserController.Logout);

    app.get('/Card/Index',      CardController.Index);
    app.post('/Card/CreateCard', CardController.Create);
    app.get('/Card/Create', CardController.CreateCard);
    app.get('/Card/Detail/:id', CardController.Detail);
    app.get('/Card/Detail/:id/Delete', CardController.Delete);
    app.get('/Card/Detail/:id/Edit', CardController.Edit);
    app.post('/Card/Update/:id', CardController.Update);
    app.post('/Card/Search', CardController.Search);

    app.get('/Card/Shuffle', CardController.Shuffle);
};
