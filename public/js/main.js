const deleteBtn = document.querySelectorAll('.del')
const reviewItem = document.querySelectorAll('span.not')
const reviewComplete = document.querySelectorAll('span.completed')


Array.from(deleteBtn).forEach((el) => {
    el.addEventListener('click', deleteReview)
})

Array.from(reviewItem).forEach((el) => {
    el.addEventListener('click', markComplete)
})

Array.from(reviewComplete).forEach((el) => {
    el.addEventListener('click', markIncomplete)
})



async function deleteReview() {
    const reviewId = this.parentNode.dataset.id
    try {
        const response = await fetch('./deleteReview', {
            method: 'delete',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'reviewIdFromJSFile': reviewId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

async function markComplete() {
    const todoId = this.parentNode.dataset.id
    try {
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

async function markIncomplete() {
    const todoId = this.parentNode.dataset.id
    try {
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

window.addEventListener('load', (event) => {
    // Wrap every letter in a span
    var textWrapper = document.querySelector('.ml2');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: true })
        .add({
            targets: '.ml2 .letter',
            scale: [4, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 950,
            delay: (el, i) => 70 * i
        }).add({
            targets: '.ml2',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });

});