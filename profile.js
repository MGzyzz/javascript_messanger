$(document).ready(function() {
    const userEmail = 'check@mail.ru';
    const apiUrl = `http://146.185.154.90:8000/blog/${userEmail}/profile`;

    $('#registerSubmitButton').click(function() {
        const email = $('#registerEmail').val();

        $.ajax({
            url: `http://146.185.154.90:8000/blog/${email}/profile`,
            method: 'GET',
            success: function(check) {
                console.log(check);
                if (check.success) {
                    isUserRegister = true;
                    updateUIBasedOnUserStatus(isUserRegister);
                } else {
                    console.error('Регистрация не выполнена:', check.error);
                }
            },
            error: function(xhr, status, error) {
                console.error('Произошла ошибка при регистрации:', status, error);
            }
        });
    })



    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function(profile) {
            const isUserRegister = false
            if (isUserRegister) {
                $('#loginButton').hide();
                $('#registerButton').hide();
                $('#editButton').show()
                const username = $('#user_name');
                const email = $('#email')
                username.html(`${profile.lastName} ${profile.firstName}`)
                if (profile) {
                    username.html(`${profile.lastName} ${profile.firstName}`);
                    email.html(`${profile.email}`)
                    $('#editProfileButton').show()
                } else {
                    console.error('Профиль не найден.');
                }
            } else {
                $('#editButton').hide()
                $('#loginButton').show();
                $('#registerButton').show();
            }

        },
        error: function(xhr, status, error) {
            console.error('Произошла ошибка:', status, error);
        }
    })


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

        $.ajax({
            url: apiUrl,
            method: 'POST',
            data: newData,
            success: function(response) {
                console.log(`Данные успешно обработаны: ${response}`)
                $('#editProdileModal').hide()
                location.reload()
            },
            error: function(xhr, status, erorr) {
                console.error('Произошла ошибка:', status, error);
            }
        })
    });

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