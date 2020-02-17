const express = require('express');
const http = require('http');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static('dist/table-frontend'));

app.get('/*', function (req, res) {
	res.sendFile('index.html', {root: 'dist/table-frontend/'});
});

const port = process.env.PORT || '4201';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Running at: http://localhost:${port}`));

// Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);
