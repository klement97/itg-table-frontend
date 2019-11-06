//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/table-frontend'));

app.get('/*', function (req, res) {
    console.log('path: ', path);
    console.log('dirname: ', __dirname);
    res.sendFile('index.html', {root: '~/app/dist/table-frontend'});
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
