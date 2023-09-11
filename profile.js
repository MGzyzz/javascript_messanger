$(document).ready(function() {
    const userEmail = 'john.doe@gmail.com';
    const apiUrl = `http://146.185.154.90:8000/blog/${userEmail}/profile`;
    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function(profile) {
            console.log(profile)
            const username = $('#user_name');
            const email = $('#email')
            username.html(`${profile.lastName} ${profile.firstName}`)
            if (profile) {
                username.html(`${profile.lastName} ${profile.firstName}`);
                email.html(`${profile.email}`)
            } else {
                console.error('Профиль не найден.');
            }
        },
        error: function(xhr, status, error) {
            console.error('Произошла ошибка:', status, error);
        }
    })
    $.ajax({
        url: 'http://146.185.154.90:8000/blog/john.doe@gmail.com/subscribe',
        method: 'GET',
        data: [],
        success: function(subscribe) {
            console.log(subscribe)
        }
    })
})