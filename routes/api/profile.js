const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const config = require('config');
const request = require('request')
const { check, validationResult } = require('express-validator/check');

//@route    GET api/profile/me
//@desc    get Current User
//@access   private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({
                 msg: 'there is no profile for this user' 
                });

        }
        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
});

//@route    POST api/profile
//@desc    Add / Edit user profile
//@access   private

router.post('/',
    [
        auth,
        [
            check('status', 'Status is required')
                .not()
                .isEmpty(),
            check('skills', 'Skills are required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        //profile object construction
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.company = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        //social construction
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id });
            if (profile) {
                //update contents
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },

                    { new: true }
                );

                return res.json(profile);
            }
            //create if not exist
            profile = new Profile(profileFields);

            await profile.save();
            return res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error ');
        }
    }

);



//@route    GET api/profile
//@desc    GET ALL profiles
//@access   private

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);

    } catch (err) {
        console.error(err.message);
        res.staus(500).send('server error...');
    }
});


//@route    GET api/profile/user/:user_id
//@desc    GET profile by user id
//@access   private

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if (!profile) { return res.status(400).json({ msg: 'profile not found' }) };
        return res.json(profile);

    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'profile not found no ObjectId' });
        }
        res.status(500).send('server error...');
    }
});



//@route    DELETE api/profile
//@desc    Delete  profile, user & posts
//@access   public

router.delete('/', auth, async (req, res) => {
    try {
        //@todo - remove users posts

        //remove profile

        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });

    } catch (err) {
        console.error(err.message);

        res.status(500).send('server error...');
    }
});


//@route    put api/profile/experience
//@desc    add profile experiences
//@access   private

router.put('/experience',
    [
        auth,
        [
            check('title', 'Title is required')
                .not()
                .isEmpty(),
            check('company', 'Company is required')
                .not()
                .isEmpty(),
            check('from', 'From is required')
                .not()
                .isEmpty()
        ]
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }
        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.experience.unshift(newExp);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });


//@route    put api/profile/education
//@desc    add profile education
//@access   private

router.put('/education',
    [
        auth,
        [
            check('fieldofstudy', 'field of study is required')
                .not()
                .isEmpty(),
            check('school', 'school is required')
                .not()
                .isEmpty(),
            check('from', 'From is required')
                .not()
                .isEmpty()
        ]
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }
        const {
            fieldofstudy,
            school,
            degree,
            current,
            description,
            from,
            to
        } = req.body;

        const newEdu = {
            fieldofstudy,
            school,
            degree,
            current,
            description,
            from,
            to
        }
        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.education.unshift(newEdu);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

//@route    delete api/profile/experience/:exp_id
//@desc    delete profile experience from profile
//@access   private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id });

    //get remove index
    const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);

});
//@route    delete api/profile/education/:edu_id
//@desc    delete profile education from profile
//@access   private
router.delete('/education/:edu_id', auth, async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id });

    //get remove index
    const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.exp_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);

});

//@route    get api/profile/github/:username
//@desc    get repos from github
//@access   public

router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get(
                'githubClientId'
            )}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }
        request(options, (error, response, body) =>{
            if(error) console.error(error);

            if(response.statusCode !== 200){
res.status(404).json({msg: ' no github profile found'});
            }
           return res.json(JSON.parse(body));
        })
    } catch (err) {

        console.error(err.message);
       return res.status(500).send('server error.!.');
    }
});

module.exports = router;