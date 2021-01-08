const commentFormHandler = async function(event) {
    event.preventDefault();
  
    const postId = document.querySelector('input[name="post-id"]').value;
    const body = document.querySelector('textarea[name="comment-body"]').value;
  
    if (body) {
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          postId,
          body
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        document.location.reload();

    } else {
        alert(response.statusText);
        document.querySelector('#comment-form').style.display = "block";
    }
}
};

document.querySelector('#new-comment-form').addEventListener('submit', commentFormHandler);