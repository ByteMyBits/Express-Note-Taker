const express = require('express');
// const bodyParser = require('body-parser'); //deprecated, Express has this built in as express.json
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

//need this in order to serve the CSS and JS along with the HTML pages
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes')(app);

/* IMPORTANT where you place your middleware (app.use) with respect to require('./routes) MATTERS.
It needs to go before, otherwise it won't work on/affect routes.js
*/

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
});



// gracefully ending connections? properly timing out fetch requests
// what is .Router()?