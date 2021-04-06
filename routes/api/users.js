const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check'); //validation response

//@route    post api/users
//@desc     register users
//@access   Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password required').exists()
  ], async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); 
   }
  const { name, email, password } = req.body;
  
    try {
        //user exist?
        let user = await User.findOne({ email });

                    if (user) {
                      return  res.status(400).json({
                            errors: [{ msg: 'User already exists' }]
                        });
                    }

                    const avatar = gravatar.url(email, {
                        s: '200',
                        r: 'r',
                        d: 'mm'
                    });
                    user = new User({
                        name,
                        email,
                        avatar,
                        password
                    });

        const salt = await bcrypt.genSalt(10);

         user.password = await bcrypt.hash(password, salt);


        //@desc     register user
        await user.save();

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