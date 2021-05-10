const path = require('path');
const fs = require('fs');
const database = require('./db/db.json');
const { uuid } = require('uuidv4');

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, './public/index.html'));
    });

    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, './public/notes.html'));
    });

    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, './db/db.json'));

    });

    app.post('/api/notes', (req, res) => {

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            dataObject = (JSON.parse(data));
            req.body.id = uuid();
            dataObject.push(req.body);
            writeToDatabase(JSON.stringify(dataObject));
        });
        res.end();
        // res.sendFile(path.join(__dirname, './public/index.html'));
    });

    app.delete('/api/notes/:id', (req, res) => {

        let id = req.params.id;
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            dataObject = (JSON.parse(data));
            dataObject = dataObject.filter((data) => {
                return data.id !== id;
            });
            writeToDatabase(JSON.stringify(dataObject));
        });
        res.end();
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './public/index.html'));
        // res.redirect(path.join(__dirname, '/index.html'));
    });


    function writeToDatabase(data) {

        fs.writeFile('./db/db.json', data, (err) => {
            if (err) throw err;
        });
    }
}
