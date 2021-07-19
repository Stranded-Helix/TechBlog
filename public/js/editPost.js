const postId = document.querySelector('#post-id').value
const btnDelete = document.querySelector('#btnDelete');

// Handles logic for when user creates a new post
const editForm = async function(event){
    event.preventDefault()

    // Assigns user values from input fields
    const postTitleData = document.querySelector("#post-title")
    const postBodyData = document.querySelector("#post-body")

    // Sends data
    await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: postTitleData.value,
            body: postBodyData.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    })
    document.location.replace('/dashboard')
}

const deletePost = async function() {
    await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    })
    document.location.replace('/dashboard')
}
document.querySelector('.edit-post-form');
document.addEventListener('submit', editForm)

btnDelete.addEventListener('click', deletePost);