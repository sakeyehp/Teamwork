const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../services/dbconfig');

exports.createUser = (req, res) => {
  // eslint-disable-next-line object-curly-spacing
  // eslint-disable-next-line object-curly-newline
  const { firstName, lastName, email, password, gender, jobRole, department, address } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'AM-HAPPY');
  const { userId } = decodedToken;
  if (userId == 1) {
    bcrypt.hash(password, 10, (error, hash) => {
      if (hash) {
        pool.query('INSERT INTO users (first_name,last_name, email, password, gender, job_role,department, address)VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING userId As id',
          [firstName, lastName, email, hash, gender, jobRole, department, address]).then((data) => {
          res.status(201).json({
            status: "success",
            data: {
              message: "User account successfully created",
              token,
              userId: data.rows[0].id
            }
          });
        }).catch(() => {
          res.status(400).json({
            status: "error",
            Error: "User not created, email address has been used by another user"
          });
        });
      } else {
        res.status(400).json({
          status: "error",
          Error: "password not hashed"
        });
      }
    });
  } else {
    res.status(400).json({
      status: "error",
      message: "users can only be created by admin"
    });
  }
};