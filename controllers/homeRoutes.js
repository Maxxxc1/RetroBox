const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { Game, User, GameStatus } = require('../models');
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

    });

    const gamesCompletedData = await GameStatus.findAll({
      where: {
        user_id: req.session.user_id,
        completed: true,
      },  
        
    }); 

    const gamesPlayingData = await GameStatus.findAll({
      where: {
        user_id: req.session.user_id,
        playing: true,
      },  
        
    });

    const gamesWishlistData = await GameStatus.findAll({
      where: {
        user_id: req.session.user_id,
        wish: true,
      },  
        
    });

    let myCompletedGames = gamesCompletedData.map((game) => game.game_id);
    let myPlayingGames = gamesPlayingData.map((game) => game.game_id);
    let myWishlistGames = gamesWishlistData.map((game) => game.game_id);

    const userGamesCompletedData = await Game.findAll({
      where: {
        id: {
          [Sequelize.Op.in] : myCompletedGames
        }
      }
    });

    const userGamesPlayingData = await Game.findAll({
      where: {
        id: {
          [Sequelize.Op.in] : myPlayingGames
        }
      }
    });

    const userGamesWishlistData = await Game.findAll({
      where: {
        id: {
          [Sequelize.Op.in] : myWishlistGames
        }
      }
    });

    

    const user = userData.get({ plain: true });
    // Serialize data so the template can read it - NOT NECESSARY UNLESS RENDERING INTO A TEMPLATE?
    const gamesCompleted = userGamesCompletedData.map((game) => game.get(({ plain: true})));
    const gamesPlaying = userGamesPlayingData.map((game) => game.get(({ plain: true})));
    const gamesWishlist = userGamesWishlistData.map((game) => game.get(({ plain: true})));

    //console.log(userGamesCompleted);
    console.log(gamesCompleted);


    
    //console.log('Test' + games);
    res.render('profile', {
      user, gamesCompleted, gamesPlaying, gamesWishlist,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/profile/:id', withAuth, async (req, res) => {
  try {
    const gameStatusData = await GameStatus.destroy({
      where: {
        user_id: req.session.user_id,
        game_id: req.params.id,
      },
    });

    if (!gameStatusData) {
      res.status(404).json({ message: 'No game found with this id!' });
      return;
    }

    res.status(200).json(gameStatusData);
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
