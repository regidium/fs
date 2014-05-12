var http           = require('http');
var express        = require('express');
var staticFavicon  = require('static-favicon');
var compression    = require('compression');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var morgan         = require('morgan');
var config         = require('./config/config/config.json');
var router         = require('./src/app/router/router');

var app    = express();
var server = http.createServer(app);

var env = config.env || 'development';
app.set(env);

app.locals.env = config.env;
app.locals.config = config;

app.set('port', config.server.port);

app.use(staticFavicon());
app.use(compression());
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static('./public'));

app.use(function(err, req, res, next) {
    if (!err) {
        return next();
    }

    // @todo
    if (req.xhr || req.headers['xhr']) {
        res.json({error: err});
    } else {
        res.status(500);
        res.render('common/error', { error: err });
    }
});

if ('development' == env) {
    app.use(morgan('dev'));
}

if ('production' == env) {}

// Routes
router.init(app);

server.listen(app.get('port'), function() {
    console.log('File server listening on port ' + app.get('port'));
});