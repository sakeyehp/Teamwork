const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../services/dbconfig');

exports.signIn = (req, res) => {
  const { email } = req.body;
  pool.query('SELECT * FROM users WHERE email = $1', [email]).then((results) => {
    bcrypt.compare(req.body.password, results.rows[0].password).then((valid) => {
      if (valid) {
        const token = jwt.sign({ userId: results.rows[0].userid }, 'AM-HAPPY', { expiresIn: '24h' });
        res.status(200).json({
          status: "success",
          data: {
            token,
            userId: results.rows[0].userid
          }
        });
      } else {
        res.status(400).json({
          status: "error",
          Error: 'password incorrect'
        });
      }
    }).catch(() => {
      res.status(401).json({
        status: "error",
        Error: 'password incorrect'
      });
    });
  }).catch(() => {
    res.status(404).json({
      status: "error",
      Error: 'user not found'
    });
  });
};