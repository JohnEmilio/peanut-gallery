const fetch = require('node-fetch')
const Review = require('../models/Review')

module.exports = {
    newReview: (req,res)=>{
        res.render('newReview.ejs',{})
    },
    createReview: async (req, res)=>{
        try{
            await Review.create({
                review: req.body.review, 
                movie: req.body.movie, 
                rating: req.body.rating, 
                poster: req.body.poster, 
                userId: req.user.id})
            console.log(req.body)
            console.log('Review has been added!')
            res.json('Added It')
        }catch(err){
            console.log(err)
        }
    },
    editReview: async (req,res)=>{
        try{
            const reviewItem = await Review.findById(req.params.id)
            console.log(reviewItem)
            res.render('editReview.ejs', {review: reviewItem, user: req.user.id})
        }catch(err){
            console.log(err)
        }
    },
    updateReview: async (req,res)=>{
        const reviewFromJs = req.body.review
        const stars = req.body.rating
        console.log(stars)
        
        try{
            await Review.findOneAndUpdate({_id:req.body.id},{
                review: reviewFromJs,
                rating: stars
            })
            console.log('Review Updated')
            res.json('Review Updated')
        }catch(err){
            console.log(err)
        }
    },
    getReviews: async (req,res)=>{
        console.log(req.user)
        try{
            const reviewItems = await Review.find({userId:req.user.id})
            res.render('reviews.ejs', {reviews: reviewItems, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    allReviews: async (req,res)=>{
        console.log(req.user)
        try{
            const reviewItems = await Review.find()
            res.render('allReviews.ejs', {reviews: reviewItems})
        }catch(err){
            console.log(err)
        }
    },
    deleteReview: async (req, res)=>{
        console.log(req.body.reviewIdFromJSFile)
        try{
            await Review.findOneAndDelete({_id:req.body.reviewIdFromJSFile})
            console.log('Deleted Review')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    getPoster: async (req, res) => {
        try{
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${req.body.movie}`)
            const data = await response.json()
            res.json(data) 
        }catch(err){
            console.error(err)
        }
    }
    
}    