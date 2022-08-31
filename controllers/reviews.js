const Review = require('../models/Review')

module.exports = {
    newReview: (req,res)=>{
        res.render('newReview.ejs',{})
    },
    createReview: async (req, res)=>{
        try{
            await Review.create({review: req.body.review, movie: req.body.movie, rating: req.body.rating, userId: req.user.id})
            console.log(req.body)
            console.log('Review has been added!')
            res.json('Added It')
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
    deleteReview: async (req, res)=>{
        console.log(req.body.reviewIdFromJSFile)
        try{
            await Review.findOneAndDelete({_id:req.body.reviewIdFromJSFile})
            console.log('Deleted Review')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
    
}    