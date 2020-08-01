const auth = (req, res, next) => {
  console.log('Authentication middleware........');

  return res.send({ msg: 'Not authenticated!' });

  next();
};
module.exports = auth;
