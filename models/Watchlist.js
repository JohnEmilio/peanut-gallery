const mongoose = require('mongoose')

const WatchlistSchema = new mongoose.Schema({
  movie: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})


module.exports = mongoose.model('Watchlist', WatchlistSchema)
