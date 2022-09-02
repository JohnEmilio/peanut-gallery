document.querySelector('#submit').addEventListener('click', postReview)
document.querySelector('#movieSearch')
document.querySelector('.searchBtn').addEventListener('click', getPoster)

async function getMovie () {
    const movie = document.querySelector('#movieSearch').value
    console.log(movie)
    try{
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

async function getPoster(){
    const movie = document.querySelector('#movieSearch').value
    try{
        const res = await fetch('./getPoster', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'movie': movie,
            })
        })
        const data = await res.json()
        const title = data.results[0].original_title
        const overview = data.results[0].overview
        const poster = data.results[0].poster_path
        document.querySelector('.movieTitle').innerText = title
        document.querySelector('.movieDescription').innerText = overview
        document.querySelector('.moviePoster').src = `https://image.tmdb.org/t/p/original${poster}`
    }catch(err){
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