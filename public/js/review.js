submit.addEventListener('click', postReview)



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