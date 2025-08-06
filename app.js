const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

let applicants = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Home Route
app.get('/', (req, res) => {
    res.render('index');
});

// Registration Form Route
app.get('/register', (req, res) => {
    res.render('form');
});

// Handle Form Submission
app.post('/register', (req, res) => {
    const { name, email, role } = req.body;
    applicants.push({ name, email, role });
    res.redirect('/admin');
});

// Admin View
app.get('/admin', (req, res) => {
    res.render('admin', { applicants });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

