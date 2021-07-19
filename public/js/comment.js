const commentForm = async function(event){
    event.preventDefault()

    // Gets user input values
    const postId = document.querySelector('#post-id').value
    const body = document.querySelector('#comment-body').value

    // Sends comment data
    if (body){
        await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                body
            }),
            headers: { 'Content-Type': 'application/json' },
        })

        document.location.reload()
    }
}


document.querySelector('.comment-form')
document.addEventListener('submit', commentForm)