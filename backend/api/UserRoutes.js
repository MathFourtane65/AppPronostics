const router = require("express").Router();
const User = require("../models/User");
var userController = require("../api/UserController");
var passport = require('passport');

router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});




// router.post("/register", async (req, res) => {
//   if (await userExists(req.body.email)) {
//     res.status(409).json({ error: "Email already exists" });
//   } else {
//     const newUser = new User(req.body);
//     newUser.save().then((user) => {
//         res.status(201).json(user);
//       })
//       .catch((err) => {
//         res.status(500).json({ error: err.message });
//       });
//   }
// });

// router.post("/login", (req, res) => {
//     User.findOne({email: req.body.email, password:req.body.password}).then(user => {

//         if(user){
//             res.status(200).json(user)
//         }else {
//             res.status(401).json({error: 'Incorrect email or password !'});
//         }

//     }).catch(err => {
//         res.status(500).json({error: err.message});
//     })
// })


// const userExists = async (email) => {
//     const user = await User.findOne({email: email.toLowerCase().trim()})

//     if(user){
//         return true;
//     } else {
//         return false;
//     }
// };

module.exports = router;
