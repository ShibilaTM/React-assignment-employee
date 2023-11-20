const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const cors = require('cors');
router.use(express.json());
router.use(cors())
// // Example: Create an employee
// const employee = {
//     email: 'employee@gmail.com',
//     password: bcrypt.hashSync('user', 10),
//     role: 'employee',
// };

// // Example: Create an admin
// const admin = {
//     email: 'admin@gmail.com',
//     password: bcrypt.hashSync('admin', 10),
//     role: 'admin',
// };

// // Simulated "database" of users
// const users = [employee, admin];

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         if (!email || !password) {
//             return res.status(400).json({ status: 'error', message: 'Email and password are required.' });
//         }
    
//         // Find user by email
//         const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
//         if (user) {
//             // Compare passwords using bcrypt
//             bcrypt.compare(password, user.password)
//                 .then(match => {
//                     if (match) {
//                         // Check the user role
//                         if (user.role === 'employee') {
//                             res.json({ status: 'success', role: 'employee' });
//                         } else if (user.role === 'admin') {
//                             res.json({ status: 'success', role: 'admin' });
//                         } else {
//                             res.json({ status: 'error', message: 'Invalid role' });
//                         }
//                     } else {
//                         res.json('the password is incorrect');
//                     }
//                 })
//                 .catch(err => {
//                     console.error(err);
//                     res.status(500).json({ status: 'error' });
//                 });
//         }
//     } catch (error) {
//         res.json('no record exists');
//     }
 
// });


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

    // Find user by email
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (user) {
        
        if (password === user.password) {
            // Check the user role
            if (user.role === 'employee') {
                res.json({ status: 'success', role: 'employee' });
            } else if (user.role === 'admin') {
                res.json({ status: 'success', role: 'admin' });
            } else {
                res.json({ status: 'error', message: 'Invalid role' });
            }
        } else {
            res.json('the password is incorrect');
        }
    } else {
        res.json('no record exists');
    }
});

module.exports = router;





