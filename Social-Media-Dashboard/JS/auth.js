document.addEventListener('DOMContentLoaded', () => {
    try {
        // Registration
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const name = document.getElementById('register-name').value;
                const email = document.getElementById('register-email').value;
                const password = document.getElementById('register-password').value;

                if (!name || !email || !password) {
                    alert('Please fill all fields.');
                    return;
                }

                const user = { name, email, password };
                localStorage.setItem('user', JSON.stringify(user));

                alert('Registration successful! Please login.');
            });
        }

        // Login
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;

                const user = JSON.parse(localStorage.getItem('user'));

                if (user && user.email === email && user.password === password) {
                    localStorage.setItem('isLoggedIn', 'true');
                    window.location.href = 'index.html';
                } else {
                    alert('Invalid login credentials');
                }
            });
        }

        // Logout
        const logoutButton = document.getElementById('logout');
        if (logoutButton) {
            logoutButton.addEventListener('click', function (e) {
                e.preventDefault();
                // Remove user login state from localStorage
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('user'); // Optional, only if you want to remove user data
                // Redirect to login page
                window.location.href = 'index.html';
            });
        }

    } catch (error) {
        console.error('An error occurred:', error);
    }
});
