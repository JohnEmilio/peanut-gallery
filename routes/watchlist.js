const express = require('express')
const router = express.Router()
const watchlistController = require('../controllers/watchlist') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, watchlistController.getWatchlist)

router.post('/addToWatchlist', watchlistController.addToWatchlist)

router.delete('/deleteWatchlistItem', watchlistController.deleteWatchlistItem)

/*router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo', todosController.deleteTodo)*/

module.exports = router