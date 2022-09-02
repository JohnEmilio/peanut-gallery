document.querySelector('#submit').addEventListener('click', postReview)
document.querySelector('#movieSearch')
document.querySelector('.searchBtn').addEventListener('click', getMovie)

let title = ''
let overview = ''
let poster = ''

async function getMovie () {
    const movie = document.querySelector('#movieSearch').value
    console.log(movie)
    try{
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=f7260ac812c5c37cf4740e8171f9f5a8&query=${movie}`)
        const data = await res.json()

        title = data.results[0].original_title
        overview = data.results[0].overview
        poster = `https://image.tmdb.org/t/p/original${data.results[0].poster_path}`

        console.log(data, overview)
        document.querySelector('.movieTitle').innerText = title
        document.querySelector('.movieDesc').innerText = overview
        document.querySelector('.moviePoster').src = poster
        } catch (err) {
        console.error(err)
    } 
}

async function postReview(){

    const reviewText = document.querySelector('#review').value;
    const stars = displayRadioValue()

    try{
        const response = await fetch('./createReview', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'review': reviewText,
                'movie': title,
                'rating': stars,
                'poster': poster
            })
        })
        // console.log(response)
        const data = await response.json()
        console.log(data)
        location.replace('./')
    }catch(err){
        console.log(err)
    }
}

function displayRadioValue() {
    var ele = document.getElementsByName('rate');
      
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
        return ele[i].value
    }
}