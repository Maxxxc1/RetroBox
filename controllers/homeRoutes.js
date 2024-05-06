const router = require('express').Router();
const { Game, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all games
    const gameData = await Game.findAll({});
    // Serialize data so the template can read it - NOT NECESSARY UNLESS RENDERING INTO A TEMPLATE?
    const games = gameData.map((game) => game.get({ plain: true }));
    //res.status(200).json(gameData);
    res.render('homepage', {
      games,
      logged_in: req.session.logged_in
    });
  } catch (err) {
      res.status(400).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      //include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/blog/:id', async (req, res) => {
//   try {
//     const blogData = await Blog.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const blog = blogData.get({ plain: true });

//     const test = {test: "hello"}

//     res.render('blog', {
//       ...test,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

   res.render('login');
 });

module.exports = router;
