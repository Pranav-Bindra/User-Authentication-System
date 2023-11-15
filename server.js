const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');
const app = express();

app.use(bodyParser.json());
app.use(cors());

// PostgreSQL connection configuration
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'login_page',
    password: 'Pogback6@',
    port: '5432' // Default PostgreSQL port is 5432
});

// Connect to the PostgreSQL database
client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch(err => {
        console.error('Error connecting to PostgreSQL database', err);
    });

// Handle POST request from the login form
app.post('/submit', (req, res) => {
    const { email, password } = req.body;

    // Basic form validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Please fill out all fields.' });
    }

    const loginQuery = {
        text: 'SELECT * FROM signup WHERE email = $1',
        values: [email],
    };

    client.query(loginQuery)
        .then(result => {
            if (result.rows.length === 0) {
                console.log('Email not found in login table. Redirecting to login page.');
                res.json({ message: 'Email not found in login table. Redirecting to login page.' });
            } else {
                const storedPassword = result.rows[0].password;

                // Compare the provided password with the stored password
                if (password === storedPassword) {
                    console.log('Login successful. Redirecting to home page.');
                    res.json({ message: 'Login successful. Redirecting to home page.' });
                    const loginInsertQuery = {
                        text: 'INSERT INTO login (email, password) VALUES ($1, $2)',
                        values: [email, password],
                    };
                    return client.query(loginInsertQuery);
                } else {
                    console.log('Incorrect password. Please try again.');
                    res.json({ message: 'Incorrect password. Please try again.' });
                }
            }
        })
        .catch(err => {
            console.error('Error checking email in login table:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});


function isStrongPassword(password) {
    // Password length at least 8 characters
    const lengthRegex = /.{8,}/;

    // At least one uppercase letter
    const uppercaseRegex = /[A-Z]/;

    // At least one lowercase letter
    const lowercaseRegex = /[a-z]/;

    // At least one digit
    const digitRegex = /\d/;

    // At least one special character
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    // Check all conditions
    return (
        lengthRegex.test(password) &&
        uppercaseRegex.test(password) &&
        lowercaseRegex.test(password) &&
        digitRegex.test(password) &&
        specialCharRegex.test(password)
    );
}

// Handle POST request from the signup form
app.post('/signup', (req, res) => {
    const { fname, lname, email, password } = req.body;

    // Basic form validation
    if (!fname || !lname || !email || !password) {
        return res.status(400).json({ error: 'Please fill out all fields.' });
    }

    if (!isStrongPassword(password)) {
        return res.status(400).json({ error: 'Password does not meet the required strength criteria.' });
    }

    const loginQuery = {
        text: 'SELECT * FROM signup WHERE email = $1',
        values: [email],
    };

    client.query(loginQuery)
        .then(result => {
            if (result.rows.length === 0) {
                console.log('Email not found in signup table. Proceeding with signup.');
                res.json({ message: 'Email not found in signup table. Proceeding with signup.' });
                const signupInsertQuery = {
                    text: 'INSERT INTO signup (fname, lname, email, password) VALUES ($1, $2, $3, $4)',
                    values: [fname, lname, email, password],
                };
                return client.query(signupInsertQuery);
            } else {
                console.log('Email found in login table. Redirecting to login page.');
                res.json({ message: 'Email found in login table. Redirecting to login page.' });
            }
        })
        .catch(err => {
            console.error('Error checking email in login table:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
