document.querySelector('#submitToList').addEventListener('click', addToWatchlist)
if(document.querySelector('.searchMovie')){
    document.querySelector('.searchMovie').addEventListener('click', findMovie)
}

const deleteFromList = document.querySelectorAll('.delete')

Array.from(deleteFromList).forEach((el)=>{
    el.addEventListener('click', deleteWatchlistItem)
})

async function findMovie(){
    const movie = document.querySelector('#movieSearch').value
    try{
        const res = await fetch('./reviews/getPoster', {
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
        document.querySelector('.movieDesc').innerText = overview
        document.querySelector('.moviePoster').src = `https://image.tmdb.org/t/p/original${poster}`
    }catch(err){
        console.error(err)
    }
}

async function addToWatchlist(){

    const title = document.querySelector('.movieTitle').innerText
    const poster = document.querySelector('.moviePoster').src

    try{
        const response = await fetch('../watchlist/addToWatchlist', {
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
        location.replace('./watchlist')
    }catch(err){
        console.log(err)
    }
}

async function deleteWatchlistItem() {

    const listItemId = this.parentNode.dataset.id
    console.log(listItemId)
    try{
        const response = await fetch('./watchlist/deleteWatchlistItem', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'listItemIdFromJSFile': listItemId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
