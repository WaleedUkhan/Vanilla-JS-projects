document.addEventListener('DOMContentLoaded', () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            const profileName = document.getElementById('profile-name');
            const profileEmail = document.getElementById('profile-email');

            if (profileName && profileEmail) {
                profileName.value = user.name;
                profileEmail.value = user.email;
            }
        }

        const profileForm = document.getElementById('profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const name = document.getElementById('profile-name').value;
                const email = document.getElementById('profile-email').value;

                const updatedUser = { ...user, name, email };
                localStorage.setItem('user', JSON.stringify(updatedUser));

                alert('Profile updated successfully!');
            });
        }
    } catch (error) {
        console.error('An error occurred while loading the profile:', error);
    }
});
