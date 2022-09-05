const fetch = require('node-fetch')
const Watchlist = require('../models/Watchlist')

module.exports = {
    getWatchlist: async (req,res)=>{
        console.log(req.user)
        try{
            const watchList = await Watchlist.find({userId: req.user.id})
            
            res.render('watchList.ejs', {watchlist: watchList})
            console.log('Watchlist rendered!')
        }catch(err){
            console.log(err)
        }
    },
    addToWatchlist: async (req, res)=>{
        try{
            await Watchlist.create({
                movie:  req.body.movie, 
                poster: req.body.poster, 
                userId: req.user.id,
                completed: false
            })
            console.log(req.body)
            console.log('Watchlist item has been added!')
            res.json('Added It')
        }catch(err){
            console.log(err)
        }
    },
    deleteWatchlistItem: async (req, res)=>{
        console.log(req.body.listItemIdFromJSFile)
        try{
            await Watchlist.findOneAndDelete({_id:req.body.listItemIdFromJSFile})
            console.log('Deleted Item')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    /*markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }*/
    
}    