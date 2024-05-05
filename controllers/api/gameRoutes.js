const router = require('express').Router();
const { Game, GamesCompleted, User} = require('../../models');
const withAuth = require('../../utils/auth');

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
  
// get one game by its id
router.get('/:id', async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.id);
    if (!gameData) {
      res.status(404).json({ message: "No game found with this id!" });
    }
    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// to create a new game 
router.post('/', withAuth, async (req, res) => {
  try {
    const newGame = await Game.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newGame);
  } catch (err) {
    res.status(400).json(err);
  }
});

// to delete a game by its id 
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const gameData = await gameData.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!gameData) {
      res.status(404).json({ message: 'No game found with this id!' });
      return;
    }

    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;