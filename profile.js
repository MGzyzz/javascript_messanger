var userEmail = ''

$(document).ready(function() {
    const apiUrl = 'http://146.185.154.90:8000/blog';
    const isUserRegister = false

    function authenticateUser(email) {
        $.ajax({
            url: `${apiUrl}/${email}/profile`,
            method: 'GET',
            success: function(profile) {
                if (profile) {
                    console.log(profile)
                    $('#loginButton').hide();
                    $('#registerButton').hide();
                    $('#editButton').show();
                    $('#loginModal').modal('hide');
                    const username = $('#user_name');
                    const userEmail = $('#email');

                    username.html(`${profile.lastName} ${profile.firstName}`);
                    userEmail.html(`${email}`);
                    $('#editButton').show();


                } else {
                    $('#editButton').hide()
                    $('#loginButton').show();
                    $('#registerButton').show();
                    console.error('Профиль не найден.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Произошла ошибка при аутентификации:', status, error);
            }
        });
    }

    $('#loginSubmitButton').click(function() {
        const emailLogin = $('#loginEmail').val();
        if (emailLogin.trim() !== '') {
            console.log(emailLogin)
            userEmail = emailLogin;
            authenticateUser(emailLogin);
        }
    });

    $('#registerButton').click(function() {
        $('#registerModal').modal('show');
    });

    $('#registerSubmitButton').click(function() {
        const email = $('#registerEmail').val();

        $.ajax({
            url: `${apiUrl}/${email}/profile`,
            method: 'GET',
            success: function(check) {
                console.log(check);
                $('#registerModal').modal('hide');
                userEmail = email;
                authenticateUser(email);

            },
            error: function(xhr, status, error) {
                console.error('Произошла ошибка при регистрации:', status, error);
            }
        });
    })

    if (userEmail) {
        authenticateUser(userEmail);
    }

    $('#saveProfileButton').on('click', function() {
        const newFirstName = $('#first_name').val();
        const newLastName = $('#last_name').val();

        if (newFirstName.trim() === '' || newLastName.trim() === '') {
            alert('Пожалуйста, заполните оба поля!');
            return;
        }

        const newData = {
            firstName: newFirstName,
            lastName: newLastName
        };

        editProfile(userEmail, newData);
    })

    function editProfile(email, data) {
        $.ajax({
            url: `${apiUrl}/${email}/profile`,
            method: 'POST',
            data: data,
            success: function(response) {
                console.log(`Данные успешно обработаны: ${response}`)
                $('#user_name').html(`${data.firstName} ${data.lastName}`);
                $('#editProfileModal').modal('hide')
            },
            error: function(xhr, status, erorr) {
                console.error('Произошла ошибка:', status, error);
            }
        })
    }

    $('#registerButton').click(function() {
        $('#registerModal').modal('show');
    });

    $('#loginButton').click(function() {
        $('#loginModal').modal('show');
    });

    $('#followUserButton').on('click', function() {
        $('#followUserModal').modal('show');
    });

    $('#followUserConfirm').on('click', function() {

        $('#followUserModal').modal('hide');
    });

    $('#editProfileButton').on('click', function() {
        $('#editProfileModal').modal('show');
    });
})