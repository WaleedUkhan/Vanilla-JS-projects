document.addEventListener('DOMContentLoaded', () => {
    try {
        const postForm = document.getElementById('post-form');
        const postFeed = document.getElementById('post-feed');
        const notificationList = document.getElementById('notification-list');
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        let notifications = JSON.parse(localStorage.getItem('notifications')) || [];

        // Display posts and notifications when the page loads
        displayPosts();
        displayNotifications();

        // Handle post submission
        postForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const postText = document.getElementById('post-text').value;
            const postImageInput = document.getElementById('post-image').files[0];
            const user = JSON.parse(localStorage.getItem('user'));

            let newPost = {
                userName: user.name,
                text: postText,
                imageUrl: null,
                timestamp: new Date().toLocaleString(),
                likes: 0,
                comments: [] // Ensure comments is always an array
            };

            if (postImageInput) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    newPost.imageUrl = e.target.result;
                    posts.push(newPost);
                    localStorage.setItem('posts', JSON.stringify(posts));
                    displayPosts();
                };
                reader.readAsDataURL(postImageInput);
            } else {
                posts.push(newPost);
                localStorage.setItem('posts', JSON.stringify(posts));
                displayPosts();
            }

            postForm.reset();
        });

        // Function to display posts
        function displayPosts() {
            postFeed.innerHTML = '';

            posts.forEach((post, index) => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');

                let postContent = `
                    <h3>${post.userName}</h3>
                    <p>${post.text}</p>
                    <small>${post.timestamp}</small>
                    <div class="post-interactions">
                        <button class="like-btn">Like (<span class="like-count">${post.likes}</span>)</button>
                        <button class="comment-btn">Comment</button>
                        <button class="delete-btn" data-index="${index}">Delete</button>
                    </div>
                    <div class="comments-section">
                        <input type="text" class="comment-input" placeholder="Add a comment...">
                        <button class="add-comment-btn">Add</button>
                        <ul class="comment-list">
                            ${(post.comments || []).map(comment => `<li>${comment}</li>`).join('')}
                        </ul>
                    </div>
                `;

                postElement.innerHTML = postContent;

                // Handle like button
                const likeBtn = postElement.querySelector('.like-btn');
                likeBtn.addEventListener('click', function () {
                    posts[index].likes++;
                    localStorage.setItem('posts', JSON.stringify(posts));
                    displayPosts();
                    addNotification(`${post.userName}'s post received a new like`);
                });

                // Handle adding comments
                const commentInput = postElement.querySelector('.comment-input');
                const addCommentBtn = postElement.querySelector('.add-comment-btn');
                addCommentBtn.addEventListener('click', function () {
                    const commentText = commentInput.value.trim();
                    if (commentText !== '') {
                        posts[index].comments.push(commentText);
                        localStorage.setItem('posts', JSON.stringify(posts));
                        displayPosts();
                        addNotification(`${post.userName}'s post received a new comment`);
                    }
                });

                // Handle delete post
                const deleteBtn = postElement.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', function () {
                    deletePost(index);
                });

                postFeed.appendChild(postElement);
            });
        }

        // Function to delete post
        function deletePost(index) {
            posts.splice(index, 1); // Remove the post from the array
            localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
            displayPosts(); // Re-render posts
            addNotification('A post was deleted');
        }

        // Function to handle notifications
        function addNotification(message) {
            const newNotification = {
                message,
                timestamp: new Date().toLocaleString()
            };
            notifications.push(newNotification);
            localStorage.setItem('notifications', JSON.stringify(notifications));
            displayNotifications();
        }

        // Function to display notifications
        function displayNotifications() {
            notificationList.innerHTML = '';

            notifications.forEach(notification => {
                const notificationItem = document.createElement('li');
                notificationItem.textContent = `${notification.message} - ${notification.timestamp}`;
                notificationList.appendChild(notificationItem);
            });
        }

    } catch (error) {
        console.error('Error in script:', error);
    }
});
