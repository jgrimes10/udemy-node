// require dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');

// set up the app
const app = express();

app.use(bodyParser.json());

const courses = [
    {
        id: 1,
        name: 'course 1'
    },
    {
        id: 2,
        name: 'course 2'
    },
    {
        id: 3,
        name: 'course 3'
    }
];

// set up routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) { // 404
        res.sendStatus(404).send(`Course with id ${req.params.id} not found.`);
    } else {
        res.send(course);
    }
});

app.post('/api/courses', (req, res) => {
    // input validation
    const {error} = validateCourse(req.body);
    if (error) {
        // 400 - bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // if doesn't exist, return 404
    if (!course) {
        res.status(404).send(`Course with id ${req.params.id} not found.`);
        return;
    }

    // validate
    const {error} = validateCourse(req.body);
    // if invalid, return 400
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // update course
    course.name = req.body.name;

    // return the updated course
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    // look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // if doesn't exist, return 404
    if (!course) {
        res.status(404).send(`Course with id ${req.params.id} not found.`);
        return;
    }

    // delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // return same course
    res.send(course);
});

// start the server
app.listen(process.env.PORT || 3000, () => {
   console.log('Listening on port 3000');
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}
