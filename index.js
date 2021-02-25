const express = require('express');
const bodyParser = require('body-parser');
// const session = require('express-session');
const cors = require('cors');
const handler = require('./handler');

const app = express();

app.set("port", (process.env.PORT || 3002));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

// app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: { maxAge: 60000 * 30 } }));

/**
 * Wrap an async request handler so that it can be passed to express as a
 * middleware function. Errors will be handled by calling the `next` callback.
 */
function wrapAsyncHandler(handler) {
    return (...args) => handler(...args).catch(args[2]);
}

/** sytem_user routes */
app.get('/api/marvel/characters', wrapAsyncHandler(handler.getCharacters));
app.get('/api/marvel/character/profile', wrapAsyncHandler(handler.getProfile));

const PORT = app.get("port");

app.listen(PORT, function () {
    console.log(`App started at http://localhost:${PORT}`);
});
