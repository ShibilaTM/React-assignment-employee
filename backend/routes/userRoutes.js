// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const cors = require('cors');
// router.use(express.json());
// router.use(cors())
// const jwt = require('jsonwebtoken')

// // Example: Create an employee
// const employee = {
//     email: 'employee@gmail.com',
//     password: 'user', 
//     role: 'employee',
// };

// // Example: Create an admin
// const admin = {
//     email: 'admin@gmail.com',
//     password: 'admin', 
//     role: 'admin',
// };

// // Simulated "database" of users
// const users = [employee, admin];

// router.post('/login', (req, res) => {
//     const { email, password } = req.body;
    
//     if (!email || !password) {
//         return res.status(400).json({ status: 'error', message: 'Email and password are required.' });
//     }

//     // Find user by email
//     const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

//     if (user) {
        
//         if (password === user.password) {
//             // Check the user role
//             if (user.role === 'employee') {
//                 res.json({ status: 'success', role: 'employee' });
//             } else if (user.role === 'admin') {
//                 res.json({ status: 'success', role: 'admin' });
//             } else {
//                 res.json({ status: 'error', message: 'Invalid role' });
//             }
//         } else {
//             res.json('the password is incorrect');
//         }
//     } else {
//         res.json('no record exists');
//     }
// });

// module.exports = router;

const userData = require('../model/userData')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const cors = require('cors');
router.use(express.json());
router.use(cors());
const jwt = require('jsonwebtoken');

// Example: Create an employee
const employee = {
    email: 'employee@gmail.com',
    password: 'user',
    role: 'employee',
};

// Example: Create an admin
const admin = {
    email: 'admin@gmail.com',
    password: 'admin',
    role: 'admin',
};

// Simulated "database" of users
const users = [employee, admin];

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: 'error', message: 'Email and password are required.' });
    }

    // Find user by email (case-insensitive)
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (user) {
        if (password === user.password) {
            // Create a payload with user information
            const payload = {
                email: user.email,
                role: user.role,
            };

            // Generate a token with the payload
            const token = jwt.sign(payload, 'reactemployeeapp'); 
            // Return the token and payload as a JSON response
            res.status(200).send({message: 'success', token:token,payload });
        } else {
            res.status(404).send({message:   'error' });
        }
    } else {
        res.status(401).send({message: 'No record exists' });
    }
});

module.exports = router;




