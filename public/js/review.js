// document.querySelector('#submit').addEventListener('click', postReview)
// document.querySelector('#movieSearch')
// document.querySelector('.searchBtn').addEventListener('click', getPoster)
// const movies = document.getElementById('moviesSelection')
// movies.addEventListener('change', changeMovie)
document.querySelector('#addToList').addEventListener('click', addToList)

let currentMovies = []
let title = ''
let overview = ''
let poster = ''

async function getPoster () {
    const movie = document.querySelector('#movieSearch').value

    while (movies.firstChild) {
        movies.removeChild(movies.firstChild)
    }

    try {
        const res = await fetch('./getPoster', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'movie': movie,
            })
        })
        const data = await res.json()
        currentMovies = data.results
        console.log(currentMovies)

        if (currentMovies.length > 1) {
            const selected = document.createElement('option')
            selected.text = 'Select a movie below'
            movies.appendChild(selected)
            currentMovies.forEach(mov => {
                const currMov = document.createElement('option')
                currMov.setAttribute('id', mov.id)
                currMov.value = mov.original_title
                currMov.text = `Movie: ${mov.original_title}, Date: ${mov.release_date}`
                movies.appendChild(currMov)
            })
        } else {
            title = data.results[0].original_title
            overview = data.results[0].overview
            poster = `https://image.tmdb.org/t/p/original${data.results[0].poster_path}`

            document.querySelector('.movieTitle').innerText = title
            document.querySelector('.movieDesc').innerText = overview
            document.querySelector('.moviePoster').src = poster
        }
        movies.toggleAttribute('hidden')
        movies.style.display = 'inherit'

    } catch (err) {
        console.error(err)
    }
}

function changeMovie (e) {
    const id = e.target.selectedOptions[0].id
    const selectedMov = currentMovies.filter(mov => mov.id == id)

    title = selectedMov[0].original_title
    overview = selectedMov[0].overview
    poster = `https://image.tmdb.org/t/p/original${selectedMov[0].poster_path}`

    document.querySelector('.movieTitle').innerText = title
    document.querySelector('.movieDesc').innerText = overview
    document.querySelector('.moviePoster').src = poster
}

async function postReview () {
    const reviewText = document.querySelector('#review').value;
    const stars = displayRadioValue()
    if (!title) {
        alert('Please select a movie')
    }
    else if (!reviewText || !stars) {
        alert('Please complete a review by entering text and selecting a star rating')
    }
    else {
        try {
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
            const data = await response.json()
            console.log(data)
            location.replace('./')
        } catch (err) {
            console.log(err)
        }
    }
}

function displayRadioValue () {
    var ele = document.getElementsByName('rate');
      
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
        return ele[i].value
    }
}

async function addToList(){

    //const title = document.querySelector('.movieTitle').innerText
    //const poster = document.querySelector('.moviePoster').src
    console.log("add to list called")

    try{
        const response = await fetch('./watchlist/addToWatchlist', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'movie': title,
                'poster': poster
            })
        })
        console.log(response)
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
