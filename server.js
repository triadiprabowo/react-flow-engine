// dependencies
const express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	http = require('http'),
	modRewrite = require('connect-modrewrite'),
	compression = require('compression'),
	app = express();

const port = 3000;

// req. middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(cookieParser());
app.use(compression({level: 9}));

// cors config
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');

	return next();
});

app.get(['*main.bundle.js', '*polyfills.bundle.js', '*styles.bundle.js'], function (req, res, next) {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	next();
});

// rewrite uri statement 
app.use(modRewrite([
	'!^/api/.*|\\_getModules|\\.html|\\.js|\\.css|\\.swf|\\.jp(e?)g|\\.png|\\.gif|\\.svg|\\.eot|\\.ttf|\\.woff|\\.pdf$ /index.html [L]'    
]));

// public dir
app.use(express.static('./dist/'));

// serve app
http.createServer(app).listen(port, function() {
	console.log('HTTP Server started on localhost port '+port);
});