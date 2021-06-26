var express = require('express');
var router = express.Router();
var {User} = require('../../models/user');
var bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');

/* GET users listing. */
router.post('/register', async function(req, res, next) {
  let user = await User.findOne({email: req.body.email});
  if (user) return res.status(400).send("Email already exist...");
  user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  await user.generateHashedPassword();
  await user.save();
  let token = jwt.sign({_id: user._id, name:user.name, role: user.role},
    config.get('jwtprivatekey'));
  let dataToReturn = {
    name: user.name,
    email: user.email,
    role: user.role,
  }
  return res.send(dataToReturn);
});

router.post('/login', async(req, res) => {
  let user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send("User is not available...");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if(!isValid) return res.status(401).send("Password is invalid");
  let token = jwt.sign({ _id: user._id, name:user.name, role: user.role }, 
    config.get('jwtprivatekey'));
  res.send(token);
});

module.exports = router;
