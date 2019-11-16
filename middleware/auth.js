const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'AM-HAPPY');
    const { userId } = decodedToken;
    if (req.body.userId && req.body.userId !== userId) {
      res.status(404).json({
        Error: "Invalide User ID"
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: new Error('invalide request')
    });
  }
};