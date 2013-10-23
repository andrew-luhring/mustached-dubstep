

    var express = require('express')
        , hbs = require('express-hbs')
        , app = express()
        , path = require('path')
        , Backbone = require('backbone')
        , Server = require('../app')
        , viewsD = __dirname + '/../views/'
        , partialsD = viewsD + 'partials/'
        , defaultF = viewsD + 'default.hbs'
        , portN = 5000

        //, model = require('../models/model');
console.log(typeof Server);
    //whatever happens, this file needs to call Server.
    app.use(express.static(path.join(__dirname, 'public')))
          .use(express.bodyParser())
          .use(express.logger('dev'))
          .use(express.methodOverride());
    app.set('view engine', 'hbs')
           .set('port', process.env.PORT || portN)
           .set('cache', false)
           .set('views', viewsD);

    app.engine('hbs', hbs.express3({
        partialsDir: partialsD,
        defaultLayout: defaultF
    }));
    //Dynamically include routes
    app.get('/', function (req, res) {
        res.render(defaultF);

        //console.log(app.settings);
    });
    Server(app);




//routes = require('./routes')
/*
 * What the fuck it is that I'm trying to do.
 *
 * Backbone will be reading the content from the websites.json file
 * and then it will be using its' (backbones's) router
 * to determine which content should be passed into the
 * handlebar templates' view.
 *
 *
 * */


/*
 AppRouter = Backbone.Router.extend({
 routes: {
 "worktypes/:category": "worktype"
 },
 worktype: function (category) {
 }
 });

 var app = new AppRouter();
 */
