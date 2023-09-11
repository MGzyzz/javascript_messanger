$(document).ready(function() {
    $.ajax({
        url: `http://146.185.154.90:8000/blog/{john.doe@gmail.com}/profile`,
        method: 'GET',
        success: function(profile) {
            console.log(profile)
            const username = $('#user_name');
            const email = $('#email')
            username.append(`${profile.lastName} ${profile.firstName}`)
            email.append(`${profile.email}`)
            console.log(username)
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