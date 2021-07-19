const postForm = async function(event){
    event.preventDefault()

    // Assigns user values from input fields
    const postTitleData = document.querySelector("#post-title")
    const postBodyData = document.querySelector("#post-body")

    // Sends data
    await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
            title: postTitleData.value,
            body: postBodyData.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    })
    document.location.replace('/dashboard')
}

document.querySelector('.post-form');
document.addEventListener('submit', postForm)