// require dependencies
const express = require('express');

// set up the app
const app = express();

// set up routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/courses', (req, res) => {
   res.send([1, 2, 3]);
});

// start the server
app.listen(3000, () => {
   console.log('Listening on port 3000');
});
