const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth.js");
const User = require("../../models/User");
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check'); //validation response

 
//@route    GET api/auth
//@desc     test route
//@access   Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error! Cannot find user by Id");
  }
});

//@route    post api/auth
//@desc     authenticate users get token
//@access   Public
router.post('/', [
  
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password required').exists()
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });

  }
const { email, password } = req.body;

  try {
      //user exist?
      let user = await User.findOne({ email });

                  if (!user) {
                    return  res.status(400).json({
                          errors: [{ msg: 'User no' }]
                      });
                  }

      const isMatch = await bcrypt.compare(password,user.password);

if(!isMatch){
  return  res.status(400)
  .json({  errors: [{ msg: 'password no' }]
});
}
 
      const payload = {
         user: {
          id: user.id
         }
      }
          jwt.sign(
              payload,
              config.get('jwtSecret'),
              {expiresIn: 360000},
              (err,token) => {
                  if (err) throw err; 
                 return res.json({token});
              }

          );

  } catch (err) {
      console.error("oops ",err.message);
      res.status(500).send(err.message);

  }
}
);
module.exports = router;
