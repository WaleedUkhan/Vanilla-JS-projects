document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const postFeed = document.getElementById('post-feed');
    
    document.getElementById('post-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const text = document.getElementById('post-text').value;
        const posts = JSON.parse(localStorage.getItem('posts')) || [];

        const newPost = {
            user: user.name,
            text,
            timestamp: new Date().toLocaleString()
        };

        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));

        displayPosts();
    });

    function displayPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        postFeed.innerHTML = '';

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h3>${post.user}</h3>
                <p>${post.text}</p>
                <small>${post.timestamp}</small>
            `;
            postFeed.appendChild(postElement);
        });
    }

    displayPosts();
});
