submit.addEventListener('click', postReview)
document.querySelector('#movieSearch')
document.querySelector('.searchBtn').addEventListener('click', getMovie)


async function getMovie () {
    const movie = document.querySelector('#movieSearch').value
    console.log(movie)
    try{
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${PUT IN YOUR KEY SILLY}&query=${movie}`)     
        const data = await res.json()

        const title = data.results[0].original_title
        const overview = data.results[0].overview
        const poster = data.results[0].poster_path

        console.log(data, overview)
        document.querySelector('.movieTitle').innerText = title
        document.querySelector('.movieDescription').innerText = overview
        document.querySelector('.moviePoster').src = `https://image.tmdb.org/t/p/original${poster}`
        } catch (err) {
        console.error(err)
    } 
}

async function postReview(){
    const movieTitle = document.querySelector('#title').value;
    const reviewText = document.querySelector('#review').value;
    const stars = displayRadioValue()
    console.log(movieTitle, reviewText, stars)
    try{
        const response = await fetch('./createReview', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'review': reviewText,
                'movie': movieTitle,
                'rating': stars
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